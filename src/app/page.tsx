import Image from "next/image"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  DeliveryReturn01Icon,
  DeliveryTruck01Icon,
  ShieldCheckIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ProductCard, StarRating } from "@/components/product-card"
import { Logo } from "@/components/logo"
import { categories, getDiverseProducts, testimonials } from "@/lib/mock-data"

const FEATURED_PRODUCT_COUNT = 40
const featuredProducts = getDiverseProducts(FEATURED_PRODUCT_COUNT)

const perks = [
  { icon: DeliveryTruck01Icon, title: "จัดส่งฟรี", description: "ทุกคำสั่งซื้อตั้งแต่ 990 บาท" },
  { icon: ShieldCheckIcon, title: "ของแท้ 100%", description: "รับประกันทุกร้านค้า" },
  { icon: Wallet01Icon, title: "ผ่อน 0%", description: "นานสูงสุด 10 เดือน" },
  { icon: DeliveryReturn01Icon, title: "คืนได้ใน 30 วัน", description: "ไม่พอใจ คืนง่าย ไม่มีเงื่อนไข" },
]

const featuredShops = [
  "iStudio by JHOOWA",
  "Bella Closet",
  "Glow Beauty Shop",
  "บ้านและสวนช้อป",
  "Little Star Kids",
  "ครัวคุณย่า",
  "Sport Zone TH",
  "PetLover Shop",
  "หนังสือดีศรีสยาม",
  "Traveler's Bag",
]

const featuredCategorySlugs = [
  "smartphones",
  "women-clothing",
  "men-clothing",
  "skincare",
  "kitchenware",
  "kids-toys",
  "snacks",
  "sportswear",
  "pet-food",
  "watches",
  "books",
  "camping-gear",
  "travel-luggage",
  "furniture",
  "coffee-tea",
  "vitamins-supplements",
  "car-accessories",
  "musical-instruments",
]
const featuredCategories = featuredCategorySlugs
  .map((slug) => categories.find((c) => c.slug === slug))
  .filter((c): c is (typeof categories)[number] => Boolean(c))

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero banner — sits on the page's own white-to-orange gradient body */}
      <section className="relative w-full overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-0 size-[600px] -translate-y-1/2 translate-x-1/3 rounded-full bg-primary/25 blur-3xl"
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_420px] lg:gap-16">
            <div className="max-w-xl">
              <Badge variant="outline" className="border-border py-1.5 text-xs tracking-wide text-muted-foreground uppercase">
                แพลตฟอร์มมาร์เก็ตเพลสอันดับ 1
              </Badge>
              <h1 className="mt-5 font-heading text-4xl leading-[1.1] font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                ซื้อง่าย ขายได้
                <br />
                ทุกอย่างที่ <Logo wordmarkClassName="text-4xl sm:text-5xl lg:text-6xl align-baseline" />
              </h1>
              <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
                รวมสินค้ากว่า 50 หมวดหมู่จากร้านค้าทั่วประเทศไว้ในที่เดียว
                ไอที แฟชั่น ความงาม บ้านและสวน อาหาร และอีกมากมาย ของแท้ทุกชิ้น
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" render={<Link href="#featured" />} nativeButton={false} className="px-8">
                  เริ่มช้อปเลย
                  <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={1.75} data-icon="inline-end" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  render={<Link href="/categories" />}
                  nativeButton={false}
                >
                  ดูหมวดหมู่ทั้งหมด 51+
                  <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={1.75} data-icon="inline-end" />
                </Button>
              </div>

              <div className="mt-8 flex items-center gap-8 border-t border-border pt-6">
                <div>
                  <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">50+</p>
                  <p className="text-sm text-muted-foreground">หมวดหมู่สินค้า</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">4.9</p>
                    <StarRating rating={5} />
                  </div>
                  <p className="text-sm text-muted-foreground">คะแนนความพึงพอใจ</p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xs lg:max-w-none">
              <div className="relative aspect-[896/1200] w-full overflow-hidden rounded-3xl shadow-overlay ring-1 ring-black/10">
                <Image
                  src="/front-Image/designA.jpg"
                  alt="JHOOWA — Grand Opening บนแอปมือถือ"
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 80vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand strip — a navy accent band for rhythm against the warm white/orange page */}
      <section className="bg-[#0D1638]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-10 gap-y-4 px-4 py-8 sm:px-6">
          <p className="w-full text-center text-xs font-medium tracking-widest text-white/50 uppercase sm:w-auto sm:text-left">
            ร้านค้าแนะนำบนแพลตฟอร์ม
          </p>
          <div className="flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-3 sm:w-auto sm:justify-end">
            {featuredShops.map((shop) => (
              <span
                key={shop}
                className="font-heading text-lg font-semibold tracking-tight text-white/80"
              >
                {shop}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Trust perks */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 divide-y divide-border sm:grid-cols-2 sm:gap-6 sm:divide-y-0 lg:grid-cols-4">
          {perks.map((perk) => (
            <div key={perk.title} className="flex items-start gap-3 pt-6 first:pt-0 sm:pt-0">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground">
                <HugeiconsIcon icon={perk.icon} strokeWidth={1.75} className="size-5" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{perk.title}</p>
                <p className="text-sm text-muted-foreground">{perk.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
              ช้อปตามหมวดหมู่
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              เลือกดูสินค้าที่ใช่ จากกว่า {categories.length} หมวดหมู่
            </p>
          </div>
          <Button variant="ghost" render={<Link href="/categories" />} nativeButton={false} className="hidden sm:inline-flex">
            ดูทั้งหมด
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={1.75} data-icon="inline-end" />
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-x-3 gap-y-5 sm:grid-cols-6 sm:gap-x-4 md:grid-cols-9">
          {featuredCategories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group flex flex-col items-center gap-2 text-center"
            >
              <div className="relative size-16 overflow-hidden rounded-full bg-muted ring-1 ring-border transition-all duration-200 group-hover:ring-primary sm:size-20">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <p className="line-clamp-2 text-xs leading-tight font-medium text-foreground">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section id="featured" className="border-t border-border bg-muted">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                สินค้าแนะนำ
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                คัดมาแล้วว่าดีที่สุด {featuredProducts.length} รายการ จากหลากหลายหมวดหมู่
              </p>
            </div>
            <Button variant="ghost" render={<Link href="/categories" />} nativeButton={false} className="hidden sm:inline-flex">
              ดูทั้งหมด
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={1.75} data-icon="inline-end" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            เสียงจากลูกค้าจริง
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            ความไว้วางใจที่สร้างมาจากบริการที่ดีทุกออเดอร์
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="border-none bg-secondary/40 shadow-none"
            >
              <CardContent className="flex h-full flex-col gap-3">
                <span className="font-heading text-4xl leading-none text-primary/40">
                  &ldquo;
                </span>
                <StarRating rating={testimonial.rating} />
                <p className="flex-1 text-sm leading-6 text-foreground">
                  {testimonial.quote}
                </p>
                <div>
                  <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-16 text-center sm:px-6 md:py-20">
          <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
            รับส่วนลดพิเศษก่อนใคร
          </h2>
          <p className="max-w-md text-sm text-primary-foreground/70">
            สมัครรับข่าวสารเพื่อรับโค้ดส่วนลด 10% สำหรับการสั่งซื้อครั้งแรก
            และโปรโมชั่นพิเศษอื่น ๆ ทางอีเมล
          </p>
          <Field orientation="responsive" className="w-full max-w-md pt-2">
            <FieldLabel htmlFor="newsletter-email" className="sr-only">
              อีเมล
            </FieldLabel>
            <Input
              id="newsletter-email"
              type="email"
              placeholder="อีเมลของคุณ"
              className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50"
            />
            <Button variant="secondary" type="submit" className="shrink-0">
              สมัครรับข่าวสาร
            </Button>
          </Field>
        </div>
      </section>
    </div>
  )
}
