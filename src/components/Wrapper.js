import Link from "next/link"

const Wrapper = ({ children }) => (
  <div className="bg-white text-black font-karla">
    <div className="w-screen h-screen flex flex-col overflow-hidden">

      <div className="flex-none w-full h-32 shadow-[0px_22px_70px_4px_rgba(0,0,0,0.2)] z-10 bg-white">
        <div className="h-full container mx-auto flex items-center justify-between p-8">
          <Link className="font-tostada text-2xl" href="/">phantom</Link>
          <div className="flex space-x-8">
              <Link className="text-sm hidden md:block" href="/">Home</Link>
              <Link className="text-sm hidden md:block" href="/about">About</Link>
              <Link className="text-sm hidden md:block" href="/project">Project</Link>
              <Link className="text-sm hidden md:block" href="/competition">Competition</Link>
          </div>
        </div>
      </div>

      <div className="flex-auto w-full overflow-auto">
        {children}
      </div>

      <div className="flex-none w-screen h-32 shadow-[0px_22px_70px_4px_rgba(0,0,0,0.2)] z-10 bg-white">
        <div className="h-full container mx-auto flex items-center justify-between p-8">
          <span className="font-tostada text-2xl">phantom</span>
          <div className="flex space-x-8">
            <span className="text-sm">All rights reserved.</span>
          </div>
        </div>
      </div>


      {/* <div className="flex-auto bg-red-600 px-8 py-48 sm:py-64 lg:px-0 overflow-auto">
        {children}
      </div>
      <Footer /> */}
    </div>

  </div>
)

export default Wrapper