
export interface AnimalType {
    weight: number
    price: number
    lifespan: number
    name: String
    requiredSpace: number

    food: string
    foodPerDay: number

    output: string
    outputPerDay: number

    amount: number
}

export const Chicken: AnimalType = {
    name: "Chicken",
    weight: 6,
    price: 5,
    lifespan: 5,
    requiredSpace: 5,
    food: "Seed",
    foodPerDay: 10,
    output: "Egg",
    outputPerDay: 1,
    amount: 0
}

export const Cow: AnimalType = {
    name: "Cow",
    weight: 1100,
    price: 500,
    lifespan: 15,
    requiredSpace: 30,
    food: "Wheat",
    foodPerDay: 25,
    output: "Milk",
    outputPerDay: 7,
    amount: 0
}
