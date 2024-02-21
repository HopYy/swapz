"use client"

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useMediaQuery } from 'react-responsive';

import { cn } from "@/lib/utils"
import { useToggleHeader } from '@/hooks/use-toggle-header' 

export const SearchProductsInput = () => {
    const searchParams = useSearchParams();
    const { replace } = useRouter()

    const isHeaderResponsive = useMediaQuery({ maxWidth: 1024 });

    const isOpenSearch = useToggleHeader((state) => state.isOpen.search) as boolean;
    const toggleOpenSearch = useToggleHeader((state) => state.toggleOpenSearch); 
    
    const [isFocused, setIsFocused] = useState(false)

    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const term = (event.target as HTMLInputElement).value

            const params = new URLSearchParams(searchParams);
            if(term) {
                params.set('term', term)
            } else {
                params.delete('term')
            }
            replace(`/search?${params.toString()}`)
            isHeaderResponsive && toggleOpenSearch()
        }
    }

    return (
        <div className={cn("lg:block p-0",
            isOpenSearch ? "w-full flex self-start justify-center items-center p-5" : "hidden")
        }>
            <div className="w-full max-w-sm flex flex-col items-start justify-end pt-5 lg:pt-0">
                <input 
                    className='w-full h-[30px] border-b-2 px-2 text-sm outline-none'
                    name='search'
                    type="text" 
                    onFocus={() => {
                        setIsFocused(true)
                    }}
                    onBlur={() => {
                        setIsFocused(false)
                    }}
                    onKeyDown={handleSearch}
                    placeholder={ !isFocused ? "Search" : "" }
                    defaultValue={searchParams.get('term')?.toString()}
                />
            </div>
        </div>
    )
}

