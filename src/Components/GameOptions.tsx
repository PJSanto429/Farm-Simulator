import { GameHelper } from '../classes/Game'
import { Stats } from './Sides/Stats'
import { Options } from './Sides/Options/Options'
// import { DailyPurchase } from '../classes/Farm'

export const GameOptions = (props: {
    game: FarmSim.GameType
    setGame: (game: FarmSim.GameType) => void
    handleSaveGame: (altGame: FarmSim.GameType | undefined) => void
}) => {
    const {
        game,
        setGame,
        handleSaveGame
    } = props
    const helper = new GameHelper()
    
    const handleBuyAnimal = (
        animalToBuy: string,
        amount: number
    ) => {
        if (game === undefined) {
            return
        }

        const animal = helper.getAnimalByName(animalToBuy, game.farm.animals)
        if (animal === null) {
            return
        }

        const toSpend = animal.price * amount
        if (toSpend > game.farm.money) {
            return
        }

        const gameToBe: FarmSim.GameType = {
            ...game,
            farm: {
                ...game.farm,
                money: ((game.farm.money * 100) - (toSpend * 100)) / 100,
                animals: game.farm.animals.map((addingAnimal) => {
                    if (addingAnimal.name !== animal.name) {
                        return addingAnimal
                    }
                    return {
                        ...addingAnimal,
                        amount: addingAnimal.amount + amount
                    }
                })
            }
        }
        setGame(gameToBe)
        handleSaveGame(gameToBe)
    }

    const handleBuyResources = (
        resourceToBuy: string,
        amount: number
    ) => {
        if (game === undefined) {
            return
        }

        const resource = helper.getResourceByName(resourceToBuy, game.farm.resources)
        if (resource === null) {
            return
        }

        const toSpend = resource.price * amount
        if (toSpend > game.farm.money) {
            return
        }

        const gameToBe: FarmSim.GameType = {
            ...game,
            farm: {
                ...game.farm,
                money: ((game.farm.money * 100) - (toSpend * 100)) / 100,
                resources: game.farm.resources.map((addingResource) => {
                    if (resource.name !== addingResource.name) {
                        return addingResource
                    }
                    return {
                        ...addingResource,
                        amount: addingResource.amount + amount
                    }
                })
            }
        }
        setGame(gameToBe)
        handleSaveGame(gameToBe)
    }

    const handleSetDailyPurchases = (
        dailyPurchases: FarmSim.DailyPurchase[]
    ) => {
        const newGame = { ...game, dailyPurchases}
        setGame(newGame)
        handleSaveGame(newGame)

    }

    return (
        <>
            <div className='options'>
                <div className='leftOptions option'>
                    <Stats game={game} setGame={setGame} handleSaveGame={handleSaveGame} />
                    {/* <Status status={game.status}/> */}
                </div>
                <div className='rightOptions option'>
                    <Options
                        game={game}
                        setDailyPurchases={handleSetDailyPurchases}
                        handleBuyAnimal={handleBuyAnimal}
                        handleBuyResources={handleBuyResources}
                    />
                </div>
            </div>
        </>
    )
}
