import { Instance, Instances } from "@react-three/drei";

const Grid = ({ number = 22, lineWidth = 0.024, height = 1, space = 10 }) => {
  return (
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
      {/* <gridHelper args={[number*10, number, "#bbb", "#bbb"]} position={[0, 0, 0]} /> */}
      {/* <gridHelper args={[10000, 2000, "#bbb", "#bbb"]} position={[0, 0, 0]} /> */}
    </Instances>
  );
};

export default Grid;
