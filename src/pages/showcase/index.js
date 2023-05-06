import Link from "next/link";

const Showcase = () => {
  return (
    <div className="w-screen h-screen grid grid-cols-2">
      <Link
        className="grid place-items-center bg-black text-white"
        href="showcase/left"
      >
        Left
      </Link>
      <Link
        className="grid place-items-center bg-white text-black"
        href="showcase/right"
      >
        Right
      </Link>
    </div>
  );
};

export default Showcase;
