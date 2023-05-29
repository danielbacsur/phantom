import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useIntersect, Image, Box, Html, Text } from "@react-three/drei";
import { ScrollControls, Scroll, useScroll } from "contexts/scroll";
import { useShowcase } from "contexts/showcase";
import { useSpring, useSpringRef } from "@react-spring/core";
import { animated } from "@react-spring/three";
import {  } from "maath/three";
import { lerp } from "maath/misc";
import { useVisualization } from "contexts/visualization";

const Overlay = () => {

  return (
    <Canvas
      orthographic
      camera={{ zoom: 80 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 999,
      }}
    >
      <ScrollControls damping={0.25} pages={9}>
        <HtmlContainer />
        <ThreeContainer />
        <Background />

        <ScrollController />
      </ScrollControls>
    </Canvas>
  );
};

const Background = () => {
  useFrame((state, _) => {
    state.gl.setClearColor("white");
  });
};

const ThreeContainer = () => {
  const { width, height } = useThree((state) => state.viewport);
  return (
    <Scroll>
      <Item
        url="/1.jpg"
        scale={[width / 6, height / 2, 1]}
        position={[-width / 3, -height * 4, 0]}
      />
      <Item
        url="/2.jpg"
        scale={[width / 6, height / 2, 1]}
        position={[width / 3, -height * 4, 0]}
      />
      <Item
        url="/3.jpg"
        scale={[width / 6, height / 2, 1]}
        position={[-width / 3, -height * 5, 0]}
      />
      <Item
        url="/4.jpg"
        scale={[width / 6, height / 2, 1]}
        position={[width / 3, -height * 5, 0]}
      />
      <Item
        url="/5.jpg"
        scale={[width / 6, height / 2, 1]}
        position={[-width / 3, -height * 6, 0]}
      />
      <Item
        url="/6.jpg"
        scale={[width / 6, height / 2, 1]}
        position={[width / 3, -height * 6, 0]}
      />
      <Item
        url="/7.jpg"
        scale={[width / 6, height / 2, 1]}
        position={[-width / 3, -height * 7, 0]}
      />
      <Item
        url="/8.jpg"
        scale={[width / 6, height / 2, 1]}
        position={[width / 3, -height * 7, 0]}
      />
    </Scroll>
  );
};

const HtmlContainer = () => {
  const {character} = useVisualization()
  const { locked} = useShowcase()

  const [distance, setDistance] = useState(0)

  useFrame((_, delta) => {
    setDistance(character.current?.position.x.toFixed(2))
  })

  return (
    <Scroll html>
      {[...Array(3)].map((_, i) => (
        <div key={i} style={{ marginTop: `-${i === 0 ? 800 : 0}vh` }}>
          <div className="h-screen grid place-items-center text-[7vw] font-mono grid-cols-3">
            <span className="col-span-1">cypher</span>
            <span className="col-span-1" />
            <span className="col-span-1">alpha</span>
          </div>
          <div className="h-screen grid place-items-center text-[3vw] font-mono relative">
            <div className="absolute bottom-[5vw] left-[7vw]">
              komponensek_
            </div>
            <div className="absolute top-[5vw] right-[7vw] rotate-180">
              komponensek_
            </div>
          </div>
          <div className="h-screen grid place-items-center text-[5vw] font-mono relative">
            <div className="absolute bottom-[5vw] left-[7vw]">
              {distance}
              <span className="text-[3vw]"> m</span>
            </div>
          </div>
          <div className="h-screen grid place-items-center text-[5vw] font-mono relative">
            {locked ? "_ZÁROLVA" : "FELOLDVA"}
          </div>

          <div className="h-screen grid place-items-center text-[3vw] font-mono">
            .sch
          </div>
          <div className="h-screen grid place-items-center text-[3vw] font-mono">
            .brd
          </div>
          <div className="h-screen grid place-items-center text-[3vw] font-mono">
            forrasztás
          </div>
          <div className="h-screen grid place-items-center text-[3vw] font-mono">
            ..100%
          </div>
        </div>
      ))}
    </Scroll>
  );
};

function Item({ url, scale, ...props }) {
  const visible = useRef(false);
  const ref = useIntersect((isVisible) => (visible.current = isVisible));
  const { height } = useThree((state) => state.viewport);
  useFrame((_, delta) => {
    ref.current.position.y = THREE.MathUtils.damp(
      ref.current.position.y,
      visible.current ? 0 : -height / 2 + 1,
      4,
      delta
    );
    ref.current.material.zoom = THREE.MathUtils.damp(
      ref.current.material.zoom,
      visible.current ? 1 : 1.5,
      4,
      delta
    );
    ref.current.material.grayscale = THREE.MathUtils.damp(
      ref.current.material.grayscale,
      visible.current ? 0 : 1,
      1,
      delta
    );
  });
  return (
    <group {...props}>
      <Image ref={ref} scale={scale} url={url} />
    </group>
  );
}

const ScrollController = () => {
  const { scroll, getScroll, setScroll } = useScroll();
  const { scene, set } = useShowcase();
  const [last, setLast] = useState(2);
  const [time, setTime] = useState(0);

  const [alpha, setAlpha] = useState(0);
  const [a, sA] = useState(0)

  useFrame((state, delta) => {
    if (scene === 5) return;

    if (scene !== last) {
      scroll(scene);
      setLast(scene);
      setTime(new Date().getTime());
    }

    if (scene === 4) {
      const rem = new Date().getTime() - time;
      const asp = rem / 60000;
      if (Math.abs(getScroll()) <= 8) {
        scroll(THREE.MathUtils.lerp(4, 8, asp));
        setAlpha(1)
      } else {

        set({ scene: 0 });
        setScroll(0);
        setAlpha(0)

      }
    }
    else {
      setAlpha(0)
    }

    sA(lerp(a, alpha, 4 * delta))
    console.log(a)
    state.gl.setClearAlpha(
      a
    );
  });
};

export default Overlay;
