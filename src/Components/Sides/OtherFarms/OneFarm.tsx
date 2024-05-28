// import { OtherFarmType } from "../../../classes/Farm"

export const OneFarm = (props: {
    farm: FarmSim.OtherFarmType
    onSetFarmToView: (openTrade: boolean) => void
}) => {
    const {
        farm,
        onSetFarmToView
    } = props
    
    const FriendStatus = () => {
        const friendLevel = farm.friendliness

        if (friendLevel >= 45) {
            return <>Very Good Friend</>
        }
        if (friendLevel >= 35 && friendLevel < 45) {
            return <>Good Friend</>
        }
        if (friendLevel >= 15 && friendLevel < 35) {
            return <>Casual Friend</>
        }
        if (friendLevel > 0 && friendLevel < 15) {
            return <>Acquaintance</>
        }
        if (friendLevel <= 0 && friendLevel > -15) {
            return <>Stranger</>
        }
        if (friendLevel <= -15 && friendLevel > -35) {
            return <>Rival</>
        }
        if (friendLevel <= -35 && friendLevel > -45) {
            return <>Enemy</>
        }
        if (friendLevel > 45) {
            return <>Mortal Enemy</>
        }
        return <></>
    }

    return (
        <div className="oneFarm section">
            {farm.playerName}'s {farm.farmName} <br /> <br />
            Status: <FriendStatus />
            <br /><br />
            <div>
                <button className="secondary" onClick={() => onSetFarmToView(true)}>Trade</button>
                <button onClick={() => onSetFarmToView(false)}>View</button>
            </div>
        </div>
    )
}
