"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react"

import type { Product } from "@/lib/mock-data"

export type CartItem = {
  productId: number
  name: string
  image: string
  price: number
  quantity: number
}

type CartState = { items: CartItem[]; isHydrated: boolean }

type CartAction =
  | { type: "ADD"; product: Product; quantity: number }
  | { type: "REMOVE"; productId: number }
  | { type: "SET_QUANTITY"; productId: number; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] }

const STORAGE_KEY = "shopsabai-cart"

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items, isHydrated: true }
    case "ADD": {
      const existing = state.items.find((item) => item.productId === action.product.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.productId === action.product.id
              ? { ...item, quantity: item.quantity + action.quantity }
              : item
          ),
        }
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            productId: action.product.id,
            name: action.product.name,
            image: action.product.image,
            price: action.product.price,
            quantity: action.quantity,
          },
        ],
      }
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((item) => item.productId !== action.productId) }
    case "SET_QUANTITY": {
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((item) => item.productId !== action.productId) }
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      }
    }
    case "CLEAR":
      return { ...state, items: [] }
    default:
      return state
  }
}

type CartContextValue = {
  items: CartItem[]
  itemCount: number
  subtotal: number
  isHydrated: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: number) => void
  setQuantity: (productId: number, quantity: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isHydrated: false })

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      dispatch({ type: "HYDRATE", items: raw ? JSON.parse(raw) : [] })
    } catch {
      dispatch({ type: "HYDRATE", items: [] })
    }
  }, [])

  useEffect(() => {
    if (!state.isHydrated) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  }, [state.items, state.isHydrated])

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = state.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
    return {
      items: state.items,
      itemCount,
      subtotal,
      isHydrated: state.isHydrated,
      addItem: (product, quantity = 1) => dispatch({ type: "ADD", product, quantity }),
      removeItem: (productId) => dispatch({ type: "REMOVE", productId }),
      setQuantity: (productId, quantity) =>
        dispatch({ type: "SET_QUANTITY", productId, quantity }),
      clear: () => dispatch({ type: "CLEAR" }),
    }
  }, [state.items, state.isHydrated])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
