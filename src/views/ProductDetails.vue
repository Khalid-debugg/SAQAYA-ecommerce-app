<template>
  <div class="product-details container">
    <div class="product-details__layout">
      <product-gallery
        :images="selectedProduct.images"
        :alt="selectedProduct.title"
      />
      <product-info :product="selectedProduct" />
    </div>

    <div class="product-details__related">
      <section-header label="More of this category" />
      <async-list
        :is-loading="isLoading"
        :error="error"
        :is-empty="!relatedProducts.length"
        empty-message="No related products found."
        @retry="fetchRelated"
      >
        <div class="product-details__related-grid">
          <product-card
            v-for="product in relatedProducts"
            :key="product.id"
            :product="product"
            @add-to-cart="addToCart"
          />
        </div>
      </async-list>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapState } from "vuex"
import { Product } from "@/types/product"
import { CartItem } from "@/types/cart"
import ProductGallery from "@/components/business/ProductGallery.vue"
import ProductInfo from "@/components/business/ProductInfo.vue"
import ProductCard from "@/components/business/ProductCard.vue"
import SectionHeader from "@/components/ui/SectionHeader.vue"
import AsyncList from "@/components/ui/AsyncList.vue"

export default Vue.extend({
  name: "ProductDetailsView",
  components: {
    ProductGallery,
    ProductInfo,
    ProductCard,
    SectionHeader,
    AsyncList,
  },

  computed: {
    ...mapState("products", ["selectedProduct", "productsList"]),

    relatedProducts(): Product[] {
      return this.productsList
        .filter((p: Product) => p.id !== this.selectedProduct.id)
        .slice(0, 4)
    },

    isLoading(): boolean {
      return this.$store.getters["ui/IS_LOADING"]("fetchProductsByCategory")
    },

    error(): string | null {
      return this.$store.getters["ui/GET_ERROR"]("fetchProductsByCategory")
    },
  },

  watch: {
    "$route.params.id"(newId) {
      this.$store.dispatch("products/fetchProductById", { id: Number(newId) })
    },
  },

  mounted() {
    this.fetchRelated()
  },

  methods: {
    fetchRelated() {
      this.$store.commit("products/SET_PRODUCTS_LIST", [])
      this.$store.commit(
        "products/SET_CURRENT_CATEGORY",
        this.selectedProduct.category
      )
      this.$store.dispatch("products/fetchProductsByCategory", {
        category: this.selectedProduct.category,
        limit: 5,
        skip: 0,
      })
    },

    addToCart(product: Product) {
      const cartItem: CartItem = { product, quantity: 1 }
      this.$store.commit("cart/ADD_TO_CART", cartItem)
    },
  },
})
</script>
