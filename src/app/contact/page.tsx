import type { Metadata } from "next"

import { ContactInfo } from "@/components/contact/contact-info"
import { ContactForm } from "@/components/contact/contact-form"

export const metadata: Metadata = {
  title: "ติดต่อเรา | JHOOWA",
  description: "ติดต่อทีมงาน JHOOWA ผ่านฟอร์มออนไลน์ หรือช่องทางติดต่ออื่น ๆ",
}

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
        ติดต่อเรา
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        มีคำถามหรือข้อเสนอแนะ? ส่งข้อความถึงทีมงานของเราได้ที่นี่
      </p>
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  )
}
