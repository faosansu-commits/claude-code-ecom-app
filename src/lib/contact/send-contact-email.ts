import { Resend } from "resend"

import type { ContactInput } from "@/lib/contact/types"

function buildPlainTextBody(input: ContactInput) {
  return `ข้อความใหม่จากหน้า Contact Us

ชื่อ:     ${input.name}
อีเมล:    ${input.email}
หัวข้อ:   ${input.subject}

ข้อความ:
${input.message}`
}

export async function sendContactEmail(input: ContactInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL

  if (!apiKey || !from || !to) {
    throw new Error("Missing Resend environment variables")
  }

  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: input.email,
    subject: `[JHOOWA Contact] ${input.subject}`,
    text: buildPlainTextBody(input),
  })

  if (error) {
    throw new Error("Failed to send contact email", { cause: error })
  }
}
