export {}

declare global {

    namespace FarmSim {

        interface GameType {
            farm: FarmType
        
            status: StatusType[]
            otherFarms: OtherFarmType[]
            moveNumber: number
            day: number
            trades: TradeType[]
            dailyPurchases: DailyPurchase[]
        }
        
        interface GameTypeNew {
            farm: FarmTypeNew
        
            otherFarms: OtherFarmType[]
            day: number
            trades: TradeType[]
        
            resourcesData: Record<string, ResourceTypeNew>
            animalData: Record<string, AnimalTypeNew>
        }
        
        interface GameCreateType {
            id: number
            farmName: string
            playerName: string
            money: number
            status: StatusType[]
            otherFarms: OtherFarmType[]
            trades: TradeType[]
            dailyPurchases: DailyPurchase[]
        
            moveNumber: number
            day: number
            
            seedAmt: number
            wheatAmt: number
            eggAmt: number
            milkAmt: number
        
            chickenAmt: number
            cowAmt: number
        }

        interface FarmType {
            id: number
            farmName: string
            playerName: string
            money: number
        
            resources: ResourceType[]
            animals: AnimalType[]
        }

        interface FarmTypeNew {
            id: number
            farmName: string
            playerName: string
            money: number
        
            resources: Record<string, number>
            animals: Record<string, OneAnimalType[]>
        }

        type FarmPersonality = "friendly" | "hostile" | "stupid" | "liar" | "thief"
        
        interface OtherFarmType extends FarmType {
            friendliness: number //* -50 to 50, starts at 0 (no attempts made), 'friending' sets to 5
            personality: FarmPersonality
            friendedAt?: StatusTimeType
        }

        interface CreateTradeType {
            typeIn: string,
            specificTypeIn: string,
            amountIn: number,
        
            typeOut: string,
            specificTypeOut: string,
            amountOut: number,
        
            otherFarmId: number
        }

        interface TradeDetailsCreate {
            type: string
            specificType: string
            amount: number
        }

        interface TradeDetails {
            type: tradeType
            specificType: specificTradeType
            amount: number
        }
        
        interface TradeType {
            toFarm: number
            fromFarm: number
            status: tradeStatus
            dayCreated: number
            id: number
        
            in: TradeDetails //* toFarm
            out: TradeDetails //* fromFarm
        }

        type tradeStatus = "approved" | "declined" | "pending"
        type tradeType = "money" | "animal" | "resource"
        type specificTradeType = "none" | "Cow" | "Chicken" | "Seed" | "Milk" | "Wheat" | "Egg"

        interface DailyPurchase {
            id: number
            in: TradeDetails
            out: TradeDetails
        
            frequency: number
            startDay: number
        
            disabledAt?: number
            disabledReason?: string
            updateDaily: boolean
            // name?: string
        }
        
        interface CreateDailyPurchaseType {
            id: number
            in: TradeDetailsCreate
            out: TradeDetailsCreate
        
            frequency: number
            startDay: number
        
            disabledAt?: number
            updateDaily: boolean
        }
        
        type StatusTypeType = "warning" | "success" | "unknown" | "event"
        type StatusTimePeriodType = "AM" | "PM"
        
        interface StatusTimeType {
            hour: number
            minute: number
            timePeriod: StatusTimePeriodType
        }
        
        interface StatusType {
            message: string
            type: StatusTypeType
            createdAt: {
                day: number
                time: StatusTimeType
            }
        }

        interface AnimalType {
            weight: number
            price: number
            lifespan: number
            name: String
            requiredSpace: number

            food: string
            foodPerDay: number

            output: string
            outputPerDay: number

            amount: number
        }

        type AnimalMoodType = "happy" | "sad" | "hungry" | "thirsty" | "playful" | "sick" | "stressed"

        interface NewAnimalType {           
            weight: number
            price: number
            lifespan: number
            name: String
            requiredSpace: number

            food: string
            foodPerDay: number

            output: string
            outputPerDay: number
        }

        interface AnimalTypeNew {
            weight: number
            price: number
            lifespan: number
            requiredSpace: number

            food: string
            foodPerDay: number

            output: string
            outputPerDay: number
        }

        interface OneAnimalType {
            dayBorn: number
            mood: {
                mood: AnimalMoodType
                daySince: number
            }
        }

        interface ResourceType {
            name: string
            weight: number
            amount: number
            price: number
        }

        interface ResourceTypeNew {
            weight: number
            price: number
        }
        
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
        
        type MarketEvent = "priceRise" | "marketDemand" | "priceFall"
        type WildlifeEvent = "infestation" | "rareAnimal"
        type CommunityEvent = "festival" | "farmersMarket" | "holiday" | "mysteryCrate"
        
        //? some future ideas:
            //* broken equipment
            //* new technology
            //* farm expansion
            //* challenges
            //* community request (assist other farms in challenges)
            //* contests with other farms
        
    }
}