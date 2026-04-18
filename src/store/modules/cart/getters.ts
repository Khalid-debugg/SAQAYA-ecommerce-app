import { CartItem } from "@/types/cart"
import { CartState } from "@/types/store"

const calculateSubtotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce(
    (accumulator, currentCartItem) =>
      accumulator + currentCartItem.quantity * currentCartItem.product.price,
    0
  )
}

export const cartGetters = {
  GET_SUBTOTAL_USD(state: CartState): number {
    return calculateSubtotal(state.cartItems)
  },
  GET_SHIPPING_COST(state: CartState): number {
    return state.shippingCost
  },
  GET_TOTAL_USD(state: CartState): number {
    return calculateSubtotal(state.cartItems) + state.shippingCost
  },
  GET_ITEMS_COUNT(state: CartState): number {
    return state.cartItems.reduce(
      (accumulator, currentCartItem) => accumulator + currentCartItem.quantity,
      0
    )
  },
}
