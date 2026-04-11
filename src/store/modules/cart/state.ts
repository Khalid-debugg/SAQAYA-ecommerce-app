import { CartState } from "@/types/store"

export const cartState = (): CartState => {
  return {
    cartItems: [],
  }
}
