"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight02Icon,
  CheckmarkSquare02Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FilterHorizontalIcon,
  Home01Icon,
  Square01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ProductCard } from "@/components/product-card"
import { cn } from "@/lib/utils"
import {
  categories,
  discountPercent,
  type Category,
  type Product,
} from "@/lib/mock-data"

const PAGE_SIZE = 4

type SortKey = "recommended" | "bestselling" | "newest" | "price-asc" | "price-desc"

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "แนะนำ" },
  { value: "bestselling", label: "ขายดีที่สุด" },
  { value: "newest", label: "มาใหม่" },
  { value: "price-asc", label: "ราคา: ต่ำ-สูง" },
  { value: "price-desc", label: "ราคา: สูง-ต่ำ" },
]

const ratingOptions = [4, 3, 2]

export function CategoryPageClient({
  category,
  products,
}: {
  category: Category
  products: Product[]
}) {
  const [sortBy, setSortBy] = useState<SortKey>("recommended")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [minRating, setMinRating] = useState<number | null>(null)
  const [discountOnly, setDiscountOnly] = useState(false)
  const [priceMin, setPriceMin] = useState("")
  const [priceMax, setPriceMax] = useState("")
  const [page, setPage] = useState(1)

  const availableBrands = useMemo(
    () =>
      Array.from(new Set(products.map((product) => product.brand))).sort((a, b) =>
        a.localeCompare(b, "th")
      ),
    [products]
  )

  const filtered = useMemo(() => {
    const min = priceMin ? Number(priceMin) : undefined
    const max = priceMax ? Number(priceMax) : undefined

    return products.filter((product) => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false
      }
      if (minRating !== null && product.rating < minRating) return false
      if (discountOnly && discountPercent(product) <= 0) return false
      if (min !== undefined && !Number.isNaN(min) && product.price < min) return false
      if (max !== undefined && !Number.isNaN(max) && product.price > max) return false
      return true
    })
  }, [products, selectedBrands, minRating, discountOnly, priceMin, priceMax])

  const sorted = useMemo(() => {
    const list = [...filtered]
    switch (sortBy) {
      case "bestselling":
        return list.sort((a, b) => b.soldCount - a.soldCount)
      case "newest":
        return list.sort((a, b) => b.id - a.id)
      case "price-asc":
        return list.sort((a, b) => a.price - b.price)
      case "price-desc":
        return list.sort((a, b) => b.price - a.price)
      default:
        return list
    }
  }, [filtered, sortBy])

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  function resetFilters() {
    setSelectedBrands([])
    setMinRating(null)
    setDiscountOnly(false)
    setPriceMin("")
    setPriceMax("")
    setPage(1)
  }

  function toggleBrand(brand: string) {
    setPage(1)
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
  }

  function toggleRating(value: number) {
    setPage(1)
    setMinRating((prev) => (prev === value ? null : value))
  }

  const hasActiveFilters =
    selectedBrands.length > 0 || minRating !== null || discountOnly || priceMin !== "" || priceMax !== ""

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="flex items-center gap-1 transition-colors hover:text-primary">
          <HugeiconsIcon icon={Home01Icon} strokeWidth={1.75} className="size-3.5" />
          หน้าแรก
        </Link>
        <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.75} className="size-3.5" />
        <span className="text-foreground">{category.name}</span>
      </nav>

      {/* Category hero banner */}
      <div className="relative mb-8 h-32 w-full overflow-hidden rounded-2xl bg-muted sm:h-40">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1638]/80 via-[#0D1638]/45 to-[#0D1638]/10" />
        <div className="absolute inset-y-0 left-0 flex flex-col justify-center gap-1 px-6 sm:px-8">
          <h1 className="font-heading text-2xl font-semibold text-white sm:text-3xl">
            {category.name}
          </h1>
          <p className="text-sm text-white/80">พบสินค้าทั้งหมด {products.length} รายการ</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <FiltersPanel
              category={category}
              availableBrands={availableBrands}
              selectedBrands={selectedBrands}
              onToggleBrand={toggleBrand}
              minRating={minRating}
              onToggleRating={toggleRating}
              discountOnly={discountOnly}
              onToggleDiscountOnly={() => {
                setPage(1)
                setDiscountOnly((v) => !v)
              }}
              priceMin={priceMin}
              priceMax={priceMax}
              onPriceMinChange={(v) => {
                setPage(1)
                setPriceMin(v)
              }}
              onPriceMaxChange={(v) => {
                setPage(1)
                setPriceMax(v)
              }}
              hasActiveFilters={hasActiveFilters}
              onReset={resetFilters}
            />
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0">
          {/* Toolbar */}
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-sm text-muted-foreground">เรียงโดย:</span>
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setSortBy(option.value)
                    setPage(1)
                  }}
                  className={cn(
                    "h-[34px] rounded-full border-[1.5px] border-input px-3.5 text-xs font-medium whitespace-nowrap transition-colors",
                    sortBy === option.value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-card text-foreground hover:bg-muted"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <p className="text-sm whitespace-nowrap text-muted-foreground">
                แสดง {sorted.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0}–
                {Math.min(currentPage * PAGE_SIZE, sorted.length)} จาก {sorted.length} รายการ
              </p>
              <Sheet>
                <SheetTrigger
                  render={
                    <Button variant="outline" size="sm" className="shrink-0 lg:hidden" />
                  }
                >
                  <HugeiconsIcon icon={FilterHorizontalIcon} strokeWidth={1.75} data-icon="inline-start" />
                  ตัวกรอง
                  {hasActiveFilters && (
                    <span className="ml-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      •
                    </span>
                  )}
                </SheetTrigger>
                <SheetContent side="left" className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>ตัวกรองสินค้า</SheetTitle>
                  </SheetHeader>
                  <div className="px-6 pb-6">
                    <FiltersPanel
                      category={category}
                      availableBrands={availableBrands}
                      selectedBrands={selectedBrands}
                      onToggleBrand={toggleBrand}
                      minRating={minRating}
                      onToggleRating={toggleRating}
                      discountOnly={discountOnly}
                      onToggleDiscountOnly={() => {
                        setPage(1)
                        setDiscountOnly((v) => !v)
                      }}
                      priceMin={priceMin}
                      priceMax={priceMax}
                      onPriceMinChange={(v) => {
                        setPage(1)
                        setPriceMin(v)
                      }}
                      onPriceMaxChange={(v) => {
                        setPage(1)
                        setPriceMax(v)
                      }}
                      hasActiveFilters={hasActiveFilters}
                      onReset={resetFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Product grid */}
          {paginated.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {paginated.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-20 text-center">
              <p className="font-heading text-lg font-medium text-foreground">
                ไม่พบสินค้าตามเงื่อนไขที่เลือก
              </p>
              <p className="text-sm text-muted-foreground">
                ลองปรับตัวกรองใหม่ดูอีกครั้ง
              </p>
              <Button variant="outline" onClick={resetFilters}>
                ล้างตัวกรองทั้งหมด
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-1.5">
              <Button
                variant="outline"
                size="icon-sm"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-label="หน้าก่อนหน้า"
              >
                <HugeiconsIcon icon={ChevronLeftIcon} strokeWidth={1.75} />
              </Button>
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNumber = i + 1
                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={cn(
                      "flex size-[34px] items-center justify-center rounded-full text-sm font-medium transition-colors",
                      pageNumber === currentPage
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    )}
                    aria-current={pageNumber === currentPage ? "page" : undefined}
                  >
                    {pageNumber}
                  </button>
                )
              })}
              <Button
                variant="outline"
                size="icon-sm"
                disabled={currentPage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                aria-label="หน้าถัดไป"
              >
                <HugeiconsIcon icon={ChevronRightIcon} strokeWidth={1.75} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FiltersPanel({
  category,
  availableBrands,
  selectedBrands,
  onToggleBrand,
  minRating,
  onToggleRating,
  discountOnly,
  onToggleDiscountOnly,
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
  hasActiveFilters,
  onReset,
}: {
  category: Category
  availableBrands: string[]
  selectedBrands: string[]
  onToggleBrand: (brand: string) => void
  minRating: number | null
  onToggleRating: (value: number) => void
  discountOnly: boolean
  onToggleDiscountOnly: () => void
  priceMin: string
  priceMax: string
  onPriceMinChange: (value: string) => void
  onPriceMaxChange: (value: string) => void
  hasActiveFilters: boolean
  onReset: () => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-heading text-sm font-semibold text-foreground">ตัวกรอง</h2>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="text-xs font-medium text-primary hover:underline"
            >
              ล้างทั้งหมด
            </button>
          )}
        </div>

        <h3 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          หมวดหมู่
        </h3>
        <ul className="flex flex-col gap-0.5">
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/category/${c.slug}`}
                className={cn(
                  "block rounded-lg px-2.5 py-1.5 text-sm transition-colors",
                  c.id === category.id
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Separator />

      <div>
        <h3 className="mb-2.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          แบรนด์
        </h3>
        <div className="flex flex-col gap-2">
          {availableBrands.map((brand) => {
            const checked = selectedBrands.includes(brand)
            return (
              <button
                key={brand}
                type="button"
                onClick={() => onToggleBrand(brand)}
                aria-pressed={checked}
                className="flex items-center gap-2 text-left text-sm text-foreground"
              >
                <HugeiconsIcon
                  icon={checked ? CheckmarkSquare02Icon : Square01Icon}
                  strokeWidth={1.75}
                  className={cn("size-4.5 shrink-0", checked ? "text-primary" : "text-muted-foreground")}
                />
                {brand}
              </button>
            )
          })}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-2.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          ช่วงราคา (บาท)
        </h3>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            inputMode="numeric"
            placeholder="ต่ำสุด"
            value={priceMin}
            onChange={(e) => onPriceMinChange(e.target.value)}
            className="h-9 px-3 text-sm"
          />
          <span className="text-muted-foreground">–</span>
          <Input
            type="number"
            inputMode="numeric"
            placeholder="สูงสุด"
            value={priceMax}
            onChange={(e) => onPriceMaxChange(e.target.value)}
            className="h-9 px-3 text-sm"
          />
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-2.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          คะแนนรีวิว
        </h3>
        <div className="flex flex-col gap-2">
          {ratingOptions.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onToggleRating(value)}
              aria-pressed={minRating === value}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors",
                minRating === value
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-foreground hover:bg-muted"
              )}
            >
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <HugeiconsIcon
                    key={i}
                    icon={StarIcon}
                    strokeWidth={0}
                    fill="currentColor"
                    className={cn("size-3.5", i < value ? "text-tertiary" : "text-border")}
                  />
                ))}
              </span>
              ขึ้นไป
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <button
          type="button"
          onClick={onToggleDiscountOnly}
          aria-pressed={discountOnly}
          className="flex items-center gap-2 text-left text-sm text-foreground"
        >
          <HugeiconsIcon
            icon={discountOnly ? CheckmarkSquare02Icon : Square01Icon}
            strokeWidth={1.75}
            className={cn("size-4.5 shrink-0", discountOnly ? "text-primary" : "text-muted-foreground")}
          />
          มีส่วนลดเท่านั้น
        </button>
      </div>
    </div>
  )
}
