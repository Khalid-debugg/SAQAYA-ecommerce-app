<template>
  <nav v-if="crumbs.length" class="breadcrumb container">
    <router-link to="/" class="breadcrumb__link">Home</router-link>
    <span v-for="crumb in crumbs" :key="crumb.label" class="breadcrumb__item">
      <span class="breadcrumb__separator">/</span>
      <router-link v-if="crumb.to" :to="crumb.to" class="breadcrumb__link">
        {{ crumb.label }}
      </router-link>
      <span v-else class="breadcrumb__current">{{ crumb.label }}</span>
    </span>
  </nav>
</template>

<script lang="ts">
import Vue from "vue"

interface Crumb {
  label: string
  to?: string
}

export default Vue.extend({
  name: "AppBreadcrumb",

  computed: {
    crumbs(): Crumb[] {
      const matched = this.$route.matched.filter(
        (route) => "breadcrumb" in route.meta
      )

      return matched.map((route, index) => {
        const isLast = index === matched.length - 1
        const { breadcrumb } = route.meta

        return {
          label:
            typeof breadcrumb === "function"
              ? breadcrumb(this.$store)
              : breadcrumb,
          to: isLast ? undefined : route.path || "/",
        }
      })
    },
  },
})
</script>
