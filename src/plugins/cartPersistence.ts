import { Store } from "vuex"
import { RootState } from "@/types/store"
import { CartItem } from "@/types/cart"

const CART_STORAGE_KEY = "cart_items"

export const cartPersistencePlugin = (store: Store<RootState>): void => {
  const saved = localStorage.getItem(CART_STORAGE_KEY)
  if (saved) {
    const cartItems: CartItem[] = JSON.parse(saved)
    cartItems.forEach((item) => {
      store.commit("cart/ADD_TO_CART", item)
    })
  }

  store.subscribe((mutation, state) => {
    if (mutation.type.startsWith("cart/")) {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(state.cart.cartItems)
      )
    }
  })
}
