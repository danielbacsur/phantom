import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, onSnapshot } from "firebase/firestore";

import classNames from "classnames";

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

  return (
    <div className="w-screen overflow-hidden bg-[#xffbf40]">
      <div
        className={classNames(
          "transition-all duration-500 relative h-screen overflow-hidden",
          { "-ml-[100vw]": orientation === "right" },
          { "-mr-[100vw]": orientation === "left" }
        )}
      >
        {/* TOP LEFT */}
        <div className="absolute top-24 left-24">
          <div className="space-y-8">
            <span className="font-display text-[64px] leading-[1]">
              A_PHANTOM_CSAPATA
            </span>

            <div className="-ml-12 text-[12px]">
              <b>Bacsur Dániel & Mikó Erik</b>
              <p>Közgazdasági Politechnikum</p>
              <b>—</b>
            </div>
          </div>
        </div>

        <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cover w-1/3" src="/nyan.jpg" />

        {/* BOTTOM LEFT */}
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

        <div className="absolute top-24 right-24">
          <div className="space-y-8">
            <span className="font-display text-[64px] leading-[1]">
              32. OTIO
            </span>

          </div>
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

export default Slide;
