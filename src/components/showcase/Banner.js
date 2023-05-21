import { useShowcase } from "contexts/showcase";

const Banner = () => {
  return <div className="absolute top-0 left-0 right-0 z-[999] text-center bg-red-500">
    {JSON.stringify(useShowcase(), null, 4)}
  </div>
};

export default Banner;
