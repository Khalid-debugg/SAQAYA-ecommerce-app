import { CartItem } from "@/types/cart"
import { CartState } from "@/types/store"

export const cartGetters = {
  GET_TOTAL_USD(state: CartState): number {
    return state.cartItems.reduce(
      (accumulator: number, currentCartItem: CartItem) => {
        return (
          accumulator + currentCartItem.quantity * currentCartItem.product.price
        )
      },
      0
    )
  },
  GET_ITEMS_COUNT(state: CartState): number {
    return state.cartItems.reduce(
      (accumulator: number, currentCartItem: CartItem) => {
        return accumulator + currentCartItem.quantity
      },
      0
    )
  },
}
