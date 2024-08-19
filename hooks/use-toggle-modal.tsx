import { create } from "zustand"

interface useToggleModal {
    isOpen: boolean
    open: () => void
    close: () => void
}

export const useToggleModal = create<useToggleModal>((set) => ({
    isOpen: false,
    open: () => {
        set({ isOpen: true })
    },
    close: () => {
        set({ isOpen: false })
    },
}))
