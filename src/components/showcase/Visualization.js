import {
  AccumulativeShadows,
  Box,
  Center,
  ContactShadows,
  Environment,
  MeshTransmissionMaterial,
  OrbitControls,
  Plane,
  RandomizedLight,
  Sky,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { Camera, Character, Cypher, Ground } from "./components/visualization";
import { useControls } from "leva";
import { BackSide } from "three";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const Visualization = () => {
  const cypher = useRef();
  const character = useRef();

  return (
    <Canvas shadows style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}>
      <Environment preset="city" />
      <Background color="#ffffff" />

      <Suspense fallback={null}>
        <Ground />
        <Cypher ref={cypher} />
        <Character ref={character} />
      </Suspense>

      <AccumulativeShadows temporal frames={200} color="purple" colorBlend={0.5} opacity={1} scale={10} alphaTest={0.85}>
        <RandomizedLight amount={8} radius={5} ambient={0.5} position={[5, 3, 2]} bias={0.001} />
      </AccumulativeShadows>

      <Camera cypher={cypher} character={character} />
    </Canvas>
  );
};

const Background = ({ color }) => <color attach="background" args={[color]} />;

export default Visualization;
