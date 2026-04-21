import { defineStore } from "pinia"
import { UiState } from "@/types/store"

export const useUiStore = defineStore("ui", {
  state: (): UiState => ({
    loading: {},
    error: {},
  }),

  getters: {
    isLoading: (state) => (key: string) => state.loading[key] ?? false,
    getError: (state) => (key: string) => state.error[key] ?? null,
  },

  actions: {
    setLoading(key: string, value: boolean) {
      this.loading[key] = value
    },
    setError(key: string, value: string | null) {
      this.error[key] = value
    },
  },
})
