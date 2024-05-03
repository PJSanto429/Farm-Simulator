import { GameHelper, GameType } from '../classes/Game'
import { Stats } from './Sides/Stats'
import { Options } from './Sides/Options/Options'

export const GameOptions = (props: {
    game: GameType
    setGame: (game: GameType) => void
    handleSaveGame: (altGame: GameType | undefined) => void
}) => {
    const {
        game,
        setGame,
        handleSaveGame,
        // time
    } = props
    const helper = new GameHelper()
    
    const handleBuyAnimal = (
        animalToBuy: string,
        amount: number
    ) => {
        // console.log(animalToBuy, amount)
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

        const gameToBe: GameType = {
            ...game,
            farm: {
                ...game.farm,
                money: game.farm.money - toSpend,
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
        console.log(game)
        setGame(gameToBe)
        handleSaveGame(gameToBe)
    }
    return (
        <>
            <div className='options'>
                <div className='leftOptions option'>
                    <Stats game={game} setGame={setGame} handleSaveGame={handleSaveGame} />
                    {/* <Status status={game.status}/> */}
                </div>
                <div className='rightOptions option'>
                    <div className="optionsHeader">
                        Options
                    </div>
                    <Options
                        game={game}
                        handleBuyAnimal={handleBuyAnimal}
                    />
                </div>
            </div>
        </>
    )
}
