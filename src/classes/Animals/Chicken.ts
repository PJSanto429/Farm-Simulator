import { Animal } from './Animal'

export class Chicken extends Animal {
    
    constructor(
        food: string = "Seed",
        output: string = "Egg"
    ) {
        super("Chicken", 12, 50, 5, 5, food, 10, output, 1)
    }
}
