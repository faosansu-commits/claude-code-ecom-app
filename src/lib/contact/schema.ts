import { z } from "zod"

import type { ContactInput } from "@/lib/contact/types"

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "กรุณากรอกชื่อ 2-100 ตัวอักษร")
    .max(100, "กรุณากรอกชื่อ 2-100 ตัวอักษร"),
  email: z.email("รูปแบบอีเมลไม่ถูกต้อง"),
  subject: z
    .string()
    .trim()
    .min(3, "กรุณากรอกหัวข้อ 3-150 ตัวอักษร")
    .max(150, "กรุณากรอกหัวข้อ 3-150 ตัวอักษร"),
  message: z
    .string()
    .trim()
    .min(10, "กรุณากรอกข้อความ 10-2000 ตัวอักษร")
    .max(2000, "กรุณากรอกข้อความ 10-2000 ตัวอักษร"),
})

export type ParseContactFormResult =
  | { success: true; data: ContactInput }
  | { success: false; fieldErrors: Partial<Record<keyof ContactInput, string[]>> }

export function parseContactForm(input: Record<string, unknown>): ParseContactFormResult {
  const result = contactFormSchema.safeParse(input)

  if (!result.success) {
    const { fieldErrors } = z.flattenError(result.error)
    return { success: false, fieldErrors }
  }

  return { success: true, data: result.data }
}
