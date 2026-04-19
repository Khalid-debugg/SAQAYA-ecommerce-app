import { ProductCategory } from "@/types/product"
import { ProductsState } from "@/types/store"
import {
  getProducts,
  getProductById,
  getCategories,
  getProductsByCategory,
} from "@/services/products/products.api"
import { useUiStore } from "../ui"

export const productsActions = {
  async fetchHomeProducts(this: ProductsState) {
    const ui = useUiStore()
    ui.setLoading("fetchHomeProducts", true)
    try {
      const data = await getProducts()
      this.homeProducts = data.products
    } catch {
      ui.setError("fetchHomeProducts", "Failed to load products")
      throw new Error("Failed to load products")
    } finally {
      ui.setLoading("fetchHomeProducts", false)
    }
  },

  async fetchProducts(
    this: ProductsState,
    limit: number,
    skip: number,
    sortBy = "",
    order = ""
  ) {
    const ui = useUiStore()
    ui.setLoading("fetchProducts", true)
    try {
      const data = await getProducts(limit, skip, sortBy, order)
      this.productsList =
        skip === 0 ? data.products : [...this.productsList, ...data.products]
      this.totalProducts = data.total
    } catch {
      ui.setError("fetchProducts", "Failed to load products")
      throw new Error("Failed to load products")
    } finally {
      ui.setLoading("fetchProducts", false)
    }
  },

  async fetchProductById(this: ProductsState, id: number) {
    const data = await getProductById(id)
    this.selectedProduct = data
  },

  async fetchProductCategories(this: ProductsState) {
    const ui = useUiStore()
    ui.setLoading("fetchProductCategories", true)
    try {
      const data = await getCategories()
      this.productCategories = data as ProductCategory[]
    } catch {
      ui.setError("fetchProductCategories", "Failed to load categories")
      throw new Error("Failed to load categories")
    } finally {
      ui.setLoading("fetchProductCategories", false)
    }
  },

  async fetchProductsByCategory(
    this: ProductsState,
    category: string,
    limit: number,
    skip: number,
    sortBy = "",
    order = ""
  ) {
    const ui = useUiStore()
    ui.setLoading("fetchProducts", true)
    try {
      const data = await getProductsByCategory(
        category,
        limit,
        skip,
        sortBy,
        order
      )
      this.productsList =
        skip === 0 ? data.products : [...this.productsList, ...data.products]
      this.totalProducts = data.total
    } catch {
      ui.setError("fetchProducts", "Failed to load products")
      throw new Error("Failed to load products")
    } finally {
      ui.setLoading("fetchProducts", false)
    }
  },
}
