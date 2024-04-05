import React, { useCallback, useState } from 'react'

export const BuyAnimals = (props: {
    showBuyAnimals: boolean
    setShowBuyAnimals: (show: boolean) => void
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

    const buyAnimals = useCallback(() => {
        handleReset()
        if (animalToBuy !== undefined) {
            setShowConfirm(false)   
            handleBuyAnimals(animalToBuy, amount)
        }
    }, [animalToBuy, amount, handleBuyAnimals])

    const handleReset = () => {
        setShowConfirm(false)
        setAnimalToBuy("")
        setAmount(0)
    }

    const Confirm = useCallback(() => (
        <>
            <button
                className="secondary"
                onClick={() => {
                    handleReset()
                    setShowBuyAnimals(false)
                    setShowConfirm(false)
                }}
            >
                Cancel
            </button>
            {!showConfirm &&
                <button
                    disabled={!amount || !animalToBuy}
                    onClick={() => {setShowConfirm(true)}}
                >
                    Buy
                </button>
            }
            {showConfirm &&
                <button onClick={() => {buyAnimals()}}>
                    Press again to confirm
                </button>
            }
        </>
    ), [
        showConfirm,
        buyAnimals,
        setShowBuyAnimals,
        amount,
        animalToBuy
    ])

    if (showBuyAnimals) {
        return (
            <>
                <label htmlFor='animal'>Animal:</label>
                <select onChange={(e) => {setAnimalToBuy(e.target.value)}} name='animal'>
                    <option value=''>Select...</option>
                    <option value="chicken">Chicken</option>
                    <option value="cow">Cow</option>
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
        <div>
            <button
                onClick={() => setShowBuyAnimals(true)}
                disabled={showBuyAnimals}
            >
                Buy Animals
            </button>
        </div>
    )
}
