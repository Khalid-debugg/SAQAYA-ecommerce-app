<template>
  <div class="page-layout">
    <Header @open-cart="isCartOpen = true" />
    <main class="page-layout__main">
      <router-view />
    </main>
    <Footer @open-cart="isCartOpen = true" />
    <CartSideBar :is-open="isCartOpen" @close="isCartOpen = false" />
  </div>
</template>

<script>
import Header from "@/components/layouts/Header.vue"
import Footer from "@/components/layouts/Footer.vue"
import CartSideBar from "@/components/layouts/CartSideBar.vue"

export default {
  components: { Header, Footer, CartSideBar },

  data() {
    return {
      isCartOpen: false,
    }
  },
}
</script>
