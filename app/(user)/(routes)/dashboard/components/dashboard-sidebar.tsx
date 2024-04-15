"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/utils/cn"
import { dashboard_links } from "@/utils/settings"

export const DashboardSidebar = () => {
    const pathname = usePathname()

    return (
        <div className="h-screen sticky top-0 left-0 border-r hidden lg:block">
            <h1 className="text-md font-black p-4 my-5">Dashboard</h1>
            <nav>
                <ul className="space-y-3 p-2">
                    {dashboard_links.map((link) => (
                        <li 
                            key={link.href} 
                            className={cn("duration-75 ease-in-out rounded-md overflow-hidden hover:bg-gray-200", 
                            pathname === link.href ? "bg-gray-200" : "bg-white")}
                        >
                            <Link href={link.href}>
                                <div className="w-52 h-10 p-2">
                                    <span className="text-md font-semibold">{link.label}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}