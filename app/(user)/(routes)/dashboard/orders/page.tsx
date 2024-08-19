import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import prismadb from "@/utils/prismadb"
import { Pagination } from "@/components/products/components/pagination"
import { OrderTableContainer } from "./components/order-table-container"

export default async function Orders({
    searchParams
}: {
    searchParams: { [key: string]: string }
}) {
    const { userId } = auth()

    if(!userId) {
        redirect('/sign-in')
    }

    const { page } = searchParams
    const currPage = parseInt(page) > 0 ? parseInt(page) : 1
    const skip = (currPage - 1) * 10

    const orders = await prismadb.orderItem.findMany({
        where: {
            product: {
                userId,
            },
        },
        include: {
            order: true,
            product: {
                include: {
                    images: true
                }
            }
        },
        take: 10,
        skip
    })

    return (
        <div className="flex-1 max-w-full overflow-hidden pt-10 sm:p-10">
            <div className="flex justify-center gap-4 m-2 pb-2 border-b xl:justify-start">
                <h1 className="text-2xl font-black">Orders</h1>
                {orders.length > 0 && <h1 className="text-2xl font-black">{`(${orders.length})`}</h1>}
            </div>
            <OrderTableContainer orders={orders} />
            <Pagination pages={Math.ceil(orders.length / 10)} />
        </div>
    )
} 