import { HugeiconsIcon } from "@hugeicons/react"
import {
  Call02Icon,
  Location01Icon,
  Mail01Icon,
  Time01Icon,
} from "@hugeicons/core-free-icons"

import { SocialLinks } from "@/components/social-links"

const CONTACT_DETAILS = [
  {
    icon: Location01Icon,
    label: "ที่อยู่",
    value: "กรุงเทพฯ ประเทศไทย",
  },
  {
    icon: Call02Icon,
    label: "โทรศัพท์",
    value: "02-123-4567",
    href: "tel:021234567",
  },
  {
    icon: Mail01Icon,
    label: "อีเมล",
    value: "support@jhoowa.co.th",
    href: "mailto:support@jhoowa.co.th",
  },
  {
    icon: Time01Icon,
    label: "เวลาทำการ",
    value: "จันทร์–ศุกร์ 9:00–18:00 น.",
  },
]

const FAQ_ITEMS = [
  {
    question: "สั่งซื้อแล้วได้รับสินค้าภายในกี่วัน?",
    answer: "โดยทั่วไปจัดส่งถึงภายใน 2-4 วันทำการ ขึ้นอยู่กับพื้นที่ปลายทาง",
  },
  {
    question: "เปลี่ยน/คืนสินค้าได้ไหม?",
    answer: "เปลี่ยนหรือคืนได้ภายใน 7 วันหลังได้รับสินค้า หากสินค้ายังไม่ผ่านการใช้งานและบรรจุภัณฑ์ครบถ้วน",
  },
  {
    question: "ติดตามคำสั่งซื้อได้ที่ไหน?",
    answer: "ใช้หมายเลขคำสั่งซื้อค้นหาได้ที่หน้า “ติดตามคำสั่งซื้อ” บนเมนูด้านบน",
  },
  {
    question: "ชำระเงินได้ช่องทางไหนบ้าง?",
    answer: "รองรับบัตรเครดิต/เดบิต, พร้อมเพย์ และเก็บเงินปลายทาง",
  },
]

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 font-heading text-base font-semibold text-foreground">
          ข้อมูลติดต่อ
        </h2>
        <ul className="flex flex-col gap-4">
          {CONTACT_DETAILS.map((detail) => (
            <li key={detail.label} className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                <HugeiconsIcon icon={detail.icon} strokeWidth={1.75} className="size-4" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">{detail.label}</p>
                {detail.href ? (
                  <a href={detail.href} className="text-sm font-medium text-foreground hover:text-primary">
                    {detail.value}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-foreground">{detail.value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-border pt-6">
          <p className="mb-3 text-xs text-muted-foreground">ติดตามเราได้ที่</p>
          <SocialLinks />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 font-heading text-base font-semibold text-foreground">
          คำถามที่พบบ่อย
        </h2>
        <div className="flex flex-col divide-y divide-border">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="group py-3 first:pt-0 last:pb-0">
              <summary className="cursor-pointer list-none text-sm font-medium text-foreground marker:content-none">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
