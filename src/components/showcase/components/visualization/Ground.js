import { useSpring } from "@react-spring/core";
import { animated } from "@react-spring/three";
// import { Grid, Instance, Instances } from "@react-three/drei";
import { useShowcase } from "contexts/showcase";

import { useEffect, useRef } from "react";
import { Object3D } from "three";

// const AnimatedGrid = animated(Grid);

// const Ground = ({ number = 23, lineWidth = 0.026, height = 0.5 }) => {
//   const { scene } = useShowcase();
//   const { color, length } = useSpring({
//     color: scene === 0 ? "#999" : "black",
//     length: scene === 0 ? 0.5 : 2,
//   });

//   return (
//     <Instances position={[0, -1.02, 0]}>
//       <instancedMesh>
//         <animated.planeGeometry args={[lineWidth, 0.5]} />
//         <animated.meshBasicMaterial color={color} opacity={0} />
//       </instancedMesh>

//       {Array.from({ length: number }, (_, y) =>
//         Array.from({ length: number }, (_, x) => (
//           <group
//             key={x + ":" + y}
//             position={[
//               x * 2 - Math.floor(number / 2) * 2,
//               -0.01,
//               y * 2 - Math.floor(number / 2) * 2,
//             ]}
//           >
//             <Instance rotation={[-Math.PI / 2, 0, 0]} />
//             <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
//           </group>
//         ))
//       )}
//       {/* <gridHelper args={[100, 100, '#bbb', '#bbb']} position={[0, -0.01, 0]} /> */}
//     </Instances>
//   );

//   return (
//     <group>
//       <AnimatedGrid
//         position={[0, -0.01, 0]}
//         args={[10.5, 10.5]}
//         cellSize={0.25}
//         cellThickness={0.25}
//         cellColor={cellColor}
//         sectionSize={1}
//         sectionThickness={0.8 * 10}
//         sectionColor={sectionColor}
//         fadeDistance={30}
//         fadeStrength={1}
//         followCamera={false}
//         infiniteGrid={true}
//       />
//     </group>
//   );
// };

// export default Ground;

function Instances({ w = 699, s=0.5, temp = new Object3D() }) {
  const { scene } = useShowcase();
  const { color, length } = useSpring({
    color: scene === 0 ? "#fff" : "white",
    length: scene === 0 ? 0.5 : 2,
  });

  const ref = useRef();
  useEffect(() => {
    // Set positions
    for (let y = 0; y < w; y++) {
      for (let x = 0; x < w; x++) {
        temp.position.set((x * 2 - (w-1)) * s, -0.001, (y * 2 -(w-1)) * s);

        temp.updateMatrix();
        ref.current.setMatrixAt(x * w + y, temp.matrix);
      }
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <instancedMesh ref={ref} args={[null, null, w*w]}>
      {/* <boxGeometry args={[0.01, 0.01, 0.01]} /> */}
      {/* <animated.boxGeometry args={[0.2, 0.01, 0.005]} /> */}
      <animated.boxGeometry args={[0.02, 0.01, 0.02]} />
      <animated.meshBasicMaterial color={color} />
    </instancedMesh>
  );
}

export default Instances;
