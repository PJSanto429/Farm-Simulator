import React from 'react'
import { Game } from '../../../classes/Game'
import './index.css'

export const Stats = (props: {
    game: Game
}) => {
    const {
        game
    } = props
    
    //! on the left show animal stats, on the right show resource stats
    return (
        <>
            <div className="statsMain">
                <div className="animalStats option">
                    Chickens: {game.chickens.length}
                    <br />
                    Cows: 0
                </div>

                <div className="resourceStats option">
                    Money: ${game.money}
                    <br />
                    Seeds: {game.seeds.amount}
                </div>
            </div>
        </>
    )
}
