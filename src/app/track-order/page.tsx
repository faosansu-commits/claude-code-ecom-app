import { Suspense } from "react"
import type { Metadata } from "next"

import { TrackOrderClient } from "@/components/track-order-client"

export const metadata: Metadata = {
  title: "ติดตามคำสั่งซื้อ — ShopSabai",
  description: "ตรวจสอบสถานะการจัดส่งคำสั่งซื้อของคุณ",
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6" />}>
      <TrackOrderClient />
    </Suspense>
  )
}
