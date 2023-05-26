import { Banner, Background, Visualization } from "components/showcase";
import ShowcaseProvider from "contexts/showcase";

const Showcase = () => (
  <ShowcaseProvider>
    {/* OVERLAY */}
    <Background>
      <Visualization />
    </Background>
  </ShowcaseProvider>
);

export default Showcase;
