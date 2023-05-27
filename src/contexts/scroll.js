import { createRoot } from "react-dom/client";
import {
  context as fiberContext,
  useFrame,
  useThree,
} from "@react-three/fiber";
import mergeRefs from "react-merge-refs";
import { easing } from "maath";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const ScrollContext = createContext();
export const useScroll = () => useContext(ScrollContext);

export function ScrollControls({
  eps = 0.00001,
  enabled = true,
  infinite,
  horizontal,
  pages = 1,
  distance = 1,
  damping = 0.25,
  maxSpeed = Infinity,
  style = {},
  children,
}) {
  const { get, setEvents, gl, size, invalidate, events } = useThree();
  const [el] = useState(() => document.createElement("div"));
  const [fill] = useState(() => document.createElement("div"));
  const [fixed] = useState(() => document.createElement("div"));
  const target = gl.domElement.parentNode;
  const scroll = useRef(0);

  const state = useMemo(() => {
    const state = {
      el,
      eps,
      fill,
      fixed,
      horizontal,
      damping,
      offset: 0,
      delta: 0,
      scroll,
      pages,
      // 0-1 for a range between from -> from + distance
      range(from, distance, margin = 0) {
        const start = from - margin;
        const end = start + distance + margin * 2;
        return this.offset < start
          ? 0
          : this.offset > end
          ? 1
          : (this.offset - start) / (end - start);
      },
      // 0-1-0 for a range between from -> from + distance
      curve(from, distance, margin = 0) {
        return Math.sin(this.range(from, distance, margin) * Math.PI);
      },
      // true/false for a range between from -> from + distance
      visible(from, distance, margin = 0) {
        const start = from - margin;
        const end = start + distance + margin * 2;
        return this.offset >= start && this.offset <= end;
      },
    };
    return state;
  }, [eps, damping, horizontal, pages]);

  useEffect(() => {
    el.style.position = "absolute";
    el.style.top = "0px";
    el.style.left = "0px";
    el.style.bottom = "0px";
    el.style.right = "0px";
    el.style.overflowY = "auto";
    el.style.overflowX = "hidden";

    for (const key in style) el.style[key] = style[key];

    fixed.style.position = "sticky";
    fixed.style.top = "0px";
    fixed.style.left = "0px";
    fixed.style.width = "100%";
    fixed.style.height = "100%";
    fixed.style.overflow = "hidden";
    el.appendChild(fixed);

    fill.style.height = `${pages * distance * 100}%`;
    fill.style.width = "100%";
    fill.style.pointerEvents = "none";
    el.appendChild(fill);
    target.appendChild(el);

    const oldTarget = events.connected || gl.domElement;
    requestAnimationFrame(() => events.connect?.(el));
    const oldCompute = get().events.compute;
    setEvents({
      compute(event, state) {
        const { left, top } = target.getBoundingClientRect();
        const offsetX = event.clientX - left;
        const offsetY = event.clientY - top;
        state.pointer.set(
          (offsetX / state.size.width) * 2 - 1,
          -(offsetY / state.size.height) * 2 + 1
        );
        state.raycaster.setFromCamera(state.pointer, state.camera);
      },
    });

    return () => {
      target.removeChild(el);
      setEvents({ compute: oldCompute });
      events.connect?.(oldTarget);
    };
  }, [pages, distance, horizontal, el, fill, fixed, target]);

  useEffect(() => {
    if (events.connected === el) {
      const containerLength = size.height;
      const scrollLength = el.scrollHeight;
      const scrollThreshold = scrollLength - containerLength;

      let current = 0;
      let disableScroll = true;
      let firstRun = true;

      const onScroll = () => {
        if (!enabled || firstRun) return;
        invalidate();
        current = el.scrollTop;
        scroll.current = current / scrollThreshold;

        if (infinite) {
          if (!disableScroll) {
            if (current >= scrollThreshold) {
              const damp = 1 - state.offset;
              el.scrollTop = 1;
              scroll.current = state.offset = -damp;
              disableScroll = true;
            } else if (current <= 0) {
              const damp = 1 + state.offset;
              el.scrollTop = scrollLength;
              scroll.current = state.offset = damp;
              disableScroll = true;
            }
          }
          if (disableScroll) setTimeout(() => (disableScroll = false), 40);
        }
      };
      el.addEventListener("scroll", onScroll, { passive: true });
      requestAnimationFrame(() => (firstRun = false));

      return () => el.removeEventListener("scroll", onScroll);
    }
  }, [el, events, size, infinite, state, invalidate, horizontal, enabled]);

  let last = 0;
  useFrame((_, delta) => {
    last = state.offset;
    easing.damp(
      state,
      "offset",
      scroll.current,
      damping,
      delta,
      maxSpeed,
      undefined,
      eps
    );
    easing.damp(
      state,
      "delta",
      Math.abs(last - state.offset),
      damping,
      delta,
      maxSpeed,
      undefined,
      eps
    );
    if (state.delta > eps) invalidate();
  });
  return (
    <ScrollContext.Provider value={state}>{children}</ScrollContext.Provider>
  );
}

const ScrollCanvas = forwardRef(({ children }, ref) => {
  const group = useRef();
  const state = useScroll();
  const { width, height } = useThree((state) => state.viewport);
  useFrame(() => {
    group.current.position.x = 0;
    group.current.position.y = height * (state.pages - 1) * state.offset;
  });
  return <group ref={mergeRefs([ref, group])}>{children}</group>;
});

const ScrollHtml = forwardRef(({ children, style, ...props }, ref) => {
  const state = useScroll();
  const group = useRef();
  const { width, height } = useThree((state) => state.size);
  const fiberState = useContext(fiberContext);
  const root = useMemo(() => createRoot(state.fixed), [state.fixed]);
  useFrame(() => {
    if (state.delta > state.eps) {
      group.current.style.transform = `translate3d(0px,${
        height * (state.pages - 1) * -state.offset
      }px,0)`;
    }
  });
  root.render(
    <div
      ref={mergeRefs([ref, group])}
      style={{
        ...style,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        willChange: "transform",
      }}
      {...props}
    >
      <ScrollContext.Provider value={state}>
        <fiberContext.Provider value={fiberState}>
          {children}
        </fiberContext.Provider>
      </ScrollContext.Provider>
    </div>
  );
  return null;
});

export const Scroll = forwardRef(({ html, ...props }, ref) => {
  const El = html ? ScrollHtml : ScrollCanvas;
  return <El ref={ref} {...props} />;
});
