import { expect, test } from "vitest"
import { parseContactForm } from "../src/lib/contact/schema"

const validInput = {
  name: "สมชาย ใจดี",
  email: "somchai@example.com",
  subject: "สอบถามเรื่องสินค้า",
  message: "อยากทราบว่าสินค้ามีสีอื่นไหมครับ",
}

test("accepts a fully valid input", () => {
  const result = parseContactForm(validInput)
  expect(result.success).toBe(true)
})

test("trims whitespace before validating", () => {
  const result = parseContactForm({ ...validInput, name: "  สมชาย  " })
  expect(result.success).toBe(true)
  if (result.success) {
    expect(result.data.name).toBe("สมชาย")
  }
})

test("rejects whitespace-only fields", () => {
  const result = parseContactForm({
    name: "   ",
    email: "   ",
    subject: "   ",
    message: "   ",
  })
  expect(result.success).toBe(false)
  if (!result.success) {
    expect(result.fieldErrors.name).toBeDefined()
    expect(result.fieldErrors.email).toBeDefined()
    expect(result.fieldErrors.subject).toBeDefined()
    expect(result.fieldErrors.message).toBeDefined()
  }
})

test("rejects an invalid email while other fields stay valid", () => {
  const result = parseContactForm({ ...validInput, email: "not-an-email" })
  expect(result.success).toBe(false)
  if (!result.success) {
    expect(result.fieldErrors.email).toBeDefined()
    expect(result.fieldErrors.name).toBeUndefined()
  }
})

test("rejects a message shorter than 10 characters", () => {
  const result = parseContactForm({ ...validInput, message: "test" })
  expect(result.success).toBe(false)
  if (!result.success) {
    expect(result.fieldErrors.message).toBeDefined()
  }
})
