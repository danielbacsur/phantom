import ShowcaseProvider from "contexts/showcase";
import {
  Banner,
  Overlay,
  ShowcaseWrapper,
  Visualization,
} from "components/showcase";

const Showcase = () => (
  <ShowcaseProvider>
    <Banner />
    {/* <Overlay /> */}
    <Visualization />
  </ShowcaseProvider>
);

export default Showcase;
