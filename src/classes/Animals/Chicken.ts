import { Animal } from './Animal'

export class Chicken extends Animal {
    
    constructor(
        startingAmount: number = 0,
        food: string = "Seed",
        output: string = "Egg"
    ) {
        super("Chicken", 6, 5, 5, 5, food, 10, output, 1, startingAmount)
    }
}
