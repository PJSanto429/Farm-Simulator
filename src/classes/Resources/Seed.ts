import { Resource } from './Resource'

export class Seed extends Resource {

    constructor(
        startingAmount: number = 0
    ) {
        super("Seed", .1, startingAmount)
    }
}