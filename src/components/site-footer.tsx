import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { Call02Icon, Location01Icon, Mail01Icon } from "@hugeicons/core-free-icons"

import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/logo"
import { SocialLinks } from "@/components/social-links"

const linkColumns = [
  {
    title: "ช้อปปิ้ง",
    links: ["สินค้าทั้งหมด", "สินค้ามาใหม่", "สินค้าขายดี", "โปรโมชั่น"],
  },
  {
    title: "บริการลูกค้า",
    links: ["ติดตามคำสั่งซื้อ", "การจัดส่ง", "คืนสินค้า / คืนเงิน", "คำถามที่พบบ่อย"],
  },
  {
    title: "บริษัท",
    links: [
      "เกี่ยวกับเรา",
      "ร่วมงานกับเรา",
      "ติดต่อเรา",
      "นโยบายความเป็นส่วนตัว",
      "ข้อกำหนดการใช้งาน",
    ],
  },
]

// The footer's "ติดต่อเรา" link is the only one wired to a real route so far.
const linkHrefOverrides: Record<string, string> = {
  ติดต่อเรา: "/contact",
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            มาร์เก็ตเพลสออนไลน์ที่รวมร้านค้ากว่าพันร้านและสินค้ากว่า 50 หมวดหมู่ไว้ในที่เดียว ส่งไว ของแท้ทุกชิ้น พร้อมบริการหลังการขายตลอด 24 ชั่วโมง
          </p>
          <SocialLinks />
        </div>

        {linkColumns.map((column) => (
          <div key={column.title} className="flex flex-col gap-3">
            <h3 className="font-heading text-sm font-semibold text-foreground">
              {column.title}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {column.links.map((link) => (
                <li key={link}>
                  <Link
                    href={linkHrefOverrides[link] ?? "#"}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Separator />

      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} JHOOWA. สงวนลิขสิทธิ์ทุกประการ</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="flex items-center gap-1.5">
            <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} className="size-4" />
            support@jhoowa.co.th
          </span>
          <span className="flex items-center gap-1.5">
            <HugeiconsIcon icon={Call02Icon} strokeWidth={2} className="size-4" />
            02-123-4567
          </span>
          <span className="flex items-center gap-1.5">
            <HugeiconsIcon icon={Location01Icon} strokeWidth={2} className="size-4" />
            กรุงเทพฯ ประเทศไทย
          </span>
        </div>
      </div>
    </footer>
  )
}
