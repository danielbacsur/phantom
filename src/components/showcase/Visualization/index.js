import { Canvas } from "@react-three/fiber";
import Cypher from "./Cypher";
import Rig from "./Rig";
import Grid from "./Grid";
import RSSI from "./RSSI";

const Visualization = () => {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 -z-10">
      <Canvas shadows camera gl={{ preserveDrawingBuffer: true }}>
        <Cypher />
        <Rig />
        <Grid />
        <RSSI />
      </Canvas>
    </div>
  );
};

export default Visualization;
