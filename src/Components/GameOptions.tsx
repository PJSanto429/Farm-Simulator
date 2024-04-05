import React, { useCallback, useEffect } from 'react'
import { Game } from '../classes/Game'
import { Stats } from './Sides/Stats/Stats'
import { Options } from './Sides/Stats/Options/Options'

export const GameOptions = (props: {
    game: Game
    setGame: (game: Game) => void
    // handleBuyAnimal: (animal: string, amount: number) => void
}) => {
    const {
        game,
        setGame,
        // handleBuyAnimal
    } = props


    const handleSaveGame = useCallback((
        gameToSave: Game | undefined = undefined
    ) => {
        localStorage.setItem("game", JSON.stringify(gameToSave || game))
    }, [game])
    
    const handleBuyAnimal = (
        animalToBuy: string,
        amount: number
    ) => {
        if (game === undefined) {
            return
        }

        const animal = game.getAnimalByName(animalToBuy) 
        const toSpend = animal.price * amount
        if (toSpend > game.money) {
            return
        }

        game.addMoney(-toSpend)
        game.farmName = "bruh time"
        game.addAnimal(animal, amount)

        // console.log(game)
        handleSaveGame(game)
        setGame(game)
    }

    // useEffect(() => {
    //     console.log("updated game ==> ", game)
    // }, [game])

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
