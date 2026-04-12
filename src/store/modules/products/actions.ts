import {
  getProductById,
  getCategories,
  getProducts,
} from "@/services/products/products.api"
import { ProductsState, RootState } from "@/types/store"
import { ActionContext } from "vuex"

export const productsActions = {
  async fetchProducts(
    { commit, state }: ActionContext<ProductsState, RootState>,
    { limit, skip }: { limit: number; skip: number }
  ) {
    commit(
      "ui/SET_LOADING",
      { key: "fetchProducts", value: true },
      { root: true }
    )
    try {
      const data = await getProducts(limit, skip)
      commit("SET_PRODUCTS_LIST", [...state.productsList, ...data.products])
      commit("SET_TOTAL_PRODUCTS", data.total)
    } catch (error) {
      commit(
        "ui/SET_ERROR",
        { key: "fetchProducts", value: "Failed to load products" },
        { root: true }
      )
      throw error
    } finally {
      commit(
        "ui/SET_LOADING",
        { key: "fetchProducts", value: false },
        { root: true }
      )
    }
  },
  async fetchHomeProducts({ commit }: ActionContext<ProductsState, RootState>) {
    commit(
      "ui/SET_LOADING",
      { key: "fetchHomeProducts", value: true },
      { root: true }
    )
    try {
      const data = await getProducts()
      commit("SET_HOME_PRODUCTS", data.products)
    } catch (error) {
      commit(
        "ui/SET_ERROR",
        { key: "fetchHomeProducts", value: "Failed to load products" },
        { root: true }
      )
      throw error
    } finally {
      commit(
        "ui/SET_LOADING",
        { key: "fetchHomeProducts", value: false },
        { root: true }
      )
    }
  },
  async fetchProductCategories({
    commit,
  }: ActionContext<ProductsState, RootState>) {
    commit(
      "ui/SET_LOADING",
      { key: "fetchProductCategories", value: true },
      { root: true }
    )
    try {
      const data = await getCategories()
      commit("SET_PRODUCT_CATEGORIES", data)
    } catch (error) {
      commit(
        "ui/SET_ERROR",
        { key: "fetchProductCategories", value: "Failed to load products" },
        { root: true }
      )
      throw error
    } finally {
      commit(
        "ui/SET_LOADING",
        { key: "fetchProductCategories", value: false },
        { root: true }
      )
    }
  },
  async fetchProductById(
    { commit }: ActionContext<ProductsState, RootState>,
    { id }: { id: number }
  ) {
    const data = await getProductById(id)
    commit("SET_SELECTED_PRODUCT", data)
  },
}
