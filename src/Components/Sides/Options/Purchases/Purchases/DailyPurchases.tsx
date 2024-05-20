import { useCallback, useState } from "react"
import { CreateDailyPurchaseType, DailyPurchase } from "../../../../../classes/Farm"
import '../index.css'
import { OnePurchase } from "./OnePurchase"
import { CreateDailyPurchase } from "./CreatePurchase"

export const DailyPurchases = (props: {
    currentDay: number
    dailyPurchases: DailyPurchase[]
    setDailyPurchases: (d: DailyPurchase[]) => void
}) => {
    const {
        currentDay,
        dailyPurchases,
        setDailyPurchases
    } = props

    const [purchaseToEdit, setPurchaseToEdit] = useState<DailyPurchase | null>()
    const [purchaseToAdd, setPurchaseToAdd] = useState<CreateDailyPurchaseType>()

    const togglePurchase = (
        purchase: DailyPurchase,
        action: "disable" | "enable" | "delete"
    ) => {
        if (action === "delete" && !!purchase.disabledAt) {
            setDailyPurchases(dailyPurchases.filter((p) => p.id !== purchase.id))
        }

        if (action === "disable" && !purchase.disabledAt) {
            setDailyPurchases(dailyPurchases.map((p) => {
                if (p.id !== purchase.id) {
                    return p
                }
                return {
                    ...p,
                    disabledAt: currentDay
                }
            }))
        }

        if (action === "enable" && !!purchase.disabledAt) {
            setDailyPurchases(dailyPurchases.map((p) => {
                if (p.id !== purchase.id) {
                    return p
                }
                return {
                    ...p,
                    disabledAt: undefined
                }
            }))
        }
    }

    const handleStartAddingNewPurchase = useCallback(() => {
        const maxId = dailyPurchases.reduce((max, p) => (p.id > max ? p.id : max), 0) + 1
        setPurchaseToAdd({
            id: maxId,
            in: {
                type: "",
                specificType: "",
                amount: 0
            },
            out: {
                type: "",
                specificType: "",
                amount: 0
            },
            frequency: 1,
            startDay: currentDay,
            updateDaily: false
        })
    }, [currentDay, dailyPurchases])

    return (
        <>
            {!dailyPurchases.length &&
                <p className="infoText">You have no daily purchases</p>
            }

            {!purchaseToAdd &&
                <button
                    onClick={handleStartAddingNewPurchase}
                >
                    Add Daily Purchase
                </button>
            }

            {!!purchaseToAdd &&
                <CreateDailyPurchase
                    purchaseToAdd={purchaseToAdd}
                />
            }

            <div className="manyPurchases">
                {dailyPurchases.sort((a, b) => b.id - a.id).map(
                    (purchase) => <OnePurchase
                        key={purchase.id}
                        purchase={purchase}
                        editing={purchase.id === purchaseToEdit?.id}
                        togglePurchase={togglePurchase}
                        setPurchaseToEdit={setPurchaseToEdit}
                    />
                )}
            </div>
        </>
    )
}
