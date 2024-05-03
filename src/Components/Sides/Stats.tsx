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

    const seedsAmt = game.farm.resources.find((r) => r.name === "Seeds")?.amount || 0

    const onTradeSent = (e: CreateTradeType) => {
        const toAdd: TradeType = {
            fromFarm: game.farm.id,
            toFarm: e.otherFarmId,
            status: "pending",
            
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
        //TODO make sure the game trades are being saved when the game saves
        console.log("toAdd ==> ", toAdd)
        const newGame = {
            ...game,
            trades: [
                toAdd,
                ...game.trades
            ]
        }
        console.log('new game ==> ', newGame)
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
            {/* <div className="optionsHeader">
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
                </div>
            </div> */}
        </>
    )
}
