import { CartItem } from "./cart"
import { Product, ProductCategory } from "./product"

export interface ProductsState {
  homeProducts: Product[]
  productsList: Product[]
  selectedProduct: Product | null
  productCategories: ProductCategory[]
  totalProducts: number
}

export interface CartState {
  cartItems: CartItem[]
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
