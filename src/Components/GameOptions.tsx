import { GameHelper, GameType } from '../classes/Game'
import { Stats } from './Sides/Stats/Stats'
import { Options } from './Sides/Stats/Options/Options'

export const GameOptions = (props: {
    game: GameType
    setGame: (game: GameType) => void
    handleSaveGame: (altGame: GameType | undefined) => void
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

        const animal = helper.getAnimalByName(animalToBuy, game.animals)
        if (animal === null) {
            return
        }

        const toSpend = animal.price * amount
        if (toSpend > game.money) {
            console.log("not enough money - 3")
            return
        }

        const gameToBe = {
            ...game,
            money: game.money - toSpend,
            animals: game.animals.map((addingAnimal) => {
                if (addingAnimal.name !== animal.name) {
                    return addingAnimal
                }
                return {
                    ...addingAnimal,
                    amount: addingAnimal.amount + amount
                }
            })
        }
        setGame(gameToBe)
        handleSaveGame(gameToBe)
    }

    return (
        <>
            <div className='options'>
                <div className='leftOptions option'>
                    <Stats game={game} />
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
