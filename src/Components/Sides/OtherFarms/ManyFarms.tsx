import { useEffect, useState } from "react"
import { CreateTradeType, OtherFarmType } from "../../../classes/Farm"
import { OneFarm } from "./OneFarm"
import "./index.css"
import { ViewOneFarm } from "./ViewOneFarm"

export const ManyFarms = (props: {
    farms: OtherFarmType[]
    onTradeSent: (e: CreateTradeType) => void
}) => {
    const {
        farms,
        onTradeSent
    } = props
    const [farmToView, setFarmToView] = useState<OtherFarmType | null>()
    const [defaultTrade, setDefaultTrade] = useState(false)

    return (
        <div className="manyFarms">
            {!!farmToView &&
                <ViewOneFarm
                    farm={farmToView}
                    setFarmToView={() => setFarmToView(null)}
                    defaultTrade={defaultTrade}
                    onTradeSent={onTradeSent}
                />
            }
            {!farmToView &&
            <>
                {farms.map(
                    (farm) => (
                        <OneFarm
                            key={farm.id}
                            onSetFarmToView={
                                (openTrade) => {
                                    setFarmToView(farm)
                                    setDefaultTrade(openTrade)
                                }
                            }
                            farm={farm}
                        />
                    )
                )}
            </>
            }
        </div>
    )
}
