import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProductDetailClient } from "@/components/product-detail-client"
import { categories, products } from "@/lib/mock-data"

export function generateStaticParams() {
  return products.map((product) => ({ id: String(product.id) }))
}

export async function generateMetadata({
  params,
}: PageProps<"/product/[id]">): Promise<Metadata> {
  const { id } = await params
  const product = products.find((p) => p.id === Number(id))
  if (!product) return {}

  return {
    title: `${product.name} — JHOOWA`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: PageProps<"/product/[id]">) {
  const { id } = await params
  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    notFound()
  }

  const category = categories.find((c) => c.id === product.categoryId)

  if (!category) {
    notFound()
  }

  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4)

  return (
    <ProductDetailClient
      product={product}
      category={category}
      relatedProducts={relatedProducts}
    />
  )
}
