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
    
    const handleBuyAnimals = (
        animalToBuy: string,
        amount: number
    ) => {
        console.clear()
        console.log("animal ==> ", animalToBuy)
        console.log("amount ==> ", amount)
    }

    return (
        <>
            <BuyAnimals
                showBuyAnimals={showBuyAnimals}
                setShowBuyAnimals={setShowBuyAnimals}
                handleBuyAnimals={handleBuyAnimals}
            />
        </>
    )
}
