import { getFirestore, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import { useRouter } from "next/router";
import { useControls } from "leva";
import { config } from "utils/firebase";

export const ShowcaseContext = createContext();
export const useShowcase = () => useContext(ShowcaseContext);

const ShowcaseProvider = ({ children }) => {
  const firebase = initializeApp(config);
  const database = getFirestore(firebase);
  const router = useRouter();

  const [controls, setControls] = useControls(() => ({
    mirror: { label: "Mirror", value: 0, min: -1, max: 1, step: 1 },
    locked: { label: "Locked", value: 0, min: 0, max: 1, step: 1 },
    scene: { label: "Scene", value: 0, min: 0, max: 5, step: 1 },
    distance: { label: "Distance", value: 6, min: 1, max: 6 },
  }));

  useEffect(() => {
    return onSnapshot(doc(database, "showcase", "configuration"), (doc) => {
      const { scene } = doc.data();
      setControls({ scene });
    });
  }, []);
  useEffect(() => {
    return onSnapshot(doc(database, "showcase", "device"), (doc) => {
      const { locked, distance } = doc.data();
      setControls({ locked: Number(locked), distance });
    });
  }, []);
  useEffect(() => {
    return onSnapshot(doc(database, "showcase", "visibility"), (doc) => {
      const { left, right } = doc.data();
      setControls({
        mirror:
          left && right
            ? router.query.orientation === "left"
              ? -1
              : router.query.orientation === "right"
              ? 1
              : 0
            : 0,
      });
    });
  });
  useEffect(() => {
    (async () => {
      await updateDoc(doc(database, "showcase", "configuration"), {
        scene: controls.scene,
      });
    })();
  }, [controls.scene]);
  useEffect(() => {
    (async () => {
      await updateDoc(doc(database, "showcase", "device"), {
        locked: Boolean(controls.locked),
        distance: controls.distance,
      });
    })();
  }, [controls.locked, controls.distance]);
  useEffect(() => {
    const visibilityEvent = async () => {
      await updateDoc(doc(database, "showcase", "visibility"), {
        [router.query.orientation]:
          document.visibilityState === "visible" ? true : false,
      });
    };
    visibilityEvent();
    window.addEventListener("visibilitychange", visibilityEvent);
    return () =>
      window.removeEventListener("visibilitychange", visibilityEvent);
  }, [router.query.orientation]);

  const feedback = async (props) => {
    (async () => {
      await updateDoc(doc(database, "showcase", "feedback"), props);
    })();
  };

  return (
    <ShowcaseContext.Provider value={{ ...controls, set: setControls, feedback }}>
      <div className="w-screen overflow-hidden">
        <div
          className="h-screen relative transition-all duration-500"
          style={{
            marginLeft: controls.mirror > 0 ? "calc(-1 * var(--vw))" : "0",
            marginRight: controls.mirror < 0 ? "calc(-1 * var(--vw))" : "0",
          }}
        >
          {children}
        </div>
      </div>
    </ShowcaseContext.Provider>
  );
};

export default ShowcaseProvider;
