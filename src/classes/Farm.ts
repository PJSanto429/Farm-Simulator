export default {}

// import { AnimalType } from "./Animals/Animal"
// import { StatusTimeType } from "./Game"
// import { ResourceType } from "./Resources/Resource"

// export interface FarmType {
//     id: number
//     farmName: string
//     playerName: string
//     money: number

//     resources: ResourceType[]
//     animals: AnimalType[]
// }

// export interface FarmTypeNew {
//     id: number
//     farmName: string
//     playerName: string
//     money: number

//     resources: ResourceType[]
//     animals: AnimalType[]
//     dailyPurchases: DailyPurchase[]
// }

// type FarmPersonality = "friendly" | "hostile" | "stupid" | "liar" | "thief"
// export const FarmPersonalities: FarmPersonality[] = ["friendly", "hostile", "stupid", "liar", "thief"]

// export interface OtherFarmType extends FarmType {
//     friendliness: number //* -50 to 50, starts at 0 (no attempts made), 'friending' sets to 5
//     personality: FarmPersonality
//     friendedAt?: StatusTimeType
// }

// export interface CreateTradeType {
//     typeIn: string,
//     specificTypeIn: string,
//     amountIn: number,

//     typeOut: string,
//     specificTypeOut: string,
//     amountOut: number,

//     otherFarmId: number
// }

// export interface TradeDetailsCreate {
//     type: string
//     specificType: string
//     amount: number
// }

// export interface TradeDetails {
//     type: tradeType
//     specificType: specificTradeType
//     amount: number
// }

// export interface TradeType {
//     toFarm: number
//     fromFarm: number
//     status: tradeStatus
//     dayCreated: number
//     id: number

//     in: TradeDetails //* toFarm
//     out: TradeDetails //* fromFarm
// }
// export type tradeStatus = "approved" | "declined" | "pending"
// export type tradeType = "money" | "animal" | "resource"
// export type specificTradeType = "none" | "Cow" | "Chicken" | "Seed" | "Milk" | "Wheat" | "Egg"

// export interface DailyPurchase {
//     id: number
//     in: TradeDetails
//     out: TradeDetails

//     frequency: number
//     startDay: number

//     disabledAt?: number
//     disabledReason?: string
//     updateDaily: boolean
//     // name?: string
// }

// export interface CreateDailyPurchaseType {
//     id: number
//     in: TradeDetailsCreate
//     out: TradeDetailsCreate

//     frequency: number
//     startDay: number

//     disabledAt?: number
//     updateDaily: boolean
// }
