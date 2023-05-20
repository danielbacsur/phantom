import { Capsule } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useShowcase } from "contexts/showcase";
import { useRef, useState } from "react";
import { lerp } from "three/src/math/MathUtils";

const RSSI = () => {
  const box = useRef();
  const [position, _setPosition] = useState(0);
  const [_position, setPosition] = useState(0);
  const showcase = useShowcase();

  useFrame((_, delta) => {
    if (showcase.scene.index === 1) {
      setPosition(5 + showcase.distancing.rssi * 5);
    } else {
      setPosition(5 + 6 * 5);
    }
    _setPosition(lerp(position, _position, delta * 4));
    box.current.position.x = position;
  });
  return <Capsule ref={box} args={[2, 6, 16, 16]} position={[0, 3, 0]} />;
};

export default RSSI;
