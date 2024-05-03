
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
                <span>What would you like to do?</span>
                <div>
                    <button
                        onClick={() => {
                            handleLoadGame()
                            setShow(false)
                        }}
                    >
                        Find Game
                    </button>

                    <button
                        className="secondary"
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
