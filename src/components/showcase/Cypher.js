import { animated } from "@react-spring/three";
import { Box, Center } from "@react-three/drei";
import { forwardRef } from "react";

const Animated = animated(Center);

const Cypher = forwardRef((props, ref) => {
  return (
    <Animated ref={ref}>
      <Box args={[86, 1.6, 54]} scale={0.01} />
    </Animated>
  );
})

export default Cypher;
