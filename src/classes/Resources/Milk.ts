import { Resource } from "./Resource"


export class Milk extends Resource {
    constructor(
        startingAmount: number = 0
    ) {
        super("Milk", 8, startingAmount)
    }
}
