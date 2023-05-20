import { useFrame, useThree } from "@react-three/fiber";
import { useShowcase } from "contexts/showcase";
import { useState } from "react";
import { Vector3 } from "three";
import { lerp } from "three/src/math/MathUtils";

const Rig = () => {
  const showcase = useShowcase();
  const { camera } = useThree();

  const [look, _setLook] = useState(new Vector3());
  const [_look, setLook] = useState(new Vector3());
  const [position, _setPosition] = useState(new Vector3());
  const [_position, setPosition] = useState(new Vector3());
  const [fieldOfView, _setFieldOfView] = useState(0);
  const [_fieldOfView, setZoom] = useState(0);

  return useFrame((_, delta) => {
    if (showcase.scene.index === 0) {
      const time = new Date().getTime() / 40000;
      setPosition(new Vector3(Math.sin(time) * 50, 55, Math.cos(time) * 50));
      setLook(new Vector3(0, 5, 0));
      setZoom(10);
    } else if (showcase.scene.index === 1) {
      const midp = 10 + showcase.distancing.rssi * 5;
      setPosition(
        new Vector3(midp / 2, 15 + showcase.distancing.rssi, midp / 2)
      );
      setLook(new Vector3(midp / 2, 5, 0));
      setZoom(90);
    }
    _setLook(
      new Vector3(
        lerp(look.x, _look.x, delta * 3),
        lerp(look.y, _look.y, delta * 3),
        lerp(look.z, _look.z, delta * 3)
      )
    );
    _setPosition(
      new Vector3(
        lerp(position.x, _position.x, delta * 4),
        lerp(position.y, _position.y, delta * 4),
        lerp(position.z, _position.z, delta * 4)
      )
    );
    _setFieldOfView(lerp(fieldOfView, _fieldOfView, delta * 2));
    camera.fov = fieldOfView;
    camera.position.set(position.x, position.y, position.z);
    camera.lookAt(look);
    camera.updateProjectionMatrix();
  });
};

export default Rig;
