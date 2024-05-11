import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameCreateType, GameType, generateDailyResources, getGameFromString, getGameToSave } from '../classes/Game'
import { GameOptions } from './GameOptions'
import { Header } from './Header'
import { ResourceType } from '../classes/Resources/Resource'

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
        
        // const newGame: GameType = {
        //     ...game,
        //     farm: {
        //         ...game.farm,
        //         resources: game.farm.resources.map((r) => {
        //             switch(r.name) {
        //                 case "Seed":
        //                     return {
        //                         ...r,
        //                         price: 0.
        //                     }
        //                 case "Egg":
        //                     return {
        //                         ...r,
        //                         price: .5
        //                     }
        //                 case "Wheat":
        //                     return {
        //                         ...r,
        //                         price: 1.15
        //                     }
        //                 case "Milk":
        //                     return {
        //                         ...r,
        //                         price: 1
        //                     }
        //                 default:
        //                     return r
        //             }
        //         })
        //     },
        //     otherFarms: game.otherFarms.map((otherFarm) => {
        //         return {
        //             ...otherFarm,
        //             resources: otherFarm.resources.map((r) => {
        //                 switch(r.name) {
        //                     case "Seed":
        //                         return {
        //                             ...r,
        //                             price: 0.01
        //                         }
        //                     case "Egg":
        //                         return {
        //                             ...r,
        //                             price: .5
        //                         }
        //                     case "Wheat":
        //                         return {
        //                             ...r,
        //                             price: 1.15
        //                         }
        //                     case "Milk":
        //                         return {
        //                             ...r,
        //                             price: 1
        //                         }
        //                     default:
        //                         return r
        //                 }
        //             })
        //         }
        //     })
        // }
        console.log(game)

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
                {/* <button onClick={handleGodButton}>
                    God Button!
                </button> */}

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
