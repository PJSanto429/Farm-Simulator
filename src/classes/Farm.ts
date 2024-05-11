import { AnimalType } from "./Animals/Animal"
import { StatusTimeType } from "./Game"
import { ResourceType } from "./Resources/Resource"

export interface FarmType {
    id: number
    farmName: string
    playerName: string
    money: number

    resources: ResourceType[]
    animals: AnimalType[]
    // trades: TradeType[]
}

type FarmPersonality = "friendly" | "hostile" | "stupid" | "liar" | "thief"
export const FarmPersonalities: FarmPersonality[] = ["friendly", "hostile", "stupid", "liar", "thief"]

export interface OtherFarmType extends FarmType {
    friendliness: number //* -50 to 50, starts at 0 (no attempts made), 'friending' sets to 5
    personality: FarmPersonality
    friendedAt?: StatusTimeType
}

export interface CreateTradeType {
    typeIn: string,
    specificTypeIn: string,
    amountIn: number,

    typeOut: string,
    specificTypeOut: string,
    amountOut: number,

    otherFarmId: number
}

export interface TradeType {
    toFarm: number
    fromFarm: number
    status: tradeStatus
    dayCreated: number
    id: number

    in: { //* toFarm
        type: tradeType
        specificType: specificTradeType
        amount: number
    }
    out: { //* fromFarm
        type: tradeType
        specificType: specificTradeType
        amount: number
    }
}
export type tradeStatus = "approved" | "declined" | "pending"
export type tradeType = "money" | "animal" | "resource"
export type specificTradeType = "cow" | "chicken" | "seeds" | "milk" | "wheat" | "eggs"
