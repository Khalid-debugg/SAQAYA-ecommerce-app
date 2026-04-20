<template>
  <div class="products-grid">
    <async-list
      :is-loading="isLoading && !products.length"
      :error="error && !products.length ? error : null"
      :is-empty="!isLoading && !error && !products.length"
      empty-message="No products to show."
      @retry="retry"
    >
      <div class="products-grid__inner">
        <product-card
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
        />
      </div>
    </async-list>

    <div v-if="canLoadMore" class="products-grid__footer">
      <app-button :disabled="isLoading" @click="loadMore">
        {{ isLoading ? "Loading..." : "Load More" }}
      </app-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Product } from "@/types/product"
import { useCartStore } from "@/store/cart"
import ProductCard from "@/components/business/ProductCard.vue"
import AppButton from "@/components/ui/AppButton.vue"
import AsyncList from "@/components/ui/AsyncList.vue"

defineProps<{
  products: Product[]
  canLoadMore: boolean
  isLoading: boolean
  error: string | null
}>()

const emit = defineEmits(["retry", "load-more"])
const cartStore = useCartStore()

const retry = () => {
  emit("retry")
}
const loadMore = () => {
  emit("load-more")
}
const addToCart = (product: Product) => {
  cartStore.addToCart(product, 1)
}
</script>
