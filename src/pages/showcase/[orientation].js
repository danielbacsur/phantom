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
import ShowcaseProvider, { useShowcase } from "contexts/showcase";
import Banner from "components/showcase/Banner";
import Visualization from "components/showcase/Visualization";
import Overlay from "components/showcase/Overlay";

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

const Showcase = () => {
  const router = useRouter();

  const [rssi, setRSSI] = useState(1.0);
  useEffect(() => {
    return onSnapshot(doc(database, "showcase", "distancing"), (doc) => {
      const { rssi } = doc.data();
      setRSSI(rssi);
      console.warn("READ");
    });
  });

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
  });

  const [sceneIndex, setSceneIndex] = useState(1.0);
  useEffect(() => {
    return onSnapshot(doc(database, "showcase", "scene"), (doc) => {
      const { index } = doc.data();
      setSceneIndex(index);
      console.warn("READ");
    });
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
    <ShowcaseProvider>
      <div className="w-screen overflow-hidden bg-[#000000E0-]">
        <div
          className={classNames(
            "transition-all duration-500 relative h-screen overflow-hidden",
            { "-ml-[100vw]": orientation === "right" },
            { "-mr-[100vw]": orientation === "left" }
          )}
        >
          <Banner />
          <Overlay />
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
    </ShowcaseProvider>
  );
};

export default Showcase;
