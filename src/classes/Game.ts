//! resource imports
import { Seed } from './Resources/Seed'
import { Egg } from './Resources/Egg'

//! animal imports
import { Chicken } from './Animals/Chicken'
import { Animal, NoneAnimal } from './Animals/Animal'
import { Cow } from './Animals/Cow'

export class Game {
    farmName: string
    playerName: string // ! will be Player type eventually
    money: number

    moveNumber: number = 0
    day: number

    //! resources
    seeds: Seed
    eggs: Egg

    //! animals
    noneAnimal: Animal = new NoneAnimal()
    chickens: Chicken
    cows: Cow

    constructor(
        farmName: string,
        playerName: string,

        startingSeeds: number = 0,
        startingEggs: number = 0,

        startingChickens: number = 0,
        startingCows: number = 0,

        startingMoney: number = 0,
        startingMoves: number = 0,

        day: number = 0
    ) {
        this.farmName = farmName
        this.playerName = playerName

        this.seeds = new Seed(startingSeeds)
        this.eggs = new Egg(startingEggs)

        this.chickens = new Chicken(startingChickens)
        this.cows = new Cow(startingCows)

        this.money = startingMoney
        this.moveNumber = startingMoves

        this.day = day
    }

    addMoney(money: number) {
        this.money += money
    }

    addAnimal(animal: Animal, amount: number) {
        console.log(animal.name)
        switch (animal.name) {
            case ("Chicken"):
                this.chickens = new Chicken(this.chickens.amount + amount)
                break
            case ("Cow"):
                this.cows = new Cow(this.cows.amount + amount)
        }
    }

    getAnimalByName(name: string): Animal {
        switch (name) {
            case ("chicken"):
                return this.chickens
            case ("cow"):
                return this.cows
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
