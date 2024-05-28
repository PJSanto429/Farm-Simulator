// import { StatusType } from '../../../classes/Game'
import './index.css'

export const Status = (props: {
    status: FarmSim.StatusType[]
}) => {
    const {
        status
    } = props

    return (
        <div className="statusMain">
            <div className="statusHeader">
                Output
            </div>
            {status.length === 0 &&
                <>
                    A record of game events will be displayed here
                </>
            }
            {status.map((s) => {
                return (
                    <div className="oneStatus">
                        <div className={s.type}>
                            {s.message}
                            <br />
                            <span className="">
                                Day {s.createdAt.day} - {s.createdAt.time.hour}:{
                                    s.createdAt.time.minute <= 9 ? "0" + s.createdAt.time.minute.toString() : s.createdAt.time.minute
                                } {s.createdAt.time.timePeriod}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}