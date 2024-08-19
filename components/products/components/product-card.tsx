"use client"

import { useState } from "react"
import Link from "next/link"
import Skeleton from "react-loading-skeleton"

import "react-loading-skeleton/dist/skeleton.css"
import { Carousel } from "./product-image-carousel"
import { ProductImages } from "@/components/ui/product-images"
import { LikeProduct } from "@/components/buttons/like-product-button"
import { Product } from "@/utils/types"
import { ProductButton } from "@/components/buttons/product-button"
import { cn } from "@/utils/cn"

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, title, price, condition, sold, images, likes } = product
  const [hover, setHover] = useState(false)
  
  return (
    <div
        className="rounded-md border-white hover:border-gray-200 lg:p-4 lg:border"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
    >
      <Link href={`/product/${id}`}>
        <Carousel hover={hover} size={20}>
          {images.map(({ url, id }) => (
            <ProductImages
              key={id}
              url={url}
              sold={sold}
              className="basis-full shrink-0 rounded-none"
            />
          ))}
        </Carousel>
        <div className="py-2 px-3 lg:px-0 flex justify-between items-end">
          <div className="overflow-hidden">
            <h1 className="text-base text-black whitespace-nowrap overflow-hidden overflow-ellipsis">
              {title ? title : <Skeleton />}
            </h1>
            <h3 className="text-base font-semibold text-black whitespace-nowrap overflow-hidden overflow-ellipsis">
              {price ? `${price} €` : <Skeleton />}
            </h3>
            <h5 className="text-sm text-gray-500">{condition ? condition : <Skeleton />}</h5>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            {likes.length > 0 && <span className="font-semibold">{likes.length}</span>}
            <LikeProduct product={product} />
          </div>
        </div>
      </Link>
      <div
        className={cn(
        "hidden lg:flex justify-center duration-150 ease-in-out -translate-y-[50px] opacity-0 hover:translate-y-0 hover:opacity-100",
        hover && "translate-y-0 opacity-100"
        )}
      >
        <ProductButton product={product} />
      </div>
    </div>
  )
}

