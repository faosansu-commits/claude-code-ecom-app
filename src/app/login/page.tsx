"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { Login01Icon, Mail01Icon, SquareLock02Icon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { Logo } from "@/components/logo"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      router.push("/")
    }, 600)
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-4 py-16 sm:px-6">
      <div className="mb-8 text-center">
        <Link href="/" className="mb-6 inline-flex items-center justify-center">
          <Logo />
        </Link>
        <h1 className="font-heading text-xl font-semibold text-foreground">เข้าสู่ระบบ</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          ยินดีต้อนรับกลับมา กรอกข้อมูลเพื่อเข้าสู่ระบบ
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="email">อีเมล</FieldLabel>
          <div className="relative">
            <HugeiconsIcon
              icon={Mail01Icon}
              strokeWidth={1.75}
              className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="pl-10"
            />
          </div>
        </Field>
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">รหัสผ่าน</FieldLabel>
            <Link href="#" className="text-xs text-primary hover:underline">
              ลืมรหัสผ่าน?
            </Link>
          </div>
          <div className="relative">
            <HugeiconsIcon
              icon={SquareLock02Icon}
              strokeWidth={1.75}
              className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-10"
            />
          </div>
        </Field>

        <Button type="submit" size="lg" className="mt-2 w-full" disabled={submitting}>
          <HugeiconsIcon icon={Login01Icon} strokeWidth={1.75} data-icon="inline-start" />
          {submitting ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        ยังไม่มีบัญชี?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          สมัครสมาชิก
        </Link>
      </p>
    </div>
  )
}
