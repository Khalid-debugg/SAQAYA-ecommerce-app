<template>
  <header class="header">
    <div class="container">
      <nav class="header__nav">
        <router-link to="/" class="header__logo">Exclusive</router-link>

        <ul class="header__links">
          <li v-for="link in navLinks" :key="link.to">
            <router-link :to="link.to">{{ link.label }}</router-link>
          </li>
        </ul>

        <div class="header__actions">
          <form class="header__search" @submit.prevent="onSearch">
            <app-input
              v-model="searchQuery"
              placeholder="What are you looking for?"
            />
            <button type="submit">
              <app-icon name="search" :size="16" />
            </button>
          </form>

          <button class="header__cart" @click="openCart">
            <app-icon name="cart" />
            <span v-if="cartCount > 0" class="header__cart-count">{{
              cartCount
            }}</span>
          </button>
        </div>

        <button class="header__burger" @click="toggleMenu">
          <app-icon :name="isMenuOpen ? 'close' : 'burger'" />
        </button>
      </nav>
    </div>

    <app-drawer title="Menu" :isOpen="isMenuOpen" @close="isMenuOpen = false">
      <form class="header__search nav-menu__search" @submit.prevent="onSearch">
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
          <router-link :to="link.to" @click.native="toggleMenu">
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

<script lang="ts">
import Vue from "vue"
import AppIcon from "@/components/ui/AppIcon.vue"
import AppInput from "@/components/ui/AppInput.vue"
import AppDrawer from "@/components/layouts/AppDrawer.vue"

export default Vue.extend({
  name: "TheHeader",

  components: { AppIcon, AppInput, AppDrawer },

  data() {
    return {
      searchQuery: "",
      isMenuOpen: false,
      navLinks: [
        { to: "/", label: "Home" },
        { to: "/contact", label: "Contact" },
        { to: "/about", label: "About" },
      ],
    }
  },

  methods: {
    onSearch() {
      //TODO: to be implemented
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    openCart() {
      this.isMenuOpen = false
      this.$emit("open-cart")
    },
  },
  computed: {
    cartCount(): number {
      return this.$store.getters["cart/GET_ITEMS_COUNT"]
    },
  },
})
</script>
