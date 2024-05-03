import { useCallback, useState } from 'react'
import { GameType, getGameFromString } from '../classes/Game'
import { FarmPersonalities, OtherFarmType } from '../classes/Farm'
import { faker } from '@faker-js/faker'
import { Chicken, Cow } from '../classes/Animals/Animal'
import { Egg, Milk, Seed, Wheat } from '../classes/Resources/Resource'

export const NewGameOptions = (props: {
    onNewGameCreated: (createdGame: GameType) => void
}) => {
    const {
        onNewGameCreated
    } = props

    const [farmName, setFarmName] = useState("")
    const [playerName, setPlayerName] = useState("")

    const handleGetOtherFarms = (): OtherFarmType[] => {
        const otherFarms: OtherFarmType[] = []
        const randomNum = Math.random() * 3 + 5
        for (let i = 0; i < randomNum; i++) {
            otherFarms.push({
                id: i + 1,
                farmName: faker.word.adjective() + " Farm",
                playerName: faker.person.fullName(),
                money: faker.number.int({
                    min: 10000,
                    max: 25000
                }),
                resources: [
                    {
                        ...Seed,
                        amount: faker.number.int({ min: 1000, max: 10000 })
                    },
                    {
                        ...Egg,
                        amount: faker.number.int({ min: 1000, max: 10000 })
                    },
                    {
                        ...Wheat,
                        amount: faker.number.int({ min: 1000, max: 10000 })
                    },
                    {
                        ...Milk,
                        amount: faker.number.int({ min: 1000, max: 10000 })
                    }
                ],
                animals: [
                    {
                        ...Chicken,
                        amount: faker.number.int({ min: 100, max: 500 })
                    },
                    {
                        ...Cow,
                        amount: faker.number.int({ min: 20, max: 50 })
                    }
                ],
                friendliness: 0,
                personality: faker.helpers.arrayElement(FarmPersonalities)
            })
        }

        return otherFarms
    }

    const handleCreateNewGame = useCallback(() => {
        const nameToUse = playerName.charAt(0).toUpperCase() + playerName.slice(1)

        const game = getGameFromString({
            id: 0,
            farmName: farmName,
            playerName: nameToUse,
            money: 1000,
            moveNumber: 0,
            day: 1,
            seedAmt: 0,
            wheatAmt: 0,
            eggAmt: 0,
            milkAmt: 0,
            chickenAmt: 0,
            cowAmt: 0,
            status: [],
            otherFarms: handleGetOtherFarms(),
            trades: []
        })

        onNewGameCreated(game)
    }, [farmName, playerName, onNewGameCreated])

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            handleCreateNewGame()
        }}>
            <div>
                <label htmlFor="farmName">Farm Adjective</label>
                <input
                    type="text"
                    name="farmName"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    placeholder="Enter Farm Adjective..."
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
