import { Formik } from "formik"
// import { CreateTradeType } from "../../../classes/Farm"

export const FarmTrade = (props: {
    handleSubmit: (e: FarmSim.CreateTradeType) => void
    setShowTrade: (e: boolean) => void
    farmId: number
}) => {
    const {
        handleSubmit,
        setShowTrade,
        farmId
    } = props
    
    const initialValues = {
        typeIn: "animal",
        specificTypeIn: "",
        amountIn: 0,

        typeOut: "money",
        specificTypeOut: "",
        amountOut: 0,

        otherFarmId: farmId
    }

    const disabled = (e: FarmSim.CreateTradeType): boolean => {
        if (e.typeIn === "money" && e.typeOut === "money") {
            return false
        }
        if (e.typeIn !== "money" && e.specificTypeIn === "") {
            return true
        }
        if (e.typeOut !== "money" && e.specificTypeOut === "") {
            return true
        }
        return false
    }

    const ProposedTrade = (props: {
        trade: FarmSim.CreateTradeType
    }) => {
        const { trade } = props

        let giveText = ""
        if (trade.typeOut === "money") {
            giveText = `$${trade.amountOut}`
        } else {
            giveText = `${trade.amountOut} ${trade.specificTypeOut}`
        }

        let receiveText = ""
        if (trade.typeIn === "money") {
            receiveText = `$${trade.amountIn}`
        } else {
            receiveText = `${trade.amountIn} ${trade.specificTypeIn}`
        }

        return (
            <>
                <span className="propTrade">
                    Proposed Trade: <br />
                    You give {giveText} and receive {receiveText}
                </span><br />
            </>
        )
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {(form) => (
                <form
                    onSubmit={form.handleSubmit}
                    onReset={form.handleReset}
                >
                    <div className="farmTradeMain">
                        <div className="farmTradeChild">
                            <span className="headerText">
                                In:
                            </span>
                            <select
                                value={form.values.typeIn}
                                onChange={form.handleChange}
                                name="typeIn"
                            >
                                <option value="money">Money</option>
                                <option value="animal">Animal</option>
                                <option value="resource">Resource</option>
                            </select>

                            {form.values.typeIn !== 'money' &&
                                <select
                                    value={form.values.specificTypeIn}
                                    onChange={form.handleChange}
                                    name="specificTypeIn"
                                >
                                    <option value="">Select...</option>
                                    {form.values.typeIn === "animal" &&
                                        <>
                                            <option value="chicken">Chicken</option>
                                            <option value="cow">Cow</option>
                                        </>
                                    }
                                    {form.values.typeIn === "resource" &&
                                        <>
                                            <option value="seed">Seeds</option>
                                            <option value="eggs">Eggs</option>
                                            <option value="wheat">Wheat</option>
                                            <option value="milk">Milk</option>
                                        </>
                                    }
                                </select>
                            }

                            <br />
                            <label htmlFor="amountIn">Amount:</label>
                            <input
                                name="amountIn"
                                type="number"
                                className="number"
                                placeholder="Enter Amount..."
                                onChange={form.handleChange}
                                value={form.values.amountIn}
                                min={0}
                            />
                        </div>

                        <div className="farmTradeChild">
                            <span className="headerText">
                                Out:
                            </span>
                                <select
                                    value={form.values.typeOut}
                                    onChange={form.handleChange}
                                    name="typeOut"
                                >
                                    <option value="money">Money</option>
                                    <option value="animal">Animal</option>
                                    <option value="resource">Resource</option>
                                </select>
                                {form.values.typeOut !== 'money' &&
                                    <select
                                        value={form.values.specificTypeOut}
                                        onChange={form.handleChange}
                                        name="specificTypeOut"
                                    >
                                        <option value="">Select...</option>
                                        {form.values.typeOut === "animal" &&
                                            <>
                                                <option value="chicken">Chicken</option>
                                                <option value="cow">Cow</option>
                                            </>
                                        }
                                        {form.values.typeOut === "resource" &&
                                            <>
                                                <option value="seed">Seeds</option>
                                                <option value="eggs">Eggs</option>
                                                <option value="wheat">Wheat</option>
                                                <option value="milk">Milk</option>
                                            </>
                                        }
                                    </select>
                                }

                                <br />
                                <label htmlFor="amountOut">Amount:</label>
                                <input
                                    name="amountOut"
                                    type="number"
                                    className="number"
                                    placeholder="Enter Amount..."
                                    onChange={form.handleChange}
                                    value={form.values.amountOut}
                                />
                        </div>
                    </div>
                    {!disabled(form.values) &&
                        <ProposedTrade trade={form.values} />
                    }
                    <button
                        className="secondary"
                        type="button"
                        onClick={() => setShowTrade(false)}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={disabled(form.values)}
                    >
                        Send Trade
                    </button>
                </form>
            )}
        </Formik>
    )
}
