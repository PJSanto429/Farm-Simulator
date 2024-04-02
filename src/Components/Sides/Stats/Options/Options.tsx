import React, { useCallback, useState } from 'react'
import { Game } from '../../../../classes/Game'
import { BuyAnimals } from './BuyAnimals'

export const Options = (props: {
    game: Game
    handleBuyAnimal: (animal: string, amount: number) => void
}) => {
    const {
        game,
        handleBuyAnimal
    } = props

    const [showBuyAnimals, setShowBuyAnimals] = useState(true)
    
    const handleBuyAnimalsController = (
        animalToBuy: string,
        amount: number
    ) => {
        handleBuyAnimal(animalToBuy, amount)
        setShowBuyAnimals(false)
    }

    return (
        <>
            <BuyAnimals
                showBuyAnimals={showBuyAnimals}
                setShowBuyAnimals={setShowBuyAnimals}
                handleBuyAnimals={handleBuyAnimalsController}
            />
        </>
    )
}
