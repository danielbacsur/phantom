import Link from "next/link";

const Navbar = () => (
  <div className="w-full h-32 z-50 fixed top-0">
    <div className="h-full container mx-auto flex items-center justify-center md:justify-between p-8">
      <Link className="font-tostada text-2xl hidden md:block" href="/">
        phantom
      </Link>
      <div className="flex space-x-8">
        <Link className="text-sm" href="/">
          Home
        </Link>
        <Link className="text-sm" href="/about">
          About
        </Link>
        <Link className="text-sm" href="/project">
          Project
        </Link>
        <Link className="text-sm" href="/competition">
          Competition
        </Link>
      </div>
    </div>
  </div>
);

export default Navbar;
