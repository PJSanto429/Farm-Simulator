import { faker } from "@faker-js/faker"
import { useEffect, useState } from "react"
import { AnimalMoods } from "../classes/Animals/Animal"


export const Testing = () => {

    const fakeCow: FarmSim.AnimalTypeNew = {
        weight: 6,
        price: 5,
        lifespan: 5,
        requiredSpace: 5,
        food: "Seed",
        foodPerDay: 10,
        output: "Egg",
        outputPerDay: 1
    }

    const fakeChicken: FarmSim.AnimalTypeNew = {
        weight: 1100,
        price: 500,
        lifespan: 15,
        requiredSpace: 30,
        food: "Wheat",
        foodPerDay: 25,
        output: "Milk",
        outputPerDay: 7
    }

    const testFarm: FarmSim.FarmTypeNew = {
        id: 0,
        farmName: "cool farm",
        playerName: "peyton",
        money: 1000,

        resources: {
            "wheat": 0,
            "eggs": 0,
            "milk": 0,
            "seeds": 0,
        },

        animals: {
            "chicken": [],
            "cow": []
        }
    }

    const [testGame, setTestGame] = useState<FarmSim.GameTypeNew>({
        farm: testFarm,
        otherFarms: [],
        day: 0,
        trades: [],
        resourcesData: {
            "seed": {
                weight: 0.1,
                price: .01
            },
            "egg": {
                weight: .3,
                price: .5,
            },
            "wheat": {
                weight: .2,
                price: 1.15
            },
            "milk": {
                weight: .8,
                price: 1
            }
        },
        animalData: {
            "chicken": fakeChicken,
            "cow": fakeCow
        }
    })

    useEffect(() => {
        const handleAddStuff = () => {

            const fakeChickens: FarmSim.OneAnimalType[] = []
            for (let i = 0; i < 25; i++) {
                fakeChickens.push({
                    dayBorn: testGame.day,
                    mood: {
                        mood: faker.helpers.arrayElement(AnimalMoods),
                        daySince: 0
                    }
                })
            }

            const fakeCows: FarmSim.OneAnimalType[] = []
            for (let i = 0; i < 10; i++) {
                fakeCows.push({
                    dayBorn: testGame.day,
                    mood: {
                        mood: faker.helpers.arrayElement(AnimalMoods),
                        daySince: 0
                    }
                })
            }

            setTestGame({
                ...testGame,
                farm: {
                    ...testGame.farm,
                    animals: {
                        "chicken": fakeChickens,
                        "cows": fakeCows
                    },
                    resources: {
                        "wheat": 25,
                        "seeds": 250,
                        "milk": 100,
                        "eggs": 50
                    }
                }
            })
        }

        handleAddStuff()
    }, [])

    return (
        <>
            Farm Name: {testGame.farm.farmName} <br />
            Player Name: {testGame.farm.playerName} <br />
            Animals: {Object.keys(testGame.animalData).map((key, index) => (
                <p key={index}>
                    key: {key} == ${testGame.animalData[key].price}
                </p>
            ))} <br />
            Resources: {Object.keys(testGame.resourcesData).map((key, index) => (
                <p key={index}>
                    key: {key} == ${testGame.resourcesData[key].price}
                </p>
            ))}
        </>
    )
}
