import { CartItem } from "@/types/cart"
import { CartState } from "@/types/store"

export const cartMutations = {
  ADD_TO_CART(state: CartState, payload: CartItem) {
    const existing = state.cartItems.find(
      (item) => item.product.id === payload.product.id
    )
    if (existing) {
      existing.quantity += payload.quantity
    } else {
      state.cartItems.push(payload)
    }
  },
  REMOVE_FROM_CART(state: CartState, productId: number) {
    state.cartItems = state.cartItems.filter(
      (item) => item.product.id !== productId
    )
  },
  UPDATE_QUANTITY(
    state: CartState,
    { productId, quantity }: { productId: number; quantity: number }
  ) {
    const item = state.cartItems.find((item) => item.product.id === productId)
    if (item) {
      item.quantity = quantity
    }
  },
}
