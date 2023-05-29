import { animated } from "@react-spring/three";
import { Text3D, Center, MeshTransmissionMaterial, Box } from "@react-three/drei";
import { useVisualization } from "contexts/visualization";
import { forwardRef, useEffect, useRef } from "react";

const AnimatedCenter = animated(Center);

// const Cypher = () => {
//   const { setVisualization } = useVisualization();
//   const ref = useRef();

//   useEffect(() => {
//     setVisualization({ cypher: ref });
//   });
//   return (
//     <AnimatedCenter ref={ref} top>
//       <Box args={[86, 1.6, 54]} scale={0.01}>
//         <meshStandardMaterial />
//       </Box>
//     </AnimatedCenter>
//   );
// };

import { RGBELoader } from 'three-stdlib'
import { Canvas, useLoader } from '@react-three/fiber'
import { useControls } from "leva";
import { useShowcase } from "contexts/showcase";

const Cypher = ({ children, font = '/Inter_Medium_Regular.json', ...props }) => {
  const [config, set] = useControls("alma", () => ( {
    text: 'Inter',
    backside: true,
    backsideThickness: { value: 0.3, min: 0, max: 2 },
    samples: { value: 16, min: 1, max: 32, step: 1 },
    resolution: { value: 1024, min: 64, max: 2048, step: 64 },
    transmission: { value: 1, min: 0, max: 1 },
    thickness: { value: 0.3, min: 0, max: 5 },
    chromaticAberration: { value: 5, min: 0, max: 5 },
    anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.5, min: 0, max: 4, step: 0.01 },
    distortionScale: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0, min: 0, max: 1, step: 0.01 },
    ior: { value: 1.5, min: 0, max: 2, step: 0.01 },
    color: '#4eb0cc',
    gColor: '#ff7eb3',
    shadow: '#750d57',
    autoRotate: false,
  }))

  const {locked} = useShowcase()
  useEffect(() => {
    console.log("valam")
    set({color: locked ? "#cc4e4e" : "#4eb0cc"})
  }, [locked])

  

  const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr')
  return (
    <>
      <group>
        {/* <Center scale={[0.8 * 0.1, 1 * 0.1, 1 * 0.1]} front rotation={[-Math.PI / 2, 0, 0]}>
          <Text3D
            castShadow
            bevelEnabled
            font={font}
            scale={5}
            letterSpacing={-0.03}
            height={0.25}
            bevelSize={0.01}
            bevelSegments={10}
            curveSegments={128}
            bevelThickness={0.01}>
            Inter
            <MeshTransmissionMaterial {...config} background={texture} />
          </Text3D>
        </Center> */}
        <Center top>
          <Box scale={[0.86, 0.016, 0.54]} >
          <MeshTransmissionMaterial {...config} background={texture} envMapIntensity={0} />
          </Box>
        </Center>
      </group>
    </>
  )
}

export default Cypher;
