import { Module } from "vuex"

import { CartState, RootState } from "@/types/store"
import { cartState } from "./state"
import { cartMutations } from "./mutations"
import { cartGetters } from "./getters"

export const cartModule: Module<CartState, RootState> = {
  namespaced: true,
  state: cartState,
  mutations: cartMutations,
  getters: cartGetters,
}
