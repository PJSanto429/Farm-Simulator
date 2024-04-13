import { GameType } from '../../../classes/Game'
import './index.css'

export const Stats = (props: {
    game: GameType
}) => {
    const {
        game
    } = props
    
    const chickenAmt = game.animals.find((a) => a.name === "Chicken")?.amount || 0
    const cowAmt = game.animals.find((a) => a.name === "Cow")?.amount || 0

    const seedsAmt = game.resources.find((r) => r.name === "Seeds")?.amount || 0
    
    return (
        <>
            <div className="optionsHeader">
                Stats
            </div>
            <div className="statsMain">
                <div className="animalStats option">
                    Chickens: {chickenAmt}
                    <br />
                    Cows: {cowAmt}
                </div>

                <div className="resourceStats option">
                    Money: ${game.money}
                    <br />
                    Seeds: {seedsAmt}
                </div>
            </div>
        </>
    )
}
