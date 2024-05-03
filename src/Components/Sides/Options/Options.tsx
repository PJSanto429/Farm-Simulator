import { GameType } from '../../../classes/Game'
import { BuyAnimals } from './BuyAnimals'
import { SellAnimals } from './SellAnimals'
import { ViewManyTrades } from './ViewManyTrades'

export const Options = (props: {
    game: GameType
    handleBuyAnimal: (
        animal: string,
        amount: number
    ) => void
}) => {
    const {
        game,
        handleBuyAnimal
    } = props
    
    return (
        <>
            {/* // TODO selling animals should sell for 75% of their buying price */}
            {/* <SellAnimals showSellAnimals setShowSellAnimals={() => {}} handleSellAnimals={() => {}} /> */}
            <BuyAnimals
                handleBuyAnimals={handleBuyAnimal}
            />
            <ViewManyTrades game={game} trades={game.trades} />
        </>
    )
}
