"use server"

import { parseContactForm } from "@/lib/contact/schema"
import { sendContactEmail } from "@/lib/contact/send-contact-email"
import type { ContactFormState, ContactInput } from "@/lib/contact/types"

const GENERIC_ERROR_MESSAGE =
  "ส่งข้อความไม่สำเร็จ กรุณาลองใหม่อีกครั้ง หรือติดต่อเราทางอีเมลโดยตรง"

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
  }

  // Honeypot: bots that fill this field get a fake success so they don't
  // learn to avoid it, but no email is sent.
  const honeypot = String(formData.get("company") ?? "")
  if (honeypot.trim().length > 0) {
    console.warn("Contact form honeypot triggered")
    return {
      status: "success",
      message: "ส่งข้อความเรียบร้อยแล้ว เราจะติดต่อกลับภายใน 1-2 วันทำการ",
    }
  }

  const parsed = parseContactForm(raw)
  if (!parsed.success) {
    return {
      status: "error",
      message: "กรุณาตรวจสอบข้อมูลที่กรอก",
      fieldErrors: parsed.fieldErrors,
      values: raw,
    }
  }

  try {
    await sendContactEmail(parsed.data satisfies ContactInput)
  } catch (error) {
    console.error(
      "Failed to send contact email",
      error instanceof Error ? { message: error.message, cause: error.cause } : error
    )
    return {
      status: "error",
      message: GENERIC_ERROR_MESSAGE,
      values: raw,
    }
  }

  return {
    status: "success",
    message: "ส่งข้อความเรียบร้อยแล้ว เราจะติดต่อกลับภายใน 1-2 วันทำการ",
  }
}
