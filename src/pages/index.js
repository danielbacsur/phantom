import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import Cypher from "components/index/Cypher";

function ThreeScene() {
  return (
    <div className="order-first w-full lg:ml-auto aspect-square">
      <Canvas orthographic>
        <Environment preset="city" />
        <Suspense fallback={null}>
          <Cypher />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={1}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 2.6}
        />
        <ZoomController />
      </Canvas>
    </div>
  );
}

const ZoomController = () => {
  const { camera, size } = useThree();
  useFrame(() => {
    camera.zoom = size.width * 1;
    camera.updateProjectionMatrix();
  });
};

// export default function Home() {
//   return (
//     <>
//     <ThreeScene />
//       <div className="w-full h-1/4 container mx-auto px-8 -mt-[25vh]">
//         <div className="w-full h-full flex flex-col space-y-4 justify-center">
//           <Title>project: cypher</Title>
//           <Paragraph>
//             In the last decade, the use of electronic gift cards has become
//             widespread in almost all stores. In addition to these, most of us
//             have a bank cards, which the average person uses four times a day.
//             The name of the project comes from the word "cipher". The name
//             refers to cryptography or encryption. It refers to the security of
//             the technologies used. That with a single card we can enable the
//             remote use of most of the devices we use every day, while also
//             solving a growing health problem.
//             <p className="text-right italic">- scroll down for more</p>
//           </Paragraph>
//         </div>
//       </div>
//       <div className="w-full h-1/4 container mx-auto px-8">
//         <div className="w-full h-full flex flex-col space-y-4">
//           <Title>problem</Title>
//           <Paragraph>
//             In our preliminary research, we observed that the size of people's
//             wallets is constantly increasing over the years. Although the use of
//             cash is increasingly falling out of favor, we constantly need more
//             bank cards and coupon cards. We believe that this pattern will not
//             slow down in the near future. A thick wallet puts pressure on the
//             human skeletal system during movement, which can cause many health
//             problems. The most unpleasant of all is Piriformis syndrome. The
//             asymmetry of the spine puts pressure on the sciatic nerve, which
//             causes severe pain. Nowadays, this problem is becoming more and more
//             common. On the other hand, who would want to carry several different
//             cards when they are all based on the same technology and a device
//             can emulate those devices?
//           </Paragraph>

//           <Title>solution</Title>
//           <Paragraph>
//             Our solution is a computer in the shape of a bank card, which can be
//             used with almost all of the devices we use on a daily basis. The
//             technologies required to create such a device already exist, but
//             based on our experience so far, we have not found a compact solution
//             that would implement all of them. When we dreamed up the project, we
//             took the frameworks of the everyday devices that surround people
//             and, based on their analysis, came to the conclusion that we could
//             replace more than five devices.
//           </Paragraph>
//           <Paragraph>
//             We also want to add Bluetooth Low Energy and WiFi functionality to
//             our system. These are mainly needed for information management and
//             security. Furthermore, the built-in flash memory will be encrypted
//             according to military standards, so there is no need to worry even
//             if the user loses the device.
//           </Paragraph>

//           <Title>social impact</Title>
//           <Paragraph>
//             In their opinion, by combining the aforementioned technologies, we
//             can make people's everyday lives easier and even prevent a health
//             problem. The fewer cards we carry with us will lead to fewer
//             problems over time, and in the longer term to less plastic waste,
//             thus we can create a more conscious and simpler life.
//           </Paragraph>
//         </div>
//       </div>
//     </>
//   );
// }

export default function Home() {
  return (
    <section class="min-h-screen relative grid place-items-center bg-white">
      <div class="relative items-center w-full px-5 mx-auto md:px-12 lg:px-16 max-w-7xl">
        <div class="relative flex-col items-start m-auto align-middle">
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-24">
            <div class="relative items-center gap-12 m-auto lg:inline-flex md:order-first">
              <div class="max-w-xl text-center lg:text-left">
                <div>
                  <p class="text-2xl font-mono tracking-tight text-black sm:text-4xl">
                    cypher_alpha
                  </p>
                  <p class="max-w-xl mt-8 text-base tracking-tight text-gray-600">
                    A Cypher egy univerzális bankkártya méretű számítógép, IT és
                    kiberbiztonsággal foglalkozó mérnökök igényei és problémái
                    alapján tervezve.
                  </p>
                </div>
                <div class="flex flex-col items-center justify-center gap-3 mt-10 lg:flex-row lg:justify-start">
                  <a
                    href="#"
                    class="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none lg:w-auto focus-visible:outline-black text-sm focus-visible:ring-black"
                  >
                    Iskolánk
                  </a>
                  <a
                    href="https://otio.hu/"
                    class="inline-flex items-center justify-center text-sm font-semibold text-black duration-200 hover:text-blue-500 focus:outline-none focus-visible:outline-gray-600"
                  >
                    OTIO Honlapja
                    <span aria-hidden="true"> → </span>
                  </a>
                </div>
              </div>
            </div>
            <ThreeScene />
          </div>
        </div>
      </div>
    </section>
  );
}
