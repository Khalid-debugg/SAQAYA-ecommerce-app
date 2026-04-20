<template>
  <button class="category-card" @click="navigate">
    <app-icon :name="category.slug as IconName" :size="56" />
    <span class="category-card__name">{{ category.name }}</span>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { ProductCategory } from "@/types/product"
import AppIcon from "@/components/ui/AppIcon.vue"
import { IconName } from "../ui/icons"

const props = defineProps<{
  category: ProductCategory
}>()

const router = useRouter()

function navigate() {
  router.push({
    name: "products-list",
    query: { category: props.category.slug },
  })
}
</script>
