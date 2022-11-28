import * as THREE from "three";
import { Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { LayerMaterial, Depth, Noise } from "lamina";
import Phantoms from "components/Phantoms";
import {
  EffectComposer,
  DepthOfField,
  Vignette,
} from "@react-three/postprocessing";
import Navbar from "components/Navbar";
import Link from "next/link";

export default function App() {
  return (
    <div className="w-screen h-screen bg-white text-white font-karla">
      <Navbar />
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 22 }}>
        <Bg />
        <Suspense fallback={null}>
          <Phantoms />
          {/* <Caption>{`play\n clone\n  repeat`}</Caption> */}
          <Caption>{`phantom`}</Caption>
          <Rig />
        </Suspense>

        <EffectComposer>
          <Vignette eskil={false} offset={0.5} darkness={0.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

function Caption({ children }) {
  const { width } = useThree((state) => state.viewport);
  return (
    <Text
      position={[0, 0, -5]}
      lineHeight={0.8}
      font="/tostada.ttf"
      fontSize={width / 8}
      material-toneMapped={false}
      anchorX="center"
      anchorY="middle"
      color="white"
    >
      {children}
    </Text>
  );
}

function Rig({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    state.camera.position.lerp(
      v.set(state.mouse.x / 2, state.mouse.y / 2, 10),
      0.05
    );
  });
}

function Bg() {
  return (
    <mesh scale={100}>
      <boxGeometry args={[1, 1, 1]} />
      <LayerMaterial side={THREE.BackSide}>
        <Depth
          colorB="red"
          colorA="skyblue"
          alpha={1}
          mode="normal"
          near={130}
          far={200}
          origin={[100, 100, -100]}
        />
        <Noise
          mapping="local"
          type="white"
          scale={1000}
          colorA="white"
          colorB="black"
          mode="subtract"
          alpha={0.2}
        />
      </LayerMaterial>
    </mesh>
  );
}
