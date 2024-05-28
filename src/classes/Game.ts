
export const FarmPersonalities: FarmSim.FarmPersonality[] = ["friendly", "hostile", "stupid", "liar", "thief"]

export class GameHelper {
    getAnimalByName(
        nameToFind: String,
        animals: FarmSim.AnimalType[]
    ): FarmSim.AnimalType | null {
        for (var animal of animals) {
            if (animal.name === nameToFind) {
                return animal
            }
        }
        return null
    }

    getResourceByName(
        nameToFind: string,
        resources: FarmSim.ResourceType[]
    ): FarmSim.ResourceType | null {
        for (var resource of resources) {
            if (resource.name === nameToFind) {
                return resource
            }
        }
        return null
    }
}

export const getGameToSave = (game: FarmSim.GameType): FarmSim.GameCreateType => {
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
    game: FarmSim.GameType
): FarmSim.GameType => {
    let newGame = game

    for (const animal of game.farm.animals) {
        const food = animal.food
        const foodAmount = animal.foodPerDay

        const output = animal.output
        const outputAmount = animal.outputPerDay
        const animalAmount = animal.amount
        for (let i = 0; i < animalAmount; i++) {
            if (animalAmount <= 0) {
                break
            }
            const enoughFood = (
                newGame.farm.resources.find((r) => r.name === food)?.amount || 0
            ) >= foodAmount

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
                    // animals: newGame.farm.animals.map((a) => {
                    //     if (a.name !== animal.name) {
                    //         return a
                    //     }
                    //     if (!enoughFood) {
                    //         return {
                    //             ...a,
                    //             amount: a.amount - 1
                    //         }
                    //     }
                    //     return a
                    // })
                }
            }
        }
    }

    return newGame
}

export const generateDailyPurchases = (
    game: FarmSim.GameType
): FarmSim.GameType => {
    let newGame = game

    const toDisableIds: number[] = []

    for (const purchase of game.dailyPurchases.sort((a, b) => a.id - b.id)) {
        const rightDay = ((game.day - 1) % purchase.frequency) === 0.5

        if (!purchase.disabledAt && rightDay) {
            console.log(purchase)
            let doInStuff = true

            //? out stuff
            if (purchase.out.type === "money") {
                if (newGame.farm.money >= purchase.out.amount) {
                    newGame = {
                        ...newGame,
                        farm: {
                            ...newGame.farm,
                            money: ((newGame.farm.money * 100) - (purchase.out.amount * 100)) / 100
                        }
                    }
                } else {
                    doInStuff = false
                }
            } else {
                console.log("out type ==> ", purchase.out)
                if (purchase.out.type === "resource") {
                    const resource = newGame.farm.resources.find(
                        (r) => r.name === purchase.out.specificType
                    ) || { amount: 0 }

                    if (resource?.amount >= purchase.out.amount) {
                        console.log("amount is enough!")
                        newGame = {
                            ...newGame,
                            farm: {
                                ...newGame.farm,
                                resources: newGame.farm.resources.map((r) => {
                                    if (r.name === purchase.out.specificType) {
                                        return {
                                            ...r,
                                            amount: r.amount - purchase.out.amount
                                        }
                                    }
                                    return r
                                })
                            }
                        }
                    } else {
                        doInStuff = false
                    }
                }

                // if (purchase.out.type === "animal") {
                //     const animal = newGame.farm.animals.find(
                //         (a) => a.name === purchase.out.specificType
                //     ) || { amount: 0 }

                //     if (animal.amount >= purchase.out.amount) {
                //         newGame = {
                //             ...newGame,
                //             farm: {
                //                 ...newGame.farm,
                //                 animals: newGame.farm.animals.map((a) => {
                //                     if (a.name === purchase.out.specificType) {
                //                         return {
                //                             ...a,
                //                             amount: a.amount - purchase.out.amount
                //                         }
                //                     }
                //                     return a
                //                 })
                //             }
                //         }   
                //     }
                //     else {
                //         doInStuff = false
                //     }
                // }
            }

            if (!doInStuff) {
                console.log("cannot do instuff :(")
                toDisableIds.push(purchase.id)
                break
            }

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
                        // animals: newGame.farm.animals.map((a: AnimalType) => {
                        //     if (a.name === purchase.in.specificType) {
                        //         return {
                        //             ...a,
                        //             amount: a.amount + purchase.in.amount
                        //         }
                        //     }
                        //     return a
                        // }),
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
        }
    }
    console.log("to diasable ==> ", toDisableIds)
    newGame = {
        ...newGame,
        dailyPurchases: newGame.dailyPurchases.map((p) => {
            if (toDisableIds.includes(p.id)) {
                return {
                    ...p,
                    disabledAt: newGame.day
                }
            }

            return p
        })
    }

    return newGame
}

export const getGameFromString = (
    gameString: FarmSim.GameCreateType
): FarmSim.GameType => {
    const toReturn: FarmSim.GameType = {
        farm: {
            id: gameString.id,
            farmName: gameString.farmName,
            playerName: gameString.playerName,
            resources: [
            //     {
            //         ...FarmSim.Seed,
            //         amount: gameString.seedAmt
            //     },
            //     {
            //         ...FarmSim.Egg,
            //         amount: gameString.eggAmt
            //     },
            //     {
            //         ...FarmSim.Wheat,
            //         amount: gameString.wheatAmt
            //     },
            //     {
            //         ...FarmSim.Milk,
            //         amount: gameString.milkAmt
            //     },
            ],
            animals: [
                // {
                //     ...FarmSim.Chicken,
                //     amount: gameString.chickenAmt
                // },
                // {
                //     ...FarmSim.Cow,
                //     amount: gameString.cowAmt
                // }
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

// export interface GameType {
//     farm: FarmType

//     status: StatusType[]
//     otherFarms: OtherFarmType[]
//     moveNumber: number
//     day: number
//     trades: TradeType[]
//     dailyPurchases: DailyPurchase[]
// }

// export interface GameTypeNew {
//     farm: FarmType

//     otherFarms: OtherFarmType[]
//     moveNumber: number
//     day: number
//     trades: TradeType[]

//     animals: {}
// }

// export interface GameCreateType {
//     id: number
//     farmName: string
//     playerName: string
//     money: number
//     status: StatusType[]
//     otherFarms: OtherFarmType[]
//     trades: TradeType[]
//     dailyPurchases: DailyPurchase[]

//     moveNumber: number
//     day: number
    
//     seedAmt: number
//     wheatAmt: number
//     eggAmt: number
//     milkAmt: number

//     chickenAmt: number
//     cowAmt: number
// }

// type StatusTypeType = "warning" | "success" | "unknown" | "event"
// type StatusTimePeriodType = "AM" | "PM"

// export interface StatusTimeType {
//     hour: number
//     minute: number
//     timePeriod: StatusTimePeriodType
// }

// export interface StatusType {
//     message: string
//     type: StatusTypeType
//     createdAt: {
//         day: number
//         time: StatusTimeType
//     }
// }
