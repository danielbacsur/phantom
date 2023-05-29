import ShowcaseProvider from "contexts/showcase";
import { Debugger, Feedback, Overlay, Visualization } from "components/showcase";
import VisualizationProvider from "contexts/visualization";

const Showcase = () => {
  return (
    <ShowcaseProvider>
      <Debugger />
      <VisualizationProvider>
        <Overlay />
        <Visualization />
      </VisualizationProvider>
    </ShowcaseProvider>
  );
};

export default Showcase;
