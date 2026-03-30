import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/AboutView.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () =>
      import(/* webpackChunkName: "contact" */ "@/views/ContactView.vue"),
  },
  {
    path: "/products",
    name: "products",
    component: () =>
      import(/* webpackChunkName: "products" */ "@/views/ProductsView.vue"),
  },
  {
    path: "/product/:id",
    name: "product-details",
    component: () =>
      import(
        /* webpackChunkName: "product-details" */ "@/views/ProductDetailsView.vue"
      ),
  },
  {
    path: "*",
    name: "not-found",
    component: () =>
      import(/* webpackChunkName: "not-found" */ "@/views/NotFoundView.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
