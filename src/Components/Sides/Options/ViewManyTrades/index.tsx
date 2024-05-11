import { useCallback, useState } from "react"
import { FarmType, TradeType, specificTradeType, tradeType } from "../../../../classes/Farm"
import { GameType } from "../../../../classes/Game"
import './index.css'

export const ViewManyTrades = (props: {
    game: GameType
    trades: TradeType[]
}) => {
    const {
        game,
        trades
    } = props

    const [showKey, setShowKey] = useState(true)

    const DisplayItemTrade = (props: {
        data: {
            type: tradeType
            specificType: specificTradeType
            amount: number
        }
    }) => {
        const {
            type,
            specificType,
            amount
        } = props.data
        return (
            <div>
                {type === "money" &&
                    <>${amount}</>
                }
                {type !== "money" &&
                    <>{amount} {specificType}</>
                }
            </div>
        )
    }

    const OneTrade = (props: {
        trade: TradeType
    }) => {
        const { trade } = props

        // to and from farms
        const toFarm: FarmType = game.otherFarms.find((farm) => farm.id === trade.toFarm) || game.farm
        const fromFarm: FarmType = game.otherFarms.find((farm) => farm.id === trade.fromFarm) || game.farm
        // const toMe: boolean = toFarm.id === game.farm.id

        return (
            <div className="subSection singleTrade">
                <div className="tradeDay">
                    Day: {Math.floor(trade.dayCreated)} <br />
                    <span className={trade.status}>{trade.status}</span>
                </div>
                <div className="oneTrade">
                    <span className="tradeName">
                        {toFarm.playerName}
                        <br />"{toFarm.farmName}"
                        <DisplayItemTrade data={trade.out} />
                    </span>
                    &harr;
                    <span className="tradeName">
                        {fromFarm.playerName}'s
                        <br />"{fromFarm.farmName}"
                        <DisplayItemTrade data={trade.in} />
                    </span>
                </div>
            </div>
        )
    }

    const Helper = useCallback(() => {

        return (
            <>
                <br />
                {showKey &&
                    <span className="infoText">
                        Showing what each farm received from a trade.<br />
                    </span>
                }
                <span className="infoText actionText" onClick={() => setShowKey(!showKey)}>
                    {showKey && <>Hide Help</> }
                    {!showKey && <>Show Help</> }
                </span>
            </>
        )
    }, [showKey])

    return (
        <div className="section">
            <>
                Trades
                {!trades.length &&
                    <>
                        <br />
                        <span className="infoText">
                            No trades yet...
                        </span>
                    </>
                }
                {!!trades.length &&
                    <Helper />
                }
                <div className="manyTrades">
                    {trades.map((trade, index) => (
                        <OneTrade key={index} trade={trade} />
                    ))}
                </div>
            </>
        </div>
    )
}
