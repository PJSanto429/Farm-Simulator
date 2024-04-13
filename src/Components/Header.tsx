import { GameType } from '../classes/Game'
import { Time } from './Time'

export const Header = (props: {
    currentGame: GameType
    handleChangeDay: () => void
}) => {
    const {
        currentGame,
        handleChangeDay
    } = props

    return (
        <div className="headerMain">
            Day {Math.floor(currentGame.day)}
            <Time handleChangeDay={handleChangeDay} day={currentGame.day} />
        </div>
    )
}
