import { AnimalType, Chicken, Cow } from './Animals/Animal'
import { FarmType, OtherFarmType, TradeType } from './Farm'
import { Egg, Milk, Seed, Wheat } from './Resources/Resource'

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
        id: game.farm.id,
        farmName: game.farm.farmName,
        playerName: game.farm.playerName,
        money: game.farm.money,
        moveNumber: game.moveNumber,
        day: game.day,
        status: game.status,
        seedAmt: game.farm.resources.find((r) => r.name === "Seed")?.amount || 0,
        wheatAmt: game.farm.resources.find((r) => r.name === "Wheat")?.amount || 0,
        eggAmt: game.farm.resources.find((r) => r.name === "Egg")?.amount || 0,
        milkAmt: game.farm.resources.find((r) => r.name === "Milk")?.amount || 0,
        chickenAmt: game.farm.animals.find((r) => r.name === "Chicken")?.amount || 0,
        cowAmt: game.farm.animals.find((r) => r.name === "Cow")?.amount || 0,
        otherFarms: game.otherFarms,
        trades: game.trades
    }
}

export const getGameFromString = (
    gameString: GameCreateType
): GameType => {
    const toReturn: GameType = {
        farm: {
            id: gameString.id,
            farmName: gameString.farmName,
            playerName: gameString.playerName,
            resources: [
                {
                    ...Seed,
                    amount: gameString.seedAmt
                },
                {
                    ...Egg,
                    amount: gameString.eggAmt
                },
                {
                    ...Wheat,
                    amount: gameString.wheatAmt
                },
                {
                    ...Milk,
                    amount: gameString.milkAmt
                },
            ],
            animals: [
                {
                    ...Chicken,
                    amount: gameString.chickenAmt
                },
                {
                    ...Cow,
                    amount: gameString.cowAmt
                }
            ],
            money: gameString.money
        },
        trades: gameString.trades,
        moveNumber: gameString.moveNumber,
        day: gameString.day,
        status: [],
        otherFarms: gameString.otherFarms
    }

    return toReturn
}

export interface GameType {
    farm: FarmType

    status: StatusType[]
    otherFarms: OtherFarmType[]
    moveNumber: number
    day: number
    trades: TradeType[]
}

export interface GameCreateType {
    id: number
    farmName: string
    playerName: string
    money: number
    status: StatusType[]
    otherFarms: OtherFarmType[]
    trades: TradeType[]

    moveNumber: number
    day: number
    
    seedAmt: number
    wheatAmt: number
    eggAmt: number
    milkAmt: number

    chickenAmt: number
    cowAmt: number
}

type StatusTypeType = "warning" | "success" | "unknown" | "event"
type StatusTimePeriodType = "AM" | "PM"

export interface StatusTimeType {
    hour: number
    minute: number
    timePeriod: StatusTimePeriodType
}

export interface StatusType {
    message: string
    type: StatusTypeType
    createdAt: {
        day: number
        time: StatusTimeType
    }
}
