"use client"
 
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { VideoIcon, FolderIcon, TagIcon, SettingsIcon } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarItems = [
  { name: "Videos", icon: VideoIcon, href: "/dashboard/videos" },
  { name: "Categories", icon: FolderIcon, href: "/dashboard/categories" },
  { name: "Subcategories", icon: TagIcon, href: "/dashboard/subcategories" },
  { name: "Settings", icon: SettingsIcon, href: "/dashboard/settings" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-white dark:bg-gray-800 lg:block dark:border-r-gray-700">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <VideoIcon className="h-6 w-6" />
            <span className="">Video Dashboard</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-2 py-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.name}
                asChild
                variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
