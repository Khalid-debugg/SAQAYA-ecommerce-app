<template>
  <nav
    v-if="crumbs.length"
    class="breadcrumb container"
    data-test="breadcrumb-nav"
  >
    <router-link to="/" class="breadcrumb__link">Home</router-link>
    <span v-for="crumb in crumbs" :key="crumb.label" class="breadcrumb__item">
      <span class="breadcrumb__separator">/</span>
      <router-link
        v-if="crumb.to"
        :to="crumb.to"
        class="breadcrumb__link"
        data-test="crumb-link"
      >
        {{ crumb.label }}
      </router-link>
      <span v-else class="breadcrumb__current" data-test="crumb-current">{{
        crumb.label
      }}</span>
    </span>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useProductsStore } from "@/store/products"

interface Crumb {
  label: string
  to?: string
}

const route = useRoute()
const productsStore = useProductsStore()

const crumbs = computed((): Crumb[] => {
  const matched = route.matched.filter((route) => "breadcrumb" in route.meta)

  return matched.map((route, index) => {
    const isLast = index === matched.length - 1
    const { breadcrumb } = route.meta

    return {
      label:
        typeof breadcrumb === "function"
          ? breadcrumb(productsStore)
          : (breadcrumb as string),
      to: isLast ? undefined : route.path || "/",
    }
  })
})
</script>
