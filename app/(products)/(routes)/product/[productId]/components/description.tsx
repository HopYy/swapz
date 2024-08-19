"use client"

import { useState, useEffect, useRef } from "react"

import { cn } from "@/utils/cn"

interface DescriptionProps {
    data: string
}

export const Description: React.FC<DescriptionProps> = ({ data }) => {
    const [showMore, setShowMore] = useState(false)
    const [isOverflowing, setIsOverflowing] = useState(false)

    const descriptionRef = useRef<HTMLParagraphElement | null>(null)

    const isOverflowActive = (element: HTMLParagraphElement | null) => {
        if (!element) return false 
        return element.offsetHeight < element.scrollHeight
    }

    useEffect(() => {
        if (isOverflowActive(descriptionRef.current)) {
            setIsOverflowing(true)
            return
        }
    
        setIsOverflowing(false)
    }, [isOverflowActive])

    return (
        <div className="w-full py-10">
            <h1 className="text-xl font-bold">Description</h1>
            <div ref={descriptionRef} className={cn("overflow-hidden relative", !showMore && "max-h-40")}>
                <p className="text-start text-md text-wrap break-words">{data}</p>
                {!showMore && isOverflowing && (
                    <div className="w-full bg-gradient-to-t from-white to-transparent pt-6 absolute bottom-0 left-0 text-center">
                        <span 
                            className="text-sm font-semibold text-gray-500 cursor-pointer"
                            onClick={() => {
                                setShowMore(true)
                            }}
                        >See more...</span>
                    </div>
                )}
            </div>
        </div>
    )
}