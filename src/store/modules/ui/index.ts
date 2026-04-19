import { defineStore } from "pinia"
import { uiState } from "./state"
import { uiGetters } from "./getters"
import { uiActions } from "./actions"

export const useUiStore = defineStore("ui", {
  state: uiState,
  getters: uiGetters,
  actions: uiActions,
})
