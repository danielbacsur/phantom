import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, onSnapshot } from "firebase/firestore";
import classNames from "classnames";
import { RGBELoader } from "three-stdlib";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  Instance,
  Instances,
  MeshTransmissionMaterial,
  Box,
  Capsule,
  Sphere,
} from "@react-three/drei";
import { useControls, button } from "leva";
import { BoxGeometry, MeshBasicMaterial, Vector3 } from "three";
import { lerp } from "three/src/math/MathUtils";
import TypewriterComponent from "typewriter-effect";

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

  const { autoRotate, text, shadow, ...config } = useControls({
    text: "alpha",
    backside: true,
    animStage: true,
    backsideThickness: { value: 0.3, min: 0, max: 2 },
    samples: { value: 16, min: 1, max: 32, step: 1 },
    resolution: { value: 1024, min: 64, max: 2048, step: 64 },
    transmission: { value: 1, min: 0, max: 1 },
    clearcoat: { value: 1, min: 0.1, max: 1 },
    clearcoatRoughness: { value: 1, min: 0, max: 1 },
    thickness: { value: 0.3, min: 0, max: 5 },
    chromaticAberration: { value: 5, min: 0, max: 5 },
    anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.2, min: 0, max: 1, step: 0.01 },
    distortion: { value: 4, min: 0, max: 4, step: 0.01 },
    distortionScale: { value: 0.2, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.05, min: 0, max: 1, step: 0.01 },
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
    visualization: { value: 0, min: 0, max: 3, step: 1 },
    rssi: { value: 1, min: 1, max: 6, step: 0.5 },
  });

  const [orientation, setOrientation] = useState("center");
  useEffect(() => {
    return onSnapshot(doc(database, "showcase", "visibility"), (doc) => {
      const { left, right } = doc.data();
      setOrientation(left && right ? router.query.orientation : "center");
      console.warn("READ");
    });
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
    window.addEventListener("visibilitychange", visibilityEvent);
    return () =>
      window.removeEventListener("visibilitychange", visibilityEvent);
  }, [router.query.orientation]);

  return (
    <div className="w-screen overflow-hidden bg-[#xffbf40]">
      <div
        className={classNames(
          "transition-all duration-500 relative h-screen overflow-hidden",
          { "-ml-[100vw]": orientation === "right" },
          { "-mr-[100vw]": orientation === "left" }
        )}
      >
        <Overlay config={config} />
        <Visualization config={config} />

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

const Overlay = ({ config }) => {
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
            <b>— {config.rssi}</b>
          </div>
        </div>
      </div>
      <div className="absolute top-24 right-24">
        <span className="font-display text-[64px] leading-[1]">32. OTIO</span>
      </div>
      <div className="absolute bottom-24 left-24">
        <div className="space-y-8">
          <span className="font-display text-[240px] leading-[1]">CYPHER</span>
        </div>
      </div>
      <div className="absolute bottom-24 right-24">
        <div className="space-y-8">
          <span className="font-display text-[240px] leading-[1]">_ALPHA</span>
        </div>
      </div>
    </>
  );
};

const Visualization = ({ config }) => {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 -z-10">
      <Canvas shadows camera gl={{ preserveDrawingBuffer: true }}>
        <Cypher config={config} />
        <Rig config={config} />
        <Grid config={config} />
        <RSSI config={config} />
      </Canvas>
    </div>
  );
};

const RSSI = ({ config }) => {
  const box = useRef();
  const [position, _setPosition] = useState(0);
  const [_position, setPosition] = useState(0);

  useFrame((_, delta) => {
    if (config.visualization === 1) {
      setPosition(5 + config.rssi * 5);
    } else {
      setPosition(5 + 6 * 5);
    }
    _setPosition(lerp(position, _position, delta * 4));
    box.current.position.x = position;
  });
  return <Capsule ref={box} args={[2, 6, 16, 16]} position={[0, 3, 0]} />;
};

function Rig({ config }) {
  const { camera } = useThree();
  const [look, _setLook] = useState(new Vector3());
  const [_look, setLook] = useState(new Vector3());
  const [position, _setPosition] = useState(new Vector3());
  const [_position, setPosition] = useState(new Vector3());
  const [fieldOfView, _setFieldOfView] = useState(0);
  const [_fieldOfView, setZoom] = useState(0);

  return useFrame((_, delta) => {
    if (config.visualization === 0) {
      const time = new Date().getTime() / 40000;
      setPosition(new Vector3(Math.sin(time) * 50, 55, Math.cos(time) * 50));
      setLook(new Vector3(0, 5, 0));
      setZoom(10);
    } else if (config.visualization === 1) {
      const midp = 10 + config.rssi * 5;
      setPosition(new Vector3(midp / 2, 15 + config.rssi, midp / 2));
      setLook(new Vector3(midp / 2, 5, 0));
      setZoom(90);
    }
    _setLook(
      new Vector3(
        lerp(look.x, _look.x, delta * 3),
        lerp(look.y, _look.y, delta * 3),
        lerp(look.z, _look.z, delta * 3)
      )
    );
    _setPosition(
      new Vector3(
        lerp(position.x, _position.x, delta * 4),
        lerp(position.y, _position.y, delta * 4),
        lerp(position.z, _position.z, delta * 4)
      )
    );
    _setFieldOfView(lerp(fieldOfView, _fieldOfView, delta * 2));
    camera.fov = fieldOfView;
    camera.position.set(position.x, position.y, position.z);
    camera.lookAt(look);
    camera.updateProjectionMatrix();
  });
}

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
const Cypher = ({ number = 7, lineWidth = 0.024, height = 0.5, config }) => {
  const cypher = useRef();
  useFrame((state) => {
    const t = new Date().getTime() / 1000;
    cypher.current.rotation.set(
      Math.cos(t / 4) / 8,
      Math.sin(t / 3) / 4,
      0.15 + Math.sin(t / 2) / 8
    );
    cypher.current.position.y = 5 + (0.5 + Math.cos(t / 2)) / 7;
  });
  const texture = useLoader(
    RGBELoader,
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr"
  );

  return (
    <Box scale={[8.6, 0.16, 5.4]} position={[0, 0, 0]} ref={cypher} castShadow>
      <MeshTransmissionMaterial {...config} background={texture} />
      {/* <meshWireframeMaterial /> */}
    </Box>
  );
};

export default Slide;
