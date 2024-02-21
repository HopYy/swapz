"use client"

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
 
import { OptionsFilterBox } from "./options-filter-box" 
import { InputPrice } from './input-price' 
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const conditions = [
  { label: 'new', query: 'new' },
  { label: 'used', query: 'used' },
  { label: 'damaged', query: 'damaged' }
];

const sortBy = [
  { label: 'lowest price', query: 'price_low' },
  { label: 'the highest price', query: 'price_high' },
  { label: 'newly added', query: 'newly_added' },
];

export const FilterProducts = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleChange = (parameterName: string, parameterValue: string) => {
    const params = new URLSearchParams(searchParams);

    if(parameterValue) {
        params.set(parameterName, parameterValue)
    } else {
        params.delete(parameterName)
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="mx-2 lg:ml-0">
        <h1 className="mb-1 mt-5 font-bold text-black">Filter</h1>
        <ScrollArea className='py-3'>
          <div className="flex justify-start flex-nowrap gap-4 py-3">
              <OptionsFilterBox 
                options={sortBy}
                parameterName='sort'
                placeholder='Sort products'
                onChange={handleChange}
              />
              <OptionsFilterBox 
                options={conditions}
                parameterName='condition'
                placeholder='Select condition'
                onChange={handleChange}
              />
              <InputPrice 
                placeholder='Min'
                parameterName='min_price'
                onChange={handleChange}
              />
              <InputPrice 
                placeholder='Max'
                parameterName='max_price'
                onChange={handleChange}
              />
          </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}