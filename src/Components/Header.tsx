import React from 'react'
import { Game } from '../classes/Game'

export const Header = (props: {
    currentGame?: Game
}) => {
    const {
        currentGame
    } = props

    return (
        <div className="headerMain">
            {/* <div>{currentGame?.farmName || "No Farm Yet"}</div> */}
            <div>{!!currentGame?.farmName ? "" : ""}</div>
            <div>{currentGame?.playerName || "No Player"}</div>
        </div>
    )
}
