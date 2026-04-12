<template>
  <button class="category-card" @click="navigate">
    <app-icon :name="category.slug" :width="56" :height="56" />
    <span class="category-card__name">{{ category.name }}</span>
  </button>
</template>

<script lang="ts">
import { ProductCategory } from "@/types/product"
import Vue, { PropType } from "vue"
import AppIcon from "../ui/AppIcon.vue"

export default Vue.extend({
  name: "CategoryCard",
  components: { AppIcon },
  props: {
    category: {
      type: Object as PropType<ProductCategory>,
      required: true,
    },
  },
  methods: {
    navigate() {
      this.$router.push({
        name: "products",
        query: { category: this.category.slug },
      })
    },
  },
})
</script>
