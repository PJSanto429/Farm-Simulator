import React from 'react'
import { Game } from '../../classes/Game'

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
                <div className="animalStats">
                    Chickens: {game.chickens.length}
                </div>

                <div className="resourceStats"></div>
            </div>
        </>
    )
}
