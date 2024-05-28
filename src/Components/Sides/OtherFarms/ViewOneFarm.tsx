import { useState } from "react"
// import { CreateTradeType, OtherFarmType } from "../../../classes/Farm"
import { FarmTrade } from "./Trade"

export const ViewOneFarm = (props: {
    farm: FarmSim.OtherFarmType
    setFarmToView: () => void
    defaultTrade: boolean
    onTradeSent: (trade: FarmSim.CreateTradeType) => void
}) => {
    const {
        farm,
        setFarmToView,
        defaultTrade,
        onTradeSent
    } = props
    const [showTrade, setShowTrade] = useState(defaultTrade)

    return (
        <>
            <button onClick={setFarmToView}>Back</button>

            <span className='oneFarmName'>
                {farm.playerName}'s {farm.farmName}
            </span>
            <div className="oneFarmStats">
                <div>
                    <h3>Animals</h3>
                    Chickens: {farm.animals.find((a) => a.name === 'Chicken')?.amount}
                    <br />
                    Cows: {farm.animals.find((a) => a.name === 'Cow')?.amount}
                </div>
                <div>
                    <h3>Resources</h3>
                    Seeds: {farm.resources.find((a) => a.name === 'Seed')?.amount}
                    {farm.friendliness >= 0 &&
                        <div>
                            Money: ${farm.money}
                        </div>
                    }
                </div>
            </div>
            {showTrade &&
                <div className="farmTrade section WIP">
                    <FarmTrade farmId={farm.id} handleSubmit={onTradeSent} setShowTrade={setShowTrade} />
                </div>
            }
            <br />
            <div className="oneFarmButtons">
                {/* {farm.friendliness === 0 &&
                    <button>options</button>
                } */}
                {!showTrade &&
                    <button onClick={() => setShowTrade(true)} >Create trade request</button>
                }
            </div>
        </>
    )
}
