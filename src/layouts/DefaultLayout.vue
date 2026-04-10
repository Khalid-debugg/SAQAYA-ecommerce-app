<template>
  <div class="page-layout">
    <Header @open-cart="isCartOpen = true" />
    <main class="page-layout__main">
      <router-view />
    </main>
    <Footer @open-cart="isCartOpen = true" />
    <app-drawer
      title="Shopping Cart"
      :isOpen="isCartOpen"
      @close="isCartOpen = false"
    >
      <CartView />
    </app-drawer>
  </div>
</template>

<script>
import Header from "@/components/layouts/Header.vue"
import Footer from "@/components/layouts/Footer.vue"
import CartView from "@/views/CartView.vue"
import AppDrawer from "@/components/layouts/AppDrawer.vue"

export default {
  components: { Header, Footer, CartView, AppDrawer },

  data() {
    return {
      isCartOpen: false,
    }
  },
}
</script>
