"use client"

import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight02Icon,
  Grid02Icon,
  Login01Icon,
  Menu01Icon,
  PackageIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { AccountMenu } from "@/components/account-menu"
import { CartDrawer } from "@/components/cart-drawer"
import { DepartmentMenu } from "@/components/department-menu"
import { Logo } from "@/components/logo"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { departments } from "@/lib/mock-data"
import { getDepartmentMeta } from "@/lib/department-meta"

const HEADER_DEPARTMENTS = departments.slice(0, 7)

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background">
      {/* Utility bar */}
      <div className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
          <p className="text-xs font-medium tracking-wide">
            จัดส่งฟรีทุกออเดอร์ตั้งแต่ 990 บาท · รับประกันของแท้ 100%
          </p>
          <div className="hidden items-center gap-4 text-xs font-medium sm:flex">
            <Link href="/track-order" className="flex items-center gap-1 hover:underline">
              <HugeiconsIcon icon={PackageIcon} strokeWidth={1.75} className="size-3.5" />
              ติดตามคำสั่งซื้อ
            </Link>
            <span className="opacity-40">|</span>
            <Link href="/login" className="flex items-center gap-1 hover:underline">
              <HugeiconsIcon icon={Login01Icon} strokeWidth={1.75} className="size-3.5" />
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-border bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center">
            <Logo />
          </Link>

          <nav className="hidden items-center md:flex">
            {HEADER_DEPARTMENTS.map((dept) => (
              <DepartmentMenu key={dept.slug} name={dept.name} slug={dept.slug} />
            ))}
            <Link
              href="/categories"
              className="ml-1 flex items-center gap-1.5 rounded-lg bg-accent px-2.5 py-2 text-sm font-semibold tracking-wide text-primary transition-colors hover:bg-accent/70"
            >
              <HugeiconsIcon icon={Grid02Icon} strokeWidth={1.75} className="size-3.5" />
              ทั้งหมด
            </Link>
          </nav>

          <div className="flex items-center gap-0.5 rounded-full bg-muted/60 p-1">
            <Button variant="ghost" size="icon" className="hidden rounded-full sm:inline-flex" aria-label="ค้นหาสินค้า">
              <HugeiconsIcon icon={Search01Icon} strokeWidth={1.75} />
            </Button>
            <AccountMenu />
            <CartDrawer />

            <Sheet>
              <SheetTrigger
                render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="เมนู" />}
              >
                <HugeiconsIcon icon={Menu01Icon} strokeWidth={1.75} />
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>เมนู</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1 px-6 pb-6">
                  <Link
                    href="/login"
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                  >
                    เข้าสู่ระบบ / บัญชีของฉัน
                    <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.75} className="size-4 text-muted-foreground" />
                  </Link>
                  <Link
                    href="/track-order"
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                  >
                    ติดตามคำสั่งซื้อ
                    <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.75} className="size-4 text-muted-foreground" />
                  </Link>

                  <Separator className="my-2" />

                  <Link
                    href="/categories"
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-primary hover:bg-muted"
                  >
                    หมวดหมู่ทั้งหมด (51+)
                    <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.75} className="size-4" />
                  </Link>

                  {departments.map((dept) => {
                    const meta = getDepartmentMeta(dept.slug)
                    return (
                      <Link
                        key={dept.slug}
                        href={`/categories#${dept.slug}`}
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                      >
                        <span className="flex items-center gap-2.5">
                          {meta && (
                            <span
                              className="flex size-7 shrink-0 items-center justify-center rounded-md"
                              style={{ backgroundColor: `${meta.color}1A`, color: meta.color }}
                            >
                              <HugeiconsIcon icon={meta.icon} strokeWidth={1.75} className="size-3.5" />
                            </span>
                          )}
                          {dept.name}
                        </span>
                        <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.75} className="size-4 text-muted-foreground" />
                      </Link>
                    )
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
