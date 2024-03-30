//! resource imports
import { Seed } from './Resources/Seed'
import { Egg } from './Resources/Egg'

//! animal imports
import { Chicken } from './Animals/Chicken'

export class Game {
    farmName: string
    playerName: string // ! will be Player type eventually

    moveNumber: number = 0

    //! resources
    seeds: Seed
    eggs: Egg

    //! animals
    chickens: Chicken[] = []

    constructor(
        farmName: string,
        playerName: string,

        startingSeeds: number = 0,
        startingEggs: number = 0,

        startingChickens: number = 0,
    ) {
        this.farmName = farmName
        this.playerName = playerName

        this.seeds = new Seed(startingSeeds)
        this.eggs = new Egg(startingEggs)

        for (let i = startingChickens; i > 0; i--) {
            this.chickens.push(new Chicken())
        }
    }
    
    // 
}

export const getGameFromString = (
    gameString: Game
): Game => {

    console.log(gameString)
    
    const toReturn = new Game(
        gameString.farmName,
        gameString.playerName,
        gameString.seeds.amount,
        gameString.eggs.amount,
        gameString.chickens.length
    )

    return toReturn
}
