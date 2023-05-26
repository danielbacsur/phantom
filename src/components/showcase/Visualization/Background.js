import { useShowcase } from "contexts/showcase";
import { animated, useSpring } from "@react-spring/web";

const Background = ({ children }) => {
  const showcase = useShowcase();
  const style = useSpring({ ...showcase?.scene?.canvas?.style });

  return (
    <animated.div
      className="absolute top-0 left-0 bottom-0 right-0"
      style={style}
    >
      {children}
    </animated.div>
  );
};

export default Background;
