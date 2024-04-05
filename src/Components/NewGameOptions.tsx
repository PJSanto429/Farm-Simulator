import React, { useCallback, useState } from 'react'
import { Game } from '../classes/Game'

export const NewGameOptions = (props: {
    onNewGameCreated: (createdGame: Game) => void
}) => {
    const {
        onNewGameCreated
    } = props

    const [farmName, setFarmName] = useState("")
    const [playerName, setPlayerName] = useState("")

    const handleCreateNewGame = useCallback(() => {
        const nameToUse = playerName.charAt(0).toUpperCase() + playerName.slice(1)
        const game = new Game(farmName, nameToUse, 0, 0, 0, 1000, 0)
        onNewGameCreated(game)
    }, [farmName, playerName, onNewGameCreated])

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            handleCreateNewGame()
        }}>
            <div>
                <label htmlFor="farmName">Farm Name</label>
                <input
                    type="text"
                    name="farmName"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    placeholder="Enter Farm Name..."
                />
            </div>
            <div>
                <label htmlFor="playerName">Player Name</label>
                <input
                    type="text"
                    name="playerName"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Enter Player Name..."
                />
            </div>
            <div>
                <button type="submit" disabled={!playerName || ! farmName}>Create Game</button>
            </div>
        </form>    
    )
}
