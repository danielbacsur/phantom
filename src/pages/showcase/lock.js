import ShowcaseProvider, { useShowcase } from "contexts/showcase";

const Lock = () => {
  const { locked, setLocked } = useShowcase();
  return (
    <button
      className="w-screen h-screen bg-blue-300 grid place-items-center"
      style={{ backgroundColor: locked ? "#FF6B6B" : "#F7FFF7" }}
      onClick={() => setLocked(!locked)}
    >
      {locked ? "UNLOCK" : "LOCK"}
    </button>
  );
};

export default (
  <ShowcaseProvider>
    <Lock />
  </ShowcaseProvider>
);
