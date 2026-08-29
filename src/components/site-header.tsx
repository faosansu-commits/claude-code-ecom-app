"use client"

import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight02Icon,
  Menu01Icon,
  Search01Icon,
  ShoppingCart01Icon,
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
    <header className="sticky top-0 z-40 bg-background">
      <div className="border-b border-border bg-primary text-primary-foreground">
        <p className="mx-auto max-w-6xl px-4 py-2 text-center text-xs font-medium tracking-wide sm:px-6">
          จัดส่งฟรีทุกออเดอร์ตั้งแต่ 990 บาท · รับประกันของแท้ 100%
        </p>
      </div>
      <div className="border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-xl font-semibold tracking-tight text-foreground">
              SHOP
            </span>
            <span className="font-heading text-xl font-light tracking-tight text-muted-foreground">
              SABAI
            </span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {categories.map((category) => (
                <NavigationMenuItem key={category.id}>
                  <NavigationMenuLink
                    render={<Link href="#" />}
                    className="text-sm font-medium tracking-wide text-foreground/80"
                  >
                    {category.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="ค้นหาสินค้า">
              <HugeiconsIcon icon={Search01Icon} strokeWidth={1.75} />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="บัญชีของฉัน">
              <HugeiconsIcon icon={UserIcon} strokeWidth={1.75} />
            </Button>
            <Button variant="ghost" size="icon" className="relative" aria-label="ตะกร้าสินค้า">
              <HugeiconsIcon icon={ShoppingCart01Icon} strokeWidth={1.75} />
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
                <HugeiconsIcon icon={Menu01Icon} strokeWidth={1.75} />
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
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                    >
                      {category.name}
                      <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.75} className="size-4 text-muted-foreground" />
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
