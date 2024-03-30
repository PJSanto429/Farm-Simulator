export class Farm {
    name: string
    owner: string

    width: number
    height: number

    constructor(
        name: string,
        owner: string,

        width: number = 100,
        height: number = 100
    ) {
        this.name = name
        this.owner = owner,

        this.width = width
        this.height = height
    }

    getSize(): number {
        return this.height * this.width
    }
}