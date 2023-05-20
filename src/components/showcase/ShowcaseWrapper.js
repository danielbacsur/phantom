import classNames from "classnames";
import { useShowcase } from "contexts/showcase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ShowcaseWrapper = ({ children }) => {
  const router = useRouter();
  const showcase = useShowcase();

  useEffect(() => {
    const visibilityEvent = async () => showcase.mirror(router.query.orientation, document.visibilityState)
    visibilityEvent();
    window.addEventListener("visibilitychange", visibilityEvent);
    return () => window.removeEventListener("visibilitychange", visibilityEvent);
  }, []);

  return (
    <div className="w-screen overflow-hidden bg-[#-ffbf40] bg-black text-white">
      <div
        className={classNames(
          "transition-all duration-500 relative h-screen overflow-hidden",
          { "-ml-[100vw]": showcase.visibility.left && showcase.visibility.right && router.query.orientation === "right" },
          { "-mr-[100vw]": showcase.visibility.left && showcase.visibility.right && router.query.orientation === "left" }
        )}
      > {children} </div>
    </div>
  );
};

export default ShowcaseWrapper;
