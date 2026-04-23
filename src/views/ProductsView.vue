<template>
  <div class="products-view container">
    <div class="products-view__header">
      <section-header title="Explore Our Products" />
      <sort-dropdown
        v-model="selectedSort"
        :options="sortOptions"
        @update:modelValue="resetAndLoad"
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

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from "vue"
import { useRoute } from "vue-router"
import { useProductsStore } from "@/store/products"
import { useUiStore } from "@/store/ui"
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

const route = useRoute()
const productsStore = useProductsStore()
const uiStore = useUiStore()

const selectedSort = reactive<SortOption>({
  label: "Default",
  value: "default",
  sortBy: "",
  order: "",
})

const fetchSkip = ref(INITIAL_FETCH)

const sortOptions: SortOption[] = [
  { label: "Default", value: "default", sortBy: "", order: "" },
  { label: "Highest Rating", value: "rating", sortBy: "rating", order: "desc" },
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
]

const category = computed(() => (route.query.category as string) || "")
const isLoading = computed(() => uiStore.isLoading("fetchProducts"))
const error = computed(() => uiStore.getError("fetchProducts"))
const canLoadMore = computed(
  () => productsStore.visibleCount < productsStore.totalProducts
)
const visibleProducts = computed((): Product[] =>
  productsStore.productsList.slice(0, productsStore.visibleCount)
)

const isSameRequest = computed(
  () =>
    productsStore.productsList.length > 0 &&
    productsStore.currentCategory === category.value &&
    productsStore.currentSort.sortBy === selectedSort.sortBy &&
    productsStore.currentSort.order === selectedSort.order
)

const resetAndLoad = () => {
  fetchSkip.value = INITIAL_FETCH
  productsStore.productsList = []
  productsStore.visibleCount = RENDER_LIMIT
  productsStore.currentCategory = category.value
  productsStore.currentSort = {
    sortBy: selectedSort.sortBy,
    order: selectedSort.order,
  }
  fetchProducts(0, INITIAL_FETCH)
}
const loadMore = () => {
  productsStore.visibleCount += RENDER_LIMIT
  fetchProducts(fetchSkip.value, REFILL_FETCH)
  fetchSkip.value += REFILL_FETCH
}
const fetchProducts = (skip: number, limit: number) => {
  const params = {
    limit,
    skip,
    sortBy: selectedSort.sortBy,
    order: selectedSort.order,
  }

  if (category.value) {
    productsStore.fetchProductsByCategory({
      ...params,
      category: category.value,
    })
  } else {
    productsStore.fetchProducts(params)
  }
}

onMounted(() => {
  const matched = sortOptions.find(
    (o) =>
      o.sortBy === productsStore.currentSort.sortBy &&
      o.order === productsStore.currentSort.order
  )
  if (matched) Object.assign(selectedSort, matched)

  if (isSameRequest.value) {
    fetchSkip.value = productsStore.productsList.length
  } else {
    resetAndLoad()
  }
})
</script>
