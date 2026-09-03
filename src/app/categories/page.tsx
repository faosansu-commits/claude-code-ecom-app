import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { categories, departments } from "@/lib/mock-data"

export const metadata: Metadata = {
  title: "หมวดหมู่สินค้าทั้งหมด — JHOOWA",
  description: "เลือกช้อปสินค้ากว่า 51 หมวดหมู่ ครอบคลุมทุกไลฟ์สไตล์ในที่เดียว",
}

export default function CategoriesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-10">
        <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
          หมวดหมู่สินค้าทั้งหมด
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          รวม {categories.length} หมวดหมู่ จาก {departments.length} กลุ่มสินค้า ครอบคลุมทุกไลฟ์สไตล์
        </p>
      </div>

      {/* Jump nav */}
      <nav aria-label="ไปยังกลุ่มสินค้า" className="mb-10 flex flex-wrap gap-2">
        {departments.map((dept) => (
          <a
            key={dept.slug}
            href={`#${dept.slug}`}
            className="rounded-full border-[1.5px] border-input bg-card px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {dept.name}
          </a>
        ))}
      </nav>

      <div className="flex flex-col gap-14">
        {departments.map((dept) => {
          const deptCategories = categories.filter((c) => c.department === dept.name)
          return (
            <section key={dept.slug} id={dept.slug} className="scroll-mt-24">
              <h2 className="mb-4 font-heading text-lg font-semibold text-foreground sm:text-xl">
                {dept.name}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({deptCategories.length} หมวดหมู่)
                </span>
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
                {deptCategories.map((category) => (
                  <Link key={category.id} href={`/category/${category.slug}`} className="group">
                    <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 25vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1638]/70 via-[#0D1638]/0 to-[#0D1638]/0" />
                      <div className="absolute inset-x-0 bottom-0 p-3">
                        <p className="text-sm font-medium text-white">{category.name}</p>
                        <p className="text-xs text-white/70">{category.productCount} รายการ</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
