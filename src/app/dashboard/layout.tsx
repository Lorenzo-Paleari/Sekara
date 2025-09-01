"use client" // componente client side

import { buttonVariants } from "@/components/ui/button" // bottoni
import { Modal } from "@/components/ui/modal" // modale
import { cn } from "@/utils" // utilità classi
import { UserButton } from "@clerk/nextjs" // user menu
import { Gem, Home, Key, LucideIcon, Menu, Settings, X } from "lucide-react" // icone
import Link from "next/link" // link nextjs
import { PropsWithChildren, useState } from "react" // props e stato

// tipizzazione item sidebar
interface SidebarItem {
  href: string
  icon: LucideIcon
  text: string
}

// tipizzazione categoria sidebar
interface SidebarCategory {
  category: string
  items: SidebarItem[]
}

// voci sidebar
const SIDEBAR_ITEMS: SidebarCategory[] = [
  {
    category: "Overview",
    items: [{ href: "/dashboard", icon: Home, text: "Dashboard" }],
  },
  {
    category: "Account",
    items: [{ href: "/dashboard/upgrade", icon: Gem, text: "Upgrade" }],
  },
  {
    category: "Settings",
    items: [
      { href: "/dashboard/api-key", icon: Key, text: "API Key" },
      {
        href: "/dashboard/account-settings",
        icon: Settings,
        text: "Account Settings",
      },
    ],
  },
]


// sidebar con logo, menu e user button
const Sidebar = ({ onClose, hideLogo = false }: { onClose?: () => void; hideLogo?: boolean }) => {
  return (
    <div className="space-y-4 md:space-y-6 relative z-20 flex flex-col h-full">
      {/* logo sekara */}
      {!hideLogo && (
        <p className="hidden sm:block text-4xl/7 font-semibold text-brand-900 mb-6">
          Se<span className="text-brand-700">Kara</span>
        </p>
      )}

      {/* voci menu */}
      <div className="flex-grow">
        <ul>
          {SIDEBAR_ITEMS.map(({ category, items }) => (
            <li key={category} className="mb-4 md:mb-8">
              <p className="text-xs font-medium leading-6 text-zinc-500">
                {category}
              </p>
              <div className="-mx-2 flex flex-1 flex-col">
                {items.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-full justify-start group flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium leading-6 text-zinc-700 hover:bg-gray-50 transition"
                    )}
                    onClick={onClose}
                  >
                    <item.icon className="size-4 text-zinc-500 group-hover:text-zinc-700" />
                    {item.text}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* user button in fondo */}
      <div className="flex flex-col">
        <hr className="my-4 md:my-6 w-full h-px bg-gray-100" />

        <UserButton
          showName
          appearance={{
            elements: {
              userButtonBox: "flex-row-reverse",
            },
          }}
        />
      </div>
    </div>
  )
}


// layout dashboard con sidebar e mobile drawer
const Layout = ({ children }: PropsWithChildren) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false) // stato drawer mobile

  return (
    <div className="relative h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      {/* sidebar desktop */}
      <div className="hidden md:block w-64 lg:w-80 border-r border-gray-100 p-6 h-full text-brand-900 relative z-10">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* header mobile con menu */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <p className="text-lg/7 font-semibold text-brand-900">
            Se<span className="text-brand-700">Kara</span>
          </p>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="text-gray-500 hover:text-gray-600"
            aria-label="Open navigation menu"
          >
            <Menu className="size-6" />
          </button>
        </div>

        {/* contenuto principale */}
        <div className="flex-1 overflow-y-auto bg-gray-50 shadow-md p-4 md:p-6 relative z-10">
          <div className="relative min-h-full flex flex-col">
            <div className="h-full flex flex-col flex-1 space-y-4">
              {children}
            </div>
          </div>
        </div>

        {/* drawer mobile con sidebar */}
        <Modal
          className="p-4"
          showModal={isDrawerOpen}
          setShowModal={setIsDrawerOpen}
        >
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg/7 font-semibold text-brand-900">
              Se<span className="text-brand-700">Kara</span>
            </p>
            <button
              aria-label="Close modal"
              onClick={() => setIsDrawerOpen(false)}
            >
              <X className="size-6" />
            </button>
          </div>

          <Sidebar onClose={() => setIsDrawerOpen(false)} hideLogo={true} />
        </Modal>
      </div>
    </div>
  )
}

export default Layout
