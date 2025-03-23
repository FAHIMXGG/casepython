import { PRODUCT_PRICE } from "@/config/products"


export const COLORS = [
    {
        label: 'Black', value: 'black', tw: 'zinc-900'
    },
    {
        label: 'Blue', value: 'blue', tw: 'blue-800'
    },
    {
        label: 'Rose', value: 'rose', tw: 'rose-900'
    },
    {
        label: 'Pink', value: 'pink', tw: '[#FFE7E7]'
    },
    {
        label: 'Green', value: 'green', tw: '[#F3F5E7]'
    },
    {
        label: 'Yellow', value: 'yellow', tw: '[#FFFBE2]'
    },
] as const


export const MODELS = {
    name: 'models',
    options: [
        {
            label: 'iPhone 15',
            value: 'iphone15',
        },
        {
            label: 'iPhone 14',
            value: 'iphone14',
        },
        {
            label: 'iPhone 13',
            value: 'iphone13',
        },
        {
            label: 'iPhone 12',
            value: 'iphone12',
        },
    ]
} as const

export const MATERIALS = {
    name: 'material',
    options: [
        {
            label: 'Silicone',
            value: 'silicone',
            description: undefined,
            price: PRODUCT_PRICE.material.silicone,
        },
        {
            label: 'Soft Polycarbonate',
            value: 'polycarbonate',
            description: "Scratch-resistant and durable",
            price: PRODUCT_PRICE.material.polycarbonate,
        },
    ]
} as const

export const FINISHES = {
    name: 'finish',
    options: [
        {
            label: 'Smooth Finish',
            value: 'smooth',
            description: undefined,
            price: PRODUCT_PRICE.finish.smooth,
        },
        {
            label: 'Textured Finish',
            value: 'textured',
            description: "Soft grippy texture",
            price: PRODUCT_PRICE.finish.textured,
        },
    ]
} as const
