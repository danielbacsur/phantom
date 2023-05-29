import { animated } from "@react-spring/three";
import { Box, Center, MeshTransmissionMaterial } from "@react-three/drei";
import { forwardRef } from "react";

const AnimatedCenter = animated(Center);

const Cypher = forwardRef((props, ref) => {
  return (
    <AnimatedCenter ref={ref} top>
      <Box args={[86, 1.6, 54]} scale={0.01}>
        <meshStandardMaterial />
      </Box>
    </AnimatedCenter>
  );
});

export default Cypher;
