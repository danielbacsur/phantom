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

export const ScrollControls = ({ pages = 1, damping = 0.25, children }) => {
  const { get, setEvents, gl, size, events } = useThree();
  const [el] = useState(() => document.createElement("div"));
  const [fill] = useState(() => document.createElement("div"));
  const [fixed] = useState(() => document.createElement("div"));

  const state = useMemo(() => {
    const state = {
      el,
      fill,
      fixed,
      damping,
      offset: 0,
      pages,
      getScroll: () => Math.round(state.offset * (pages - 1) * 100) / 100,
      setScroll: (s) => {state.scroll(s); state.offset = s / pages},
      scroll: (s) => (el.scrollTop = s ? s * (el.scrollHeight-size.height) / (pages-1) : 1)
    };
    return state;
  }, [damping, pages]);

  useEffect(() => {
    el.style.position = "absolute";
    el.style.top = "0px";
    el.style.left = "0px";
    el.style.bottom = "0px";
    el.style.right = "-18px";
    el.style.overflowY = "auto";
    el.style.overflowX = "hidden";
    fixed.style.position = "sticky";
    fixed.style.top = "0px";
    fixed.style.left = "0px";
    fixed.style.width = "100%";
    fixed.style.height = "100%";
    fixed.style.overflow = "hidden";
    fill.style.height = `${pages * 100}%`;
    fill.style.width = "100%";
    fill.style.pointerEvents = "none";

    el.appendChild(fixed);
    el.appendChild(fill);
    gl.domElement.parentNode.appendChild(el);

    const oldTarget = events.connected || gl.domElement;
    requestAnimationFrame(() => events.connect?.(el));
    const oldCompute = get().events.compute;
    setEvents({
      compute(event, state) {
        const { left, top } = gl.domElement.parentNode.getBoundingClientRect();
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
      gl.domElement.parentNode.removeChild(el);
      setEvents({ compute: oldCompute });
      events.connect?.(oldTarget);
    };
  }, [pages, el, fill, fixed, gl.domElement.parentNode]);

  useFrame(
    (_, delta) => {
      let scroll = el.scrollTop / (el.scrollHeight - size.height);

      if (el.scrollTop >= el.scrollHeight - size.height) {
        el.scrollTop = 1;
        scroll = state.offset -= 1;
      } else if (el.scrollTop <= 0) {
        el.scrollTop = el.scrollHeight;
        scroll = state.offset += 1;
      }

      easing.damp(state, "offset", scroll, damping, delta);
    },
    [el, events, size, state]
  );

  return (
    <ScrollContext.Provider value={state}>{children}</ScrollContext.Provider>
  );
};

const ScrollCanvas = forwardRef(({ children }, ref) => {
  const group = useRef();
  const state = useScroll();
  const { height } = useThree((state) => state.viewport);

  useFrame(() => {
    group.current.position.y = height * (state.pages - 1) * state.offset;
  });

  return <group ref={mergeRefs([ref, group])}>{children}</group>;
});

const ScrollHtml = forwardRef(({ children, style, ...props }, ref) => {
  const state = useScroll();
  const group = useRef();
  const { height } = useThree((state) => state.size);
  const fiberState = useContext(fiberContext);
  const root = useMemo(() => createRoot(state.fixed), [state.fixed]);
  useFrame(() => {
    if (group.current) {
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
