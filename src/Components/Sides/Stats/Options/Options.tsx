import React, { useCallback, useState } from 'react'
import { Game } from '../../../../classes/Game'
import { BuyAnimals } from './BuyAnimals'

export const Options = (props: {
    game: Game
}) => {
    const {
        game
    } = props

    const [showBuyAnimals, setShowBuyAnimals] = useState(true)

    return (
        <>
            <BuyAnimals
                showBuyAnimals={showBuyAnimals}
                setShowBuyAnimals={setShowBuyAnimals}
            />
        </>
    )
}
