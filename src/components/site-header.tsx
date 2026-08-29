"use client"

import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Menu01Icon,
  Search01Icon,
  ShoppingCart01Icon,
  Store01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { categories } from "@/lib/mock-data"

const CART_ITEM_COUNT = 2

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <HugeiconsIcon icon={Store01Icon} strokeWidth={2} className="size-5" />
          </span>
          <span className="font-heading text-lg font-semibold text-foreground">
            ShopSabai
          </span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {categories.map((category) => (
              <NavigationMenuItem key={category.id}>
                <NavigationMenuLink render={<Link href="#" />}>
                  {category.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="ค้นหาสินค้า">
            <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="บัญชีของฉัน">
            <HugeiconsIcon icon={UserIcon} strokeWidth={2} />
          </Button>
          <Button variant="ghost" size="icon" className="relative" aria-label="ตะกร้าสินค้า">
            <HugeiconsIcon icon={ShoppingCart01Icon} strokeWidth={2} />
            {CART_ITEM_COUNT > 0 && (
              <Badge className="absolute -top-1 -right-1 h-4.5 min-w-4.5 justify-center px-1 text-[10px]">
                {CART_ITEM_COUNT}
              </Badge>
            )}
          </Button>

          <Sheet>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="เมนู" />}
            >
              <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>เมนูหมวดหมู่</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-6 pb-6">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href="#"
                    className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                  >
                    <HugeiconsIcon icon={category.icon} strokeWidth={2} className="size-4 text-muted-foreground" />
                    {category.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
