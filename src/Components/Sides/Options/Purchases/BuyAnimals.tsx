import { useCallback, useState } from 'react'

export const BuyAnimals = (props: {
    handleBuyAnimals: (animal: string, amount: number) => void
    showing: "none" | "animals" | "resources"
    setShowing: (e: "none" | "animals") => void
}) => {
    const {
        handleBuyAnimals,
        showing,
        setShowing
    } = props
    
    const [animalToBuy, setAnimalToBuy] = useState<string>()
    const [amount, setAmount] = useState<number>(0)

    const [showConfirm, setShowConfirm] = useState(false)

    const buyAnimals = useCallback(() => {
        if (animalToBuy !== undefined && amount > 0) {
            setShowConfirm(false)   
            handleBuyAnimals(animalToBuy, amount)
            setShowing("none")
        }
        handleReset()
    }, [animalToBuy, amount, handleBuyAnimals, setShowing])

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
                    setShowing("none")
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
        amount,
        animalToBuy,
        setShowing
    ])

    if (showing === 'animals') {
        return (
            <div className="section">
                <br />
                <label htmlFor='animal'>Animal:</label>
                <select onChange={(e) => {setAnimalToBuy(e.target.value)}} name='animal'>
                    <option value=''>Select...</option>
                    <option value="Chicken">Chicken</option>
                    <option value="Cow">Cow</option>
                </select>

                <label htmlFor='amount'>Amount:</label>
                <input
                    name='amount'
                    type='number'
                    min={0}
                    className="number"
                    placeholder='5...'
                    onChange={
                        (e) => {
                            setAmount(parseInt(e.target.value))
                        }
                    }
                />
                <br />
                <Confirm />
            </div>
        )
    }

    return (
        <div>
            {showing === "none" &&
                <button
                    onClick={() => setShowing("animals")}
                    // disabled={showBuyAnimals}
                >
                    Buy Animals
                </button>
            }
        </div>
    )
}
