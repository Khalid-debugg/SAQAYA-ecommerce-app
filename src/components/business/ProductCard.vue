<template>
  <div class="product">
    <div class="product__image-container">
      <div class="product__badges">
        <span
          v-if="product.discountPercentage > 0 && product.price > 0"
          class="product__badge product__badge--discount"
          data-test="discount-badge"
        >
          -{{ Math.ceil(product.discountPercentage) }}%
        </span>
        <span
          v-if="isProductNew"
          class="product__badge product__badge--new"
          data-test="new-badge"
          >New</span
        >
      </div>
      <div class="product__actions">
        <button class="product__action-btn"><app-icon name="heart" /></button>
        <button class="product__action-btn"><app-icon name="view" /></button>
      </div>
      <router-link
        :to="{ name: 'product-details', params: { id: String(product.id) } }"
        class="product__title"
      >
        <img
          class="product__image"
          :src="product.thumbnail"
          :alt="product.title"
          data-test="product-image"
        />
      </router-link>
      <app-button
        modifier="dark"
        class="product__cart-btn"
        data-test="add-to-cart-btn"
        @click="addToCart"
      >
        Add to cart
      </app-button>
    </div>
    <div class="product__details">
      <router-link
        :to="{ name: 'product-details', params: { id: String(product.id) } }"
        class="product__title"
        data-test="product-title"
      >
        {{ product.title }}
      </router-link>
      <div class="product__prices">
        <span class="product__price" data-test="product-price">{{
          product.price === 0 ? "Free" : "$" + product.price.toFixed(2)
        }}</span>
        <span
          v-if="product.discountPercentage > 0 && product.price > 0"
          class="product__price--original"
          data-test="original-price"
          >${{ originalPrice.toFixed(2) }}</span
        >
      </div>
      <div class="product__ratings">
        <star-rating :rating="product.rating" />
        <span class="product__reviews" data-test="review-count"
          >({{ product.reviews.length }})</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { Product } from "@/types/product"
import AppIcon from "@/components/ui/AppIcon.vue"
import AppButton from "@/components/ui/AppButton.vue"
import StarRating from "@/components/ui/StarRating.vue"

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits(["add-to-cart"])

const isProductNew = computed((): boolean => {
  const createdAt = new Date(props.product.meta.createdAt)
  const now = new Date()
  const diffInDays =
    (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
  return diffInDays >= 0 && diffInDays < 8
})

const originalPrice = computed((): number => {
  return props.product.price / (1 - props.product.discountPercentage / 100)
})

const addToCart = () => {
  emit("add-to-cart", props.product)
}
</script>
