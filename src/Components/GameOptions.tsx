import React from 'react'
import { Game } from '../classes/Game'
import "../index.css"
import { Stats } from './Sides/Stats'

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
                    right
                </div>
            </div>
        </>
    )
}
