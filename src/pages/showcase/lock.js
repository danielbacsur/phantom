import ShowcaseProvider, { useShowcase } from "contexts/showcase";
import { Leva } from "leva";

const Lock = () => {
  const { locked, set } = useShowcase();
  return (
    <button
      className="w-screen h-screen bg-blue-300 grid place-items-center"
      style={{ backgroundColor: locked ? "#FF6B6B" : "#F7FFF7" }}
      onClick={() => set({ locked: Number(!locked) })}
    >
      {locked ? "UNLOCK" : "LOCK"}
    </button>
  );
};

export default () => (
  <ShowcaseProvider>
    <Lock />
    <Leva hidden />
  </ShowcaseProvider>
);
