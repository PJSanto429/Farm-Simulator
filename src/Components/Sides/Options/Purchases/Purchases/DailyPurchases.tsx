import { useState } from "react"
import { DailyPurchase } from "../../../../../classes/Farm"
import '../index.css'
import { OnePurchase } from "./OnePurchase"

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

    return (
        <>
            {!dailyPurchases.length &&
                <p className="infoText">You have no daily purchases</p>
            }
            {/* <button
                onClick={() => console.log("adding a new purchase")}
            >
                Add Daily Purchase
            </button> */}

            <div className="manyPurchases">
                {dailyPurchases.map(
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
