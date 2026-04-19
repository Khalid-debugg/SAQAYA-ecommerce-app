import { defineStore } from "pinia"
import { cartState } from "./state"
import { cartGetters } from "./getters"
import { cartActions } from "./actions"

export const useCartStore = defineStore("cart", {
  state: cartState,
  getters: cartGetters,
  actions: cartActions,
})
