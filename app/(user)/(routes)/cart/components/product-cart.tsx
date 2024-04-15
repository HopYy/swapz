import Link from "next/link"

import "react-loading-skeleton/dist/skeleton.css"
import { Product } from "@/utils/types"
import { ProductImages } from "@/components/ui/product-images"
import { DeleteOrder } from "@/app/(user)/(routes)/cart/components/delete-order"

interface ProductCartProps {
    id: string
    product: Omit<Product, "cart" | "likes"> | undefined 
}

export const ProductCart: React.FC<ProductCartProps> = ({ id, product }) => {
    if(!product) {
        return
    }

    const { id: productId, images, sold, category, condition, title, price } = product

    return (
        <Link href={`/product/${productId}`} className="flex space-x-4">
            <div className="max-w-40 grow shrink-0 basis-0">
                <ProductImages url={images[0].url} sold={sold} />
            </div>
            <div className="flex-1 flex flex-col sm:flex-row justify-between items-start overflow-hidden">
                <div className="max-w-full flex flex-col overflow-hidden">
                    <span className="text-md font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">{title}</span>
                    <span className="text-sm font-medium">{category}</span>
                    <span className="text-sm font-medium">{condition}</span>
                    <span className="text-sm font-medium">{sold ? 'unavailable' : 'available'}</span>
                </div>
                <div className="w-full flex justify-between items-end sm:flex-col-reverse sm:h-full sm:w-min">
                    <span className="text-lg font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">{price} €</span>
                    <DeleteOrder id={id} />
                </div>
            </div>
        </Link>
    )
}
