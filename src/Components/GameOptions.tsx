import React from 'react'
import { Game } from '../classes/Game'
import { Stats } from './Sides/Stats/Stats'
import { Options } from './Sides/Stats/Options/Options'
import "../index.css"

export const GameOptions = (props: {
    game: Game
}) => {
    const {
        game
    } = props

    return (
        <>
            <div className='options'>
                <div className='leftOptions option'>
                    <Stats game={game} />
                </div>
                <div className='rightOptions option'>
                    <Options game={game} />
                </div>
            </div>
        </>
    )
}
