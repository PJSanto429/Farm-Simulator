import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getGameFromString, getGameToSave } from '../classes/Game'
import { GameOptions } from './GameOptions'
import { Header } from './Header'

export const MainGame = () => {
    const navigate = useNavigate()

    const [game, setGame] = useState<FarmSim.GameType>()

    useEffect(() => {
        try {
            const gottenGame: FarmSim.GameCreateType = JSON.parse(localStorage.getItem("game") || "")
    
            if (JSON.stringify(gottenGame) === "") {
                navigate("/home")
            }
            const gameToSet = getGameFromString(gottenGame)
            console.log(gameToSet)
            setGame(gameToSet)
        } catch (error) {
            navigate("/home")
        }
    }, [navigate])

    const handleSaveGame = useCallback((
        altGame: FarmSim.GameType | undefined = undefined
    ) => {
        let toSave

        if (!!altGame) {
            toSave = getGameToSave(altGame)
        } else if (game !== undefined) {
            toSave = getGameToSave(game)
        }
        localStorage.setItem("game", JSON.stringify(toSave))
    }, [game])

    const RenderHeader = useCallback(() => {
        if (game === undefined) {
            return <>loading...</>
        }
        const handleChangeDay = () => {
            let newGame = {
                ...game,
                day: game.day + .5
            }
            if (game.day % 1 === 0) {
                // newGame = generateDailyPurchases(
                //     generateDailyResources(
                //         newGame
                //     )
                // )
            }
            setGame(newGame)
            handleSaveGame(newGame)
        }
        return (
            <Header
                currentGame={game}
                handleChangeDay={handleChangeDay}
            />
        )
    }, [game, handleSaveGame])

    const handleGodButton = () => {
        if (game === undefined) {
            return
        }
    }

    if (game === undefined) {
        return <>loading...</>
    }

    return (
        <>
            <div className="main">
                <div className="header">
                    {game.farm.playerName}'s "{game.farm.farmName}" Farm
                </div>

                {/* //! god button */}
                {/* <button onClick={handleGodButton}>
                    God Button!
                </button> */}

                <RenderHeader />
                <GameOptions
                    game={game}
                    setGame={setGame}
                    handleSaveGame={handleSaveGame}
                />
            </div>
        </>
    )
}
