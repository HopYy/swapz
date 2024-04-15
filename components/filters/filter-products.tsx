"use client"

import { useSearchParams, usePathname, useRouter } from "next/navigation"
 
import { sortBy, conditions } from "@/utils/settings"
import { OptionsFilterBox } from "./components/options-filter-box" 
import { InputPrice } from "./components/input-price" 
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { SearchInput } from "@/components/search/search"

export const FilterProducts = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleChange = (parameterName: string, parameterValue: string) => {
    const params = new URLSearchParams(searchParams)
    if(parameterValue) {
        params.set(parameterName, parameterValue)
    } else {
        params.delete(parameterName)
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex gap-y-4 flex-col-reverse justify-between items-start xl:flex-row">
      <div className="relative max-xl:mx-auto max-w-full">
          <ScrollArea className="pb-3">
            <div className="flex justify-start flex-nowrap gap-4">
                <OptionsFilterBox 
                  options={sortBy}
                  parameterName="sort"
                  placeholder="Sort products"
                  onChange={handleChange}
                />
                <OptionsFilterBox 
                  options={conditions}
                  parameterName="condition"
                  placeholder="Select condition"
                  onChange={handleChange}
                />
                <InputPrice 
                  placeholder="Min"
                  parameterName="min_price"
                  onChange={handleChange}
                />
                <InputPrice 
                  placeholder="Max"
                  parameterName="max_price"
                  onChange={handleChange}
                />
            </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="xl:w-1/3 xl:pl-3 xl:block p-0 max-lg:w-full max-xl:mx-auto lg:max-xl:w-1/2">
        <div className="mx-auto bg-gray-100 overflow-hidden sm:rounded-full">
            <SearchInput />
        </div>
    </div>
    </div>
  )
}