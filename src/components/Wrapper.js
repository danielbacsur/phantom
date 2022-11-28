import { useRouter } from "next/router";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Wrapper = ({ children }) => {
  const router = useRouter();

  return (
    <div className="h-screen bg-white text-black font-karla">
      <Navbar />
      <div className="w-full min-h-[calc(100vh-8rem)] pt-32">{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default Wrapper;
