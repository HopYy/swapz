export type Image = {
    id: string
    url: string
}

export type Product = {
    id: string
    title: string
    description: string
    price: number
    sold: boolean
    images: Image[]
    category: string
    condition: string
}

