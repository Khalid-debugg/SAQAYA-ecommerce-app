interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}
interface ProductMeta {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}

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
  reviews: Review[]
  meta: ProductMeta
}

export interface ProductCategory {
  slug: string
  name: string
  url: string
}

export type ProductsPaginated = {
  products: Product[]
  total: number
  skip: number
  limit: number
}
