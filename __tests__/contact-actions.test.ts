import { afterEach, expect, test, vi } from "vitest"
import { INITIAL_CONTACT_FORM_STATE } from "../src/lib/contact/types"

const sendContactEmail = vi.fn()
vi.mock("../src/lib/contact/send-contact-email", () => ({
  sendContactEmail: (...args: unknown[]) => sendContactEmail(...args),
}))

const { submitContactForm } = await import("../src/app/contact/actions")

function buildFormData(fields: Record<string, string>) {
  const formData = new FormData()
  for (const [key, value] of Object.entries(fields)) {
    formData.set(key, value)
  }
  return formData
}

afterEach(() => {
  sendContactEmail.mockReset()
})

test("sends the email with replyTo set to the sender's address on success", async () => {
  sendContactEmail.mockResolvedValue(undefined)

  const formData = buildFormData({
    name: "สมชาย ใจดี",
    email: "somchai@example.com",
    subject: "สอบถามเรื่องสินค้า",
    message: "อยากทราบว่าสินค้ามีสีอื่นไหมครับ",
    company: "",
  })

  const state = await submitContactForm(INITIAL_CONTACT_FORM_STATE, formData)

  expect(state.status).toBe("success")
  expect(sendContactEmail).toHaveBeenCalledWith(
    expect.objectContaining({ email: "somchai@example.com" })
  )
})

test("honeypot: returns fake success without sending an email", async () => {
  const formData = buildFormData({
    name: "Bot",
    email: "bot@example.com",
    subject: "spam",
    message: "spammy message here",
    company: "not empty",
  })

  const state = await submitContactForm(INITIAL_CONTACT_FORM_STATE, formData)

  expect(state.status).toBe("success")
  expect(sendContactEmail).not.toHaveBeenCalled()
})

test("returns field errors and preserves input on invalid submission", async () => {
  const formData = buildFormData({
    name: "สมชาย ใจดี",
    email: "not-an-email",
    subject: "สอบถามเรื่องสินค้า",
    message: "อยากทราบว่าสินค้ามีสีอื่นไหมครับ",
    company: "",
  })

  const state = await submitContactForm(INITIAL_CONTACT_FORM_STATE, formData)

  expect(state.status).toBe("error")
  expect(state.fieldErrors?.email).toBeDefined()
  expect(state.values?.name).toBe("สมชาย ใจดี")
  expect(sendContactEmail).not.toHaveBeenCalled()
})

test("returns a generic message and preserves input when sending fails", async () => {
  sendContactEmail.mockRejectedValue(new Error("Failed to send contact email"))

  const formData = buildFormData({
    name: "สมชาย ใจดี",
    email: "somchai@example.com",
    subject: "สอบถามเรื่องสินค้า",
    message: "อยากทราบว่าสินค้ามีสีอื่นไหมครับ",
    company: "",
  })

  const state = await submitContactForm(INITIAL_CONTACT_FORM_STATE, formData)

  expect(state.status).toBe("error")
  expect(state.fieldErrors).toBeUndefined()
  expect(state.message).not.toMatch(/resend|api key/i)
  expect(state.values?.subject).toBe("สอบถามเรื่องสินค้า")
})
