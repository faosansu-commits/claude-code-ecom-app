"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CreditCardIcon,
  Location01Icon,
  MoneyBag01Icon,
  QrCodeIcon,
  ShoppingBag01Icon,
} from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Field, FieldLabel } from "@/components/ui/field"
import { useCart } from "@/lib/cart-context"
import { formatTHB } from "@/lib/mock-data"
import {
  generateOrderId,
  saveOrder,
  type PaymentMethod,
  type ShippingAddress,
} from "@/lib/orders"
import { cn } from "@/lib/utils"

const FREE_SHIPPING_THRESHOLD = 990
const SHIPPING_FEE = 50

const paymentMethods: {
  value: PaymentMethod
  label: string
  description: string
  icon: typeof CreditCardIcon
}[] = [
  {
    value: "card",
    label: "บัตรเครดิต / เดบิต",
    description: "Visa, Mastercard, JCB",
    icon: CreditCardIcon,
  },
  {
    value: "promptpay",
    label: "พร้อมเพย์ (PromptPay)",
    description: "สแกน QR เพื่อชำระเงิน",
    icon: QrCodeIcon,
  },
  {
    value: "cod",
    label: "เก็บเงินปลายทาง",
    description: "ชำระเงินเมื่อได้รับสินค้า",
    icon: MoneyBag01Icon,
  },
]

const emptyAddress: ShippingAddress = {
  fullName: "",
  phone: "",
  address: "",
  district: "",
  province: "",
  postalCode: "",
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clear, isHydrated } = useCart()
  const [address, setAddress] = useState<ShippingAddress>(emptyAddress)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
  const [submitting, setSubmitting] = useState(false)

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE
  const total = subtotal + shippingFee

  const isAddressComplete = useMemo(
    () => Object.values(address).every((value) => value.trim().length > 0),
    [address]
  )

  function updateField<K extends keyof ShippingAddress>(key: K, value: string) {
    setAddress((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isAddressComplete || items.length === 0) return

    setSubmitting(true)
    const order = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      items,
      subtotal,
      shippingFee,
      total,
      shippingAddress: address,
      paymentMethod,
    }
    saveOrder(order)
    clear()

    setTimeout(() => {
      router.push(`/track-order?order=${order.id}&new=1`)
    }, 700)
  }

  if (isHydrated && items.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center sm:px-6">
        <span className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <HugeiconsIcon icon={ShoppingBag01Icon} strokeWidth={1.5} className="size-7" />
        </span>
        <h1 className="font-heading text-xl font-semibold text-foreground">
          ยังไม่มีสินค้าสำหรับชำระเงิน
        </h1>
        <p className="text-sm text-muted-foreground">
          เลือกซื้อสินค้าแล้วกลับมาชำระเงินได้ที่นี่
        </p>
        <Link href="/">
          <Button>กลับไปเลือกซื้อสินค้า</Button>
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
        ชำระเงิน
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-8">
          {/* Shipping address */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 font-heading text-base font-semibold text-foreground">
              <HugeiconsIcon icon={Location01Icon} strokeWidth={1.75} className="size-5 text-primary" />
              ที่อยู่จัดส่ง
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="fullName">ชื่อ-นามสกุล</FieldLabel>
                <Input
                  id="fullName"
                  required
                  value={address.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  placeholder="สมชาย ใจดี"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="phone">เบอร์โทรศัพท์</FieldLabel>
                <Input
                  id="phone"
                  required
                  value={address.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="08X-XXX-XXXX"
                />
              </Field>
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="address">ที่อยู่</FieldLabel>
                <Input
                  id="address"
                  required
                  value={address.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  placeholder="บ้านเลขที่ ถนน ซอย"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="district">เขต/อำเภอ</FieldLabel>
                <Input
                  id="district"
                  required
                  value={address.district}
                  onChange={(e) => updateField("district", e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="province">จังหวัด</FieldLabel>
                <Input
                  id="province"
                  required
                  value={address.province}
                  onChange={(e) => updateField("province", e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="postalCode">รหัสไปรษณีย์</FieldLabel>
                <Input
                  id="postalCode"
                  required
                  inputMode="numeric"
                  value={address.postalCode}
                  onChange={(e) => updateField("postalCode", e.target.value)}
                  placeholder="10110"
                />
              </Field>
            </div>
          </section>

          <Separator />

          {/* Payment method */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 font-heading text-base font-semibold text-foreground">
              <HugeiconsIcon icon={CreditCardIcon} strokeWidth={1.75} className="size-5 text-primary" />
              วิธีชำระเงิน
            </h2>
            <div className="grid gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.value}
                  type="button"
                  onClick={() => setPaymentMethod(method.value)}
                  aria-pressed={paymentMethod === method.value}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors",
                    paymentMethod === method.value
                      ? "border-primary bg-accent"
                      : "border-border hover:bg-muted"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full",
                      paymentMethod === method.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <HugeiconsIcon icon={method.icon} strokeWidth={1.75} className="size-5" />
                  </span>
                  <span>
                    <p className="text-sm font-medium text-foreground">{method.label}</p>
                    <p className="text-xs text-muted-foreground">{method.description}</p>
                  </span>
                </button>
              ))}
            </div>

            {paymentMethod === "card" && (
              <div className="mt-4 grid gap-4 rounded-xl border border-border p-4 sm:grid-cols-2">
                <Field className="sm:col-span-2">
                  <FieldLabel htmlFor="cardNumber">หมายเลขบัตร</FieldLabel>
                  <Input id="cardNumber" inputMode="numeric" placeholder="XXXX XXXX XXXX XXXX" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="cardExpiry">วันหมดอายุ</FieldLabel>
                  <Input id="cardExpiry" placeholder="MM/YY" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="cardCvc">CVC</FieldLabel>
                  <Input id="cardCvc" inputMode="numeric" placeholder="XXX" />
                </Field>
              </div>
            )}

            {paymentMethod === "promptpay" && (
              <div className="mt-4 flex items-center gap-4 rounded-xl border border-border p-4">
                <span className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <HugeiconsIcon icon={QrCodeIcon} strokeWidth={1.25} className="size-9 text-muted-foreground" />
                </span>
                <p className="text-sm text-muted-foreground">
                  ระบบจะแสดง QR PromptPay ให้สแกนชำระเงินหลังยืนยันคำสั่งซื้อ
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Order summary */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-24">
          <h2 className="mb-4 font-heading text-base font-semibold text-foreground">
            สรุปคำสั่งซื้อ
          </h2>
          <ul className="mb-4 flex max-h-64 flex-col gap-3 overflow-y-auto">
            {items.map((item) => (
              <li key={item.productId} className="flex gap-3">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                  <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-center gap-0.5">
                  <p className="line-clamp-1 text-sm text-foreground">{item.name}</p>
                  <p className="font-mono text-sm text-muted-foreground tabular-nums">
                    {formatTHB(item.price * item.quantity)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Separator className="mb-4" />

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">ยอดรวมสินค้า</span>
              <span className="font-mono tabular-nums text-foreground">{formatTHB(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">ค่าจัดส่ง</span>
              <span className="font-mono tabular-nums text-foreground">
                {shippingFee === 0 ? "ฟรี" : formatTHB(shippingFee)}
              </span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="mb-5 flex items-center justify-between">
            <span className="font-medium text-foreground">ยอดชำระทั้งหมด</span>
            <span className="font-mono text-lg font-semibold tabular-nums text-foreground">
              {formatTHB(total)}
            </span>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={!isAddressComplete || items.length === 0 || submitting}
          >
            {submitting ? "กำลังดำเนินการ..." : "ยืนยันการสั่งซื้อ"}
          </Button>
        </aside>
      </div>
    </form>
  )
}
