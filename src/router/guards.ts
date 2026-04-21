import { RouteLocationNormalized, NavigationGuardNext } from "vue-router"
import { useProductsStore } from "@/store/products"

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
    const productsStore = useProductsStore()
    await productsStore.fetchProductById(id)
    next()
  } catch {
    next("/not-found")
  }
}
