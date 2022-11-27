import Wrapper from "components/Wrapper";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";


export function Model() {
  const { nodes } = useGLTF("/cypher.glb");

  const reff = useRef();
  return (
    <group ref={reff}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.imagetostl_mesh.geometry}
        material={new THREE.MeshBasicMaterial({ color: 0x0, wireframe: true })}
        position={[-84 / 2, 0, 52 / 2]}
      />
    </group>
  );
}

useGLTF.preload("/cypher.glb");

function ThreeScene() {
  return (
    <Canvas
      orthographic
      camera={{
        position: [200, 200, 200],
        left: -2,
        right: 2,
        top: 2,
        bottom: -2,
        zoom: 8,
      }}
    >
      <Suspense>
        <Model />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={0.5} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 3} />
    </Canvas>
  );
}

export default function Home() {
  return (
    <Wrapper>
      <div className="w-full h-[calc(100vh-8rem)] hidden md:block">
        <ThreeScene />
      </div>
    </Wrapper>
  );
}
