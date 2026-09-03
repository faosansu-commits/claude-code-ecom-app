import { expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import Page from "../src/app/page"
import { CartProvider } from "../src/lib/cart-context"

test("Page", () => {
  render(
    <CartProvider>
      <Page />
    </CartProvider>
  )
  expect(
    screen.getByRole("heading", { level: 1, name: /ซื้อง่าย ขายได้/ })
  ).toBeDefined()
})
