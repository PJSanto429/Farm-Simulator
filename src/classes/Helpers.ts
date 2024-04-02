import * as readline from 'readline'
import { Game, getGameFromString } from './Game'

export const saveGame = async (game: Game) => {
    try {
        // 
    } catch (err) {
        return
    }
    return true
}

export const loadGame = async(): Promise<Game | undefined> => {
    try {
        const res = await fetch("../saveGame.json")
        if (!res.ok) {
            throw new Error("Failed to fetch data")
        }
        const data = await res.json()
        return getGameFromString(data)
    } catch (err) {
        return
    }
}
