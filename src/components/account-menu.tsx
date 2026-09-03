"use client"

import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Login01Icon,
  PackageIcon,
  UserAdd01Icon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" aria-label="บัญชีของฉัน" />}
      >
        <HugeiconsIcon icon={UserCircleIcon} strokeWidth={1.75} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>บัญชีของฉัน</DropdownMenuLabel>
        <DropdownMenuItem render={<Link href="/login" />}>
          <HugeiconsIcon icon={Login01Icon} strokeWidth={1.75} className="size-4" />
          เข้าสู่ระบบ
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/login" />}>
          <HugeiconsIcon icon={UserAdd01Icon} strokeWidth={1.75} className="size-4" />
          สมัครสมาชิก
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href="/track-order" />}>
          <HugeiconsIcon icon={PackageIcon} strokeWidth={1.75} className="size-4" />
          ติดตามคำสั่งซื้อ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
