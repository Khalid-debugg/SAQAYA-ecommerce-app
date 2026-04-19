export const uiActions = {
  setLoading(
    this: { loading: Record<string, boolean> },
    key: string,
    value: boolean
  ) {
    this.loading[key] = value
  },
  setError(
    this: { error: Record<string, string | null> },
    key: string,
    value: string | null
  ) {
    this.error[key] = value
  },
}
