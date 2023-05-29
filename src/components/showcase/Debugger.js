import { useShowcase } from "contexts/showcase"
import { Leva } from "leva"

const Debugger = () => {
    const {mirror} = useShowcase()
    return <Leva hidden={mirror < 0} titleBar={false} hideCopyButton />
}

export default Debugger