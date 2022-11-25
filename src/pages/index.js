import Wrapper from "components/Wrapper"

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Box() {
  const boxRef = useRef();

  useFrame(() => {
    boxRef.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[84, 1, 52]} />
      <meshStandardMaterial color="black" wireframe />
    </mesh>
  );
}

function ThreeScene() {
  return (

    <Canvas orthographic camera={{
      position: [200, 100, 200], left: -2,
      right: 2, top: 2, bottom: -2, zoom: 8
    }}>
      <ambientLight />
      <pointLight position={[5, 5, 5]} intensity={2} />
      <pointLight position={[-3, -3, 2]} />
      <Box />
    </Canvas>
  );
}

export default function Home() {
  return (
    <Wrapper>
      <div className="hidden md:block h-full w-full mx-auto">
        <ThreeScene />
        {/* <span className="absolute top-1/2 left-1/2 text-8xl font-tostada">cypher</span> */}
      </div>
    </Wrapper>
  )
}
