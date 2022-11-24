import Footer from "./Footer"
import Navigation from "./Navigation"

const Wrapper = ({children}) => (
    <div className="relative w-full min-h-screen bg-white text-black font-karla">
      <Navigation />

      <div className="py-32">
        {children}
      </div>

      <Footer />
    </div>
)

export default Wrapper