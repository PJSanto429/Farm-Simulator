import { Resource } from "../Resources/Resource"

export abstract class Animal {

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

    constructor(
        name: String,
        weight: number,
        price: number,
        lifespan: number,
        requiredSpace: number,
        
        food: string,
        foodPerDay: number,

        output: string,
        outputPerDay: number,

        amount: number
    ) {
        this.name = name
        this.weight = weight
        this.price = price
        this.lifespan = lifespan
        this.requiredSpace = requiredSpace

        this.food = food
        this.foodPerDay = foodPerDay

        this.output = output
        this.outputPerDay = outputPerDay

        this.amount = amount
    }

    addAmount(amountToAdd: number) {
        this.amount += amountToAdd
    }

    getFood(allResources: Resource[]): Resource | undefined {
        for (let i = 0; i < allResources.length; i++) {
            if (allResources[i].name === this.food) {
                return allResources[i]
            }
        }
        return undefined
    }

    //TODO make sure this is returning the proper Resource object
    getOutput(allResources: Resource[]): Resource | undefined {
        for (let i = 0; i < allResources.length; i++) {
            if (allResources[i].name === this.output) {
                return allResources[i]
            }
        }
        return undefined
    }

}

export class NoneAnimal extends Animal {
    constructor() {
        super("", 0, 0, 0, 0, "", 0, "", 0, 0)
    }
}
