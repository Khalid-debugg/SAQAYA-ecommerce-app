import { defineStore } from "pinia"
import { ProductsState } from "@/types/store"
import { Product, ProductCategory } from "@/types/product"
import {
  getProducts,
  getProductById,
  getCategories,
  getProductsByCategory,
} from "@/services/products/products.api"
import { useUiStore } from "./ui"

export const useProductsStore = defineStore("products", {
  state: (): ProductsState => ({
    homeProducts: [],
    productsList: [],
    relatedProducts: [],
    selectedProduct: null,
    productCategories: [],
    totalProducts: 0,
    visibleCount: 0,
    currentCategory: "",
    currentSort: { sortBy: "", order: "" },
  }),

  getters: {
    flashSaleProducts: (state): Product[] =>
      [...state.homeProducts].sort(
        (a, b) => b.discountPercentage - a.discountPercentage
      ),
    selectedProductTitle: (state): string => state.selectedProduct?.title ?? "",
  },

  actions: {
    async fetchHomeProducts() {
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

    async fetchProducts(params: {
      limit?: number
      skip?: number
      sortBy?: string
      order?: string
    }) {
      const ui = useUiStore()
      ui.setLoading("fetchProducts", true)
      try {
        const data = await getProducts(params)
        this.productsList =
          params.skip === 0
            ? data.products
            : [...this.productsList, ...data.products]
        this.totalProducts = data.total
      } catch {
        ui.setError("fetchProducts", "Failed to load products")
        throw new Error("Failed to load products")
      } finally {
        ui.setLoading("fetchProducts", false)
      }
    },

    async fetchProductById(id: number) {
      const data = await getProductById(id)
      this.selectedProduct = data
    },

    async fetchProductCategories() {
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

    async fetchProductsByCategory(params: {
      category: string
      limit?: number
      skip?: number
      sortBy?: string
      order?: string
    }) {
      const ui = useUiStore()
      ui.setLoading("fetchProducts", true)
      try {
        const data = await getProductsByCategory(params)
        this.productsList =
          params.skip === 0
            ? data.products
            : [...this.productsList, ...data.products]
        this.totalProducts = data.total
      } catch {
        ui.setError("fetchProducts", "Failed to load products")
        throw new Error("Failed to load products")
      } finally {
        ui.setLoading("fetchProducts", false)
      }
    },

    async fetchRelatedProducts(category: string, excludeId: number) {
      const ui = useUiStore()
      ui.setLoading("fetchRelatedProducts", true)
      try {
        const data = await getProductsByCategory({
          category,
          limit: 5,
          skip: 0,
        })
        this.relatedProducts = data.products
          .filter((p) => p.id !== excludeId)
          .slice(0, 4)
      } catch {
        ui.setError("fetchRelatedProducts", "Failed to load related products")
        throw new Error("Failed to load related products")
      } finally {
        ui.setLoading("fetchRelatedProducts", false)
      }
    },
  },
})
