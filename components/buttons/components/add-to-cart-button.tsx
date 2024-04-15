"use client"

import { useUser } from "@clerk/clerk-react"
import { useRouter } from "next/navigation"

import { Product } from "@/utils/types"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button-component"
import { useUserReaction } from "@/hooks/use-user-reactions"
import { useToggleApi } from "@/hooks/use-toggle-api"

interface AddProductToCartProps {
    product: Product
}

export const ButtonCart: React.FC<AddProductToCartProps> = ({ product }) => {
    const { user } = useUser()
    const { push } = useRouter()
    const { loading, toggleAction } = useToggleApi()
    const reaction = useUserReaction(product.id, product.cart)

    const handleAction = async () => {
        if(!user) {
            push("/sign-in")
        }
        if (user && !loading) {
            const method = reaction.isReacted ? "delete" : "post"
            await toggleAction({
                api: `/api/cart/${reaction.id}`,
                method,
            })
        }
    }

    return !product.sold && (
        <Button className="flex justify-center items-center gap-2" disabled={loading} onClick={handleAction}>
                <ShoppingBag size={20} color="white" />
                <span className="text-white text-sm font-semibold tracking-wide">
                    {reaction.isReacted ? "Remove from cart" : "Add to cart"}
                </span>
        </Button>
    )
}