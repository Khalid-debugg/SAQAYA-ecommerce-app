import { Product } from "@/types/product"
import { CartItem } from "@/types/cart"

const CART_STORAGE_KEY = "cart_items"

export const cartActions = {
  addToCart(this: { cartItems: CartItem[] }, product: Product, quantity = 1) {
    const existing = this.cartItems.find(
      (item) => item.product.id === product.id
    )
    if (existing) {
      existing.quantity += quantity
    } else {
      this.cartItems.push({ product, quantity })
    }
  },
  removeFromCart(this: { cartItems: CartItem[] }, productId: number) {
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== productId
    )
  },
  updateQuantity(
    this: { cartItems: CartItem[] },
    productId: number,
    quantity: number
  ) {
    const item = this.cartItems.find((item) => item.product.id === productId)
    if (item) item.quantity = quantity
  },
  loadFromStorage(this: { addToCart: (p: Product, q: number) => void }) {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    if (saved) {
      const items: CartItem[] = JSON.parse(saved)
      items.forEach((item) => this.addToCart(item.product, item.quantity))
    }
  },
  persistToStorage(this: {
    $subscribe: (fn: () => void) => void
    cartItems: CartItem[]
  }) {
    this.$subscribe(() => {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cartItems))
    })
  },
}
