"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/utils/cn"

interface PaginationProps {
    pages: number
}

export const Pagination: React.FC<PaginationProps> = ({ pages }) => {
    const { push } = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)

    const [currPage, setCurrPage] = useState(parseInt(params.get('page') ?? '1'))

    const changePage = (page: number) => {
        setCurrPage(page)
        params.set('page', page.toString())
        push(`?page=${page}`)
        window.scrollTo(0, 0)
    }

    const handleNextPage = () => {
        if (currPage < pages) {
            changePage(currPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currPage > 1) {
            changePage(currPage - 1)
        }
    }

    if(pages < 2) {
        return null
    }

    return (
        <div className="w-fit mx-auto py-5">
            <div className="flex justify-center items-center">
                <button 
                    onClick={handlePrevPage} 
                    disabled={currPage <= 1} 
                    className={cn("px-2 py-1 rounded-md hover:bg-gray-200", currPage <= 1 && "cursor-not-allowed")}
                >
                    <ChevronLeft className="text-black" />
                </button>
                <div className="px-2 space-x-2">
                    <span className="text-black text-sm font-semibold">{currPage}</span>
                    <span className="text-gray-300 text-sm font-semibold">/</span>
                    <span className="text-gray-300 text-sm font-semibold">{pages}</span>
                </div>
                <button 
                    onClick={handleNextPage} 
                    disabled={currPage >= pages} 
                    className={cn("px-2 py-1 rounded-md hover:bg-gray-200", currPage >= pages && "cursor-not-allowed")}
                >
                    <ChevronRight className="text-black" />
                </button>
            </div>
        </div>
    )
}
