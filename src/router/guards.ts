import store from "@/store"
import { NavigationGuardNext, Route } from "vue-router"

export const productDetailsGuard = async (
  to: Route,
  _from: Route,
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
