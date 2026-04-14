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
import { mapState } from "vuex"
import { RouteRecord } from "vue-router"

interface Crumb {
  label: string
  to?: string
}

export default Vue.extend({
  name: "AppBreadcrumb",

  computed: {
    ...mapState("products", ["selectedProduct"]),

    crumbs(): Crumb[] {
      return this.$route.matched
        .filter((route) => "breadcrumb" in route.meta)
        .map((route, index, arr) => ({
          label: route.meta.breadcrumb ?? this.selectedProduct?.title ?? "",
          to: index < arr.length - 1 ? this.buildPath(route) : undefined,
        }))
    },
  },

  methods: {
    buildPath(routeRecord: RouteRecord): string {
      const index = this.$route.matched.indexOf(routeRecord)
      return this.$route.matched
        .slice(0, index + 1)
        .map((r) => r.path)
        .join("/")
        .replace(/\/+/g, "/")
    },
  },
})
</script>
