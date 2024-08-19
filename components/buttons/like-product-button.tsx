"use client"

import { useUser } from "@clerk/clerk-react"
import { useRouter } from "next/navigation"
import { FaHeart, FaRegHeart } from "react-icons/fa"

import { Product } from "@/utils/types"
import { useUserReaction } from "@/hooks/use-user-reactions"
import { useToggleApi } from "@/hooks/use-toggle-api"

interface LikeProductProps {
  product: Product
}

export const LikeProduct: React.FC<LikeProductProps> = ({ product }) => {
  const { user } = useUser()
  const { push } = useRouter()
  const { loading, toggleAction } = useToggleApi()
  const reaction = useUserReaction(product.id, product.likes)

  const handleAction = async () => {
      if(!user) {
          push("/sign-in")
      }
      if (user && !loading) {
          const method = reaction.isReacted ? "delete" : "post"
          await toggleAction({
              api: `/api/likes/${reaction.id}`,
              method,
          })
      }
  }
      
  return (
    <button 
      className="cursor-pointer"
      onClick={(e) => {
          handleAction()
          e.preventDefault()
      }}
      disabled={loading}
    >
      {reaction.isReacted ? <FaHeart size={22} /> : <FaRegHeart size={22} />}
    </button>
  )
}