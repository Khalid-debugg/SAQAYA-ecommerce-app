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
      <div class="product-details__related-grid">
        <product-card
          v-for="product in productsList"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
        />
      </div>
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

export default Vue.extend({
  name: "ProductDetailsView",
  components: { ProductGallery, ProductInfo, ProductCard, SectionHeader },

  computed: {
    ...mapState("products", ["selectedProduct", "productsList"]),
  },

  mounted() {
    this.$store.commit("products/SET_PRODUCTS_LIST", [])
    this.$store.dispatch("products/fetchProductsByCategory", {
      category: this.selectedProduct.category,
      limit: 4,
      skip: 0,
    })
  },

  methods: {
    addToCart(product: Product) {
      const cartItem: CartItem = { product, quantity: 1 }
      this.$store.commit("cart/ADD_TO_CART", cartItem)
    },
  },
})
</script>
