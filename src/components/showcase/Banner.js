import { useShowcase } from "contexts/showcase";

const Banner = () => {
  const showcase = useShowcase()
  console.log(showcase.spring)
  return <div className="absolute top-0 left-0 right-0 z-[999] text-center">
    {JSON.stringify(showcase, null, 4)}
  </div>
};

export default Banner;
