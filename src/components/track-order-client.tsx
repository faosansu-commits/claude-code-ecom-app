"use client"

import { useState } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CheckmarkCircle02Icon,
  Location01Icon,
  PackageIcon,
  SearchingIcon,
} from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { formatTHB } from "@/lib/mock-data"
import { getOrder, getOrderProgress, trackingStages, type Order } from "@/lib/orders"

const paymentMethodLabel: Record<Order["paymentMethod"], string> = {
  card: "บัตรเครดิต / เดบิต",
  promptpay: "พร้อมเพย์ (PromptPay)",
  cod: "เก็บเงินปลายทาง",
}

export function TrackOrderClient() {
  const searchParams = useSearchParams()
  const isNew = searchParams.get("new") === "1"

  const [query, setQuery] = useState(searchParams.get("order") ?? "")
  const [order, setOrder] = useState<Order | undefined>(() => {
    const orderId = searchParams.get("order")
    return orderId ? getOrder(orderId) : undefined
  })
  const [searched, setSearched] = useState(Boolean(searchParams.get("order")))

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setOrder(getOrder(query))
    setSearched(true)
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="mb-2 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
        ติดตามคำสั่งซื้อ
      </h1>
      <p className="mb-6 text-sm text-muted-foreground">
        กรอกหมายเลขคำสั่งซื้อเพื่อตรวจสอบสถานะการจัดส่ง
      </p>

      {isNew && order && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-success/30 bg-success/10 p-4">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={1.75} className="size-6 shrink-0 text-success" />
          <div>
            <p className="text-sm font-medium text-foreground">สั่งซื้อสำเร็จแล้ว!</p>
            <p className="text-sm text-muted-foreground">
              หมายเลขคำสั่งซื้อของคุณคือ <span className="font-mono font-medium text-foreground">{order.id}</span>
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSearch} className="mb-8 flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="เช่น SB-DEMO-0001"
          className="font-mono"
        />
        <Button type="submit" className="shrink-0">
          <HugeiconsIcon icon={SearchingIcon} strokeWidth={1.75} data-icon="inline-start" />
          ค้นหา
        </Button>
      </form>

      {order ? (
        <OrderResult order={order} />
      ) : searched ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border py-16 text-center">
          <p className="font-heading text-base font-medium text-foreground">
            ไม่พบคำสั่งซื้อหมายเลขนี้
          </p>
          <p className="text-sm text-muted-foreground">
            ลองค้นหาด้วยหมายเลขตัวอย่าง{" "}
            <button
              type="button"
              className="font-mono text-primary hover:underline"
              onClick={() => {
                setQuery("SB-DEMO-0001")
                setOrder(getOrder("SB-DEMO-0001"))
              }}
            >
              SB-DEMO-0001
            </button>
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border py-16 text-center">
          <HugeiconsIcon icon={PackageIcon} strokeWidth={1.5} className="size-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            ยังไม่ได้ค้นหา ลองใช้หมายเลขตัวอย่าง{" "}
            <button
              type="button"
              className="font-mono text-primary hover:underline"
              onClick={() => {
                setQuery("SB-DEMO-0002")
                setOrder(getOrder("SB-DEMO-0002"))
                setSearched(true)
              }}
            >
              SB-DEMO-0002
            </button>
          </p>
        </div>
      )}
    </div>
  )
}

function OrderResult({ order }: { order: Order }) {
  const { currentIndex } = getOrderProgress(order)

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs text-muted-foreground">หมายเลขคำสั่งซื้อ</p>
            <p className="font-mono text-base font-semibold text-foreground">{order.id}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">วิธีชำระเงิน</p>
            <p className="text-sm font-medium text-foreground">
              {paymentMethodLabel[order.paymentMethod]}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <ol className="flex flex-col gap-0">
          {trackingStages.map((stage, index) => {
            const done = index <= currentIndex
            const isLast = index === trackingStages.length - 1
            return (
              <li key={stage.key} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full",
                      done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {done && (
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={0} fill="currentColor" className="size-4" />
                    )}
                  </span>
                  {!isLast && (
                    <span className={cn("w-px flex-1", done ? "bg-primary" : "bg-border")} />
                  )}
                </div>
                <div className={cn("pb-6", isLast && "pb-0")}>
                  <p
                    className={cn(
                      "text-sm font-medium",
                      done ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {stage.label}
                  </p>
                  {index === currentIndex && (
                    <p className="text-xs text-primary">สถานะปัจจุบัน</p>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      {/* Address */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="mb-3 flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <HugeiconsIcon icon={Location01Icon} strokeWidth={1.75} className="size-4 text-primary" />
          ที่อยู่จัดส่ง
        </h2>
        <p className="text-sm text-foreground">{order.shippingAddress.fullName}</p>
        <p className="text-sm text-muted-foreground">{order.shippingAddress.phone}</p>
        <p className="text-sm text-muted-foreground">
          {order.shippingAddress.address} {order.shippingAddress.district}{" "}
          {order.shippingAddress.province} {order.shippingAddress.postalCode}
        </p>
      </div>

      {/* Items */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="mb-3 font-heading text-sm font-semibold text-foreground">
          รายการสินค้า
        </h2>
        <ul className="flex flex-col divide-y divide-border">
          {order.items.map((item) => (
            <li key={item.productId} className="flex items-center gap-3 py-3">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="line-clamp-1 text-sm text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">จำนวน {item.quantity} ชิ้น</p>
              </div>
              <p className="font-mono text-sm tabular-nums text-foreground">
                {formatTHB(item.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>
        <Separator className="my-3" />
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">ยอดรวมสินค้า</span>
          <span className="font-mono tabular-nums text-foreground">{formatTHB(order.subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">ค่าจัดส่ง</span>
          <span className="font-mono tabular-nums text-foreground">
            {order.shippingFee === 0 ? "ฟรี" : formatTHB(order.shippingFee)}
          </span>
        </div>
        <Separator className="my-3" />
        <div className="flex items-center justify-between">
          <span className="font-medium text-foreground">ยอดชำระทั้งหมด</span>
          <span className="font-mono text-base font-semibold tabular-nums text-foreground">
            {formatTHB(order.total)}
          </span>
        </div>
      </div>
    </div>
  )
}
