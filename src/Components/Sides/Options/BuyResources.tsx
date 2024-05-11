import { useCallback, useState } from "react"

export const BuyResources = (props: {
    handleBuyResources: (resource: string, amount: number) => void
    showing: "none" | "animals" | "resources"
    setShowing: (e: "none" | "resources") => void
}) => {
    const {
        handleBuyResources,
        showing,
        setShowing
    } = props

    const [resourceToBuy, setResourceToBuy] = useState<string>()
    const [amount, setAmount] = useState<number>(0)
    const [showConfirm, setShowConfirm] = useState(false)
    
    const handleReset = () => {
        setShowConfirm(false)
        setResourceToBuy("")
        setAmount(0)
    }

    const buyResources = useCallback(() => {
        if (resourceToBuy !== undefined && amount > 0) {
            // console.clear()
            // console.log("resource ==> ", resourceToBuy)
            // console.log("amount ==>", amount)
            setShowConfirm(false)
            handleBuyResources(resourceToBuy, amount)
            setShowing("none")
        }
        handleReset()
    }, [amount, handleBuyResources, resourceToBuy, setShowing])

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
                    disabled={!amount || !resourceToBuy}
                    onClick={() => {setShowConfirm(true)}}
                >
                    Buy
                </button>
            }
            {showConfirm &&
                <button onClick={() => {buyResources()}}>
                    Press again to confirm
                </button>
            }
        </>
    ), [
        amount,
        setShowing,
        showConfirm,
        buyResources,
        resourceToBuy
    ])

    if (showing === 'resources') {
        return (
            <div className="section">
                <br />
                <label htmlFor='resource'>Resource:</label>
                <select onChange={(e) => {setResourceToBuy(e.target.value)}} name='resource'>
                    <option value=''>Select...</option>
                    <option value="Seed">Seeds</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Egg">Eggs</option>
                    <option value="Milk">Milk</option>
                </select>

                <label htmlFor='amount'>Amount:</label>
                <input
                    name='amount'
                    type='number'
                    min={0}
                    className="number"
                    placeholder='5...'
                    onChange={(e) => setAmount(parseInt(e.target.value))}
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
                    onClick={() => setShowing("resources")}
                >
                    Buy Resources
                </button>
            }
        </div>
    )
    
}
