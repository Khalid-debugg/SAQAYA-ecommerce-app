<template>
  <div class="product">
    <div class="product__image-container">
      <div class="product__badges">
        <span
          v-if="product.discountPercentage"
          class="product__badge product__badge--discount"
        >
          -{{ Math.ceil(product.discountPercentage) }}%
        </span>
        <span v-if="isProductNew" class="product__badge product__badge--new"
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
        />
      </router-link>
      <app-button
        modifier="dark"
        class="product__cart-btn"
        @click.native="addToCart"
      >
        Add to cart
      </app-button>
    </div>
    <div class="product__details">
      <router-link
        :to="{ name: 'product-details', params: { id: String(product.id) } }"
        class="product__title"
      >
        {{ product.title }}
      </router-link>
      <div class="product__prices">
        <span class="product__price">${{ product.price.toFixed(2) }}</span>
        <span v-if="product.discountPercentage" class="product__price--original"
          >${{ originalPrice.toFixed(2) }}</span
        >
      </div>
      <div class="product__ratings">
        <star-rating :rating="product.rating" />
        <span class="product__reviews">({{ product.reviews.length }})</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Product } from "@/types/product"
import Vue, { PropType } from "vue"
import AppIcon from "../ui/AppIcon.vue"
import AppButton from "../ui/AppButton.vue"
import StarRating from "@/components/ui/StarRating.vue"

export default Vue.extend({
  name: "ProductCard",
  components: { AppIcon, AppButton, StarRating },
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  computed: {
    isProductNew(): boolean {
      const createdAt = new Date(this.product.meta.createdAt)
      const now = new Date()
      const diffInDays =
        (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
      return diffInDays >= 0 && diffInDays < 8
    },
    originalPrice(): number {
      return this.product.price / (1 - this.product.discountPercentage / 100)
    },
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.product)
    },
  },
})
</script>
