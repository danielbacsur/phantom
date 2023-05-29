import { useShowcase } from "contexts/showcase"
import { useVisualization } from "contexts/visualization"
import { useEffect } from "react"

const Feedback = () => {
    const {locked, feedback} = useShowcase()
    const {character} = useVisualization()

    useEffect(() => {
        feedback({
            locked: Number(locked),
            distance: character.current?.position.x
        })
    }, [character.current?.position.x, locked])
}

export default Feedback