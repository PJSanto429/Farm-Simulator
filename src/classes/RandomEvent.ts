import { FarmType } from "./Farm"

interface RandomEventTime {
    startDay: number
    duration: number
}

export interface RandomEvent {
    affectedFarms?: FarmType[]
    createdBy?: number
    time: RandomEventTime

    type: RandomEventType
}

export interface WeatherType {
    type: WeatherTypes
    severity: number // 1-10
    time: RandomEventTime
}

type RandomEventType = "weather" | "market" | "wildlife" | "community"

type WeatherTypes = "rainstorm" | "drought" | "sunny day" | "thunderstorm" | "fog"
//? what each type does:
    //* Rainstorm: Increases crop growth but may cause flooding.
    //* Drought: Decreases crop growth and water availability.
    //* Sunny Day: Boosts crop growth and energy levels.
    //* Thunderstorm: May damage crops or infrastructure.
    //* Fog: Reduces visibility and affects navigation.

// type MarketEvent = "priceRise" | "marketDemand" | "priceFall"
// type WildlifeEvent = "infestation" | "rareAnimal"
// type CommunityEvent = "festival" | "farmersMarket" | "holiday" | "mysteryCrate"

//? some future ideas:
    //* broken equipment
    //* new technology
    //* farm expansion
    //* challenges
    //* community request (assist other farms in challenges)
    //* contests with other farms
