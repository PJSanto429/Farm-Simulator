import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Game, getGameFromString } from '../classes/Game'
import "../index.css"
import { GameOptions } from './GameOptions'

export const MainGame = () => {
    const navigate = useNavigate()

    const [game, setGame] = useState<Game>()

    useEffect(() => {
        try {
            const gottenGame: Game = JSON.parse(localStorage.getItem("game") || "")
    
            if (JSON.stringify(gottenGame) === "") {
                navigate("/home")
            }
            const gameToSet = getGameFromString(gottenGame)
            setGame(gameToSet)
        } catch (error) {
            navigate("/home")
        }
    }, [navigate])

    useEffect(() => {
        console.log(game)
    }, [game])

    if (game === undefined) {
        return <>loading...</>
    }

    return (
        <>
            <div className="main">
                <div className="header">
                    {game.playerName}'s "{game.farmName}"
                </div>
                <GameOptions game={game} setGame={(gameToBe) => setGame(gameToBe)} /> <br />
            </div>
        </>
    )
}
