import { UiState } from "@/types/store"

export const uiGetters = {
  isLoading: (state: UiState) => (key: string) => state.loading[key] ?? false,
  getError: (state: UiState) => (key: string) => state.error[key] ?? null,
}
