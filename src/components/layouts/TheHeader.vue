<template>
  <header class="the-header">
    <div class="container">
      <nav class="the-header__nav">
        <router-link to="/" class="the-header__logo">Exclusive</router-link>

        <ul class="the-header__links">
          <li v-for="link in navLinks" :key="link.to">
            <router-link :to="link.to" class="the-header__link">{{
              link.label
            }}</router-link>
          </li>
        </ul>

        <div class="the-header__actions">
          <search-input
            v-model="searchQuery"
            :results="searchResults"
            :is-searching="isSearching"
            class="the-header__search"
            @select="navigateToProduct"
          />

          <button class="the-header__cart" @click="openCart">
            <app-icon name="cart" />
            <span
              v-if="cartStore.itemsCount > 0"
              class="the-header__cart-count"
              >{{ cartStore.itemsCount }}</span
            >
          </button>
        </div>

        <button class="the-header__burger" @click="toggleMenu">
          <app-icon :name="isMenuOpen ? 'close' : 'burger'" />
        </button>
      </nav>
    </div>

    <app-drawer title="Menu" :isOpen="isMenuOpen" @close="isMenuOpen = false">
      <search-input
        v-model="searchQuery"
        :results="searchResults"
        :is-searching="isSearching"
        class="nav-menu__search"
        @select="navigateToProduct"
      />

      <ul class="nav-menu__links">
        <li v-for="link in navLinks" :key="link.to">
          <router-link :to="link.to" class="nav-menu__link" @click="toggleMenu">
            {{ link.label }}
          </router-link>
        </li>
        <li>
          <button class="nav-menu__checkout" @click="openCart">Checkout</button>
        </li>
      </ul>
    </app-drawer>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { useRouter } from "vue-router"
import { useCartStore } from "@/store/cart"
import { useDebounce } from "@/composables/useDebounce"
import { searchProducts } from "@/services/products/products.api"
import { Product } from "@/types/product"
import AppIcon from "@/components/ui/AppIcon.vue"
import AppDrawer from "@/components/layouts/AppDrawer.vue"
import SearchInput from "@/components/ui/SearchInput.vue"

const emit = defineEmits(["open-cart"])
const router = useRouter()
const cartStore = useCartStore()

const searchQuery = ref("")
const debouncedQuery = useDebounce(searchQuery, 500)
const searchResults = ref<Product[]>([])
const isSearching = ref(false)
const isMenuOpen = ref(false)

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/contact", label: "Contact" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
]

watch(debouncedQuery, async (query) => {
  if (!query.trim()) {
    searchResults.value = []
    return
  }
  isSearching.value = true
  try {
    const data = await searchProducts({ query, limit: 5 })
    searchResults.value = data.products
  } finally {
    isSearching.value = false
  }
})

const navigateToProduct = (id: number) => {
  searchQuery.value = ""
  searchResults.value = []
  isMenuOpen.value = false
  router.push({ name: "product-details", params: { id: String(id) } })
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
const openCart = () => {
  isMenuOpen.value = false
  emit("open-cart")
}
</script>
