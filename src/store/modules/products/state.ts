import { ProductsState } from "@/types/store"

export const productsState = (): ProductsState => {
  return {
    homeProducts: [],
    productsList: [],
    selectedProduct: null,
    productCategories: [],
    totalProducts: 0,
  }
}
