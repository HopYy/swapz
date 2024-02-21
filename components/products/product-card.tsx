"use client"

import Image from "next/image"
import Link from "next/link";

import { Product } from "@/lib/types" 

export const  ProductCard = ({ 
    product 
}: { 
    product: Product 
}) => {
    return (
        <Link href={`/product/${product.id}`} className="py-5 flex justify-center">
            <div className="w-full overflow-hidden lg:p-4 border-none cursor-pointer">
                <div className="p-0 space-x-0">
                        <div className="w-full aspect-square relative rounded-md overflow-hidden">
                            <Image 
                                src={product.images[0].url}
                                fill={true}
                                sizes="100%"
                                priority={true}
                                alt="Product image"
                                style={{
                                    objectFit:"cover",
                                    objectPosition:"center",
                                }}
                            />
                        </div>
                </div>
                <div className="px-3 lg:px-0">
                    <div className="p-0 my-2">
                        <div className="text-lg font-normal whitespace-nowrap overflow-hidden overflow-ellipsis hover:underline">{product.title}</div>
                    </div>
                    <div className="flex-col justify-end items-start p-0">
                        <div className="w-full flex justify-between items-center">
                            <span className="font-semibold text-lg text-black">{product.price} €</span>
                        </div>
                        <span className="text-gray-500">{product.condition}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}