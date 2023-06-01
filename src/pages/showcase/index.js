import Link from "next/link";

const Showcase = () => {
  return (
    <div className="h-screen grid grid-cols-2 place-items-center">
      <Link
        className="bg-black text-white"
        href="showcase/left"
      >
        Left
      </Link>
      <Link
        className="bg-white text-black"
        href="showcase/right"
      >
        Right
      </Link>
    </div>
  );
};

export default Showcase;
