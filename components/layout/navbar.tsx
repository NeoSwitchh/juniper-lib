"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { navMenus, languageOptions } from "@/lib/data/nav-menus"

const bookmarkCount = 2

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="max-w-7xl mx-auto">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 px-4 text-sm font-semibold">
              <span className="text-xl font-bold">Library</span>
            </Link>

            <nav className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  {navMenus.map((menu) => (
                    <NavigationMenuItem key={menu.label}>
                      <NavigationMenuLink
                        href={menu.href}
                        active={false}
                        className={navigationMenuTriggerStyle()}
                      >
                        {menu.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
          </div>

          <div className="flex items-center gap-2 px-4">
            <Button variant="ghost" size="sm" className="h-7 gap-1">
              <span>🔍</span>
              Search
            </Button>

            <button className="relative">
              <Badge
                variant="secondary"
                className="absolute -top-1 -right-1 h-5 w-5 min-w-[20px] rounded-full p-0 text-xs"
              >
                {bookmarkCount}
              </Badge>
            </button>

            <Select defaultValue="en">
              <SelectTrigger className="h-7 w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-transparent bg-transparent px-2 py-1 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[size=sm]:h-7 data-[size=sm]:w-7 data-[size=sm]:p-0">
                <span className="text-sm">👤</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Loans</DropdownMenuItem>
                  <DropdownMenuItem>Bookmarks</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
