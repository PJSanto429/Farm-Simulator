export abstract class Resource {
    name: string
    weight: number
    amount: number

    constructor(
        name: string,
        weight: number,
        amount: number
    ) {
        this.name = name
        this.weight = weight
        this.amount = amount
    }
}