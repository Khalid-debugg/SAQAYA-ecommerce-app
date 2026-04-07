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
          </button>
        </div>

        <button class="header__burger" @click="toggleMenu">
          <app-icon :name="isMenuOpen ? 'close' : 'burger'" />
        </button>
      </nav>
    </div>

    <transition name="drawer-overlay">
      <div v-if="isMenuOpen" class="drawer-overlay" @click="toggleMenu" />
    </transition>

    <transition name="drawer-slide-right">
      <div v-if="isMenuOpen" class="drawer">
        <div class="drawer__header">
          <h2 class="drawer__title">Menu</h2>
          <button class="drawer__close" @click="toggleMenu">
            <app-icon name="close" />
          </button>
        </div>

        <div class="drawer__body">
          <form
            class="header__search nav-menu__search"
            @submit.prevent="onSearch"
          >
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
              <button class="nav-menu__checkout" @click="openCart">
                Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </header>
</template>

<script lang="ts">
import Vue from "vue"
import AppIcon from "@/components/icons/AppIcon.vue"
import AppInput from "@/components/ui/AppInput.vue"

export default Vue.extend({
  name: "TheHeader",

  components: { AppIcon, AppInput },

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
})
</script>
