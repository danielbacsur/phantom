import { animated, useSpring } from "@react-spring/three";
import { Capsule, Center, MeshTransmissionMaterial } from "@react-three/drei";
import { useShowcase } from "contexts/showcase";
import { forwardRef } from "react";

const AnimatedCenter = animated(Center);

const Character = forwardRef((props, ref) => {
  const { scene, distance, locked } = useShowcase();
  const spring = useSpring({ distance: scene === 2 && !locked ? distance : 8 });

  return (
    <AnimatedCenter ref={ref} top position-x={spring.distance}>
      <Capsule args={[0.5, 1, 16, 16]}>
        <meshStandardMaterial />
      </Capsule>
    </AnimatedCenter>
  );
});

export default Character;
