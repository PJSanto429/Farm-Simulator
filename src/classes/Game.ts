//! resource imports
import { Seed } from './Resources/Seed'
import { Egg } from './Resources/Egg'

//! animal imports
import { Chicken } from './Animals/Chicken'
import { Animal, NoneAnimal } from './Animals/Animal'

export class Game {
    farmName: string
    playerName: string // ! will be Player type eventually
    money: number

    moveNumber: number = 0

    //! resources
    seeds: Seed
    eggs: Egg

    //! animals
    noneAnimal: Animal = new NoneAnimal()
    chickens: Chicken

    constructor(
        farmName: string,
        playerName: string,

        startingSeeds: number = 0,
        startingEggs: number = 0,

        startingChickens: number = 0,

        startingMoney: number = 0,
        startingMoves: number = 0
    ) {
        this.farmName = farmName
        this.playerName = playerName

        this.seeds = new Seed(startingSeeds)
        this.eggs = new Egg(startingEggs)

        this.chickens = new Chicken("Seed", "Egg", startingChickens)

        this.money = startingMoney
        this.moveNumber = startingMoves
    }

    addMoney(money: number) {
        this.money += money
    }

    addAnimal(animal: Animal, amount: number) {
        console.log(animal.name)
        switch (animal.name) {
            case ("Chicken"):
                console.log("amount ==> ", amount)
                this.chickens = new Chicken("Seed", "Egg", this.chickens.amount + amount)
                break
        }
    }

    getAnimalByName(name: string): Animal {
        switch (name) {
            case ("chicken"):
                return this.chickens
            default:
                return this.noneAnimal
        }

    }
}

export const getGameFromString = (
    gameString: Game
): Game => {

    const toReturn = new Game(
        gameString.farmName,
        gameString.playerName,
        gameString.seeds.amount,
        gameString.eggs.amount,
        gameString.chickens.amount,
        gameString.money,
        gameString.moveNumber
    )

    return toReturn
}
