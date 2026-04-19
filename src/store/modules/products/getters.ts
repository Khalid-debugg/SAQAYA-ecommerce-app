import { Product } from "@/types/product"
import { ProductsState } from "@/types/store"

export const productsGetters = {
  flashSaleProducts: (state: ProductsState): Product[] =>
    [...state.homeProducts].sort(
      (a, b) => b.discountPercentage - a.discountPercentage
    ),
  selectedProductTitle: (state: ProductsState): string =>
    state.selectedProduct?.title ?? "",
}
