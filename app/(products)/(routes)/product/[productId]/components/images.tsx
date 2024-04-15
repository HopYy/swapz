"use client"

import { useState, useEffect } from "react"
import { MoveDiagonal } from "lucide-react"

import { cn } from "@/utils/cn"
import { Image } from "@/utils/types"
import { ProductImages } from "@/components/ui/product-images"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Carousel } from "@/components/products/components/product-image-carousel"

interface ImagesProps {
    data: Image[]
    isSold: boolean
}

export const Images: React.FC<ImagesProps> = ({ data, isSold }) => {
    const [fullscreen, setFullscreen] = useState(false)
    const [URL, setURL] = useState(data[0].url)

    useEffect(() => {
        if (fullscreen) {
            document.body.classList.add("overflow-hidden")
        } else {
            document.body.classList.remove("overflow-hidden")
        }

        return () => {
            document.body.classList.remove("overflow-hidden")
        }
    }, [fullscreen])

    return (
        <div className={cn("flex-1 flex flex-col justify-end items-center gap-3", fullscreen && "w-screen h-screen fixed inset-0 z-30 bg-white")}>
            <div className={cn("relative w-full max-w-[600px]", fullscreen && "max-w-full")}>
                {fullscreen ? (
                    <Carousel size={40}>
                        {data.map(({ url, id }) => (
                            <ProductImages
                                key={id}
                                url={url}
                                sold={isSold}
                                className="min-w-full h-screen"
                            />
                        ))}
                    </Carousel>
                ) : (
                    <ProductImages 
                        url={URL} 
                        sold={isSold} 
                        className={cn("flex-1 bg-gray-100", fullscreen && "hidden")} 
                    />
                )}
                <div 
                    className="absolute top-0 right-0 p-2 rounded-full shadow-md m-2 cursor-pointer bg-white"
                    onClick={() => setFullscreen(!fullscreen)}
                >
                    <MoveDiagonal size={30} />
                </div>
            </div>
            {data.length > 1 && (
                <ScrollArea className={cn("max-sm:w-screen sm:max-w-[600px] pb-2", fullscreen && "hidden")}>
                    <div className="flex justify-start items-center gap-4 p-2">
                        {data.map(({ id, url }) => (
                            <div 
                                key={id} 
                                className={cn("w-28 lg:w-40 cursor-pointer", URL !== url && "opacity-45")}
                                onClick={() => setURL(url)}
                            >
                                <ProductImages className="w-full" url={url} sold={isSold} /> 
                            </div>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            )} 
        </div>
    )
}