export interface Product {
    id: string
    userId: string
    title: string
    description: string
    price: number
    sold: boolean
    images: Image[]
    shipping: string
    returnItem: boolean
    cart: Cart[]
    likes: Like[]
    category: string
    condition: string
    createdAt: Date 
    updatedAt: Date 
}

export interface Cart {
    id: string
    userId: string
    productId: string
    product?: Omit<Product, 'cart' | 'likes'>
}

export interface Like {
    id: string
    userId: string
    productId: string
    product?: Product
}

export interface Image {
    id: string
    url: string
}

export interface Order {
    id: string
    userId: string
    firstName: string
    lastName: string
    city: string
    phone: string
    address: string
    postalCode: string
    isPaid: boolean
    createdAt: Date
    updatedAt: Date
    orderItems: OrderItem[]
}

export interface OrderItem {
    id: string
    productId: string
    orderId: string
    order: Omit<Order, 'orderItems'>
    product: Omit<Product, 'cart' | 'likes'>
}




