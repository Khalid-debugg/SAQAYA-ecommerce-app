import { RootState, UiState } from "@/types/store"
import { Module } from "vuex"
import { uiState } from "./state"
import { uiMutations } from "./mutations"
import { uiGetters } from "./getters"

export const uiModule: Module<UiState, RootState> = {
  namespaced: true,
  state: uiState,
  mutations: uiMutations,
  getters: uiGetters,
}
