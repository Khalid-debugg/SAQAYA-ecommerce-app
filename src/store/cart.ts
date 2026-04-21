import { defineStore } from "pinia"
import { CartState } from "@/types/store"
import { Product } from "@/types/product"
import { CartItem } from "@/types/cart"

const CART_STORAGE_KEY = "cart_items"

export const useCartStore = defineStore("cart", {
  state: (): CartState => ({
    cartItems: [],
    shippingCost: 0,
  }),

  getters: {
    subtotalUSD: (state): number =>
      state.cartItems.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0
      ),
    totalUSD: (state): number =>
      state.cartItems.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0
      ) + state.shippingCost,
    itemsCount: (state): number =>
      state.cartItems.reduce((acc, item) => acc + item.quantity, 0),
  },

  actions: {
    addToCart(product: Product, quantity = 1) {
      const existing = this.cartItems.find(
        (item) => item.product.id === product.id
      )
      if (existing) {
        existing.quantity += quantity
      } else {
        this.cartItems.push({ product, quantity })
      }
    },
    removeFromCart(productId: number) {
      this.cartItems = this.cartItems.filter(
        (item) => item.product.id !== productId
      )
    },
    updateQuantity(productId: number, quantity: number) {
      const item = this.cartItems.find((item) => item.product.id === productId)
      if (item) item.quantity = quantity
    },
    loadFromStorage() {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      if (saved) {
        const items: CartItem[] = JSON.parse(saved)
        items.forEach((item) => this.addToCart(item.product, item.quantity))
      }
    },
    persistToStorage() {
      this.$subscribe(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cartItems))
      })
    },
  },
})
