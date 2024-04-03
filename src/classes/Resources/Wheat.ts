import { Resource } from "./Resource"

export class Wheat extends Resource {
    constructor(
        startingAmount: number = 0
    ) {
        super("Wheat", .2, startingAmount)
    }
}
