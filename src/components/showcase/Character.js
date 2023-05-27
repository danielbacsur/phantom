import { animated, useSpring } from "@react-spring/three";
import { Capsule, Center } from "@react-three/drei";
import { useShowcase } from "contexts/showcase";
import { forwardRef } from "react";

const Animated = animated(Center);

const Character = forwardRef((props, ref) => {
  const { scene, distance } = useShowcase();
  const spring = useSpring({ distance: scene === 1 ? distance : 8 });

  return (
    <Animated ref={ref} top position-x={spring.distance}>
      <Capsule />
    </Animated>
  );
})

export default Character;
