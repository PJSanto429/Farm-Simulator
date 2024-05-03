export interface ResourceType {
    name: string
    weight: number
    amount: number
}

export const Seed: ResourceType = {
    name: "Seed",
    weight: 0.1,
    amount: 0
}

export const Egg: ResourceType = {
    name: "Egg",
    weight: .3,
    amount: 0
}

export const Wheat: ResourceType = {
    name: "Wheat",
    weight: .2,
    amount: 0
}

export const Milk: ResourceType = {
    name: "Milk",
    weight: .8,
    amount: 0
}
