"use client"

import Image from "next/image"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Add01Icon,
  Delete02Icon,
  Remove01Icon,
  ShoppingCart01Icon,
  ShoppingBag01Icon,
} from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import { formatTHB } from "@/lib/mock-data"

export function CartDrawer() {
  const { items, itemCount, subtotal, removeItem, setQuantity, isHydrated } = useCart()

  return (
    <Sheet>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" className="relative" aria-label="ตะกร้าสินค้า" />}
      >
        <HugeiconsIcon icon={ShoppingCart01Icon} strokeWidth={1.75} />
        {isHydrated && itemCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-4.5 min-w-4.5 justify-center rounded-full px-1 text-[10px]">
            {itemCount}
          </Badge>
        )}
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>ตะกร้าสินค้า{itemCount > 0 ? ` (${itemCount})` : ""}</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <HugeiconsIcon icon={ShoppingBag01Icon} strokeWidth={1.5} className="size-6" />
            </span>
            <p className="font-heading text-base font-medium text-foreground">
              ตะกร้าของคุณว่างเปล่า
            </p>
            <p className="text-sm text-muted-foreground">
              เลือกชมสินค้าแล้วกดเพิ่มลงตะกร้าได้เลย
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <ul className="flex flex-col divide-y divide-border">
                {items.map((item) => (
                  <li key={item.productId} className="flex gap-3 py-4">
                    <div className="relative size-18 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="72px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <p className="line-clamp-2 text-sm font-medium text-foreground">
                        {item.name}
                      </p>
                      <p className="font-mono text-sm font-semibold tabular-nums text-foreground">
                        {formatTHB(item.price)}
                      </p>
                      <div className="mt-1 flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-full border border-input">
                          <button
                            type="button"
                            aria-label="ลดจำนวน"
                            onClick={() => setQuantity(item.productId, item.quantity - 1)}
                            className="flex size-7 items-center justify-center text-muted-foreground hover:text-foreground"
                          >
                            <HugeiconsIcon icon={Remove01Icon} strokeWidth={1.75} className="size-3.5" />
                          </button>
                          <span className="w-4 text-center text-sm tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="เพิ่มจำนวน"
                            onClick={() => setQuantity(item.productId, item.quantity + 1)}
                            className="flex size-7 items-center justify-center text-muted-foreground hover:text-foreground"
                          >
                            <HugeiconsIcon icon={Add01Icon} strokeWidth={1.75} className="size-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          aria-label="ลบสินค้า"
                          onClick={() => removeItem(item.productId)}
                          className="flex size-7 items-center justify-center text-muted-foreground hover:text-destructive"
                        >
                          <HugeiconsIcon icon={Delete02Icon} strokeWidth={1.75} className="size-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto flex flex-col gap-4 border-t border-border p-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">ยอดรวมสินค้า</span>
                <span className="font-mono font-semibold tabular-nums text-foreground">
                  {formatTHB(subtotal)}
                </span>
              </div>
              <Separator />
              <Link href="/checkout" className="w-full">
                <Button className="w-full" size="lg">
                  ดำเนินการชำระเงิน
                </Button>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
