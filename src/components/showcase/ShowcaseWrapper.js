import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, onSnapshot } from "firebase/firestore";
import classNames from "classnames";
import { useControls, button } from "leva";
import ShowcaseProvider from "contexts/showcase";
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

const ShowcaseWrapper = ({ children }) => {
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
  );
};

export default ShowcaseWrapper;
