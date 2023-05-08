import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, onSnapshot } from "firebase/firestore";
import classNames from "classnames";

import { RGBELoader } from "three-stdlib";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  Center,
  Text3D,
  Instance,
  Instances,
  Environment,
  Lightformer,
  OrbitControls,
  RandomizedLight,
  AccumulativeShadows,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { useControls, button } from "leva";
import { Vector3 } from "three";

const firebase = initializeApp({
  apiKey: "AIzaSyBA_A3vj35toMz8SDoQA7jmQY6UwvdoNu4",
  authDomain: "phantom-69420.firebaseapp.com",
  projectId: "phantom-69420",
  storageBucket: "phantom-69420.appspot.com",
  messagingSenderId: "876008701749",
  appId: "1:876008701749:web:c7f4e179d01205463ad67c",
  measurementId: "G-D0PYK7X9T5",
});
const database = getFirestore(firebase);

const Slide = () => {
  const router = useRouter();
  const [orientation, setOrientation] = useState("center");

  const { autoRotate, text, shadow, ...config } = useControls({
    text: "Inter",
    backside: true,
    animStage: false,
    backsideThickness: { value: 0.3, min: 0, max: 2 },
    samples: { value: 16, min: 1, max: 32, step: 1 },
    resolution: { value: 1024, min: 64, max: 2048, step: 64 },
    transmission: { value: 1, min: 0, max: 1 },
    clearcoat: { value: 0, min: 0.1, max: 1 },
    clearcoatRoughness: { value: 0.0, min: 0, max: 1 },
    thickness: { value: 0.3, min: 0, max: 5 },
    chromaticAberration: { value: 5, min: 0, max: 5 },
    anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.5, min: 0, max: 4, step: 0.01 },
    distortionScale: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0, min: 0, max: 1, step: 0.01 },
    ior: { value: 1.5, min: 0, max: 2, step: 0.01 },
    color: "#ff9cf5",
    gColor: "#ff7eb3",
    shadow: "#750d57",
    autoRotate: false,
    screenshot: button(() => {
      const link = document.createElement("a");
      link.setAttribute("download", "canvas.png");
      link.setAttribute(
        "href",
        document
          .querySelector("canvas")
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream")
      );
      link.click();
    }),
  });

  useEffect(() => {
    const visibility = onSnapshot(
      doc(database, "showcase", "visibility"),
      (doc) => {
        const { left, right } = doc.data();
        setOrientation(left && right ? router.query.orientation : "center");
        console.warn("READ");
      }
    );
    return visibility;
  });

  useEffect(() => {
    const visibilityEvent = async () => {
      await updateDoc(doc(database, "showcase", "visibility"), {
        [router.query.orientation]:
          document.visibilityState === "visible" ? true : false,
      });
      console.warn("UPDATE");
    };
    visibilityEvent();
    // window.addEventListener("load", visibilityEvent);
    window.addEventListener("visibilitychange", visibilityEvent);
    // window.addEventListener("onunload", visibilityEvent);
    return () => {
      // window.removeEventListener("load", visibilityEvent);
      window.removeEventListener("visibilitychange", visibilityEvent);
      // window.removeEventListener("onunload", visibilityEvent);
    };
  }, [router.query.orientation]);

  const Overlay = () => {
    return (
      <>
        <div className="absolute top-24 left-24">
          <div className="space-y-8">
            <span className="font-display text-[64px] leading-[1]">
              A_PHANTOM_CSAPATA
            </span>

            <div className="-ml-12 text-[14px]">
              <b>Bacsur Dániel & Mikó Erik</b>
              <p>Közgazdasági Politechnikum</p>
              <b>—</b>
            </div>
          </div>
        </div>
        <div className="absolute top-24 right-24">
          <span className="font-display text-[64px] leading-[1]">32. OTIO</span>
        </div>
        <div className="absolute bottom-24 left-24">
          <div className="space-y-8">
            <span className="font-display text-[240px] leading-[1]">
              CYPHER
            </span>
          </div>
        </div>
        <div className="absolute bottom-24 right-24">
          <div className="space-y-8">
            <span className="font-display text-[240px] leading-[1]">
              _ALPHA
            </span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="w-screen overflow-hidden bg-[#xffbf40]">
      <div
        className={classNames(
          "transition-all duration-500 relative h-screen overflow-hidden",
          { "-ml-[100vw]": orientation === "right" },
          { "-mr-[100vw]": orientation === "left" }
        )}
      >
        <Overlay />

        <div className="absolute top-0 bottom-0 left-0 right-0 -z-10">
          <Canvas
            shadows
            orthographic
            camera={{ position: [10, 20, 20], zoom: 80 }}
            gl={{ preserveDrawingBuffer: true }}
          >
            <color attach="background" args={["#f2f2f5"]} />
            <Text
              config={config}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -1, 2.25]}
            >
              {text}
            </Text>
            {/* <OrbitControls
              autoRotate
              autoRotateSpeed={0.5}
              zoomSpeed={0.25}
              minZoom={40}
              maxZoom={140}
              enablePan={false}
              dampingFactor={0.05}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 3}
            /> */}
            <Environment resolution={32}>
              <group rotation={[-Math.PI / 4, -0.3, 0]}>
                <Lightformer
                  intensity={20}
                  rotation-x={Math.PI / 2}
                  position={[0, 5, -9]}
                  scale={[10, 10, 1]}
                />
                <Lightformer
                  intensity={2}
                  rotation-y={Math.PI / 2}
                  position={[-5, 1, -1]}
                  scale={[10, 2, 1]}
                />
                <Lightformer
                  intensity={2}
                  rotation-y={Math.PI / 2}
                  position={[-5, -1, -1]}
                  scale={[10, 2, 1]}
                />
                <Lightformer
                  intensity={2}
                  rotation-y={-Math.PI / 2}
                  position={[10, 1, 0]}
                  scale={[20, 2, 1]}
                />
                <Lightformer
                  type="ring"
                  intensity={2}
                  rotation-y={Math.PI / 2}
                  position={[-0.1, -1, -5]}
                  scale={10}
                />
              </group>
            </Environment>
            <AccumulativeShadows
              frames={100}
              color={shadow}
              colorBlend={5}
              toneMapped={true}
              alphaTest={0.9}
              opacity={1}
              scale={30}
              position={[0, -1.01, 0]}
            >
              <RandomizedLight
                amount={4}
                radius={10}
                ambient={0.5}
                intensity={1}
                position={[0, 10, -10]}
                size={15}
                mapSize={1024}
                bias={0.0001}
              />
            </AccumulativeShadows>
            <Rig />
          </Canvas>
        </div>

        {/* <div className="w-full h-screen p-10 flex flex-col">
          <div
            style={{
              width: "100%",
              padding: 0,
              display: "inline-flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ flex: "1 1 0%", display: "flex", gap: "2em" }}></div>
            <p
              style={{
                flex: "1 1 0%",
                height: 30,
                fontSize: 30,
                lineHeight: "30px",
                textAlign: "right",
                color: "black",
              }}
            >
              ⎑
            </p>
          </div>
          <div style={{ height: 60 }} />
          <div
            style={{
              width: "100%",
              padding: 0,
              display: "inline-flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 10 }} />
            <p
              style={{
                transform: "rotate3d(0, 0, 1, 90deg) translate3d(100%,10px,0)",
                transformOrigin: "right",
                fontSize: 12,
                fontWeight: "700",
                lineHeight: "100%",
                textAlign: "right",
                color: "black",
                whiteSpace: "nowrap",
              }}
            >
              DRAG POINTER &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ●
            </p>
          </div>
          
          <div style={{ height: 60 }} />
          <div
            style={{
              pointerEvents: "all",
              pointer: "auto",
              width: "100%",
              padding: 0,
              display: "inline-flex",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <p
              className="full"
              style={{
                whiteSpace: "nowrap",
                flex: "1 1 0%",
                fontSize: 12,
                lineHeight: "1.5em",
                color: "black",
              }}
            >
              <b>Wonders of Antiquity</b>
              <br />
              Pythagorean Mathematics
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

function Rig() {
  const { camera } = useThree();

  return useFrame(() => {
    const time = new Date().getTime() / 10000;

    camera.position.lerp(
      new Vector3(Math.sin(time) * 20, 20, Math.cos(time) * 20),
      0.05
    );
    camera.lookAt(0, 0, 0);
  });
}

const Grid = ({ number = 23, lineWidth = 0.026, height = 0.5 }) => (
  <Instances position={[0, -1.02, 0]}>
    <planeGeometry args={[lineWidth, height]} />
    <meshBasicMaterial color="#999" />
    {Array.from({ length: number }, (_, y) =>
      Array.from({ length: number }, (_, x) => (
        <group
          key={x + ":" + y}
          position={[
            x * 2 - Math.floor(number / 2) * 2,
            -0.01,
            y * 2 - Math.floor(number / 2) * 2,
          ]}
        >
          <Instance rotation={[-Math.PI / 2, 0, 0]} />
          <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
        </group>
      ))
    )}
    <gridHelper args={[100, 100, "#bbb", "#bbb"]} position={[0, -0.01, 0]} />
  </Instances>
);

function Text({
  children,
  config,
  font = "/Inter_Medium_Regular.json",
  ...props
}) {
  const texture = useLoader(
    RGBELoader,
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr"
  );
  return (
    <>
      <group>
        <Center scale={[0.8, 1, 1]} front top {...props}>
          <Text3D
            castShadow
            bevelEnabled
            font={font}
            scale={5}
            letterSpacing={-0.03}
            height={0.25}
            bevelSize={0.01}
            bevelSegments={10}
            curveSegments={128}
            bevelThickness={0.01}
          >
            {children}
            <MeshTransmissionMaterial {...config} background={texture} />
          </Text3D>
        </Center>
        <Grid />
      </group>
    </>
  );
}

export default Slide;
