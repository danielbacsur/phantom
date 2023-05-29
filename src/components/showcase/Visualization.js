import { Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import { Camera, Character, Ground } from "./components/visualization";
import { useVisualization } from "contexts/visualization";
import Cypher from "./Cypher";
import { useShowcase } from "contexts/showcase";
import { Color } from "three";
import { dampC } from "maath/easing";

const Visualization = () => {
  return (
    <Canvas
      shadows
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
  const { scene } = useShowcase();
  const { character } = useVisualization();
  useFrame((state, delta) => {
    let setter = state.gl.getClearColor(new Color());
    console.log(
      dampC(
        setter,
        scene === 2 && character.current.position.x > 5
          ? new Color("#FF6B6B")
          : new Color("white"),
        0.1,
        delta
      )
    );
    state.gl.setClearColor(setter);
  });
};

export default Visualization;
