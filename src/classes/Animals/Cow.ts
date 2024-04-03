import { Animal } from "./Animal"

export class Cow extends Animal {
    constructor(
        startingAmount: number = 0
    ) {
        super("Cow", 1100, 500, 15, 30, "Wheat", 25, "Milk", 7, startingAmount)
    }
}
