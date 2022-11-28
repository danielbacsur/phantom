import Container from "components/Container";
import Header from "components/Header";
import Paragraph from "components/Paragraph";
import Title from "components/Title";

// import { OrbitControls } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import Article from "components/Article";
// import Container from "components/Container";
// import Header from "components/Header";
// import Navbar from "components/Navbar";
// import Paragraph from "components/Paragraph";
// import Title from "components/Title";
// import Wrapper from "components/Wrapper";
// import Link from "next/link";
// import { Suspense } from "react";

// export function Model() {
//   const { nodes } = useGLTF("/cypher.glb");

//   const reff = useRef();
//   return (
//     <group ref={reff}>
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.imagetostl_mesh.geometry}
//         material={new THREE.MeshBasicMaterial({ color: 0x0, wireframe: true })}
//         position={[-84 / 2, 0, 52 / 2]}
//       />
//     </group>
//   );
// }

// function ThreeScene() {
//   return (
//     <Canvas
//       orthographic
//       camera={{
//         position: [200, 200, 200],
//         left: -2,
//         right: 2,
//         top: 2,
//         bottom: -2,
//         zoom: 8,
//       }}
//     >
//       <Suspense>
//         <Model />
//       </Suspense>
//       <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={0.5} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 3} />
//     </Canvas>
//   );
// }

// const Post = () => {
//   return (
//     <div className="w-full h-screen bg-white text-black font-karla">
//       <div className="w-full h-32 z-50 fixed top-0 bg-white">
//         <div className="h-full container mx-auto flex items-center justify-center md:justify-between p-8">
//           <Link className="font-tostada text-2xl hidden md:block" href="/">
//             phantom
//           </Link>
//           <div className="flex space-x-8">
//             <Link className="text-sm" href="/">
//               Home
//             </Link>
//             <Link className="text-sm" href="/about">
//               About
//             </Link>
//             <Link className="text-sm" href="/project">
//               Project
//             </Link>
//             <Link className="text-sm" href="/competition">
//               Competition
//             </Link>
//           </div>
//         </div>
//       </div>
//       <div className="bg-red-600 h-screen w-full">
//         <Canvas>
//         <ThreeScene />
//         </Canvas>
//       </div>
//       <Wrapper>
// <Container>
//   <Article>
//     <Header>project: cypher</Header>
//     <Paragraph>
//       In the last decade, the use of electronic gift cards has become
//       widespread in almost all stores. In addition to these, our wallets
//       are weighed down by bank cards, which the average person uses four
//       times a day. The name of the project comes from the English word
//       "cipher". Translated into Hungarian, it means cryptography or
//       encryption. The name refers to the security of the technologies
//       used. That with a single card we can enable the remote use of most
//       of the devices we use every day, while also solving a growing
//       health problem.
//     </Paragraph>

//     <Title>problem</Title>
//     <Paragraph>
//       In our preliminary research, we observed that the size of people's
//       wallets is constantly increasing over the years. Although the use
//       of cash is increasingly falling out of favor, we constantly need
//       more bank cards and coupon cards. We believe that this pattern
//       will not slow down in the near future. A thick wallet puts
//       pressure on the human skeletal system during movement, which can
//       cause many health problems. The most unpleasant of all is
//       Piriformis syndrome. The asymmetry of the spine puts pressure on
//       the sciatic nerve, which causes severe pain. Nowadays, this
//       problem is becoming more and more common. On the other hand, who
//       would want to carry several different cards when they are all
//       based on the same technology and a device can emulate those
//       devices?
//     </Paragraph>

//     <Title>solution</Title>
//     <Paragraph>
//       Our solution is a computer in the shape of a bank card, which can
//       be used with almost all of the devices we use on a daily basis.
//       The technologies required to create such a device already exist,
//       but based on our experience so far, we have not found a compact
//       solution that would implement all of them. When we dreamed up the
//       project, we took the frameworks of the everyday devices that
//       surround people and, based on their analysis, came to the
//       conclusion that we could replace more than five devices.
//     </Paragraph>
//     <Paragraph>
//       We also want to add Bluetooth Low Energy and WiFi functionality to
//       our system. These are mainly needed for information management and
//       security. Furthermore, the built-in flash memory will be encrypted
//       according to military standards, so there is no need to worry even
//       if the user loses the device.
//     </Paragraph>

//     <Title>social impact</Title>
//     <Paragraph>
//       In their opinion, by combining the aforementioned technologies, we
//       can make people's everyday lives easier and even prevent a health
//       problem. The fewer cards we carry with us will lead to fewer
//       problems over time, and in the longer term to less plastic waste,
//       thus we can create a more conscious and simpler life.
//     </Paragraph>
//   </Article>
// </Container>
//       </Wrapper>
//     </div>
//   );
// };

// export default Post;

import Wrapper from "components/Wrapper";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import Navbar from "components/Navbar";
import Article from "components/Article";

export function Model() {
  const { nodes } = useGLTF("/cypher.glb");

  const reff = useRef();
  return (
    <group ref={reff}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.imagetostl_mesh.geometry}
        material={new THREE.MeshBasicMaterial({ color: 0x0, wireframe: true })}
        position={[-84 / 2, 0, 52 / 2]}
      />
    </group>
  );
}

useGLTF.preload("/cypher.glb");

function ThreeScene() {
  return (
    <Canvas
      orthographic
      camera={{
        position: [200, 200, 200],
        left: -2,
        right: 2,
        top: 2,
        bottom: -2,
        zoom: 8,
      }}
    >
      <Suspense>
        <Model />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}

export default function Home() {
  return (
    <div className="bg-white text-black font-karla">
      <Navbar />

      <div className="pt-32">
        <Container>
          <Article>
            <Header>project: cypher</Header>
            <Paragraph>
              In the last decade, the use of electronic gift cards has become
              widespread in almost all stores. In addition to these, most of us
              have a bank cards, which the average person uses four times a day.
              The name of the project comes from the word "cipher".
              The name refers to cryptography or encryption.
              It refers to the security of the technologies used. That
              with a single card we can enable the remote use of most of the
              devices we use every day, while also solving a growing health
              problem.
            </Paragraph>

            <Title>problem</Title>
            <Paragraph>
              In our preliminary research, we observed that the size of people's
              wallets is constantly increasing over the years. Although the use
              of cash is increasingly falling out of favor, we constantly need
              more bank cards and coupon cards. We believe that this pattern
              will not slow down in the near future. A thick wallet puts
              pressure on the human skeletal system during movement, which can
              cause many health problems. The most unpleasant of all is
              Piriformis syndrome. The asymmetry of the spine puts pressure on
              the sciatic nerve, which causes severe pain. Nowadays, this
              problem is becoming more and more common. On the other hand, who
              would want to carry several different cards when they are all
              based on the same technology and a device can emulate those
              devices?
            </Paragraph>

            <Title>solution</Title>
            <Paragraph>
              Our solution is a computer in the shape of a bank card, which can
              be used with almost all of the devices we use on a daily basis.
              The technologies required to create such a device already exist,
              but based on our experience so far, we have not found a compact
              solution that would implement all of them. When we dreamed up the
              project, we took the frameworks of the everyday devices that
              surround people and, based on their analysis, came to the
              conclusion that we could replace more than five devices.
            </Paragraph>
            <Paragraph>
              We also want to add Bluetooth Low Energy and WiFi functionality to
              our system. These are mainly needed for information management and
              security. Furthermore, the built-in flash memory will be encrypted
              according to military standards, so there is no need to worry even
              if the user loses the device.
            </Paragraph>

            <Title>social impact</Title>
            <Paragraph>
              In their opinion, by combining the aforementioned technologies, we
              can make people's everyday lives easier and even prevent a health
              problem. The fewer cards we carry with us will lead to fewer
              problems over time, and in the longer term to less plastic waste,
              thus we can create a more conscious and simpler life.
            </Paragraph>
          </Article>
        </Container>
      </div>
      <div className="w-full h-screen">
        <ThreeScene />
      </div>
    </div>
  );
}
