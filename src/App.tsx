import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { MainOptions } from './Components/MainOptions'
import { Game } from './classes/Game'
import { NewGameOptions } from './Components/NewGameOptions'
import './index.css'
import { Header } from './Components/Header'

export const App = () => {
    const [text, setText] = useState('')
    const [allText, setAllText] = useState<string[]>([])
    // const [currentGame, setCurrentGame] = useState<Game>()

    const [showMainOptions, setShowMainOptions] = useState(true)
    const [showNewGameOptions, setShowNewGameOptions] = useState(false)
    const [showTextBar, setShowTextBar] = useState(false)
    const [welcoming, setWelcoming] = useState(true)

    const navigate = useNavigate()

    const print = useCallback((words: string) => {
        setAllText([
            ...allText, words
        ])
    }, [allText])

    const handleSubmit = useCallback(() => {
        setText("")
        setAllText([
            ...allText,
            text
        ])
    }, [text, allText])

    const handleStartNewGame = useCallback(() => {
        setShowMainOptions(false)
        setShowNewGameOptions(true)

        // setCurrentGame(new Game())

    }, [])
    
    const onNewGameCreated = (newGame: Game) => {
        setShowNewGameOptions(false)
        // setCurrentGame(newGame)
        localStorage.setItem("game", JSON.stringify(newGame))
        navigate("game")
    }

    const handleLoadGame = () => {
        print("Handle Load Game - function not implemented")
    }

    return (
        <>
            <div className="main">
                {allText.map((t) => (
                    <div>{t}</div>
                ))}
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
                {showNewGameOptions &&
                    <NewGameOptions onNewGameCreated={onNewGameCreated} />
                }
                {showTextBar &&
                    <form onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <div>
                            <button type="submit">Enter</button>
                        </div>
                    </form>
                }
            </div>
        </>
    )
}