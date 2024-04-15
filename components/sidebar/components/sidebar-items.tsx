import React, { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { ChevronUp, ChevronDown } from "lucide-react"
import Link from "next/link"

import { cn } from "@/utils/cn"
import { useExpandSidebar } from '@/hooks/use-expand-sidebar'

interface DropdownLink {
    href: string
    label: string
}

interface SidebarItemsProps {
    children: React.ReactNode
    title: string
    dropdownLinks: DropdownLink[]
    href: string
    className?: string
}

export const SidebarItemLink: React.FC<Omit<SidebarItemsProps, "dropdownLinks">> = ({ children, title, href, className }) => {
    const pathname = usePathname()
    const expanded = useExpandSidebar((state) => state.expanded)
    const close = useExpandSidebar((state) => state.close)

    return (
        <Link href={href} className={cn("my-2 block", className && className)} onClick={close}>
            <div className={cn("flex justify-center p-2 cursor-pointer duration-75 ease-in-out hover:bg-gray-200", 
                expanded ? "rounded-full" : "rounded-md", 
                pathname === href ? "bg-gray-200" : "bg-white"
                )} 
            >
                {React.cloneElement(children as React.ReactElement, { color: pathname === href ? "rgb(0, 0, 0)" : "rgb(102, 102, 102)" })} 
                <div className={cn("overflow-hidden transition-all", expanded ? "w-52 pl-2" : "w-0 h-0")}>
                    <span className={cn("font-semibold", pathname === href ? "text-black" : "text-gray-500")}>{title}</span>
                </div>
            </div>
        </Link>
    )
}

export const SidebarItemDropdown: React.FC<Omit<SidebarItemsProps, "href">> = ({ children, title, dropdownLinks, className }) => {
    const pathname = usePathname()
    const { expanded, close, toggleExpand } = useExpandSidebar()
    const [openDropdown, setOpenDropdown] = useState(false)

    useEffect(() => {
        if(!expanded) {
            setOpenDropdown(false)
        }
    }, [expanded])

    const toggleDropdown = () => {
        if(!expanded) {
            toggleExpand()
            setTimeout(() => {
                setOpenDropdown(true)
            }, 100)
        } else {
            setOpenDropdown(!openDropdown)
        }
    }

    return (
        <div 
            className={cn("my-2 overflow-hidden transition-all", className && className)}
            style={{ height: expanded && openDropdown ? `${(dropdownLinks.length + 1) * 48}px` : "40px"}}
        >
            <div 
                className={cn("flex justify-center p-2 cursor-pointer duration-75 ease-in-out hover:bg-gray-200 z-10", 
                    expanded ? "rounded-full" : "rounded-md",
                    dropdownLinks.some(({ href }) => href === pathname) ? "bg-gray-200" : "bg-white"
                )}
                onClick={toggleDropdown}
            >
                {React.cloneElement(children as React.ReactElement, { 
                    color: openDropdown ? "rgb(0, 0, 0)" : 
                    (dropdownLinks.some(({ href }) => href === pathname) ? "rgb(0, 0, 0)" : "rgb(102, 102, 102)")
                })}
                <div className={cn("flex justify-between overflow-hidden transition-all", expanded ? "w-52 pl-2" : "w-0")}>
                    <span className={cn("font-semibold", 
                        openDropdown ? "text-black" : 
                        (dropdownLinks.some(({ href }) => href === pathname) ? "text-black" : "text-gray-500"))}
                    >{title}</span>
                    {openDropdown ? <ChevronUp color="rgb(102, 102, 102)" className="cursor-pointer" /> 
                    : <ChevronDown color="rgb(102, 102, 102)" className="cursor-pointer" />}
                </div>
            </div>
            <div className={cn("ml-5 transition-all",expanded ? "w-60" : "w-8")}>
                <ul className="flex-1">
                    {dropdownLinks.map((link) => (
                        <li key={link.label} className="mt-2 duration-75 ease-in-out rounded-full hover:bg-gray-200" onClick={close}>
                            <Link href={link.href} className="block p-2">
                                <span className={cn("text-sm", pathname === link.href ? "text-black font-semibold" : "text-gray-500")}>{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}