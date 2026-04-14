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
        :to="{ name: 'products', query: { category: product.category } }"
      >
        {{ product.category }}
      </router-link>
    </p>

    <div class="product-info__actions">
      <div class="product-info__quantity">
        <button class="product-info__quantity-minus" @click="decrement">
          <app-icon name="minus" :size="20" />
        </button>
        <span>{{ quantity }}</span>
        <button class="product-info__quantity-plus" @click="increment">
          <app-icon name="plus" :size="20" />
        </button>
      </div>
      <app-button
        modifier="primary"
        class="product-info__buy-btn"
        @click.native="addToCart"
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

<script lang="ts">
import Vue, { PropType } from "vue"
import { Product } from "@/types/product"
import { CartItem } from "@/types/cart"
import StarRating from "@/components/ui/StarRating.vue"
import AppButton from "@/components/ui/AppButton.vue"
import AppIcon from "@/components/ui/AppIcon.vue"

export default Vue.extend({
  name: "ProductInfo",
  components: { StarRating, AppButton, AppIcon },
  props: { product: { type: Object as PropType<Product>, required: true } },
  data() {
    return { quantity: 1 }
  },
  methods: {
    increment() {
      if (this.quantity < this.product.stock) this.quantity++
    },
    decrement() {
      if (this.quantity > 1) this.quantity--
    },
    addToCart() {
      const cartItem: CartItem = {
        product: this.product,
        quantity: this.quantity,
      }
      this.$store.commit("cart/ADD_TO_CART", cartItem)
    },
  },
})
</script>
