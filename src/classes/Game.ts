import { AnimalType } from './Animals/Animal'
import { ResourceType } from './Resources/Resource'

export class GameHelper {
    getAnimalByName(
        nameToFind: String, animals: AnimalType[]
    ): AnimalType | null {
        for (var animal of animals) {
            if (animal.name === nameToFind) {
                return animal
            }
        }
        return null
    }
}

export const getGameToSave = (game: GameType): GameCreateType => {
    return {
        farmName: game.farmName,
        playerName: game.playerName,
        money: game.money,
        moveNumber: game.moveNumber,
        day: game.day,
        seedAmt: game.resources.find((r) => r.name === "Seed")?.amount || 0,
        wheatAmt: game.resources.find((r) => r.name === "Wheat")?.amount || 0,
        eggAmt: game.resources.find((r) => r.name === "Egg")?.amount || 0,
        milkAmt: game.resources.find((r) => r.name === "Milk")?.amount || 0,
        chickenAmt: game.animals.find((r) => r.name === "Chicken")?.amount || 0,
        cowAmt: game.animals.find((r) => r.name === "Cow")?.amount || 0
    }
}

export const getGameFromString = (
    gameString: GameCreateType
): GameType => {
    const toReturn: GameType = {
        farmName: gameString.farmName,
        playerName: gameString.playerName,
        resources: [
            {
                name: "Seed",
                weight: 0.1,
                amount: gameString.seedAmt
            },
            {
                name: "Egg",
                weight: .3,
                amount: gameString.eggAmt
            },
            {
                name: "Wheat",
                weight: .2,
                amount: gameString.wheatAmt
            },
            {
                name: "Milk",
                weight: .8,
                amount: gameString.milkAmt
            },
        ],
        animals: [
            {
                name: "Chicken",
                weight: 6,
                price: 5,
                lifespan: 5,
                requiredSpace: 5,
                food: "Seed",
                foodPerDay: 10,
                output: "Egg",
                outputPerDay: 1,
                amount: gameString.chickenAmt
            },
            {
                name: "Cow",
                weight: 1100,
                price: 500,
                lifespan: 15,
                requiredSpace: 30,
                food: "Wheat",
                foodPerDay: 25,
                output: "Milk",
                outputPerDay: 7,
                amount: gameString.cowAmt
            }
        ],
        money: gameString.money,
        moveNumber: gameString.moveNumber,
        day: gameString.day
    }

    return toReturn
}

export interface GameType {
    farmName: string
    playerName: string
    money: number

    moveNumber: number
    day: number

    //! resources
    resources: ResourceType[]

    //! animals
    animals: AnimalType[]
}

export interface GameCreateType {
    farmName: string
    playerName: string
    money: number

    moveNumber: number
    day: number
    
    seedAmt: number
    wheatAmt: number
    eggAmt: number
    milkAmt: number

    chickenAmt: number
    cowAmt: number
}
