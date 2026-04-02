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
          <form class="header__search" @submit="onSearch">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="What are you looking for?"
            />
            <button type="submit">
              <app-icon name="search" :size="16" />
            </button>
          </form>

          <!-- TODO: open cart overlay  -->
          <button class="header__cart">
            <app-icon name="cart" />
          </button>
        </div>

        <button class="header__burger" @click="toggleMenu">
          <app-icon :name="isMenuOpen ? 'close' : 'burger'" />
        </button>
      </nav>
    </div>

    <div
      class="header__overlay"
      :class="{ 'is-open': isMenuOpen }"
      @click="toggleMenu"
    >
      <div class="header__overlay-content" @click.stop>
        <form class="header__search" @submit.prevent="onSearch">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="What are you looking for?"
          />
          <button type="submit">
            <app-icon name="search" :size="16" />
          </button>
        </form>

        <ul class="header__overlay-links">
          <li v-for="link in navLinks" :key="link.to">
            <router-link :to="link.to" @click.native="toggleMenu">{{
              link.label
            }}</router-link>
          </li>
          <!-- TODO: open cart overlay  -->
          <li>
            <router-link @click.native="toggleMenu">Checkout</router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from "vue"
import AppIcon from "@/components/icons/AppIcon.vue"

export default Vue.extend({
  name: "TheHeader",

  components: { AppIcon },

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
  },
})
</script>
