import React, { useCallback, useState } from 'react'

export const BuyAnimals = (props: {
    showBuyAnimals: boolean,
    setShowBuyAnimals: (show: boolean) => void
}) => {
    const {
        showBuyAnimals,
        setShowBuyAnimals
    } = props

    const [animalToBuy, setAnimalToBuy] = useState<string>()
    const [amount, setAmount] = useState<number>()

    const [showConfirm, setShowConfirm] = useState(false)

    const Confirm = useCallback(() => {
        if (!showConfirm) {
            return (
                <button onClick={() => {setShowConfirm(true)}}>Buy</button>
            )
        }
        return (
            <button onClick={() => {}}>
                confirming...
            </button>
        )
    }, [showConfirm])

    if (showBuyAnimals) {
        return (
            <>
                <select onChange={(e) => {setAnimalToBuy(e.target.value)}}>
                    <option value="chicken">Chicken</option>
                    <option value="chicken">Cow</option>
                    <option value="chicken">Cat</option>
                    <option value="chicken">Dog</option>
                </select>

                <label htmlFor='amount'>Amount:</label>
                <input
                    name='amount'
                    type='number'
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
