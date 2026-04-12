import { Product, ProductCategory } from "@/types/product"
import { ProductsState } from "@/types/store"

export const productsMutations = {
  SET_HOME_PRODUCTS(state: ProductsState, payload: Product[]) {
    state.homeProducts = payload
  },
  SET_PRODUCTS_LIST(state: ProductsState, payload: Product[]) {
    state.productsList = payload
  },
  SET_SELECTED_PRODUCT(state: ProductsState, payload: Product | null) {
    state.selectedProduct = payload
  },
  SET_PRODUCT_CATEGORIES(state: ProductsState, payload: ProductCategory[]) {
    state.productCategories = payload
  },
  SET_TOTAL_PRODUCTS(state: ProductsState, payload: number) {
    state.totalProducts = payload
  },
}
