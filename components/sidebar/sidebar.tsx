"use client"

import { ShoppingCart, Plus, Diamond, Home, BarChart2, ChevronRight, ChevronLeft } from 'lucide-react'

import { cn } from "@/utils/cn"
import { categories, dashboard_links } from "@/utils/settings"
import { SidebarItemLink, SidebarItemDropdown } from './components/sidebar-items'
import { useExpandSidebar } from '@/hooks/use-expand-sidebar'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Profile } from './components/profile'

const SidebarItemsLinks = [
  {
    label: "Home",
    href: "/",
    icon: <Home />,
  },
  {
    label: "Dashboard",
    href: "/dashboard/orders",
    icon: <BarChart2 />,
  },
  {
    label: "Create",
    href: "/create",
    icon: <Plus />,
  },
  {
    label: "Cart",
    href: "/cart",
    icon: <ShoppingCart />,
  },
]

const SidebarItemsDropdowns = [
  {
    label: "Products",
    dropdownLinks: categories.filter(({ href }) => href !== "/"),
    icon: <Diamond />
  },
  {
    label: "Dashboard",
    dropdownLinks: dashboard_links,
    icon: <BarChart2 />
  }
]

export const Sidebar = () => {
  const expanded = useExpandSidebar((state) => state.expanded)
  const toggleExpand = useExpandSidebar((state) => state.toggleExpand)

  return (
    <>
    <button className='fixed top-0 left-0 m-2 mt-4 p-1.5 z-20 shadow-md bg-gray-50 hover:bg-gray-100 rounded-lg md:hidden' onClick={toggleExpand}>
      <ChevronRight />
    </button>
    <aside className={cn("fixed -left-20 md:left-0 top-0 z-30 h-screen bg-white border-r md:sticky", expanded && "left-0")}>
      <nav className="h-full flex flex-col">
        <div className="p-4 pb-2 flex justify-between items-center">
            <div className={cn("overflow-hidden transition-all", expanded ? "w-14" : "w-0")}>
                <h1 className="text-black text-sm font-black">SWAPZ</h1>
            </div>
          <button
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            onClick={toggleExpand}
          >
            {expanded ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
        <ScrollArea className='flex-1'>
          <ul className="px-3">
            {SidebarItemsLinks.map((link) => (
              <SidebarItemLink 
                key={link.href} 
                title={link.label} 
                href={link.href}
                className={link.label === "Dashboard" ? "max-lg:hidden" : undefined}
              >
                {link.icon}
              </SidebarItemLink>
            ))}
            {SidebarItemsDropdowns.map((dropdown) => (
              <SidebarItemDropdown 
                key={dropdown.label} 
                title={dropdown.label} 
                dropdownLinks={dropdown.dropdownLinks} 
                className={dropdown.label === "Dashboard" ? "lg:hidden" : undefined}
              >
                {dropdown.icon}
              </SidebarItemDropdown>
            ))}
          </ul>
          <ScrollBar orientation='vertical' />
        </ScrollArea>
        <Profile expanded={expanded} />         
      </nav>
    </aside>
    </>
  )
}
