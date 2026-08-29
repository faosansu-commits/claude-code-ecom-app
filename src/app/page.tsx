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
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { categories, formatTHB, products } from "@/lib/mock-data"

const perks = [
  {
    icon: DeliveryTruck01Icon,
    title: "จัดส่งฟรี",
    description: "ทุกคำสั่งซื้อตั้งแต่ 990 บาท",
  },
  {
    icon: ShieldCheckIcon,
    title: "รับประกันของแท้ 100%",
    description: "สินค้าทุกชิ้นมีใบรับประกัน",
  },
  {
    icon: Wallet01Icon,
    title: "ชำระเงินหลากหลายช่องทาง",
    description: "บัตรเครดิต โอนเงิน และผ่อนชำระ",
  },
  {
    icon: DeliveryReturn01Icon,
    title: "คืนสินค้าได้ใน 30 วัน",
    description: "ไม่พอใจ คืนง่าย ไม่มีเงื่อนไข",
  },
]

const badgeVariant: Record<NonNullable<(typeof products)[number]["badge"]>, "default" | "secondary" | "destructive"> = {
  ใหม่: "secondary",
  ลดราคา: "destructive",
  ขายดี: "default",
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-24">
          <div className="flex flex-col items-start gap-6">
            <Badge variant="secondary">ลดสูงสุด 20% สัปดาห์นี้เท่านั้น</Badge>
            <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              อัปเกรดไลฟ์สไตล์ดิจิทัล
              <br />
              ในที่เดียวจบ
            </h1>
            <p className="max-w-md text-lg leading-8 text-muted-foreground">
              สมาร์ทโฟน แล็ปท็อป หูฟัง แท็บเล็ต และอุปกรณ์เสริม จากแบรนด์ชั้นนำ
              ของแท้ทุกชิ้น พร้อมส่งถึงหน้าบ้านคุณ
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" render={<Link href="#featured" />} nativeButton={false}>
                ช้อปเลย
                <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} data-icon="inline-end" />
              </Button>
              <Button size="lg" variant="outline" render={<Link href="#categories" />} nativeButton={false}>
                ดูหมวดหมู่ทั้งหมด
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {products.slice(0, 4).map((product) => (
              <Card key={product.id} size="sm" className="justify-center">
                <CardContent className="flex flex-col items-center gap-2 text-center">
                  <div className="flex size-16 items-center justify-center rounded-3xl bg-primary/10 text-2xl font-heading font-semibold text-primary">
                    {product.name.slice(0, 1)}
                  </div>
                  <p className="line-clamp-1 text-xs font-medium text-foreground">
                    {product.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatTHB(product.price)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust perks */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((perk) => (
            <div key={perk.title} className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <HugeiconsIcon icon={perk.icon} strokeWidth={2} className="size-5" />
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
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              ช้อปตามหมวดหมู่
            </h2>
            <p className="text-sm text-muted-foreground">
              เลือกดูสินค้าที่ใช่ ตรงใจคุณมากที่สุด
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link key={category.id} href="#">
              <Card className="items-center text-center transition-shadow hover:shadow-lg">
                <CardContent className="flex flex-col items-center gap-3">
                  <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <HugeiconsIcon icon={category.icon} strokeWidth={2} className="size-6" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{category.name}</p>
                    <p className="text-xs text-muted-foreground">{category.productCount} รายการ</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section id="featured" className="border-t border-border bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                สินค้าแนะนำ
              </h2>
              <p className="text-sm text-muted-foreground">
                คัดมาแล้วว่าดีที่สุดในสัปดาห์นี้
              </p>
            </div>
            <Button variant="ghost" render={<Link href="#" />} nativeButton={false}>
              ดูทั้งหมด
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} data-icon="inline-end" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-primary/15 to-primary/5">
                  <span className="font-heading text-4xl font-semibold text-primary/60">
                    {product.name.slice(0, 1)}
                  </span>
                  {product.badge && (
                    <Badge
                      variant={badgeVariant[product.badge]}
                      className="absolute top-3 left-3"
                    >
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {product.description}
                  </CardDescription>
                  <CardAction>
                    <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                      <HugeiconsIcon icon={StarIcon} strokeWidth={2} className="size-3.5 text-amber-500" />
                      {product.rating} ({product.reviewCount})
                    </span>
                  </CardAction>
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
                    <HugeiconsIcon icon={ShoppingCart01Icon} strokeWidth={2} data-icon="inline-start" />
                    เพิ่มลงตะกร้า
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <Card className="items-center bg-primary/5 text-center">
          <CardContent className="flex w-full flex-col items-center gap-4 py-4">
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              รับส่วนลดพิเศษก่อนใคร
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              สมัครรับข่าวสารเพื่อรับโค้ดส่วนลด 10% สำหรับการสั่งซื้อครั้งแรก
              และโปรโมชั่นพิเศษอื่น ๆ ทางอีเมล
            </p>
            <Field orientation="responsive" className="w-full max-w-md">
              <FieldLabel htmlFor="newsletter-email" className="sr-only">
                อีเมล
              </FieldLabel>
              <Input id="newsletter-email" type="email" placeholder="อีเมลของคุณ" />
              <Button type="submit">สมัครรับข่าวสาร</Button>
            </Field>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
