"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/clerk-react"

import { Product } from "@/utils/types"
import { ButtonCart } from "./components/add-to-cart-button"
import { EditProduct } from "./components/edit-product-button"

interface ProductButtonProps {
    product: Product
}

export const ProductButton: React.FC<ProductButtonProps> = ({ product }) => {
    const { user } = useUser()
    const [isMounted, setIsMounted] = useState(false)
    
    useEffect(() => {
        setIsMounted(true)
      }, [])
    
      if (!isMounted) {
        return null
    }

    return user && (
        <>
        {user.id === product.userId && <EditProduct id={product.id} />}
        {user.id !== product.userId && <ButtonCart product={product} />}
        </>
    )
}