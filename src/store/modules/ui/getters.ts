import { UiState } from "@/types/store"

export const uiGetters = {
  IS_LOADING:
    (state: UiState) =>
    (key: string): boolean => {
      return state.loading[key] ?? false
    },
  GET_ERROR:
    (state: UiState) =>
    (key: string): string | null => {
      return state.error[key] ?? null
    },
}
