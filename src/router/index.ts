import Vue, { CreateElement } from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import { Store } from "vuex"
import { productDetailsGuard } from "./guards"
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "default-layout",
    component: () =>
      import(
        /* webpackChunkName: "default-layout" */ "@/layouts/DefaultLayout.vue"
      ),
    children: [
      {
        path: "",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/HomeView.vue"),
      },
      {
        path: "about",
        name: "about",
        meta: { breadcrumb: "About" },
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/AboutView.vue"),
      },
      {
        path: "contact",
        name: "contact",
        meta: { breadcrumb: "Contact" },
        component: () =>
          import(/* webpackChunkName: "contact" */ "@/views/ContactView.vue"),
      },
      {
        path: "products",
        name: "products",
        meta: { breadcrumb: "Products" },
        component: { render: (h: CreateElement) => h("router-view") },
        children: [
          {
            path: "",
            name: "products-list",
            component: () =>
              import(
                /* webpackChunkName: "products" */ "@/views/ProductsView.vue"
              ),
          },
          {
            path: ":id",
            name: "product-details",
            meta: {
              breadcrumb: (store: Store<unknown>) =>
                store.getters["products/selectedProductTitle"],
            },
            component: () =>
              import(
                /* webpackChunkName: "product-details" */ "@/views/ProductDetails.vue"
              ),
            beforeEnter: productDetailsGuard,
          },
        ],
      },
      {
        path: "*",
        name: "not-found",
        meta: { breadcrumb: "404 Error" },
        component: () =>
          import(/* webpackChunkName: "not-found" */ "@/views/404View.vue"),
      },
    ],
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

export default router
