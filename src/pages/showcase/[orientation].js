import ShowcaseProvider from "contexts/showcase";
import {
  Debugger,
  Feedback,
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
