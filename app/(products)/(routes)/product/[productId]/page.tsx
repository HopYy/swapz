import { FaRegHeart } from "react-icons/fa" 

import prismadb from "@/lib/prismadb"
import { Button } from "@/components/ui/button"
import { ErrorResponse } from "@/components/error-response" 
import { ImagesProduct } from "./components/images-product" 

export default async function ProductsByCategories({
    params
}: {
    params: { productId: string }
}) {
    const product = await prismadb.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
            images: true
        }
    })

    if(!product) {
        return <ErrorResponse />
    }

    return (
        <div className="flex flex-wrap justify-center items-start py-10">
            <ImagesProduct  
                images={product.images}
            />
            <div className="max-w-[500px] px-3 py-4 lg:px-10">
                <div className="flex flex-col items-start text-start lg:items-end lg:text-end">
                    <h1 className="text-3xl font-semibold">{product.title}</h1>
                    <span className="text-xl font-medium">{product.price} €</span>
                    {/* add max width */}
                    <p className="w-full text-lg">{product.description}</p>
                </div>
                <div className="my-5 w-full flex gap-4 justify-center items-center lg:justify-end">
                    <Button>add to Basket</Button>
                    <FaRegHeart className="text-black text-2xl cursor-pointer" />
                </div>

            </div>
        </div>
    )
}