
export const SellAnimals = (props: {
    showSellAnimals: boolean
    setShowSellAnimals: (show: boolean) => void
    handleSellAnimals: (toSell: string, amount: number) => void
}) => {
    const {
        showSellAnimals,
        setShowSellAnimals,
        handleSellAnimals
    } = props

    return (
        <>
            {!showSellAnimals &&
                <button onClick={() => {setShowSellAnimals(true)}}>Sell Animals</button>
            }
            {showSellAnimals &&
                <>
                    selling animals...
                </>
            }
        </>
    )
}
