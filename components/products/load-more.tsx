"use client"

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation"; 

import { Button } from "@/components/ui/button"; 

export const LoadMoreButton = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const [limit, setLimit] = useState(20)

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set("limit", JSON.stringify(limit))
        replace(`${pathname}?${params.toString()}`);
    }, [limit])
    
    return (
        <div className="w-full flex justify-center items-center">
            <Button
                onClick={() => 
                    setLimit((prevLimit) => (
                        prevLimit + 20
                    )) 
                }
            >
                Load more
            </Button>
        </div>
    )
}