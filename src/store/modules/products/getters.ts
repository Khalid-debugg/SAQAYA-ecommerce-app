import { Product } from "@/types/product"
import { ProductsState } from "@/types/store"

export const productsGetters = {
  GET_FLASH_SALE_PRODUCTS(state: ProductsState) {
    return [...state.homeProducts].sort((a: Product, b: Product) => {
      return b.discountPercentage - a.discountPercentage
    })
  },
}
