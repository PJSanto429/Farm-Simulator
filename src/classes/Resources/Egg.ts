import { Resource } from './Resource'

export class Egg extends Resource {

    constructor(
        startingAmount: number = 0
    ) {
        super("Egg", .3, startingAmount)
    }
}
