<template>
  <div class="search-input">
    <app-input
      :modelValue="modelValue"
      placeholder="What are you looking for?"
      @update:modelValue="updateValue($event)"
    />
    <app-icon name="search" :size="16" />
    <div v-if="modelValue" class="search-input__dropdown">
      <template v-if="results.length">
        <button
          v-for="product in results"
          :key="product.id"
          class="search-input__item"
          @click="selectProduct(product.id)"
        >
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="search-input__image"
          />
          <div class="search-input__info">
            <span class="search-input__title">{{ product.title }}</span>
            <span class="search-input__price"
              >${{ product.price.toFixed(2) }}</span
            >
          </div>
        </button>
      </template>
      <p v-else-if="!isSearching" class="search-input__empty">
        No results found
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Product } from "@/types/product"
import AppInput from "@/components/ui/AppInput.vue"
import AppIcon from "@/components/ui/AppIcon.vue"

defineProps<{
  modelValue: string
  results: Product[]
  isSearching: boolean
}>()

const emit = defineEmits(["update:modelValue", "select"])

const selectProduct = (productId: number) => {
  emit("select", productId)
}
const updateValue = (event: Event) => {
  emit("update:modelValue", event)
}
</script>
