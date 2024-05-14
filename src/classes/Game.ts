import { el } from '@faker-js/faker'
import { AnimalType, Chicken, Cow } from './Animals/Animal'
import { DailyPurchase, FarmType, OtherFarmType, TradeType } from './Farm'
import { Egg, Milk, ResourceType, Seed, Wheat } from './Resources/Resource'

export class GameHelper {
    getAnimalByName(
        nameToFind: String,
        animals: AnimalType[]
    ): AnimalType | null {
        for (var animal of animals) {
            if (animal.name === nameToFind) {
                return animal
            }
        }
        return null
    }

    getResourceByName(
        nameToFind: string,
        resources: ResourceType[]
    ): ResourceType | null {
        for (var resource of resources) {
            if (resource.name === nameToFind) {
                return resource
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
        trades: game.trades,
        dailyPurchases: game.dailyPurchases
    }
}

export const generateDailyResources = (
    game: GameType
): GameType => {
    let newGame = game

    for (const animal of game.farm.animals) {
        const food = animal.food
        const foodAmount = animal.foodPerDay

        const output = animal.output
        const outputAmount = animal.outputPerDay
        const animalAmount = animal.amount
        for (let i = 0; i < animalAmount; i++) {
            if (animalAmount <= 0) {
                // console.log("no more animals")
                break
            }
            const enoughFood = (newGame.farm.resources.find((r) => r.name === food)?.amount || 0) >= foodAmount
            // console.log("enough food ==> ", enoughFood)
            newGame = {
                ...newGame,
                farm: {
                    ...newGame.farm,
                    resources: newGame.farm.resources.map((resource) => {
                        if (resource.name === food && enoughFood) {
                            return {
                                ...resource,
                                amount: resource.amount - foodAmount
                            }
                        }
                        if (resource.name === output  && enoughFood) {
                            return {
                                ...resource,
                                amount: resource.amount + outputAmount
                            }
                        }
                        return resource
                    }),
                    animals: newGame.farm.animals.map((a) => {
                        if (a.name !== animal.name) {
                            return a
                        }
                        if (!enoughFood) {
                            return {
                                ...a,
                                amount: a.amount - 1
                            }
                        }
                        return a
                    })
                }
            }
        }
    }

    return newGame
}

export const generateDailyPurchases = (
    game: GameType
): GameType => {
    let newGame = game

    for (const purchase of game.dailyPurchases.sort((a, b) => a.id - b.id)) {
        if (!purchase.disabledAt) {
            //? in stuff
            if (purchase.in.type === "money") {
                newGame = {
                    ...newGame,
                    farm: {
                        ...newGame.farm,
                        money: newGame.farm.money + purchase.in.amount
                    }
                }
            } else {
                newGame = {
                    ...newGame,
                    farm: {
                        ...newGame.farm,
                        animals: newGame.farm.animals.map((a) => {
                            if (a.name === purchase.in.specificType) {
                                return {
                                    ...a,
                                    amount: a.amount + purchase.in.amount
                                }
                            }
                            return a
                        }),
                        resources: newGame.farm.resources.map((r) => {
                            if (r.name === purchase.in.specificType) {
                                return {
                                    ...r,
                                    amount: r.amount + purchase.in.amount
                                }
                            }
                            return r
                        })
                    }
                }
            }

            //? out stuff
        }
    }

    return newGame
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
        otherFarms: gameString.otherFarms,
        dailyPurchases: gameString.dailyPurchases
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
    dailyPurchases: DailyPurchase[]
}

export interface GameCreateType {
    id: number
    farmName: string
    playerName: string
    money: number
    status: StatusType[]
    otherFarms: OtherFarmType[]
    trades: TradeType[]
    dailyPurchases: DailyPurchase[]

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
