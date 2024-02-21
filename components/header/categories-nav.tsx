"use client"

import Link from "next/link"
import { usePathname } from "next/navigation" 

import { cn } from "@/lib/utils"
import { useToggleHeader } from "@/hooks/use-toggle-header" 
import { Separator } from "@/components/ui/separator"
import { routes } from "@/lib/routes" 
import { SearchProductsInput } from "@/components/header/search-products";

export const CategoriesNavbar = () => {
    const pathname = usePathname()

    const isOpenMenu = useToggleHeader((state) => state.isOpen.menu) as boolean;
    const isOpenSearch = useToggleHeader((state) => state.isOpen.search) as boolean;

    return (
        <>
            <div className={cn("lg:max-w-[1280px] lg:mx-auto lg:flex justify-between duration-150 items-center lg:translate-x-0 lg:opacity-100", 
                isOpenMenu || isOpenSearch ? "w-full h-full translate-x-0 opacity-100" : "translate-x-[-100%] opacity-0")
            }>
                <nav className={cn("bg-white lg:flex justify-center items-center py-2 space-x-4",
                    isOpenMenu 
                        ? "w-full self-end flex-col items-start border-[1px] rounded-t-2xl" 
                        : "hidden"
                )}>
                    {routes.map((route) => (
                        <div
                            key={route.href}
                            className="flex items-center ml-4 lg:ml-0"
                        >
                            {route.icon && (
                                <img
                                    src={route.icon} 
                                    className="w-[25px] h-[25px] mr-4 lg:hidden"
                                    alt="Category icon" 
                                />
                            )}  
                            <Link 
                                href={route.href}
                                className={cn(
                                    "text-xl my-2 text-center lg:text-sm whitespace-nowrap text-black",
                                    route.href === pathname ? "text-black font-medium underline" : "lg:text-gray-500"
                                )}
                            >
                                {route.label}
                            </Link>
                        </div>
                    ))}
                </nav>
                <SearchProductsInput />
            </div>
            <Separator className="hidden lg:block" />
        </>
    )
}

