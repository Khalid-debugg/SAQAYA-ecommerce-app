<template>
  <div class="products-view container">
    <div class="products-view__header">
      <section-header title="Explore Our Products" />
      <sort-dropdown v-model="sortKey" :options="sortOptions" />
    </div>
    <products-grid
      :products="sortedProducts"
      :can-load-more="canLoadMore"
      :is-loading="isLoading"
      :error="error"
      @load-more="loadMore"
      @retry="resetAndLoad"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapState } from "vuex"
import { Product } from "@/types/product"
import ProductsGrid from "@/components/business/ProductsGrid.vue"
import SectionHeader from "@/components/ui/SectionHeader.vue"
import SortDropdown from "@/components/ui/SortDropdown.vue"

const INITIAL_FETCH = 24
const RENDER_LIMIT = 12
const REFILL_FETCH = INITIAL_FETCH - RENDER_LIMIT

type SortKey = "default" | "price-high" | "price-low" | "discount" | "rating"

export default Vue.extend({
  name: "ProductsView",

  components: { ProductsGrid, SectionHeader, SortDropdown },

  data() {
    return {
      sortKey: "default" as SortKey,
      fetchSkip: INITIAL_FETCH,
      sortOptions: [
        { label: "Default", value: "default" },
        { label: "Highest Rating", value: "rating" },
        { label: "Price: High to Low", value: "price-high" },
        { label: "Price: Low to High", value: "price-low" },
        { label: "Discount Percentage", value: "discount" },
      ],
    }
  },

  computed: {
    ...mapState("products", [
      "productsList",
      "totalProducts",
      "visibleCount",
      "currentCategory",
    ]),

    category(): string {
      return (this.$route.query.category as string) || ""
    },

    isLoading(): boolean {
      return this.$store.getters["ui/IS_LOADING"]("fetchProducts")
    },

    error(): string | null {
      return this.$store.getters["ui/GET_ERROR"]("fetchProducts")
    },

    canLoadMore(): boolean {
      return this.visibleCount < this.totalProducts
    },

    visibleProducts(): Product[] {
      return this.productsList.slice(0, this.visibleCount)
    },

    sortedProducts(): Product[] {
      const list = [...this.visibleProducts]
      switch (this.sortKey) {
        case "price-high":
          return list.sort((a, b) => b.price - a.price)
        case "price-low":
          return list.sort((a, b) => a.price - b.price)
        case "discount":
          return list.sort(
            (a, b) => b.discountPercentage - a.discountPercentage
          )
        case "rating":
          return list.sort((a, b) => b.rating - a.rating)
        default:
          return list
      }
    },
  },

  mounted() {
    if (this.productsList.length && this.currentCategory === this.category) {
      this.fetchSkip = this.productsList.length
    } else {
      this.resetAndLoad()
    }
  },

  methods: {
    resetAndLoad() {
      this.fetchSkip = INITIAL_FETCH
      this.$store.commit("products/SET_PRODUCTS_LIST", [])
      this.$store.commit("products/SET_VISIBLE_COUNT", RENDER_LIMIT)
      this.$store.commit("products/SET_CURRENT_CATEGORY", this.category)
      this.fetchProducts(0, INITIAL_FETCH)
    },

    loadMore() {
      this.$store.commit(
        "products/SET_VISIBLE_COUNT",
        this.visibleCount + RENDER_LIMIT
      )
      if (this.productsList.length < this.visibleCount + RENDER_LIMIT) {
        this.fetchProducts(this.fetchSkip, REFILL_FETCH)
        this.fetchSkip += REFILL_FETCH
      }
    },

    fetchProducts(skip: number, limit: number) {
      if (this.category) {
        this.$store.dispatch("products/fetchProductsByCategory", {
          category: this.category,
          limit,
          skip,
        })
      } else {
        this.$store.dispatch("products/fetchProducts", { limit, skip })
      }
    },
  },
})
</script>
