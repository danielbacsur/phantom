import { useShowcase } from "contexts/showcase";
import { useSpring } from "@react-spring/core";
import { animated } from "@react-spring/web";

const Background = ({ children }) => {
  const { background } = useShowcase();
  const spring = useSpring({ background });

  return (
    <animated.div
      className="absolute top-0 left-0 bottom-0 right-0 z-[-999]"
      style={{ backgroundColor: spring.background }}
    >
      {children}
    </animated.div>
  );
};

export default Background;
