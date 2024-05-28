import { Formik } from "formik"
// import { DailyPurchase, TradeDetails } from "../../../../../classes/Farm"

const PurchaseDetails = (props: {
    data: FarmSim.TradeDetails
}) => {
    const {
        type,
        specificType,
        amount
    } = props.data

    return (
        <>
            {type === "money" &&
                <>${amount}</>
            }
            {type !== "money" &&
                <>
                    {amount} {specificType}
                </>
            }
        </>
    )
}

export const EditOnePurchase = (props: {
    purchase: FarmSim.DailyPurchase
    handleSave: (newPurchase: FarmSim.DailyPurchase) => void
    handleCancel: () => void
}) => {
    const {
        purchase,
        handleSave,
        handleCancel
    } = props

    return (
        <div className="singlePurchase editing">
            <Formik initialValues={purchase} onSubmit={() => {}}>
                {(form) => (
                    <form
                        onSubmit={form.handleSubmit}
                        onReset={form.handleReset}
                    >
                        <div className="purchaseTitle">
                            <p>Frequency - Every</p>
                            <input
                                className="number"
                                type="number"
                                name="frequency"
                                value={form.values.frequency}
                                onChange={form.handleChange}
                                placeholder="5..."
                            /> days
                        </div>
                        <div className="purchaseDetails">
                            <div className="">
                                <p className="InOut">In:</p>
                                <input
                                    className="number"
                                    type="number"
                                    name="in.amount"
                                    value={form.values.in.amount}
                                    onChange={form.handleChange}
                                    placeholder="5..."
                                />
                            </div>
                            <div className="">
                                <p className="InOut">Out:</p>
                                <PurchaseDetails data={purchase.out} />
                            </div>
                        </div>
                        <div className="purchaseButtons">
                            <button
                                className="secondary"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleSave(purchase)}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export const ViewOnePurchase = (props: {
    purchase: FarmSim.DailyPurchase
    togglePurchase: (
        purchase: FarmSim.DailyPurchase,
        action: "disable" | "enable" | "delete"
    ) => void
    setPurchaseToEdit: (purchase: FarmSim.DailyPurchase) => void
}) => {
    const {
        purchase,
        togglePurchase,
        setPurchaseToEdit
    } = props

    return (
        <div className="singlePurchase">
            <div className="purchaseTitle">
                <p>Frequency - Every {
                    purchase.frequency === 1 ? "" : purchase.frequency
                } day{
                    purchase.frequency === 1 ? "" : "s"
                }</p> <br />
                {/* disabled: {purchase.disabledAt || "no"} */}
            </div>
            <div className="purchaseDetails">
                <div className="">
                    <p className="InOut">In:</p>
                    <PurchaseDetails data={purchase.in} />
                </div>
                <div className="">
                    <p className="InOut">Out:</p>
                    <PurchaseDetails data={purchase.out} />
                </div>
            </div>
            <div className="purchaseButtons">
                <button
                    className="secondary"
                    onClick={() => togglePurchase(purchase, !purchase.disabledAt? "disable" : "delete")}
                >
                    {!purchase.disabledAt? "Disable" : "Delete"}
                </button>
                {!!purchase.disabledAt &&
                    <button
                        onClick={() => {togglePurchase(purchase, "enable")}}
                    >
                        Enable
                    </button>
                }
                <button
                    disabled
                    onClick={() => setPurchaseToEdit(purchase)}
                >
                    Edit
                </button>
            </div>
        </div>
    )
}

export const OnePurchase = (props: {
    purchase: FarmSim.DailyPurchase
    editing: boolean
    togglePurchase: (
        purchase: FarmSim.DailyPurchase,
        sction: "disable" | "enable" | "delete"
    ) => void
    setPurchaseToEdit: (purchase: FarmSim.DailyPurchase | null) => void
}) => {
    const {
        purchase,
        editing,
        togglePurchase,
        setPurchaseToEdit
    } = props

    if (editing) {
        return (
            <EditOnePurchase
                purchase={purchase}
                handleCancel={() => setPurchaseToEdit(null)}
                handleSave={() => {}}
            />
        )
    }

    return (
        <ViewOnePurchase
            purchase={purchase}
            togglePurchase={togglePurchase}
            setPurchaseToEdit={setPurchaseToEdit}
        />
    )
}
