import { Grid, Instance, Instances } from "@react-three/drei";
import { Object3D } from "three";

function Instancess({ w = 19, s = 0.5, temp = new Object3D() }) {
  return (
    <Instances position={[3, 0, 0]}>
      <planeGeometry args={[0.01, 0.1]} />
      <meshBasicMaterial color="#ffffff" />
      {Array.from({ length: w }, (_, y) =>
        Array.from({ length: w }, (_, x) => (
          <group
            key={x + ":" + y}
            position={[(x * 2 - (w - 1)) * s, 0.01, (y * 2 - (w - 1)) * s]}
          >
            <Instance rotation={[-Math.PI / 2, 0, 0]} />
            <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
          </group>
        ))
      )}
      
      <Grid
        position={[0, -0.01, 0]}
        args={[10.5, 10.5]}
        cellSize={0.25}
        cellThickness={0.25}
        cellColor={"#6f6f6f"}
        sectionSize={1}
        sectionThickness={0.8}
        sectionColor={"#9d4b4b"}
        fadeDistance={50}
        fadeStrength={5}
        infiniteGrid={true}
      />
    </Instances>
  );
}

export default Instancess;
