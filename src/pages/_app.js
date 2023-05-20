import { useEffect } from "react";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    const setter = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight}px`
      );
      document.documentElement.style.setProperty(
        "--vw",
        `${document.body.offsetWidth}px`
      );
    };
    setter();
    window.addEventListener("resize", setter);
    return () => window.removeEventListener("resize", setter);
  }, []);

  return <Component {...pageProps} />;
};

export default App;
