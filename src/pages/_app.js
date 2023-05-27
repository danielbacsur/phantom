import { useEffect } from "react";
import "styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const resize = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight}px`
      );
      document.documentElement.style.setProperty(
        "--vw",
        `${document.body.offsetWidth}px`
      );
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <Component {...pageProps} />;
};

export default MyApp;
