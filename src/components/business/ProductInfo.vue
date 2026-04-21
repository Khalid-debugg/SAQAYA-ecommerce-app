<template>
  <div class="product-info">
    <h1 class="product-info__title">{{ product.title }}</h1>

    <div class="product-info__meta">
      <star-rating :rating="product.rating" :size="20" />
      <span class="product-info__review-count"
        >({{ product.reviews.length }} Reviews)</span
      >
      <span class="product-info__stock">{{
        product.stock > 0 ? "In Stock" : "Out of Stock"
      }}</span>
    </div>

    <div class="product-info__price-row">
      <span class="product-info__price">${{ product.price.toFixed(2) }}</span>
      <span
        v-if="product.discountPercentage"
        class="product-info__discount-badge"
      >
        -{{ Math.ceil(product.discountPercentage) }}%
      </span>
    </div>

    <p class="product-info__description">{{ product.description }}</p>

    <div class="product-info__divider" />

    <p class="product-info__category">
      Category:&nbsp;
      <router-link
        :to="{ name: 'products-list', query: { category: product.category } }"
        class="product-info__category-link"
      >
        {{ product.category }}
      </router-link>
    </p>

    <div class="product-info__actions">
      <div class="product-info__quantity">
        <button
          class="product-info__quantity-btn product-info__quantity-minus"
          @click="decrement"
        >
          <app-icon name="minus" :size="20" />
        </button>
        <span class="product-info__quantity-value">{{ quantity }}</span>
        <button
          class="product-info__quantity-btn product-info__quantity-plus"
          @click="increment"
        >
          <app-icon name="plus" :size="20" />
        </button>
      </div>
      <app-button
        modifier="primary"
        class="product-info__buy-btn"
        @click="addToCart"
      >
        Buy Now
      </app-button>
      <button class="product-info__wishlist">
        <app-icon name="heart" :size="20" />
      </button>
    </div>

    <div class="product-delivery">
      <div class="product-delivery__item">
        <div class="product-delivery__icon">
          <app-icon name="delivery" :size="40" />
        </div>
        <div class="product-delivery__text">
          <span class="product-delivery__label">Free Delivery</span>
          <span class="product-delivery__sub"
            >Enter your postal code for Delivery Availability</span
          >
        </div>
      </div>
      <div class="product-delivery__item">
        <div class="product-delivery__icon">
          <app-icon name="return" :size="40" />
        </div>
        <div class="product-delivery__text">
          <span class="product-delivery__label">Return Delivery</span>
          <span class="product-delivery__sub"
            >Free 30 Days Delivery Returns. <a href="#">Details</a></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Product } from "@/types/product"
import { useCartStore } from "@/store/cart"
import StarRating from "@/components/ui/StarRating.vue"
import AppButton from "@/components/ui/AppButton.vue"
import AppIcon from "@/components/ui/AppIcon.vue"

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()
const quantity = ref(1)

function increment() {
  if (quantity.value < props.product.stock) quantity.value++
}

function decrement() {
  if (quantity.value > 1) quantity.value--
}

function addToCart() {
  cartStore.addToCart(props.product, quantity.value)
}
</script>
