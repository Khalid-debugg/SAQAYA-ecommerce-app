import { UiState } from "@/types/store"

export const uiMutations = {
  SET_LOADING(state: UiState, { key, value }: { key: string; value: boolean }) {
    state.loading[key] = value
  },
  SET_ERROR(
    state: UiState,
    { key, value }: { key: string; value: string | null }
  ) {
    state.error[key] = value
  },
}
