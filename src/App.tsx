import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { MainOptions } from './Components/MainOptions'
import { NewGameOptions } from './Components/NewGameOptions'
import { LoadGame } from './LoadGame'
import './scrollbar.css'
import './index.css'

export const App = () => {
    const [welcoming, setWelcoming] = useState(true)
    const [showMainOptions, setShowMainOptions] = useState(true)
    const [showNewGameOptions, setShowNewGameOptions] = useState(false)
    const [loadGame, setLoadGame] = useState(false)

    const navigate = useNavigate()

    const handleStartNewGame = useCallback(() => {
        setShowMainOptions(false)
        setShowNewGameOptions(true)
    }, [])
    
    const onGameCreatedOrLoaded = (newGame: FarmSim.GameType) => {
        setShowNewGameOptions(false)
        // const gameToSave = getGameToSave(newGame)
        localStorage.setItem("game", JSON.stringify(newGame))
        navigate("/game")
    }

    const handleLoadGame = () => {
        setLoadGame(true)
        setShowMainOptions(false)
        setWelcoming(false)
    }

    const onFail = () => {
        setLoadGame(false)        
        setWelcoming(true)
        setShowMainOptions(true)
    }

    return (
        <>
            <div className="main">
                {welcoming &&
                    <>
                        Welcome to Farming Simulator
                    </>
                }
                {showMainOptions &&
                    <>
                        <MainOptions
                            handleStartNewGame={handleStartNewGame}
                            handleLoadGame={handleLoadGame}
                            setShow={(e: boolean) => setShowMainOptions(e)}
                        />
                    </>
                }
                {loadGame &&
                    <LoadGame handleLoadGame={onGameCreatedOrLoaded} onFail={onFail}/>
                }
                {showNewGameOptions &&
                    <NewGameOptions onNewGameCreated={onGameCreatedOrLoaded} />
                }
            </div>
        </>
    )
}