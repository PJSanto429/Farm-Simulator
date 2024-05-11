import { useState } from 'react'
import { GameType } from '../../../classes/Game'
import { BuyAnimals } from './BuyAnimals'
import { BuyResources } from './BuyResources'
import { SellAnimals } from './SellAnimals'
import { ViewManyTrades } from './ViewManyTrades'
import './options.css'

export const Options = (props: {
    game: GameType
    handleBuyAnimal: (
        animal: string,
        amount: number
    ) => void
    handleBuyResources: (
        resource: string,
        amount: number
    ) => void
}) => {
    const {
        game,
        handleBuyAnimal,
        handleBuyResources
    } = props

    const [buying, setBuying] = useState<"none" | "animals" | "resources">("none")
    
    return (
        <>
            {/* // TODO selling animals should sell for 75% of their buying price */}
            {/* <SellAnimals showSellAnimals setShowSellAnimals={() => {}} handleSellAnimals={() => {}} /> */}
            <div className="playerOptions">
                <BuyAnimals
                    showing={buying}
                    setShowing={(e) => setBuying(e)}
                    handleBuyAnimals={handleBuyAnimal}
                />
                <BuyResources
                    showing={buying}
                    setShowing={(e) => setBuying(e)}
                    handleBuyResources={handleBuyResources}
                />
            </div>

            <ViewManyTrades game={game} trades={game.trades} />
        </>
    )
}
