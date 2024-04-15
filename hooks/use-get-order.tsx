import { create } from "zustand"

import { OrderItem } from "@/utils/types"

interface OrderState {
    order: OrderItem | undefined
    setOrder: (order: OrderItem | undefined) => void
}

export const useOrder = create<OrderState>((set) => ({
    order: undefined,
    setOrder: (order) => {
        set(() => ({ order }))
    },
}))