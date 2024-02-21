"use client"

import { useState } from "react" 
import Image from "next/image"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area" 

interface ImagesProductProps {
    images: Array<{
        url: string
        id: string
    }>;
}

export const ImagesProduct: React.FC<ImagesProductProps> = ({ 
    images 
}) => {
    const [urlImage, setUrlImage] = useState(images[0].url)
 
    return (
        <div className="w-full max-w-[500px] flex flex-col justify-center items-center">
            <div className="w-full aspect-square relative overflow-hidden">
                <Image
                    src={urlImage}
                    fill={true}
                    sizes="100%"
                    priority={true}
                    alt="Product image"
                    style={{
                        objectFit:"contain",
                        objectPosition:"center",
                    }}
                />
            </div>
            {images.length > 1 && (
                <ScrollArea>
                    <div  className="flex gap-x-4 my-4">
                        {images.map(({ url, id }) => (        
                        <div 
                            key={id}
                            className="w-[80px] aspect-square relative rounded-md overflow-hidden cursor-pointer"
                        >
                            <Image
                                src={url}
                                fill={true}
                                sizes="100%"
                                priority={true}
                                alt="Product image"
                                style={{
                                    objectFit:"cover",
                                    objectPosition:"center",
                                }}
                                onClick={() => {
                                    setUrlImage(url)
                                }}
                            />
                        </div>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            )}
        </div>
    )
}