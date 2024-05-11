export interface ResourceType {
    name: string
    weight: number
    amount: number
    price: number
}

export const Seed: ResourceType = {
    name: "Seed",
    weight: 0.1,
    amount: 0,
    price: .01
}

export const Egg: ResourceType = {
    name: "Egg",
    weight: .3,
    amount: 0,
    price: .5
}

export const Wheat: ResourceType = {
    name: "Wheat",
    weight: .2,
    amount: 0,
    price: 1.15
}

export const Milk: ResourceType = {
    name: "Milk",
    weight: .8,
    amount: 0,
    price: 1
}
