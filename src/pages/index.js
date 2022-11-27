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
        <div className="w-full h-32 shadow-[0px_22px_70px_4px_rgba(0,0,0,0.1)] bg-black/10 z-50 fixed top-0">
    <div className="h-full container mx-auto flex items-center justify-between p-8">
      <Link className="font-tostada text-2xl" href="/">
        phantom
      </Link>
      <div className="flex space-x-8">
        <Link className="text-sm hidden md:block font-bold" href="/">
          Home
        </Link>
        <Link className="text-sm font-bold" href="/about">
          About
        </Link>
        <Link className="text-sm font-bold" href="/project">
          Project
        </Link>
        <Link className="text-sm font-bold" href="/competition">
          Competition
        </Link>
      </div>
    </div>
  </div>
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
