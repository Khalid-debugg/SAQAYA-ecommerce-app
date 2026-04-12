import store from "@/store"
import { NavigationGuardNext, Route } from "vue-router"

export const productDetailsGuard = async (
  to: Route,
  _from: Route,
  next: NavigationGuardNext
) => {
  try {
    await store.dispatch("products/fetchProductById", {
      id: Number(to.params.id),
    })
    next()
  } catch {
    next("/not-found")
  }
}
