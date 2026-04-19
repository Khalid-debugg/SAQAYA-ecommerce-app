import { createStore } from "vuex"
import { productsModule } from "./modules/products"
import { cartModule } from "./modules/cart"
import { uiModule } from "./modules/ui"
import { cartPersistencePlugin } from "@/plugins/cartPersistence"

export default createStore({
  modules: {
    products: productsModule,
    cart: cartModule,
    ui: uiModule,
  },
  plugins: [cartPersistencePlugin],
})
