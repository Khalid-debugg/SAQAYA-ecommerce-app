import store from "@/store"
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router"

export const productDetailsGuard = async (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const id = Number(to.params.id)
  if (!id) {
    next("/not-found")
    return
  }

  try {
    await store.dispatch("products/fetchProductById", { id })
    next()
  } catch {
    next("/not-found")
  }
}
