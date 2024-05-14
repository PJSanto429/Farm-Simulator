import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameCreateType, GameType, generateDailyResources, getGameFromString, getGameToSave } from '../classes/Game'
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
            setGame({
                ...game,
                day: game.day + .5
            })
            if (game.day % 1 === 0) {
                console.log("it is a new day")
            }
            handleSaveGame(game)
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
        
        console.log(game)
        // handleSaveGame({
        //     ...game,
        //     dailyPurchases: [{
        //         id: 1,
        //         updateDaily: true,
        //         in: {
        //             type: "money",
        //             specificType: "none",
        //             amount: 9
        //         },
        //         out: {
        //             type: "resource",
        //             specificType: "seeds",
        //             amount: 900
        //         },
        //         startDay: 0,
        //         frequency: 90
        //     }, {
        //         id: 2,
        //         updateDaily: false,
        //         in: {
        //             type: "money",
        //             specificType: "none",
        //             amount: 15
        //         },
        //         out: {
        //             type: "resource",
        //             specificType: "eggs",
        //             amount: 30
        //         },
        //         startDay: 1,
        //         frequency: 2
        //     }, {
        //         id: 3,
        //         updateDaily: false,
        //         in: {
        //             type: "animal",
        //             specificType: "cow",
        //             amount: 2
        //         },
        //         out: {
        //             type: "money",
        //             specificType: "none",
        //             amount: 1000
        //         },
        //         startDay: 1,
        //         frequency: 15
        //     }]
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
                /> <br />
            </div>
        </>
    )
}
