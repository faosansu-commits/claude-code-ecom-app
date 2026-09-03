"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  HeartIcon,
  ShoppingCart01Icon,
  StarIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import { discountPercent, formatSoldCount, formatTHB, type Product } from "@/lib/mock-data"

const badgeVariant: Record<
  NonNullable<Product["badge"]>,
  "default" | "secondary" | "destructive"
> = {
  ใหม่: "secondary",
  ลดราคา: "destructive",
  ขายดี: "default",
}

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <HugeiconsIcon
          key={i}
          icon={StarIcon}
          strokeWidth={0}
          fill="currentColor"
          className={cn(
            "size-3.5",
            i < Math.round(rating) ? "text-tertiary" : "text-border"
          )}
        />
      ))}
    </div>
  )
}

export function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const { addItem } = useCart()
  const discount = discountPercent(product)

  function handleAddToCart() {
    addItem(product, 1)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1600)
  }

  return (
    <Card
      size="sm"
      className="group overflow-hidden shadow-none transition-all duration-200 hover:-translate-y-[3px] hover:border-border hover:shadow-product-hover"
    >
      <div className="relative aspect-square bg-muted">
        <Link href={`/product/${product.id}`} className="absolute inset-0" aria-label={product.name}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover"
          />
        </Link>
        <div className="pointer-events-none absolute top-3 left-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <Badge variant="destructive" className="pointer-events-auto">
              -{discount}%
            </Badge>
          )}
          {product.badge && (
            <Badge variant={badgeVariant[product.badge]} className="pointer-events-auto">
              {product.badge}
            </Badge>
          )}
        </div>
        <button
          type="button"
          onClick={() => setWishlisted((v) => !v)}
          aria-label={wishlisted ? "นำออกจากรายการโปรด" : "เพิ่มในรายการโปรด"}
          aria-pressed={wishlisted}
          className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-background/90 text-muted-foreground shadow-subtle backdrop-blur transition-colors hover:text-destructive"
        >
          <HugeiconsIcon
            icon={HeartIcon}
            strokeWidth={1.75}
            fill={wishlisted ? "currentColor" : "none"}
            className={cn("size-4", wishlisted && "text-destructive")}
          />
        </button>
      </div>
      <CardHeader className="gap-1">
        <h3 className="line-clamp-1 font-heading text-base font-medium text-foreground">
          <Link href={`/product/${product.id}`} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-1 text-sm text-muted-foreground">
          {product.description}
        </p>
        <p className="line-clamp-1 text-xs text-muted-foreground/70">
          ขายโดย {product.shopName}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-lg font-semibold tabular-nums text-foreground">
            {formatTHB(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="font-mono text-sm tabular-nums text-muted-foreground line-through">
              {formatTHB(product.compareAtPrice)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <StarRating rating={product.rating} />
          <span>{product.rating}</span>
          <span aria-hidden>·</span>
          <span>ขายแล้ว {formatSoldCount(product.soldCount)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleAddToCart} disabled={justAdded}>
          <HugeiconsIcon
            icon={justAdded ? Tick02Icon : ShoppingCart01Icon}
            strokeWidth={1.75}
            data-icon="inline-start"
          />
          {justAdded ? "เพิ่มแล้ว" : "เพิ่มลงตะกร้า"}
        </Button>
      </CardFooter>
    </Card>
  )
}
