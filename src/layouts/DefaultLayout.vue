<template>
  <div class="page-layout">
    <the-header @open-cart="isCartOpen = true" />
    <main class="page-layout__main">
      <app-breadcrumb />
      <router-view />
    </main>
    <the-footer @open-cart="isCartOpen = true" />
    <app-drawer
      title="Shopping Cart"
      :isOpen="isCartOpen"
      @close="isCartOpen = false"
    >
      <CartView />
    </app-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import TheHeader from "@/components/layouts/TheHeader.vue"
import TheFooter from "@/components/layouts/TheFooter.vue"
import CartView from "@/views/CartView.vue"
import AppDrawer from "@/components/layouts/AppDrawer.vue"
import AppBreadcrumb from "@/components/ui/AppBreadcrumb.vue"

const isCartOpen = ref(false)
</script>
