import { createApp } from "vue"
import { pinia } from "./store"
import App from "./App.vue"
import router from "./router"
import "@/styles/main.scss"

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount("#app")

import { useCartStore } from "@/store/modules/cart"
const cartStore = useCartStore()
cartStore.loadFromStorage()
cartStore.persistToStorage()
