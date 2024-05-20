import { useState } from 'react'
import { GameType } from '../../../classes/Game'
import { BuyAnimals } from './Purchases/BuyAnimals'
import { BuyResources } from './Purchases/BuyResources'
import { ViewManyTrades } from './ViewManyTrades'
import './options.css'
import { TabProp, Tabs } from '../../Tabs'
import { DailyPurchases } from './Purchases/Purchases/DailyPurchases'
import { DailyPurchase } from '../../../classes/Farm'
import { Helper } from './Purchases/Helpers'
import { TableTest } from '../../Tools/Table'

export const    Options = (props: {
    game: GameType
    setDailyPurchases: (p: DailyPurchase[]) => void
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
        setDailyPurchases,
        handleBuyAnimal,
        handleBuyResources
    } = props

    const [buying, setBuying] = useState<"none" | "animals" | "resources">("none")

    const tabs: TabProp[] = [
        {
            label: "Single Purchases",
            content:
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
        },
        {
            label: "Daily Purchases",
            content: (
                <DailyPurchases
                    currentDay={game.day}
                    dailyPurchases={game.dailyPurchases}
                    setDailyPurchases={setDailyPurchases}
                />
            )
        },
        {
            label: "Helpers",
            content: <Helper game={game} />
        }
    ]
    
    return (
        <>
            <TableTest />
            {/* <div className="optionsHeader">
                Purchase Options
            </div>
            <Tabs tabs={tabs} />

            <div className="manyTrades">
                <ViewManyTrades game={game} trades={game.trades} />
            </div> */}
            
            {/* // selling animals should sell for 75% of their buying price */}
            {/* <SellAnimals showSellAnimals setShowSellAnimals={() => {}} handleSellAnimals={() => {}} /> */}
        </>
    )
}
