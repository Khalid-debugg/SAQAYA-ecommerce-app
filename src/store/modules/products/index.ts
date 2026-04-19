import { defineStore } from "pinia"
import { productsState } from "./state"
import { productsGetters } from "./getters"
import { productsActions } from "./actions"

export const useProductsStore = defineStore("products", {
  state: productsState,
  getters: productsGetters,
  actions: productsActions,
})
