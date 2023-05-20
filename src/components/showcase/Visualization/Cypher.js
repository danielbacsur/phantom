import { Box } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { RGBELoader } from "three-stdlib";

const Cypher = () => {
  const cypher = useRef();
  useFrame((state) => {
    const t = new Date().getTime() / 1000;
    cypher.current.rotation.set(
      Math.cos(t / 4) / 8,
      Math.sin(t / 3) / 4,
      0.15 + Math.sin(t / 2) / 8
    );
    cypher.current.position.y = 5 + (0.5 + Math.cos(t / 2)) / 7;
  });
  const texture = useLoader(
    RGBELoader,
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr"
  );

  return (
    <Box scale={[8.6, 0.16, 5.4]} position={[0, 0, 0]} ref={cypher} castShadow>
      {/* <MeshTransmissionMaterial {...config} background={texture} /> */}
      <meshBasicMaterial wireframe color={"#000000"} />
    </Box>
  );
};

export default Cypher;
