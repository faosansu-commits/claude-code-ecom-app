"use client"

import { useState, type CSSProperties, type MouseEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Add01Icon,
  ArrowRight02Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  DeliveryTruck01Icon,
  HeartIcon,
  Home01Icon,
  Remove01Icon,
  ShieldCheckIcon,
  ShoppingCart01Icon,
  Store01Icon,
  Tick02Icon,
  ZoomInIcon,
} from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ProductCard, StarRating } from "@/components/product-card"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"
import {
  discountPercent,
  formatSoldCount,
  formatTHB,
  productGallery,
  type Category,
  type Product,
} from "@/lib/mock-data"

export function ProductDetailClient({
  product,
  category,
  relatedProducts,
}: {
  product: Product
  category: Category
  relatedProducts: Product[]
}) {
  const images = productGallery(product.image)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZooming, setIsZooming] = useState(false)
  const [zoomStyle, setZoomStyle] = useState<CSSProperties>({})
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const { addItem } = useCart()
  const discount = discountPercent(product)

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomStyle({ transformOrigin: `${x}% ${y}%` })
  }

  function handleAddToCart() {
    addItem(product, quantity)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1600)
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="flex items-center gap-1 transition-colors hover:text-primary">
          <HugeiconsIcon icon={Home01Icon} strokeWidth={1.75} className="size-3.5" />
          หน้าแรก
        </Link>
        <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.75} className="size-3.5" />
        <Link href={`/category/${category.slug}`} className="transition-colors hover:text-primary">
          {category.name}
        </Link>
        <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.75} className="size-3.5" />
        <span className="line-clamp-1 text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div
            className="group relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-2xl bg-muted"
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
            onClick={() => setLightboxOpen(true)}
          >
            <Image
              src={images[activeIndex]}
              alt={`${product.name} — ภาพที่ ${activeIndex + 1}`}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              style={isZooming ? zoomStyle : undefined}
              className={cn(
                "object-cover transition-transform duration-200 ease-out",
                isZooming && "scale-[1.8]"
              )}
            />
            <span className="pointer-events-none absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-subtle backdrop-blur transition-opacity group-hover:opacity-100">
              <HugeiconsIcon icon={ZoomInIcon} strokeWidth={1.75} className="size-3.5" />
              ซูมภาพ / ดูขนาดเต็ม
            </span>
            {discount > 0 && (
              <Badge variant="destructive" className="absolute top-3 left-3">
                ลด {discount}%
              </Badge>
            )}
          </div>

          <div className="mt-3 grid grid-cols-4 gap-3">
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`ดูภาพมุมที่ ${i + 1}`}
                aria-pressed={activeIndex === i}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-lg bg-muted ring-2 transition-colors",
                  activeIndex === i ? "ring-primary" : "ring-transparent hover:ring-border"
                )}
              >
                <Image src={img} alt="" fill sizes="120px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div>
            <Link
              href={`/category/${category.slug}`}
              className="mb-2 flex w-fit items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <HugeiconsIcon icon={Store01Icon} strokeWidth={1.75} className="size-3.5" />
              ขายโดย {product.shopName}
            </Link>
            <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
              {product.name}
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{product.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
            <span className="flex items-center gap-1.5">
              <StarRating rating={product.rating} />
              <span className="font-medium text-foreground">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviewCount} รีวิว)</span>
            </span>
            <span className="text-muted-foreground">
              ขายแล้ว {formatSoldCount(product.soldCount)} ชิ้น
            </span>
          </div>

          <Separator />

          <div className="flex items-baseline gap-3">
            <span className="font-mono text-3xl font-semibold tabular-nums text-foreground">
              {formatTHB(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="font-mono text-lg tabular-nums text-muted-foreground line-through">
                {formatTHB(product.compareAtPrice)}
              </span>
            )}
            {discount > 0 && <Badge variant="destructive">ประหยัด {discount}%</Badge>}
          </div>

          <Separator />

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-foreground">จำนวน</span>
            <div className="flex items-center gap-1 rounded-full border border-input">
              <button
                type="button"
                aria-label="ลดจำนวน"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex size-9 items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <HugeiconsIcon icon={Remove01Icon} strokeWidth={1.75} className="size-4" />
              </button>
              <span className="w-6 text-center text-sm font-medium tabular-nums">{quantity}</span>
              <button
                type="button"
                aria-label="เพิ่มจำนวน"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex size-9 items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <HugeiconsIcon icon={Add01Icon} strokeWidth={1.75} className="size-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={justAdded}
            >
              <HugeiconsIcon
                icon={justAdded ? Tick02Icon : ShoppingCart01Icon}
                strokeWidth={1.75}
                data-icon="inline-start"
              />
              {justAdded ? "เพิ่มลงตะกร้าแล้ว" : "เพิ่มลงตะกร้า"}
            </Button>
            <Button
              size="lg"
              className="flex-1"
              render={<Link href="/checkout" />}
              nativeButton={false}
              onClick={() => addItem(product, quantity)}
            >
              ซื้อเลย
            </Button>
            <Button
              variant="ghost"
              size="icon-lg"
              aria-label={wishlisted ? "นำออกจากรายการโปรด" : "เพิ่มในรายการโปรด"}
              aria-pressed={wishlisted}
              onClick={() => setWishlisted((v) => !v)}
              className="shrink-0 border border-input"
            >
              <HugeiconsIcon
                icon={HeartIcon}
                strokeWidth={1.75}
                fill={wishlisted ? "currentColor" : "none"}
                className={cn(wishlisted && "text-destructive")}
              />
            </Button>
          </div>

          <div className="grid gap-3 rounded-xl border border-border bg-muted/40 p-4 sm:grid-cols-2">
            <div className="flex items-center gap-2.5 text-sm">
              <HugeiconsIcon icon={ShieldCheckIcon} strokeWidth={1.75} className="size-4.5 text-primary" />
              <span className="text-foreground">รับประกันของแท้ 100%</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <HugeiconsIcon icon={DeliveryTruck01Icon} strokeWidth={1.75} className="size-4.5 text-primary" />
              <span className="text-foreground">จัดส่งฟรีเมื่อครบ 990 บาท</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={1.75} className="size-4.5 text-primary" />
              <span className="text-foreground">คืนสินค้าได้ภายใน 30 วัน</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 font-heading text-lg font-semibold text-foreground sm:text-xl">
            สินค้าที่เกี่ยวข้อง
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D1638]/95 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="ปิด"
            className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
          </button>
          <div
            className="relative h-[65vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={`${product.name} — ภาพขยาย`}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
          <div className="mt-5 flex gap-2" onClick={(e) => e.stopPropagation()}>
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`ดูภาพมุมที่ ${i + 1}`}
                className={cn(
                  "relative size-14 overflow-hidden rounded-lg ring-2 transition-colors",
                  activeIndex === i ? "ring-white" : "ring-white/20"
                )}
              >
                <Image src={img} alt="" fill sizes="56px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
