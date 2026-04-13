<template>
  <div class="products-grid">
    <app-skeleton v-if="isLoading && !visibleProducts.length" />
    <app-error
      v-else-if="error && !visibleProducts.length"
      :message="error"
      @retry="retry"
    />
    <p v-else-if="!visibleProducts.length">No products to show</p>
    <div v-else class="products-grid__inner">
      <product-card
        v-for="product in sortedProducts"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
      />
    </div>

    <div v-if="canLoadMore" class="products-grid__footer">
      <app-button :disabled="isLoading" @click.native="loadMore">
        {{ isLoading ? "Loading..." : "Load More" }}
      </app-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapState } from "vuex"
import { Product } from "@/types/product"
import { CartItem } from "@/types/cart"
import ProductCard from "@/components/business/ProductCard.vue"
import AppButton from "@/components/ui/AppButton.vue"
import AppSkeleton from "@/components/ui/AppSkeleton.vue"
import AppError from "@/components/ui/AppError.vue"

type SortKey = "default" | "price-high" | "price-low" | "discount" | "rating"

export default Vue.extend({
  name: "ProductsGrid",

  components: { ProductCard, AppButton, AppSkeleton, AppError },

  props: {
    sortKey: {
      type: String as () => SortKey,
      default: "default",
    },
    category: {
      type: String,
      default: "",
    },
  },

  computed: {
    ...mapState("products", ["productsList", "totalProducts", "visibleCount"]),

    isLoading(): boolean {
      return this.$store.getters["ui/IS_LOADING"]("fetchProducts")
    },

    error(): string | null {
      return this.$store.getters["ui/GET_ERROR"]("fetchProducts")
    },

    visibleProducts(): Product[] {
      return this.productsList.slice(0, this.visibleCount)
    },

    canLoadMore(): boolean {
      return this.visibleCount < this.totalProducts
    },

    sortedProducts(): Product[] {
      const list = [...this.visibleProducts]
      switch (this.sortKey) {
        case "price-high":
          return list.sort((a, b) => b.price - a.price)
        case "price-low":
          return list.sort((a, b) => a.price - b.price)
        case "discount":
          return list.sort(
            (a, b) => b.discountPercentage - a.discountPercentage
          )
        case "rating":
          return list.sort((a, b) => b.rating - a.rating)
        default:
          return list
      }
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
