import { useFrame, useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { useShowcase } from "contexts/showcase";
import { useRef } from "react";
import { useVisualization } from "contexts/visualization";
import { lerp } from "maath/misc";

const Camera = () => {
  const { character } = useVisualization();
  const cameraControlsRef = useRef();
  const { camera } = useThree();
  const showcase = useShowcase();

  useFrame((_, delta) => {
    const time = new Date().getTime() / 30000 * Math.PI;

    if (showcase.scene === 0 || showcase.scene === 4) {
      cameraControlsRef.current?.setLookAt(
        Math.sin(time) * 6,
        6,
        Math.cos(time) * 6,
        0,
        0,
        0,
        true
      );
      camera.fov = lerp(camera.fov, 12, delta * 2);
    } else if (showcase.scene === 1 || showcase.scene === 3) {
      cameraControlsRef.current?.setLookAt(0, 6, 0, 0, 0, 0, true);
      camera.fov = lerp(camera.fov, 12, delta * 2);
    } else if (showcase.scene === 2) {
      cameraControlsRef.current?.setLookAt(
        character.current?.position.x * 0.5,
        character.current?.position.x / 4 + 2,
        character.current?.position.x / 4 + 4,
        character.current?.position.x * 0.5,
        1,
        0,
        true
      );
      camera.fov = lerp(camera.fov, 60, delta * 2);
    }

    camera.updateProjectionMatrix();
  });

  return <CameraControls ref={cameraControlsRef} />;
};

export default Camera;
