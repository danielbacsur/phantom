import { Background, Overlay, Visualization } from "components/showcase";
import ShowcaseProvider from "contexts/showcase";

const Showcase = () => {
  return (
    <ShowcaseProvider>
      <Overlay />
      <Visualization />
      <Background />
    </ShowcaseProvider>
  );
};

export default Showcase;
