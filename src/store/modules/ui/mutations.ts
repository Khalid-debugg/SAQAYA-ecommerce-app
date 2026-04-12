import { UiState } from "@/types/store"
import { set } from "vue"

export const uiMutations = {
  SET_LOADING(state: UiState, { key, value }: { key: string; value: boolean }) {
    set(state.loading, key, value)
  },
  SET_ERROR(
    state: UiState,
    { key, value }: { key: string; value: string | null }
  ) {
    set(state.error, key, value)
  },
}
