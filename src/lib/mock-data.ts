import {
  HeadphonesIcon,
  LaptopIcon,
  SmartPhone01Icon,
  Tablet01Icon,
  Watch01Icon,
} from "@hugeicons/core-free-icons"

export type Category = {
  id: number
  name: string
  slug: string
  icon: typeof SmartPhone01Icon
  productCount: number
}

export const categories: Category[] = [
  { id: 1, name: "สมาร์ทโฟน", slug: "smartphones", icon: SmartPhone01Icon, productCount: 24 },
  { id: 2, name: "แล็ปท็อป", slug: "laptops", icon: LaptopIcon, productCount: 16 },
  { id: 3, name: "หูฟัง", slug: "headphones", icon: HeadphonesIcon, productCount: 32 },
  { id: 4, name: "แท็บเล็ต", slug: "tablets", icon: Tablet01Icon, productCount: 12 },
  { id: 5, name: "อุปกรณ์เสริม", slug: "accessories", icon: Watch01Icon, productCount: 48 },
]

export type Product = {
  id: number
  name: string
  description: string
  price: number
  compareAtPrice?: number
  categoryId: number
  badge?: "ใหม่" | "ลดราคา" | "ขายดี"
  rating: number
  reviewCount: number
}

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 16 Pro",
    description: "สมาร์ทโฟน Apple จอ 6.3 นิ้ว ชิป A18 Pro",
    price: 45900,
    categoryId: 1,
    badge: "ขายดี",
    rating: 4.8,
    reviewCount: 214,
  },
  {
    id: 2,
    name: "Samsung Galaxy S25",
    description: "สมาร์ทโฟน Samsung จอ 6.2 นิ้ว ชิป Snapdragon 8 Elite",
    price: 32900,
    compareAtPrice: 35900,
    categoryId: 1,
    badge: "ลดราคา",
    rating: 4.6,
    reviewCount: 132,
  },
  {
    id: 3,
    name: "MacBook Air M3",
    description: "แล็ปท็อป Apple จอ 15 นิ้ว RAM 16GB SSD 512GB",
    price: 44900,
    categoryId: 2,
    rating: 4.9,
    reviewCount: 98,
  },
  {
    id: 4,
    name: "AirPods Pro 2",
    description: "หูฟังไร้สาย Apple ตัดเสียงรบกวน USB-C",
    price: 8990,
    categoryId: 3,
    badge: "ใหม่",
    rating: 4.7,
    reviewCount: 341,
  },
  {
    id: 5,
    name: "iPad Air M2",
    description: "แท็บเล็ต Apple จอ 13 นิ้ว ชิป M2",
    price: 33900,
    categoryId: 4,
    rating: 4.7,
    reviewCount: 76,
  },
]

export function formatTHB(amount: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(amount)
}
