'use client'

import { UserButton } from "@clerk/nextjs";
import Link from "next/link"
import { ShoppingCart, Plus, Menu, Search } from 'lucide-react';

import { cn } from "@/lib/utils"; 
import { useToggleHeader } from "@/hooks/use-toggle-header"; 
import { Separator } from "@/components/ui/separator"
import { CategoriesNavbar } from "./categories-nav"; 

export const Header = () => {
    const isOpenSearch = useToggleHeader((state) => state.isOpen.search) as boolean;
    const toggleOpenMenu = useToggleHeader((state) => state.toggleOpenMenu);
    const toggleOpenSearch = useToggleHeader((state) => state.toggleOpenSearch);

    return (
        <header className={cn(
            "fixed bottom-0 left-0 z-20 w-full flex flex-col-reverse pt-0 lg:static lg:block",
            isOpenSearch && ("h-full bg-white")
        )}>
            <div className="w-full max-w-[1280px] px-4 flex justify-between items-center mx-auto bg-white py-2">
                <Link href="/" className="hidden lg:block text-lg text-black font-black tracking-widest hover:underline">SWAPZ</Link>
                <div className="w-full flex justify-between items-center space-x-4 lg:justify-end">
                    <Menu 
                        onClick={toggleOpenMenu}
                        className="lg:hidden"
                    />
                    <Search 
                        onClick={toggleOpenSearch}
                        className="lg:hidden"
                    />
                    <Link href="/create">
                        <Plus />
                    </Link>
                    <Link href="/cart">
                        <ShoppingCart />
                    </Link>
                    <Link href="/profile">
                        <UserButton afterSignOutUrl="/sign-in" />
                    </Link>
                </div>
            </div>
            <Separator className="hidden lg:block my-2" />
            <CategoriesNavbar />
        </header>
    )
}