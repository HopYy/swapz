"use client"

import { useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Search } from 'lucide-react'

export const SearchInput = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const [isFocused, setIsFocused] = useState(false)

    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const querySearch = (event.target as HTMLInputElement).value
        const params = new URLSearchParams(searchParams)
    
        if(event.key === 'Enter') {
            if(querySearch !== "") {
                params.set('query', querySearch)
                router.push(`${pathname}?query=${params.get('query')?.toString()}`)
            } else {
                router.push(pathname)
            }
        }
    }

    return (
        <div className='flex items-center'>
            <input 
                className='w-full px-4 h-10 bg-transparent text-sm outline-none'
                name='search'
                type="text" 
                onFocus={() => {
                    setIsFocused(true)
                }}
                onBlur={() => {
                    setIsFocused(false)
                }}
                onKeyDown={handleSearch}
                placeholder={!isFocused ? "Search" : ""}
                defaultValue={searchParams.get('query')?.toString()}
            />
            {!isFocused && (
                <div className='mr-5'>
                    <Search size={18} color='rgb(156, 155, 154)' />
                </div>
            )}
        </div>
    )
}

