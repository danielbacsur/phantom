import ShowcaseProvider from "contexts/showcase";
import {
  Debugger,
  Overlay,
  Visualization,
} from "components/showcase";

const Showcase = () => {
  return (
    <ShowcaseProvider>
      <Debugger />
      <Overlay />
      <Visualization />
    </ShowcaseProvider>
  );
};

export default Showcase;
