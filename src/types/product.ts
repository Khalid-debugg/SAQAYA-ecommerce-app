export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  rating: number
  discountPercentage: number
  stock: number
  images: string[]
  thumbnail: string
  reviews: unknown[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface ProductCategory {
  slug: string
  name: string
  url: string
}
export interface ProductsState {
  productsList: Product[]
  selectedProduct: Product | null
  flashSaleProducts: Product[]
  productsCategoryList: ProductCategory[]
  exploreProductsList: Product[]
  sideCartItems: CartItem[]
  isLoadingProductList: boolean
  isLoadingSelectedProduct: boolean
  isLoadingFlashSaleProducts: boolean
  isLoadingProductCategories: boolean
  isLoadingExploreProducts: boolean
}
