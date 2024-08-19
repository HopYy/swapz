import { clerkClient } from "@clerk/nextjs"

import prismadb from "@/utils/prismadb"
import { NotFoundResponse } from "@/components/errors-response"
import { Description } from "./components/description"
import { Products } from "@/components/products/display-products"
import { getSort, getPrice } from "@/utils/filter"
import { ProductContainer } from "./components/product-container"

export default async function SingleProduct({
    params,
    searchParams: { condition, sort, min_price, max_price, query, page },
    }: {
    params: { productId: string }
    searchParams: { [key: string]: string }
}) {
    const product = await prismadb.product.findUnique({
        where: {
            id: params.productId,
        },
        include: {
            images: true,
            likes: true,
            cart: true,
        },
    })

    if(!product) {
        return <NotFoundResponse />
    }

    const user = await clerkClient.users.getUser(product.userId)
    const orderBy = getSort(sort)
    const price = getPrice(min_price, max_price)
    const currPage = parseInt(page) > 0 ? parseInt(page) : 1
    const skip = (currPage - 1) * 20

    const relatedProducts = await prismadb.product.findMany({
        where:{
            userId: product.userId,
            sold: false,
            condition,
            price,
            title: query && { contains: query },
            NOT: {
                id: product.id
            },
        },
        include: {
            images: true,
            likes: true,
            cart: true,
        },
        orderBy,
        take: 20,
        skip,
    })

    return (
        <div className="flex-1 pb-12 max-w-full sm:pt-3">
            <div className="max-w-[1280px] mx-auto">
                <ProductContainer product={product} user={user} />
                <Description data={product.description} />
            </div>
            <Products 
                products={relatedProducts} 
                pages={Math.ceil(relatedProducts.length / 20)} 
                title={`More from ${user.firstName} ${user.lastName}`}
            />
        </div>
    )
}