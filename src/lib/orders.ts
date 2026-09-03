import type { CartItem } from "@/lib/cart-context"

export type ShippingAddress = {
  fullName: string
  phone: string
  address: string
  district: string
  province: string
  postalCode: string
}

export type PaymentMethod = "card" | "cod" | "promptpay"

export type Order = {
  id: string
  createdAt: string
  items: CartItem[]
  subtotal: number
  shippingFee: number
  total: number
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
}

export const trackingStages = [
  { key: "confirmed", label: "ยืนยันคำสั่งซื้อแล้ว", minutes: 0 },
  { key: "packed", label: "แพ็กสินค้าเรียบร้อย รอขนส่งมารับ", minutes: 2 },
  { key: "shipped", label: "พัสดุออกจากศูนย์กระจายสินค้าแล้ว", minutes: 5 },
  { key: "out_for_delivery", label: "อยู่ระหว่างนำส่ง", minutes: 9 },
  { key: "delivered", label: "จัดส่งสำเร็จ", minutes: 14 },
] as const

export function getOrderProgress(order: Order) {
  const elapsedMinutes = (Date.now() - new Date(order.createdAt).getTime()) / 60000
  let currentIndex = 0
  trackingStages.forEach((stage, i) => {
    if (elapsedMinutes >= stage.minutes) currentIndex = i
  })
  return { currentIndex, elapsedMinutes }
}

const ORDERS_KEY = "shopsabai-orders"

function readOrders(): Order[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(ORDERS_KEY)
    return raw ? (JSON.parse(raw) as Order[]) : []
  } catch {
    return []
  }
}

function writeOrders(orders: Order[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}

export function generateOrderId() {
  const random = Math.random().toString(36).slice(2, 6).toUpperCase()
  const date = new Date()
  const stamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`
  return `SB${stamp}${random}`
}

export function saveOrder(order: Order) {
  const orders = readOrders()
  orders.unshift(order)
  writeOrders(orders)
}

export function getAllOrders(): Order[] {
  return readOrders()
}

// Seeded demo orders so the tracking page has something to find without
// requiring a checkout first.
const now = Date.now()

export const demoOrders: Order[] = [
  {
    id: "SB-DEMO-0001",
    createdAt: new Date(now - 20 * 60_000).toISOString(),
    items: [
      {
        productId: 1,
        name: "iPhone 16 Pro",
        image:
          "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80&auto=format&fit=crop",
        price: 45900,
        quantity: 1,
      },
    ],
    subtotal: 45900,
    shippingFee: 0,
    total: 45900,
    shippingAddress: {
      fullName: "สมชาย ใจดี",
      phone: "081-234-5678",
      address: "99/9 หมู่บ้านสุขใจ",
      district: "บางนา",
      province: "กรุงเทพมหานคร",
      postalCode: "10260",
    },
    paymentMethod: "card",
  },
  {
    id: "SB-DEMO-0002",
    createdAt: new Date(now - 3 * 60_000).toISOString(),
    items: [
      {
        productId: 14,
        name: "Sony WH-1000XM5",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80&auto=format&fit=crop",
        price: 12900,
        quantity: 1,
      },
      {
        productId: 22,
        name: "Anker Power Bank 20000mAh",
        image:
          "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80&auto=format&fit=crop&flip=h",
        price: 1890,
        quantity: 2,
      },
    ],
    subtotal: 16680,
    shippingFee: 0,
    total: 16680,
    shippingAddress: {
      fullName: "พิมพ์ชนก แก้วมณี",
      phone: "089-999-1234",
      address: "12 ถ.สุขุมวิท",
      district: "คลองเตย",
      province: "กรุงเทพมหานคร",
      postalCode: "10110",
    },
    paymentMethod: "promptpay",
  },
]

export function getOrder(id: string): Order | undefined {
  const normalized = id.trim().toUpperCase()
  if (!normalized) return undefined
  const local = readOrders().find((order) => order.id.toUpperCase() === normalized)
  if (local) return local
  return demoOrders.find((order) => order.id.toUpperCase() === normalized)
}
