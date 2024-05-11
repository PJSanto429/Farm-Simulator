import { CreateTradeType, TradeType, specificTradeType, tradeType } from '../../classes/Farm'
import { GameType } from '../../classes/Game'
import { TabProp, Tabs } from '../Tabs'
import { ManyFarms } from './OtherFarms/ManyFarms'
import './index.css'

export const Stats = (props: {
    game: GameType
    setGame: (game: GameType) => void
    handleSaveGame: (altGame: GameType | undefined) => void
}) => {
    const {
        game,
        setGame,
        handleSaveGame
    } = props
    
    const chickenAmt = game.farm.animals.find((a) => a.name === "Chicken")?.amount || 0
    const cowAmt = game.farm.animals.find((a) => a.name === "Cow")?.amount || 0

    const seedsAmt = game.farm.resources.find((r) => r.name === "Seed")?.amount || 0
    const wheatAmt = game.farm.resources.find((r) => r.name === "Wheat")?.amount || 0
    const eggAmt = game.farm.resources.find((r) => r.name === "Egg")?.amount || 0
    const milkAmt = game.farm.resources.find((r) => r.name === "Milk")?.amount || 0

    const onTradeSent = (e: CreateTradeType) => {
        let newTradeId = 1
        for (const trade of game.trades) {
            if (trade.id >= newTradeId) {
                newTradeId = trade.id + 1
            }
        }

        const toAdd: TradeType = {
            fromFarm: game.farm.id,
            toFarm: e.otherFarmId,
            status: "pending",
            dayCreated: game.day,
            id: newTradeId,
            
            in: {
                type: e.typeIn as tradeType,
                specificType: e.specificTypeIn as specificTradeType,
                amount: e.amountIn
            },
            out: {
                type: e.typeOut as tradeType,
                specificType: e.specificTypeOut as specificTradeType,
                amount: e.amountOut
            }
        }
        const newGame = {
            ...game,
            trades: [
                toAdd,
                ...game.trades
            ]
        }
        setGame(newGame)
        handleSaveGame(newGame)
    }

    const tabs: TabProp[] = [
        {
            label: "Stats",
            content:
            <>
                <div className="optionsHeader">
                    Stats
                </div>
                <div className="statsMain">
                    <div className="animalStats option">
                        Chickens: {chickenAmt}
                        <br />
                        Cows: {cowAmt}
                    </div>

                    <div className="resourceStats option">
                        Money: ${game.farm.money}
                        <br />
                        Seeds: {seedsAmt}
                        <br />
                        Wheat: {wheatAmt}
                        <br />
                        Eggs: {eggAmt}
                        <br />
                        Milk: {milkAmt}
                    </div>
                </div>
            </>
        },
        {
            label: "Other Farms",
            content: <ManyFarms farms={game.otherFarms} onTradeSent={onTradeSent} />
        }
    ]
    
    return (
        <>
            <Tabs tabs={tabs} />
        </>
    )
}
