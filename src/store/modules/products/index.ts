import { Module } from "vuex"
import { productsState } from "./state"
import { productsMutations } from "./mutations"
import { productsGetters } from "./getters"
import { productsActions } from "./actions"
import { ProductsState, RootState } from "@/types/store"

export const productsModule: Module<ProductsState, RootState> = {
  namespaced: true,
  state: productsState,
  mutations: productsMutations,
  getters: productsGetters,
  actions: productsActions,
}
