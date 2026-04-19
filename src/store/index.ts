import { createPinia } from "pinia"

export const pinia = createPinia()

export { useUiStore } from "./modules/ui"
export { useCartStore } from "./modules/cart"
export { useProductsStore } from "./modules/products"
