import { createContext, useContext, useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import classNames from "classnames";

const ShowcaseContext = createContext();
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

  const mirror = async (orientation, state) => {
    if (orientation == "right" || orientation == "left") {
      await updateDoc(doc(database, "showcase", "visibility"), {
        [orientation]: state === "visible" ? true : false,
      });
    }
  };



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



  return (
    <ShowcaseContext.Provider
      value={{
        appcontrol,
        distancing,
        gitcontrol,
        visibility,
        scene,
        mirror,
      }}
    >
      <div className="w-screen overflow-hidden">
      <div
        className={classNames(
          "h-screen relative transition-all duration-500 ",
          { "-ml-[100vw]": orientation === "right" },
          { "-mr-[100vw]": orientation === "left" }
        )}
      >
        {children}
      </div>
    </div>
    </ShowcaseContext.Provider>
  );
};

export default ShowcaseProvider;
