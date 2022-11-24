import Link from "next/link"

const Navigation = () => (
    <div className="w-full h-32 fixed top-0 shadow-[0px_22px_70px_4px_rgba(0,0,0,0.2)] z-10 bg-white">
        <div className="h-full container mx-auto flex items-center justify-between p-8">
            <span className="font-tostada text-2xl">phantom</span>
            <div className="flex space-x-8">
                <Link className="text-sm line-through hidden md:block" href="/">Home</Link>
                <Link className="text-sm line-through" href="/about">About Us</Link>
                <Link className="text-sm line-through hidden md:block" href="/project">Our Project</Link>
                <Link className="text-sm line-through hidden md:block" href="/competiton">Competition</Link>
                <Link className="text-sm line-through hidden md:block" href="/sponsors">Sponsors</Link>
                <Link className="text-sm line-through" href="/contact">Contact</Link>
            </div>
        </div>
    </div>
)

export default Navigation