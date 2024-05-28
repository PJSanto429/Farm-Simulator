import { Formik } from "formik"
// import { CreateDailyPurchaseType } from "../../../../../classes/Farm"

export const CreateDailyPurchase = (props: {
    purchaseToAdd: FarmSim.CreateDailyPurchaseType
    onCancel: () => void
    onPurchaseAdded: (p: FarmSim.CreateDailyPurchaseType) => void
}) => {
    const {
        purchaseToAdd,
        onCancel,
        onPurchaseAdded
    } = props

    const handleSubmit = (
        values: FarmSim.CreateDailyPurchaseType
    ) => {
        console.log("values ==> ", values)
        onPurchaseAdded(values)
    }

    const buttonDisabled = (
        values: FarmSim.CreateDailyPurchaseType
    ): boolean => {
        const {
            in: inValues,
            out
        } = values

        if (inValues.amount === 0 || out.amount === 0) {
            return true
        }

        if (inValues.type !== "money") {
            return inValues.specificType === ""
        }

        if (out.type !== "money") {
            return out.specificType === ""
        }

        return false
    }

    return (
        <>
            <div className="createPurchaseContainer">
                <div className="createPurchaseMain">
                    <Formik initialValues={purchaseToAdd} onSubmit={handleSubmit}>
                        {(form) => (
                            <form
                                onSubmit={form.handleSubmit}
                                onReset={form.handleReset}
                            >
                                <p className="createPurchaseTitle">
                                    Frequency: Every&nbsp;
                                    <input
                                        type="number"
                                        className="number"
                                        name="frequency"
                                        value={form.values.frequency}
                                        onChange={form.handleChange}
                                    />&nbsp; day(s)
                                </p>

                                <div className="purchaseCreateResources">
                                    <div className="inOutResource">
                                        <p className="purchaseResourceHelper">Out:</p>
                                        <div className="purchaseSection">
                                            Amount: <input
                                                type="number"
                                                className="number"
                                                name="out.amount"
                                                value={form.values.out.amount}
                                                onChange={form.handleChange}
                                            />
                                        </div>
                                        <br />
                                        <div className="purchaseSection">
                                            Type:
                                            <select
                                                name="out.specificType"
                                                onChange={(e) => {
                                                    const { value } = e.target
                                                    if (value === "money") {
                                                        form.setFieldValue("out.type", "money")
                                                        form.setFieldValue("out.specificType", "")
                                                    } else {
                                                        form.setFieldValue("out.type", "resource")
                                                        form.setFieldValue("out.specificType", value)
                                                    }
                                                }}
                                            >
                                                <option value="">Select...</option>
                                                <option value="money">Money</option>
                                                <option value="seed">Seeds</option>
                                                <option value="eggs">Eggs</option>
                                                <option value="wheat">Wheat</option>
                                                <option value="milk">Milk</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="inOutResource">
                                        <p className="purchaseResourceHelper">In:</p>
                                        <div className="purchaseSection">
                                            Amount: <input
                                                type="number"
                                                className="number"
                                                name="in.amount"
                                                value={form.values.in.amount}
                                                onChange={form.handleChange}
                                            />
                                        </div>
                                        <br />
                                        <div className="purchaseSection">
                                            Type:
                                            <select
                                                name="in.specificType"
                                                onChange={(e) => {
                                                    const { value } = e.target
                                                    if (value === "money") {
                                                        form.setFieldValue("in.type", "money")
                                                        form.setFieldValue("in.specificType", "")
                                                    } else {
                                                        form.setFieldValue("in.type", "resource")
                                                        form.setFieldValue("in.specificType", value)
                                                    }
                                                }}
                                                id=""
                                            >
                                                <option value="">Select...</option>
                                                <option value="money">Money</option>
                                                <option value="seed">Seeds</option>
                                                <option value="eggs">Eggs</option>
                                                <option value="wheat">Wheat</option>
                                                <option value="milk">Milk</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="createPurchaseButtons">
                                    <button
                                        className="secondary"
                                        type="button"
                                        onClick={onCancel}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        disabled={buttonDisabled(form.values)}
                                        type="submit"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}
