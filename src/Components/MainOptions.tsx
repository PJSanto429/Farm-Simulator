import React from 'react'

export const MainOptions = (props: {
    handleStartNewGame: () => void
    handleLoadGame: () => void
    setShow: (show: boolean) => void
}) => {
    const {
        handleStartNewGame,
        handleLoadGame,
        setShow
    } = props

    return (
        <>
            <div>
                <text>What would you like to do?</text>
                <div>
                    <button
                        onClick={() => {
                            handleLoadGame()
                            setShow(false)
                        }}
                        disabled
                    >
                        Load Game
                    </button>

                    <button
                        onClick={() => {
                            handleStartNewGame()
                            setShow(false)
                        }}
                    >
                        New Game
                    </button>
                </div>
            </div>
        </>
    )
}
