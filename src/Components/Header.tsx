import { useState } from 'react'
import { Time } from './Time'

export const Header = (props: {
    currentGame: FarmSim.GameType
    handleChangeDay: () => void

}) => {
    const {
        currentGame,
        handleChangeDay
    } = props
    
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(1)

    return (
        <div className="headerMain">
            Day {Math.floor(currentGame.day)}
            <Time
                handleChangeDay={handleChangeDay}
                day={currentGame.day}
                minutes={minutes}
                setMinutes={setMinutes}
                hours={hours}
                setHours={setHours}
            />
        </div>
    )
}
