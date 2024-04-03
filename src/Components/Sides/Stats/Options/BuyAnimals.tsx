import React, { useCallback, useState } from 'react'

export const BuyAnimals = (props: {
    showBuyAnimals: boolean,
    setShowBuyAnimals: (show: boolean) => void,
    handleBuyAnimals: (animal: string, amount: number) => void
}) => {
    const {
        showBuyAnimals,
        setShowBuyAnimals,
        handleBuyAnimals
    } = props

    const [animalToBuy, setAnimalToBuy] = useState<string>()
    const [amount, setAmount] = useState<number>(0)

    const [showConfirm, setShowConfirm] = useState(false)

    // TODO selling animals should sell for 75% of their buying price
    const buyAnimals = useCallback(() => {
        if (animalToBuy !== undefined) {
            handleBuyAnimals(animalToBuy, amount)
        }
    }, [animalToBuy, amount, handleBuyAnimals])

    const Confirm = useCallback(() => {
        if (!showConfirm) {
            return (
                <button
                    onClick={() => {
                        setShowConfirm(true)
                    }}
                >
                    Buy
                </button>
            )
        }
        return (
            <button onClick={() => {buyAnimals()}}>
                Press again to confirm
            </button>
        )
    }, [showConfirm, buyAnimals])

    if (showBuyAnimals) {
        return (
            <>
                <label htmlFor='animal'>Animal:</label>
                <select onChange={(e) => {setAnimalToBuy(e.target.value)}} name='animal'>
                    <option value=''>Select...</option>
                    <option value="chicken">Chicken</option>
                    <option value="chicken">Cow</option>
                    <option value="chicken">Cat</option>
                    <option value="chicken">Dog</option>
                </select>

                <label htmlFor='amount'>Amount:</label>
                <input
                    name='amount'
                    type='number'
                    min={0}
                    placeholder='5...'
                    onChange={
                        (e) => {
                            setAmount(parseInt(e.target.value))
                        }
                    }
                />
                <br />
                <Confirm />
            </>
        )
    }

    return (
        <button
            onClick={() => setShowBuyAnimals(true)}
            disabled={showBuyAnimals}
        >
            Buy Animals
        </button>
    )
}
