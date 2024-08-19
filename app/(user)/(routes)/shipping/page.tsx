import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Truck } from "lucide-react"

import prismadb from "@/utils/prismadb"
import { OrderForm } from "@/components/form/order/order-form"

export default async function ShippingProducts() {
    const { userId } = auth()

    if (!userId) {
      redirect('/sign-in')
    }
  
    const cart = await prismadb.cart.findMany({
      where: {
        userId,
      },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
    })

    if(!cart.length) {
      redirect('/')
    }

    return (
        <div className="flex-1 min-h-screen flex justify-center items-center">
            <div className="w-full max-w-96 mx-auto p-5 sm:rounded-xl sm:border">
                <div className="flex items-center gap-2 my-7">
                    <Truck size={25} />
                    <h1 className="font-semibold text-xl">Delivery details</h1>
                </div>
                <OrderForm />
            </div>
        </div>
    )
}