function unsplash(id: string, params = "w=1200&q=80&auto=format&fit=crop") {
  return `https://images.unsplash.com/photo-${id}?${params}`
}

export type Category = {
  id: number
  name: string
  slug: string
  image: string
  productCount: number
}

export const categories: Category[] = [
  {
    id: 1,
    name: "สมาร์ทโฟน",
    slug: "smartphones",
    image: unsplash("1592750475338-74b7b21085ab"),
    productCount: 24,
  },
  {
    id: 2,
    name: "แล็ปท็อป",
    slug: "laptops",
    image: unsplash("1611186871348-b1ce696e52c9"),
    productCount: 16,
  },
  {
    id: 3,
    name: "หูฟัง",
    slug: "headphones",
    image: unsplash("1505740420928-5e560c06d30e"),
    productCount: 32,
  },
  {
    id: 4,
    name: "แท็บเล็ต",
    slug: "tablets",
    image: unsplash("1544244015-0df4b3ffc6b0"),
    productCount: 12,
  },
  {
    id: 5,
    name: "อุปกรณ์เสริม",
    slug: "accessories",
    image: unsplash("1546868871-7041f2a55e12"),
    productCount: 48,
  },
]

export type Product = {
  id: number
  name: string
  description: string
  price: number
  compareAtPrice?: number
  categoryId: number
  image: string
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
    image: unsplash("1592750475338-74b7b21085ab"),
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
    image: unsplash("1610945265064-0e34e5519bbf"),
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
    image: unsplash("1496181133206-80ce9b88a853"),
    rating: 4.9,
    reviewCount: 98,
  },
  {
    id: 4,
    name: "AirPods Pro 2",
    description: "หูฟังไร้สาย Apple ตัดเสียงรบกวน USB-C",
    price: 8990,
    categoryId: 3,
    image: unsplash("1583394838336-acd977736f90"),
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
    image: unsplash("1544244015-0df4b3ffc6b0"),
    rating: 4.7,
    reviewCount: 76,
  },
]

export type Testimonial = {
  name: string
  role: string
  quote: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    name: "ณัฐวุฒิ ศรีสุข",
    role: "ลูกค้าประจำ",
    quote:
      "สั่ง MacBook วันนี้ ได้ของพรุ่งนี้เช้าเลย แพ็กกิ้งดีมาก ของแท้ครบประกัน ประทับใจสุด ๆ",
    rating: 5,
  },
  {
    name: "พิมพ์ชนก แก้วมณี",
    role: "ลูกค้าประจำ",
    quote:
      "เทียบราคาหลายร้านแล้ว ที่นี่ถูกที่สุดและมีโปรผ่อน 0% ด้วย บริการหลังการขายก็ตอบไวมาก",
    rating: 5,
  },
  {
    name: "ธีรภัทร บุญมา",
    role: "นักธุรกิจออนไลน์",
    quote: "ซื้อประจำสำหรับทีมงาน ระบบใบกำกับภาษีสะดวก ของครบทุกครั้ง ไม่เคยผิดหวัง",
    rating: 4.5,
  },
]

export const brands = ["Apple", "Samsung", "Sony", "JBL", "Xiaomi", "Dell"]

export function formatTHB(amount: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(amount)
}
