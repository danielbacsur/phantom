import { Box, Edges, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { button, useControls } from "leva";
import { useRef } from "react";
import { RGBELoader } from "three-stdlib";

const Cypher = () => {

  const config = useControls({
    text: "alpha",
    backside: true,
    animStage: true,
    backsideThickness: { value: 0.3, min: 0, max: 2 },
    samples: { value: 16, min: 1, max: 32, step: 1 },
    resolution: { value: 1024, min: 64, max: 2048, step: 64 },
    transmission: { value: 1, min: 0, max: 1 },
    clearcoat: { value: 1, min: 0.1, max: 1 },
    clearcoatRoughness: { value: 1, min: 0, max: 1 },
    thickness: { value: 0.3, min: 0, max: 5 },
    chromaticAberration: { value: 5, min: 0, max: 5 },
    anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.2, min: 0, max: 1, step: 0.01 },
    distortion: { value: 4, min: 0, max: 4, step: 0.01 },
    distortionScale: { value: 0.2, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.05, min: 0, max: 1, step: 0.01 },
    ior: { value: 1.5, min: 0, max: 2, step: 0.01 },
    color: "#ff9cf5",
    gColor: "#ff7eb3",
    shadow: "#750d57",
    autoRotate: false,
    screenshot: button(() => {
      const link = document.createElement("a");
      link.setAttribute("download", "canvas.png");
      link.setAttribute(
        "href",
        document
          .querySelector("canvas")
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream")
      );
      link.click();
    }),
    visualization: { value: 0, min: 0, max: 3, step: 1 },
  });


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
      <MeshTransmissionMaterial {...config} background={texture} />
      {/* <meshBasicMaterial wireframe color={"#ffffff"} /> */}
      <Edges color="white" />
    </Box>
  );
};

export default Cypher;
