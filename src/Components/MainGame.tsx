import { useCallback, useEffect, useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameCreateType, GameType, generateDailyPurchases, generateDailyResources, getGameFromString, getGameToSave } from '../classes/Game'
import { GameOptions } from './GameOptions'
import { Header } from './Header'

export const MainGame = () => {
    const navigate = useNavigate()

    const [game, setGame] = useState<GameType>()

    useEffect(() => {
        try {
            const gottenGame: GameCreateType = JSON.parse(localStorage.getItem("game") || "")
    
            if (JSON.stringify(gottenGame) === "") {
                navigate("/home")
            }
            const gameToSet = getGameFromString(gottenGame)
            setGame(gameToSet)
        } catch (error) {
            navigate("/home")
        }
    }, [navigate])

    const handleSaveGame = useCallback((
        altGame: GameType | undefined = undefined
    ) => {
        let toSave

        if (!!altGame) {
            toSave = getGameToSave(altGame)
        } else if (game !== undefined) {
            toSave = getGameToSave(game)
        }
        localStorage.setItem("game", JSON.stringify(toSave))
    }, [game])

    const RenderHeader = useCallback(() => {
        if (game === undefined) {
            return <>loading...</>
        }
        const handleChangeDay = () => {
            let newGame = {
                ...game,
                day: game.day + .5
            }
            if (game.day % 1 === 0) {
                // newGame = generateDailyPurchases(
                //     generateDailyResources(
                //         newGame
                //     )
                // )
            }
            setGame(newGame)
            handleSaveGame(newGame)
        }
        return (
            <Header
                currentGame={game}
                handleChangeDay={handleChangeDay}
            />
        )
    }, [game, handleSaveGame])

    const handleGodButton = () => {
        if (game === undefined) {
            return
        }
        
        // console.log(generateDailyPurchases({
        //     ...game,
        //     dailyPurchases: game.dailyPurchases.filter((p) => p.out.type !== "money")
        // }))
        // console.log(generateDailyPurchases(game))
        
        const toDo: number = 1
        if (toDo === 1) {
            const newGame = generateDailyPurchases(
                generateDailyResources(
                    game
                )
            )
            handleSaveGame(newGame)
            setGame(newGame)
        } else {
            handleSaveGame({
                ...game,
                farm: {
                    ...game.farm,
                    money: 0.15
                    // resources: game.farm.resources.map((r) => {
                    //     if (r.name === "Egg") {
                    //         return {
                    //             ...r,
                    //             amount: 200
                    //         }
                    //     }
                    //     return r
                    // })
                }
            })
        }

        // handleSaveGame({
        //     ...game,
        //     farm: {
        //         ...game.farm,
        //         money: 2000
        //     }
        // })
        // handleSaveGame({
        //     ...game,
        //     dailyPurchases: [
        //         {
        //             id: 1,
        //             updateDaily: false,
        //             in: {
        //                 type: "resource",
        //                 specificType: "Seed",
        //                 amount: 210
        //             },
        //             out: {
        //                 type: "money",
        //                 specificType: "none",
        //                 amount: 2.10
        //             },
        //             startDay: 0,
        //             frequency: 1
        //         },
        //         {
        //             id: 2,
        //             updateDaily: false,
        //             in: {
        //                 type: "money",
        //                 specificType: "none",
        //                 amount: 10
        //             },
        //             out: {
        //                 type: "resource",
        //                 specificType: "Egg",
        //                 amount: 20
        //             },
        //             startDay: 1,
        //             frequency: 1
        //         },
        //         {
        //             id: 3,
        //             updateDaily: false,
        //             in: {
        //                 type: "resource",
        //                 specificType: "Wheat",
        //                 amount: 75
        //             },
        //             out: {
        //                 type: "money",
        //                 specificType: "none",
        //                 amount: 1.15 * 75
        //             },
        //             startDay: 1,
        //             frequency: 1
        //         },
        //         {
        //             id: 4,
        //             updateDaily: false,
        //             in: {
        //                 type: "money",
        //                 specificType: "none",
        //                 amount: 21
        //             },
        //             out: {
        //                 type: "resource",
        //                 specificType: "Milk",
        //                 amount: 21
        //             },
        //             startDay: 1,
        //             frequency: 1
        //         },
        //     ]
        // })
    }

    if (game === undefined) {
        return <>loading...</>
    }

    return (
        <>
            <div className="main">
                <div className="header">
                    {game.farm.playerName}'s "{game.farm.farmName}" Farm
                </div>

                {/* //! god button */}
                <button onClick={handleGodButton}>
                    God Button!
                </button>

                <RenderHeader />
                <GameOptions
                    game={game}
                    setGame={setGame}
                    handleSaveGame={handleSaveGame}
                />
            </div>
        </>
    )
}
