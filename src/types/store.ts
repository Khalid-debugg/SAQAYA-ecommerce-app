import { CartItem } from "./cart"
import { Product, ProductCategory } from "./product"

export interface CurrentSort {
  sortBy: string
  order: string
}

export interface ProductsState {
  homeProducts: Product[]
  productsList: Product[]
  relatedProducts: Product[]
  selectedProduct: Product | null
  productCategories: ProductCategory[]
  totalProducts: number
  visibleCount: number
  currentCategory: string
  currentSort: CurrentSort
}

export interface CartState {
  cartItems: CartItem[]
  shippingCost: number
}

export interface UiState {
  loading: Record<string, boolean>
  error: Record<string, string | null>
}

export interface RootState {
  products: ProductsState
  cart: CartState
  ui: UiState
}
