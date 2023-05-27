import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Character, Cypher } from "components/showcase";
import { AccumulativeShadows, CameraControls, Environment, Grid, RandomizedLight } from "@react-three/drei";
import { useShowcase } from "contexts/showcase";
import { lerp } from "three/src/math/MathUtils";

const Visualization = () => {
  const cypher = useRef()
  const character = useRef()
  
  return (
    <Canvas shadows style={{position: "absolute", top: 0, left: 0, bottom: 0, right: 0}}>
      <Suspense fallback={null}>
        <Ground />
        <Cypher ref={cypher} />
        <Character ref={character} />
        <Camera cypher={cypher} character={character}  />
      </Suspense>
    </Canvas>
  );
};

const Camera = ({ cypher, character }) => {
  const cameraControlsRef = useRef();
  const { camera } = useThree();
  const showcase = useShowcase();

  useFrame((_, delta) => {
    const time = new Date().getTime() / 5000;

    if (showcase.scene === 0) {
      cameraControlsRef?.current?.setLookAt(
        Math.sin(time) * 6,
        6,
        Math.cos(time) * 6,
        0,
        0,
        0,
        true
      );
      camera.fov = lerp(camera.fov, 12, delta * 2);
    } else if (showcase.scene === 1) {
      cameraControlsRef.current?.setLookAt(
        (character.current?.position.x - cypher.current?.position.x) * 0.75 -
          0.5,
        3,
        6,
        (character.current?.position.x - cypher.current?.position.x) * 0.5,
        1,
        0,
        true
      );
      camera.fov = lerp(camera.fov, 60, delta * 2);
    } else if (showcase.scene === 2) {
      cameraControlsRef.current?.setLookAt(0, 6, 0, 0, 0, 0, true);
      camera.fov = lerp(camera.fov, 12, delta * 2);
    }

    camera.updateProjectionMatrix();
  });

  return <CameraControls ref={cameraControlsRef} />;
};

const Ground = () => {
  const gridConfig = {
    cellSize: 0.25,
    cellThickness: 0.25,
    cellColor: "#6f6f6f",
    sectionSize: 1,
    sectionThickness: 0.8,
    sectionColor: "#9d4b4b",
    fadeDistance: 30,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
  };
  return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />;
};

export default Visualization;
