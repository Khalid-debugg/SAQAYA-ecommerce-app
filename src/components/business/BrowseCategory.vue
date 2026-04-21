<template>
  <div class="home__section">
    <section-header
      label="Categories"
      title="Browse By Category"
      :hasPrev="hasPrev"
      :hasNext="hasNext"
      @prev="prev"
      @next="next"
    />
    <async-list
      :is-loading="isLoading"
      :error="error"
      :is-empty="!categories.length"
      @retry="productsStore.fetchProductCategories()"
      empty-message="No categories to show"
    >
      <transition-group name="slide" tag="div" class="browse-category__grid">
        <category-card
          v-for="category in paginatedItems"
          :key="category.slug"
          :category="category"
        />
      </transition-group>
    </async-list>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { ProductCategory } from "@/types/product"
import { useProductsStore } from "@/store/products"
import { useUiStore } from "@/store/ui"
import { usePagination } from "@/composables/usePagination"
import CategoryCard from "@/components/business/CategoryCard.vue"
import SectionHeader from "@/components/ui/SectionHeader.vue"
import AsyncList from "@/components/ui/AsyncList.vue"

const props = defineProps<{
  categories: ProductCategory[]
}>()

const productsStore = useProductsStore()
const uiStore = useUiStore()

const itemsPerPage = 6
const items = computed(() => props.categories)
const { hasPrev, hasNext, paginatedItems, prev, next } = usePagination(
  items,
  itemsPerPage
)

const isLoading = computed(() => uiStore.isLoading("fetchProductCategories"))
const error = computed(() => uiStore.getError("fetchProductCategories"))
</script>
