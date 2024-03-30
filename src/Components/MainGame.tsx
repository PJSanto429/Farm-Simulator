import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Game, getGameFromString } from '../classes/Game'
import "../index.css"
import { GameOptions } from './GameOptions'

export const MainGame = () => {
    const navigate = useNavigate()

    const [game, setGame] = useState<Game>()

    useEffect(() => {
        const gottenGame: Game = JSON.parse(localStorage.getItem("game") || "")

        if (JSON.stringify(gottenGame) === "") {
            navigate("/home")
        }
        const gameToSet = getGameFromString(gottenGame)
        setGame(gameToSet)
    }, [navigate])

    if (game === undefined) {
        return <>loading...</>
    }

    return (
        <>
            <div className="main">
                <div className="header">
                    {game.playerName}'s "{game.farmName}"
                </div>
                <GameOptions game={game} />
            </div>
        </>
    )
}
