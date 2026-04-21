import { h } from "vue"
import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouterView,
} from "vue-router"
import { productDetailsGuard } from "./guards"
import { useProductsStore } from "@/store"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
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
        meta: { breadcrumb: "Products" },
        component: { render: () => h(RouterView) },
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
              breadcrumb: (store: ReturnType<typeof useProductsStore>) =>
                store.selectedProductTitle,
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
        path: "/:pathMatch(.*)*",
        name: "not-found",
        meta: { breadcrumb: "404 Error" },
        component: () =>
          import(/* webpackChunkName: "not-found" */ "@/views/404View.vue"),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 }
  },
})

export default router
