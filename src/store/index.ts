import Vue from "vue"
import Vuex from "vuex"
import { productsModule } from "./modules/products"

Vue.use(Vuex)

export type RootState = object

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    products: productsModule,
  },
})
