<template>
  <div class="products-view container">
    <div class="products-view__header">
      <section-header title="Explore Our Products" />
      <sort-dropdown
        v-model="selectedSort"
        :options="sortOptions"
        @input="resetAndLoad"
      />
    </div>
    <products-grid
      :products="visibleProducts"
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

interface SortOption {
  label: string
  value: string
  sortBy: string
  order: string
}

export default Vue.extend({
  name: "ProductsView",

  components: { ProductsGrid, SectionHeader, SortDropdown },

  data() {
    return {
      selectedSort: {
        label: "Default",
        value: "default",
        sortBy: "",
        order: "",
      } as SortOption,
      fetchSkip: INITIAL_FETCH,
      sortOptions: [
        { label: "Default", value: "default", sortBy: "", order: "" },
        {
          label: "Highest Rating",
          value: "rating",
          sortBy: "rating",
          order: "desc",
        },
        {
          label: "Price: High to Low",
          value: "price-high",
          sortBy: "price",
          order: "desc",
        },
        {
          label: "Price: Low to High",
          value: "price-low",
          sortBy: "price",
          order: "asc",
        },
        {
          label: "Discount Percentage",
          value: "discount",
          sortBy: "discountPercentage",
          order: "desc",
        },
      ] as SortOption[],
    }
  },

  computed: {
    ...mapState("products", [
      "productsList",
      "totalProducts",
      "visibleCount",
      "currentCategory",
      "currentSort",
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

    isSameRequest(): boolean {
      return (
        this.productsList.length > 0 &&
        this.currentCategory === this.category &&
        this.currentSort.sortBy === this.selectedSort.sortBy &&
        this.currentSort.order === this.selectedSort.order
      )
    },
  },

  mounted() {
    const matched = this.sortOptions.find(
      (o) =>
        o.sortBy === this.currentSort.sortBy &&
        o.order === this.currentSort.order
    )
    if (matched) {
      this.selectedSort = matched
    }

    if (this.isSameRequest) {
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
      this.$store.commit("products/SET_CURRENT_SORT", {
        sortBy: this.selectedSort.sortBy,
        order: this.selectedSort.order,
      })
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
      const params = {
        limit,
        skip,
        sortBy: this.selectedSort.sortBy,
        order: this.selectedSort.order,
      }
      if (this.category) {
        this.$store.dispatch("products/fetchProductsByCategory", {
          category: this.category,
          ...params,
        })
      } else {
        this.$store.dispatch("products/fetchProducts", params)
      }
    },
  },
})
</script>
