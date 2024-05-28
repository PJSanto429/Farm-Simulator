import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getGameFromString } from "./classes/Game"

export const LoadGame = (props: {
    handleLoadGame: (game: FarmSim.GameType) => void
    onFail: () => void
}) => {
    const {
        handleLoadGame,
        onFail
    } = props

    const [failed, setFailed] = useState(false)
    const [loadedGame, setLoadedGame] = useState<FarmSim.GameType>()
    const navigate = useNavigate()

    useEffect(() => {
        const handleLoadGame = () => {
            try {
                const gottenGame: FarmSim.GameCreateType = JSON.parse(localStorage.getItem("game") || "")
        
                if (JSON.stringify(gottenGame) === "") {
                    setFailed(false)
                    return
                }
                const gameToSet = getGameFromString(gottenGame)
                setLoadedGame(gameToSet)
            } catch (error) {
                navigate("/home")
            }
        }
        handleLoadGame()
    }, [navigate])

    return (
        <>
            {failed &&
                <>
                    Failed to find previous game save
                    <button onClick={onFail}>
                        Return Home
                    </button>
                </>
            }
            {!!loadedGame &&
                <>
                    Game found:
                    <div>
                        <span>Farm Name: {loadedGame.farm.farmName}</span>
                        <br /><br />
                        <span>Player Name: {loadedGame.farm.playerName}</span>
                    </div>

                    <button onClick={() => handleLoadGame(loadedGame)}>
                        Play
                    </button>
                </>
            }
        </>
    )

}
