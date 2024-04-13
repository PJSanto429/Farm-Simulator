import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GameCreateType, GameType, getGameFromString } from "./classes/Game"

export const LoadGame = (props: {
    handleLoadGame: (game: GameType) => void
    onFail: () => void
}) => {
    const {
        handleLoadGame,
        onFail
    } = props

    const [failed, setFailed] = useState(false)
    const [loadedGame, setLoadedGame] = useState<GameType>()
    const navigate = useNavigate()

    useEffect(() => {
        const handleLoadGame = () => {
            try {
                const gottenGame: GameCreateType = JSON.parse(localStorage.getItem("game") || "")
        
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
                        <text>Farm Name: {loadedGame.farmName}</text><br />
                        <text>Player Name: {loadedGame.playerName}</text>
                    </div>

                    <button onClick={() => handleLoadGame(loadedGame)}>
                        Play
                    </button>
                </>
            }
        </>
    )

}
