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
          <form class="the-header__search">
            <app-input
              v-model="searchQuery"
              placeholder="What are you looking for?"
            />
            <button type="submit">
              <app-icon name="search" :size="16" />
            </button>
          </form>

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
      <form class="the-header__search nav-menu__search" @submit.prevent>
        <app-input
          v-model="searchQuery"
          placeholder="What are you looking for?"
        />
        <button type="submit">
          <app-icon name="search" :size="16" />
        </button>
      </form>

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
import { ref } from "vue"
import { useCartStore } from "@/store/cart"
import AppIcon from "@/components/ui/AppIcon.vue"
import AppInput from "@/components/ui/AppInput.vue"
import AppDrawer from "@/components/layouts/AppDrawer.vue"

const emit = defineEmits(["open-cart"])
const cartStore = useCartStore()

const searchQuery = ref("")
const isMenuOpen = ref(false)

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/contact", label: "Contact" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
const openCart = () => {
  isMenuOpen.value = false
  emit("open-cart")
}
</script>
