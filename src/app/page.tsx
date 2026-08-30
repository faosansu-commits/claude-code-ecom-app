import Image from "next/image"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  DeliveryReturn01Icon,
  DeliveryTruck01Icon,
  ShieldCheckIcon,
  ShoppingCart01Icon,
  StarIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  brands,
  categories,
  formatTHB,
  products,
  testimonials,
} from "@/lib/mock-data"

const perks = [
  { icon: DeliveryTruck01Icon, title: "จัดส่งฟรี", description: "ทุกคำสั่งซื้อตั้งแต่ 990 บาท" },
  { icon: ShieldCheckIcon, title: "ของแท้ 100%", description: "รับประกันศูนย์ทุกชิ้น" },
  { icon: Wallet01Icon, title: "ผ่อน 0%", description: "นานสูงสุด 10 เดือน" },
  { icon: DeliveryReturn01Icon, title: "คืนได้ใน 30 วัน", description: "ไม่พอใจ คืนง่าย ไม่มีเงื่อนไข" },
]

const badgeVariant: Record<NonNullable<(typeof products)[number]["badge"]>, "default" | "secondary" | "destructive"> = {
  ใหม่: "secondary",
  ลดราคา: "destructive",
  ขายดี: "default",
}

function StarRating({ rating }: { rating: number }) {
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

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <div className="flex flex-col items-start gap-6">
            <Badge variant="outline" className="border-foreground/15 py-1.5 text-xs tracking-wide text-muted-foreground uppercase">
              คอลเลกชันใหม่ประจำปี 2026
            </Badge>
            <h1 className="font-heading text-4xl leading-[1.1] font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              เทคโนโลยีที่ใช่
              <br />
              สำหรับชีวิตที่ใช่
            </h1>
            <p className="max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              คัดสรรสมาร์ทโฟน แล็ปท็อป และอุปกรณ์เสริมจากแบรนด์ชั้นนำทั่วโลก
              ของแท้ทุกชิ้น พร้อมบริการหลังการขายที่ไว้ใจได้
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" render={<Link href="#featured" />} nativeButton={false} className="px-8">
                ช้อปคอลเลกชัน
                <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={1.75} data-icon="inline-end" />
              </Button>
              <Button size="lg" variant="outline" render={<Link href="#categories" />} nativeButton={false} className="px-8">
                ดูหมวดหมู่ทั้งหมด
              </Button>
            </div>

            <div className="mt-4 flex items-center gap-8 border-t border-border pt-6">
              <div>
                <p className="font-heading text-2xl font-semibold text-foreground">50,000+</p>
                <p className="text-sm text-muted-foreground">ลูกค้าที่ไว้วางใจ</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="font-heading text-2xl font-semibold text-foreground">4.9</p>
                  <StarRating rating={5} />
                </div>
                <p className="text-sm text-muted-foreground">คะแนนความพึงพอใจ</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80&auto=format&fit=crop"
                alt="MacBook รุ่นล่าสุดวางอยู่บนโต๊ะทำงาน"
                fill
                priority
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <Card className="absolute -bottom-6 -left-6 hidden w-56 shadow-lg sm:block">
              <CardContent className="flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <HugeiconsIcon icon={ShieldCheckIcon} strokeWidth={1.75} className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">รับประกันของแท้</p>
                  <p className="text-xs text-muted-foreground">ศูนย์ไทยทุกชิ้น</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Brand strip */}
      <section className="border-y border-border bg-muted">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-10 gap-y-4 px-4 py-8 sm:px-6">
          <p className="w-full text-center text-xs font-medium tracking-widest text-muted-foreground uppercase sm:w-auto sm:text-left">
            แบรนด์ที่เราจำหน่าย
          </p>
          <div className="flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-3 sm:w-auto sm:justify-end">
            {brands.map((brand) => (
              <span
                key={brand}
                className="font-heading text-lg font-semibold tracking-tight text-muted-foreground/70"
              >
                {brand}
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
      <section id="categories" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
              ช้อปตามหมวดหมู่
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              เลือกดูสินค้าที่ใช่ ตรงใจคุณมากที่สุด
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {categories.map((category) => (
            <Link key={category.id} href="#" className="group">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="text-sm font-medium text-white">{category.name}</p>
                  <p className="text-xs text-white/70">{category.productCount} รายการ</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section id="featured" className="border-t border-border bg-muted">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                สินค้าแนะนำ
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                คัดมาแล้วว่าดีที่สุดในสัปดาห์นี้
              </p>
            </div>
            <Button variant="ghost" render={<Link href="#" />} nativeButton={false}>
              ดูทั้งหมด
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={1.75} data-icon="inline-end" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card
                key={product.id}
                size="sm"
                className="overflow-hidden shadow-none transition-all duration-200 hover:-translate-y-[3px] hover:border-border hover:shadow-product-hover"
              >
                <div className="relative aspect-[4/3] bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  {product.badge && (
                    <Badge
                      variant={badgeVariant[product.badge]}
                      className="absolute top-3 left-3"
                    >
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <CardHeader className="gap-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-base font-medium text-foreground">
                      {product.name}
                    </h3>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <HugeiconsIcon icon={StarIcon} strokeWidth={0} fill="currentColor" className="size-3.5 text-tertiary" />
                      {product.rating}
                    </span>
                  </div>
                  <p className="line-clamp-1 text-sm text-muted-foreground">
                    {product.description}
                  </p>
                </CardHeader>
                <CardContent className="flex items-baseline gap-2">
                  <span className="text-lg font-semibold text-foreground">
                    {formatTHB(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatTHB(product.compareAtPrice)}
                    </span>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <HugeiconsIcon icon={ShoppingCart01Icon} strokeWidth={1.75} data-icon="inline-start" />
                    เพิ่มลงตะกร้า
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            เสียงจากลูกค้าจริง
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            ความไว้วางใจที่สร้างมาจากบริการที่ดีทุกออเดอร์
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name}>
              <CardContent className="flex h-full flex-col gap-4">
                <StarRating rating={testimonial.rating} />
                <p className="flex-1 text-sm leading-6 text-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
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
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-16 text-center sm:px-6">
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
