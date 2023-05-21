import { Instance, Instances } from "@react-three/drei";
import { Color } from "three";

const Grid = ({ number = 22, lineWidth = 0.024, height = 1, space = 10 }) => {
  return (
    <>
      <Instances position={[0, 0, 0]}>
        <planeGeometry args={[lineWidth, height]} />
        <meshBasicMaterial color="#999" />
        {Array.from({ length: number }, (_, y) =>
          Array.from({ length: number }, (_, x) => (
            <group
              key={x + ":" + y}
              position={[
                x * space - ((number - 1) * space) / 2,
                0,
                y * space - ((number - 1) * space) / 2,
              ]}
            >
              <Instance rotation={[-Math.PI / 2, 0, 0]} />
              <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
            </group>
          ))
        )}
      </Instances>
      <gridHelper args={[9010, 901, "#eee", "#eee"]} />
    </>

    // <>
    //   <gridHelper args={[100, 10, "#ffffff", "#ffffff"]} />
    //   <gridHelper args={[100, 40, "#1f1f1f", "#050505"]} />
    //   <gridHelper args={[100, 40, "#1f1f1f", "#050505"]} />
    // </>
  );
};

export default Grid;
