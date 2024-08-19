"use client"

import { X } from "lucide-react"

import { useToggleApi } from "@/hooks/use-toggle-api"

interface DeleteOrderProps {
    id: string
}

export const DeleteOrder: React.FC<DeleteOrderProps> = ({ id }) => {
    const { loading, toggleAction } = useToggleApi()
    
    const onDelete = async () => {
        await toggleAction({
            api: `/api/cart/${id}`,
            method: "delete",
            message: "Removed from cart",
        })
    }

    return (
        <button disabled={loading} onClick={(e) => {
            e.preventDefault()
            onDelete()
        }}>
            <X />
        </button>
    )
}