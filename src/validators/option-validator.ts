

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
            label: 'iPhone 14 Pro',
            value: 'iPhone 14 Pro',
        },
        {
            label: 'iPhone 14 Pro Max',
            value: 'iPhone 14 Pro Max',
        },
        {
            label: 'iPhone 14',
            value: 'iPhone 14',
        },
        {
            label: 'iPhone 14 Plus',
            value: 'iPhone 14 Plus',
        },
    ]
} as const