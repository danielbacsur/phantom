import { getFirestore, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import { useRouter } from "next/router";
import { config } from "utils/firebase";

export const ShowcaseContext = createContext();
export const useShowcase = () => useContext(ShowcaseContext);

const ShowcaseProvider = ({ children }) => {
  const firebase = initializeApp(config);
  const database = getFirestore(firebase);
  const router = useRouter();

  const [mirror, setMirror] = useState(0);
  const [locked, setLocked] = useState(false);
  const [scene, setScene] = useState(0);
  const [distance, setDistance] = useState(2);
  const [character, setCharacter] = useState(useRef());
  const [feedback, setFeedback] = useState(false);

  useEffect(() => {
    return onSnapshot(doc(database, "showcase", "configuration"), (doc) => {
      const { scene: _scene } = doc.data();
      setScene(_scene);
    });
  }, []);
  useEffect(() => {
    return onSnapshot(doc(database, "showcase", "device"), (doc) => {
      const { locked: _locked, distance: _distance } = doc.data();
      setLocked(_locked);
      setDistance(_distance);
    });
  }, []);
  useEffect(() => {
    return onSnapshot(doc(database, "showcase", "visibility"), (doc) => {
      const { left, right } = doc.data();
      setMirror(
        left && right
          ? router.query.orientation === "left"
            ? -1
            : router.query.orientation === "right"
            ? 1
            : 0
          : 0
      );
    });
  }, []);
  useEffect(() => {
    (async () => {
      await updateDoc(doc(database, "showcase", "configuration"), {
        scene,
      });
    })();
  }, [scene]);
  useEffect(() => {
    (async () => {
      await updateDoc(doc(database, "showcase", "device"), {
        locked,
        distance,
      });
    })();
  }, [locked, distance]);

  useEffect(() => {
    (async () => {
      await updateDoc(doc(database, "showcase", "feedback"), {
        locked: feedback,
      });
    })();
  }, [feedback]);

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

  return (
    <ShowcaseContext.Provider
      value={{
        mirror,
        setMirror,
        locked,
        setLocked,
        scene,
        setScene,
        distance,
        setDistance,
        character,
        setCharacter,
        feedback,
        setFeedback,
      }}
    >
      <div className="w-screen overflow-hidden">
        <div
          className="h-screen relative transition-all duration-500"
          style={{
            marginLeft: mirror > 0 ? "calc(-1 * var(--vw))" : "0",
            marginRight: mirror < 0 ? "calc(-1 * var(--vw))" : "0",
          }}
        >
          {children}
        </div>
      </div>
    </ShowcaseContext.Provider>
  );
};

export default ShowcaseProvider;
