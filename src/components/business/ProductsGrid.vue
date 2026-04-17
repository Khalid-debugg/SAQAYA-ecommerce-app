<template>
  <div class="products-grid">
    <async-list
      :is-loading="isLoading && !products.length"
      :error="error && !products.length ? error : null"
      :is-empty="!isLoading && !error && !products.length"
      empty-message="No products to show."
      @retry="$emit('retry')"
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
      <app-button :disabled="isLoading" @click.native="loadMore">
        {{ isLoading ? "Loading..." : "Load More" }}
      </app-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue"
import { Product } from "@/types/product"
import { CartItem } from "@/types/cart"
import ProductCard from "@/components/business/ProductCard.vue"
import AppButton from "@/components/ui/AppButton.vue"
import AsyncList from "@/components/ui/AsyncList.vue"

export default Vue.extend({
  name: "ProductsGrid",

  components: { ProductCard, AppButton, AsyncList },

  props: {
    products: {
      type: Array as PropType<Product[]>,
      required: true,
    },
    canLoadMore: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String as () => string | null,
      default: null,
    },
  },

  methods: {
    addToCart(product: Product) {
      const cartItem: CartItem = { product, quantity: 1 }
      this.$store.commit("cart/ADD_TO_CART", cartItem)
    },
    retry() {
      this.$emit("retry")
    },
    loadMore() {
      this.$emit("load-more")
    },
  },
})
</script>
