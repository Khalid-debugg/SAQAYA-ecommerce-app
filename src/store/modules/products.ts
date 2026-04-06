import { RootState } from "@/store/index"
import {
  Product,
  ProductCategory,
  CartItem,
  ProductsState,
} from "@/types/product"
import { Module } from "vuex"

export const productsModule: Module<ProductsState, RootState> = {
  namespaced: true,
  state: () => ({
    productsList: [] as Product[],
    selectedProduct: null as Product | null,
    flashSaleProducts: [] as Product[],
    productsCategoryList: [] as ProductCategory[],
    exploreProductsList: [] as Product[],
    sideCartItems: [] as CartItem[],
    isLoadingProductList: false,
    isLoadingSelectedProduct: false,
    isLoadingFlashSaleProducts: false,
    isLoadingProductCategories: false,
    isLoadingExploreProducts: false,
  }),
  mutations: {
    SET_PRODUCTS_LIST(state: ProductsState, payload: Product[]) {
      state.productsList = payload
    },
    SET_IS_LOADING_PRODUCTS_LIST(state: ProductsState, payload: boolean) {
      state.isLoadingProductList = payload
    },
    SET_SELECTED_PRODUCT(state: ProductsState, payload: Product | null) {
      state.selectedProduct = payload
    },
    SET_IS_LOADING_SELECTED_PRODUCT(state: ProductsState, payload: boolean) {
      state.isLoadingSelectedProduct = payload
    },
    SET_FLASH_SALE_PRODUCTS(state: ProductsState, payload: Product[]) {
      state.flashSaleProducts = payload
    },
    SET_IS_LOADING_FLASH_SALE_PRODUCTS(state: ProductsState, payload: boolean) {
      state.isLoadingFlashSaleProducts = payload
    },
    SET_PRODUCT_CATEGORY_LIST(
      state: ProductsState,
      payload: ProductCategory[]
    ) {
      state.productsCategoryList = payload
    },
    SET_IS_LOADING_PRODUCT_CATEGORIES(state: ProductsState, payload: boolean) {
      state.isLoadingProductCategories = payload
    },
    SET_EXPLORE_PRODUCTS_LIST(state: ProductsState, payload: Product[]) {
      state.exploreProductsList = payload
    },
    SET_IS_LOADING_EXPLORE_PRODUCTS(state: ProductsState, payload: boolean) {
      state.isLoadingExploreProducts = payload
    },
    SET_SIDE_CART_ITEMS(state: ProductsState, payload: CartItem[]) {
      state.sideCartItems = payload
    },
  },
  getters: {
    GET_TOTAL_USD(state: ProductsState): number {
      return state.sideCartItems.reduce(
        (accumulator: number, currentCartItem: CartItem) => {
          return (
            accumulator +
            currentCartItem.quantity * currentCartItem.product.price
          )
        },
        0
      )
    },
  },
  actions: {
    async fetchProductsList({ commit, state }, pageNumber = 1) {
      const limit = 12
      const skip = (pageNumber - 1) * limit
      try {
        commit("SET_IS_LOADING_PRODUCTS_LIST", true)
        const response = await fetch(
          `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
        )
        const data = await response.json()
        commit("SET_PRODUCTS_LIST", [...state.productsList, ...data.products])
      } catch (error) {
        console.log(error)
      } finally {
        commit("SET_IS_LOADING_PRODUCTS_LIST", false)
      }
    },
    async fetchSelectedProduct({ commit }, productId: number) {
      try {
        commit("SET_IS_LOADING_SELECTED_PRODUCT", true)
        const response = await fetch(
          `https://dummyjson.com/products/${productId}`
        )
        const data = await response.json()
        commit("SET_SELECTED_PRODUCT", data)
      } catch (error) {
        console.log(error)
      } finally {
        commit("SET_IS_LOADING_SELECTED_PRODUCT", false)
      }
    },
    async fetchFlashSaleProducts({ commit, state }, pageNumber = 1) {
      const limit = 8
      const skip = (pageNumber - 1) * limit
      try {
        commit("SET_IS_LOADING_FLASH_SALE_PRODUCTS", true)
        const response = await fetch(
          `https://dummyjson.com/products?limit=${limit}&skip=${skip}&sortBy=discountPercentage&order=desc`
        )
        const data = await response.json()
        commit("SET_FLASH_SALE_PRODUCTS", [
          ...state.flashSaleProducts,
          ...data.products,
        ])
      } catch (error) {
        console.log(error)
      } finally {
        commit("SET_IS_LOADING_FLASH_SALE_PRODUCTS", false)
      }
    },
    async fetchProductCategories({ commit }) {
      try {
        commit("SET_IS_LOADING_PRODUCT_CATEGORIES", true)
        const response = await fetch(
          `https://dummyjson.com/products/categories`
        )
        const data = await response.json()
        commit("SET_PRODUCT_CATEGORY_LIST", data)
      } catch (error) {
        console.log(error)
      } finally {
        commit("SET_IS_LOADING_PRODUCT_CATEGORIES", false)
      }
    },
    async fetchExploreProducts({ commit }) {
      try {
        commit("SET_IS_LOADING_EXPLORE_PRODUCTS", true)
        const response = await fetch("https://dummyjson.com/products?limit=8")
        const data = await response.json()
        commit("SET_EXPLORE_PRODUCTS_LIST", data.products)
      } catch (error) {
        console.log(error)
      } finally {
        commit("SET_IS_LOADING_EXPLORE_PRODUCTS", false)
      }
    },
  },
}
