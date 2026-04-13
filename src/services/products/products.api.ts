import { ProductsPaginated, Product, ProductCategory } from "@/types/product"
import { axiosInstance } from "@/plugins/axios"

export async function getProducts(
  limit = 0,
  skip = 0
): Promise<ProductsPaginated> {
  const response = await axiosInstance.get<ProductsPaginated>(
    `/products?limit=${limit}&skip=${skip}`
  )
  return response.data
}

export async function getProductById(id: number): Promise<Product> {
  const response = await axiosInstance.get<Product>(`/products/${id}`)
  return response.data
}

export async function getCategories(): Promise<ProductCategory[]> {
  const response = await axiosInstance.get<ProductCategory[]>(
    `/products/categories`
  )
  return response.data
}

export async function getProductsByCategory(
  category: string,
  limit = 0,
  skip = 0
): Promise<ProductsPaginated> {
  const response = await axiosInstance.get<ProductsPaginated>(
    `/products/category/${category}?limit=${limit}&skip=${skip}`
  )
  return response.data
}
