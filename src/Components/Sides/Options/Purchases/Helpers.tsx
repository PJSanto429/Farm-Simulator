import { GameType } from "../../../../classes/Game"
import './index.css'

export const Helper = (props: {
    game: GameType
}) => {
    const {
        game
    } = props

    return (
        <>
            <span className="infoText">
                Price for each individual resource/animal
            </span>
            <div className="helperMain">
                <div className="helperSection">
                    <h4>Resources</h4>
                    <div className="helperItem">
                        {game.farm.resources.map((r) => (
                            <span className="oneHelperItem">
                                {r.name} - ${r.price}
                                <br />
                            </span>
                            // <table></table>
                        ))}
                    </div>
                </div>

                <div className="helperSection">
                    <h4>Animals</h4>
                    <div className="helperItem">
                        {game.farm.animals.map((a) => (
                            <span className="oneHelperItem">
                                {a.name} - ${a.price}
                                <br />
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
