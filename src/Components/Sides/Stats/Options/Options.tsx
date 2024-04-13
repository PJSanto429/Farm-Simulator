import { useState } from 'react'
import { GameType } from '../../../../classes/Game'
import { BuyAnimals } from './BuyAnimals'

export const Options = (props: {
    game: GameType
    handleBuyAnimal: (animal: string, amount: number) => void
}) => {
    const {
        game,
        handleBuyAnimal
    } = props

    const [showBuyAnimals, setShowBuyAnimals] = useState(false)
    
    const handleBuyAnimalsController = (
        animalToBuy: string,
        amount: number
    ) => {
        handleBuyAnimal(animalToBuy, amount)
        setShowBuyAnimals(false)
    }

    return (
        <>
            {/* // TODO selling animals should sell for 75% of their buying price */}
            <></>
            <BuyAnimals
                showBuyAnimals={showBuyAnimals}
                setShowBuyAnimals={setShowBuyAnimals}
                handleBuyAnimals={handleBuyAnimalsController}
            />
        </>
    )
}
