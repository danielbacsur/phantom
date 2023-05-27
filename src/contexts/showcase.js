import { getFirestore, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useSpring } from "@react-spring/core";
import { initializeApp } from "firebase/app";
import { animated } from "@react-spring/web";
import { useRouter } from "next/router";
import { useControls } from "leva";

export const ShowcaseContext = createContext();
export const useShowcase = () => useContext(ShowcaseContext);

const ShowcaseProvider = ({ children }) => {
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

  const [appcontrol, setAppcontrol] = useState({});
  useEffect(() => {
    return onSnapshot(doc(database, "showcase", "appcontrol"), (doc) =>
      setAppcontrol(doc.data())
    );
  }, []);

  const [distancing, setDistancing] = useState({});
  useEffect(() => {
    return onSnapshot(doc(database, "showcase", "distancing"), (doc) =>
      setDistancing(doc.data())
    );
  }, []);

  const [gitcontrol, setGITControl] = useState({});
  useEffect(() => {
    return onSnapshot(doc(database, "showcase", "gitcontrol"), (doc) =>
      setGITControl(doc.data())
    );
  }, []);

  const [visibility, setVisibility] = useState({});
  useEffect(() => {
    return onSnapshot(doc(database, "showcase", "visibility"), (doc) =>
      setVisibility(doc.data())
    );
  }, []);

  const [scene, setScene] = useState({});
  useEffect(() => {
    return onSnapshot(doc(database, "showcase", "scene"), (doc) =>
      setScene(doc.data())
    );
  }, []);

  const router = useRouter();

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

  const scenes = {
    0: { canvas: { style: { backgroundColor: "black" } } },
    1: { canvas: { style: { backgroundColor: "red" } } },
    2: { canvas: { style: { backgroundColor: "green" } } },
  };

  const controls = useControls({
    background: "white",
    distance: {min:1, max: 8, step: 1, value: 4},
    scene: {min:0, max: 2, step: 1, value: 0}
  });

  return (
    <ShowcaseContext.Provider value={controls}>
      <div className="w-screen overflow-hidden">
        <div
          className="h-screen relative transition-all duration-500"
          style={{
            marginLeft: orientation === "right" ? "calc(-1 * var(--vw))" : "0",
            marginRight: orientation === "left" ? "calc(-1 * var(--vw))" : "0",
          }}
        >
          {children}
        </div>
      </div>
    </ShowcaseContext.Provider>
  );
};

export default ShowcaseProvider;
