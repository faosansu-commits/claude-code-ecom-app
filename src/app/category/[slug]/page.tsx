import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CategoryPageClient } from "@/components/category-page-client"
import { categories, products } from "@/lib/mock-data"

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)
  if (!category) return {}

  return {
    title: `${category.name} — ShopSabai`,
    description: `ช้อป${category.name}จากแบรนด์ชั้นนำ ของแท้ 100% ส่งไว ราคาดีที่สุด`,
  }
}

export default async function CategoryPage({
  params,
}: PageProps<"/category/[slug]">) {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)

  if (!category) {
    notFound()
  }

  const categoryProducts = products.filter((p) => p.categoryId === category.id)

  return <CategoryPageClient category={category} products={categoryProducts} />
}
