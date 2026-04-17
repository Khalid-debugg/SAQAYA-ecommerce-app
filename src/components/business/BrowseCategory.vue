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
      @retry="retry"
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

<script lang="ts">
import Vue, { PropType } from "vue"
import { ProductCategory } from "@/types/product"
import { paginationMixin } from "@/mixins/pagination"
import CategoryCard from "@/components/business/CategoryCard.vue"
import SectionHeader from "@/components/ui/SectionHeader.vue"
import AsyncList from "@/components/ui/AsyncList.vue"

export default Vue.extend({
  name: "BrowseCategory",
  components: { CategoryCard, SectionHeader, AsyncList },
  mixins: [paginationMixin],
  props: {
    categories: {
      type: Array as PropType<ProductCategory[]>,
      required: true,
    },
  },
  data() {
    return {
      itemsPerPage: 6,
    }
  },
  computed: {
    items(): ProductCategory[] {
      return this.categories
    },
    isLoadingCategories(): boolean {
      return this.$store.getters["ui/IS_LOADING"]("fetchProductCategories")
    },
    error(): string | null {
      return this.$store.getters["ui/GET_ERROR"]("fetchProductCategories")
    },
  },
  methods: {
    retry() {
      this.$store.dispatch("products/fetchProductCategories")
    },
  },
})
</script>
