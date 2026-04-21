import { createPinia } from "pinia"

export const pinia = createPinia()

export { useUiStore } from "./ui"
export { useCartStore } from "./cart"
export { useProductsStore } from "./products"
