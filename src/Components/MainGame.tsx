import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameCreateType, GameType, getGameFromString, getGameToSave } from '../classes/Game'
import { GameOptions } from './GameOptions'
import { Header } from './Header'

export const MainGame = () => {
    const navigate = useNavigate()

    const [game, setGame] = useState<GameType>()

    useEffect(() => {
        try {
            const gottenGame: GameCreateType = JSON.parse(localStorage.getItem("game") || "")
    
            if (JSON.stringify(gottenGame) === "") {
                navigate("/home")
            }
            const gameToSet = getGameFromString(gottenGame)
            setGame(gameToSet)
        } catch (error) {
            navigate("/home")
        }
    }, [navigate])

    const handleSaveGame = useCallback((
        altGame: GameType | undefined = undefined
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
            setGame({
                ...game,
                day: game.day + .5
            })
            handleSaveGame(game)
        }
        return (
            <Header
                currentGame={game}
                handleChangeDay={handleChangeDay}
            />
        )
    }, [game, handleSaveGame])

    if (game === undefined) {
        return <>loading...</>
    }

    return (
        <>
            <div className="main">
                <div className="header">
                    {game.farm.playerName}'s "{game.farm.farmName}" Farm
                </div>
                <RenderHeader />
                <GameOptions
                    game={game}
                    setGame={setGame}
                    handleSaveGame={handleSaveGame}
                /> <br />
            </div>
        </>
    )
}
