import { CartState } from "@/types/store"

export const cartGetters = {
  subtotalUSD: (state: CartState): number =>
    state.cartItems.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    ),
  totalUSD: (state: CartState): number =>
    state.cartItems.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    ) + state.shippingCost,
  itemsCount: (state: CartState): number =>
    state.cartItems.reduce((acc, item) => acc + item.quantity, 0),
}
