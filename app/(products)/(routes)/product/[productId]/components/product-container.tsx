import { Truck, Undo2, X, ArchiveRestore, ArchiveX } from "lucide-react"

import { Product } from "@/utils/types"
import { return_item, shipping_products, conditions } from "@/utils/settings"
import { Separator } from "@/components/ui/separator"
import { LikeProduct } from "@/components/buttons/like-product-button"
import { ProductImages } from "@/components/ui/product-images"
import { ProductButton } from "@/components/buttons/product-button"
import { Images } from "./images"
import { User } from "@clerk/nextjs/server"

interface ProductContainer {
    product: Product
    user: User
}

export const ProductContainer: React.FC<ProductContainer> = ({ product, user }) => (
    <div className="flex flex-col lg:flex-row">
        <Images data={product.images} isSold={product.sold} />
        <div className="flex-1 space-y-2 md:mx-4 lg:max-w-[450px]">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="space-x-2">
                <span className="text-md text-gray-500">ID:</span>
                <span className="text-md text-gray-500">{product.id}</span>
            </div>
            <Separator orientation="horizontal" />
            <div>
                <div className="space-x-2">
                    <span className="text-3xl font-bold">$ {product.price}</span>
                </div>
                <span className="text-sm text-gray-500 font-semibold">We don't offer coupons or discounts</span>
            </div>
            <div className="space-x-3 py-5">
                <span className="font-light">condition:</span>
                <span className="text-sm font-bold">
                    {conditions.find(({ query }) => query === product.condition)?.description}
                </span>
            </div>
            <div className="space-y-8 py-4 w-full md:max-lg:max-w-96">
                <div className="w-full flex gap-4 justify-center items-center max-lg:px-2">
                    <ProductButton product={product}/>
                    <LikeProduct product={product} />
                </div>
            </div>  
            <div className="px-4 border lg:rounded-md">
                <div className="border-b flex gap-4 items-center py-4">
                    <div className="relative w-10 rounded-full overflow-hidden">
                        <ProductImages url={user.imageUrl} />
                    </div>
                    <span className="text-sm font-semibold">{`Published by ${user.firstName} ${user.lastName}`}</span>
                </div>
                <div className="border-b flex gap-4 items-center py-4">
                    <Truck size={30} />
                    <span className="text-sm font-semibold">{shipping_products.find(({ label }) => label === product.shipping)?.description}</span>
                </div>
                <div className="border-b flex gap-4 items-center py-4">
                    {product.returnItem ? <Undo2 size={30} /> : <X size={30} />}
                    <span className="text-sm font-semibold">{return_item.find(({ available }) => available === product.returnItem)?.description}</span>
                </div>
                <div className="flex gap-4 items-center py-4">
                    {product.sold ? <ArchiveX size={30} /> : <ArchiveRestore size={30} />}
                    <span className="text-sm font-semibold">
                        {product.sold ? "Product is unavailable in store" : "Product is still available in store"}
                    </span>
                </div>
            </div>
        </div>
    </div>
)