import Link from "next/link";

const Navbar = () => (
  <div className="w-full h-32 shadow-[0px_22px_70px_4px_rgba(0,0,0,0.1)] z-50 bg-white fixed top-0">
    <div className="h-full container mx-auto flex items-center justify-between p-8">
      <Link className="font-tostada text-2xl" href="/">
        phantom
      </Link>
      <div className="flex space-x-8">
        <Link className="text-sm hidden md:block" href="/">
          Home
        </Link>
        <Link className="text-sm hidden md:block" href="/about">
          About
        </Link>
        <Link className="text-sm hidden md:block" href="/project">
          Project
        </Link>
        <Link className="text-sm hidden md:block" href="/competition">
          Competition
        </Link>
      </div>
    </div>
  </div>
);

export default Navbar;
