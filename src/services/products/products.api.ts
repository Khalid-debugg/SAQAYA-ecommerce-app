import { ProductsPaginated, Product, ProductCategory } from "@/types/product"
import { axiosInstance } from "@/plugins/axios"

export async function getProducts(params?: {
  limit?: number
  skip?: number
  sortBy?: string
  order?: string
}): Promise<ProductsPaginated> {
  const response = await axiosInstance.get<ProductsPaginated>("/products", {
    params,
  })
  return response.data
}

export async function getProductById(id: number): Promise<Product> {
  const response = await axiosInstance.get<Product>(`/products/${id}`)
  return response.data
}

export async function getCategories(): Promise<ProductCategory[]> {
  const response = await axiosInstance.get<ProductCategory[]>(
    "/products/categories"
  )
  return response.data
}

export async function getProductsByCategory(params: {
  category: string
  limit?: number
  skip?: number
  sortBy?: string
  order?: string
}): Promise<ProductsPaginated> {
  const response = await axiosInstance.get<ProductsPaginated>(
    `/products/category/${params.category}`,
    { params }
  )
  return response.data
}

export async function searchProducts(params: {
  query: string
  limit: number
}): Promise<ProductsPaginated> {
  const response = await axiosInstance.get<ProductsPaginated>(
    "/products/search",
    { params }
  )
  return response.data
}
