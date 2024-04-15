"use client"

import { useRouter } from "next/navigation"

import { Cart } from "@/utils/types"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button-component"
import { CheckoutCards } from "./checkout-cards"

interface CheckoutContainerProps {
  cart: Cart[]
}

export const CheckoutContainer: React.FC<CheckoutContainerProps> = ({ cart }) => {
  const router = useRouter()

  const productPrice = cart.map(({ id, product }) => 
    product && (<span key={id} className="text-gray-500 text-sm">{`+ ${product.price}`}</span>))

  const totalPrice = cart.reduce((total, c) => 
    total + (c.product ? c.product.price : 0), 0)

  const handleRedirect = () => {
    if(totalPrice > 0) {
      router.push('/shipping')
    }
  }

  return (
    <div className="grow shrink-0 space-y-4 lg:max-w-[450px]">
      <div className="space-y-4 rounded-sm p-4 lg:border">
        <div className="flex flex-col items-start">
          {productPrice}
        </div>
        <div className="space-x-4">
            <span className="text-gray-500 text-sm">total:</span>
            <span className="text-black text-lg font-semibold">{totalPrice} €</span>
        </div>
        <div className="flex justify-center lg:justify-start">
            <Button disabled={totalPrice === 0} onClick={handleRedirect} spinner={false}>
              <span className="text-white text-sm font-semibold tracking-wide">Proceed to checkout</span>
            </Button>
        </div>
        <Separator orientation="horizontal" />
        <CheckoutCards />
      </div>
      <div className="p-2 rounded-sm text-center lg:border">
        <span className="text-gray-500 font-semibold text-xs">We don't offer coupons or discounts</span>
      </div>
    </div>
  )
}
