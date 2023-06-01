import { Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import { Camera, Character, Ground } from "./components/visualization";
import Cypher from "./Cypher";
import { useShowcase } from "contexts/showcase";
import { Color } from "three";
import { dampC } from "maath/easing";

const Visualization = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 1]}
      style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
    >
      <Environment preset="city" />
      <Background />

      <Suspense fallback={null}>
        <Ground />
        {/* <Cypher /> */}
        <Cypher />
        <Character />
      </Suspense>

      <Camera />
    </Canvas>
  );
};

const Background = () => {
  const { scene, locked, character } = useShowcase();
  useFrame((state, delta) => {
    let setter = state.gl.getClearColor(new Color());
    dampC(
      setter,
      (scene === 2 && character.current?.position.x > 5) ||
        (scene === 3 && locked)
        ? new Color("#FF6B6B")
        : new Color("white"),
      0.1,
      delta
    );
    state.gl.setClearColor(setter);
  });
};

export default Visualization;
