<template>
  <div class="home__section">
    <section-header
      label="Today's"
      title="Flash Sales"
      :hasPrev="hasPrev"
      :hasNext="hasNext"
      @prev="prev"
      @next="next"
    />
    <async-list
      :is-loading="isLoading"
      :error="error"
      :is-empty="!products.length"
      @retry="retry"
    >
      <transition-group name="slide" tag="div" class="flash-sale__inner">
        <product-card
          v-for="product in paginatedItems"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
        />
      </transition-group>
    </async-list>
    <div class="home__footer">
      <app-button modifier="primary" @click.native="viewAll">
        View All Products
      </app-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue"
import { Product } from "@/types/product"
import { CartItem } from "@/types/cart"
import { paginationMixin } from "@/mixins/pagination"
import ProductCard from "@/components/business/ProductCard.vue"
import SectionHeader from "@/components/ui/SectionHeader.vue"
import AppButton from "@/components/ui/AppButton.vue"
import AsyncList from "@/components/ui/AsyncList.vue"

export default Vue.extend({
  name: "FlashSale",
  components: { ProductCard, SectionHeader, AppButton, AsyncList },
  mixins: [paginationMixin],
  props: {
    products: {
      type: Array as PropType<Product[]>,
      required: true,
    },
  },
  data() {
    return {
      itemsPerPage: 4,
    }
  },
  computed: {
    items(): Product[] {
      return this.products
    },
    isLoadingHome(): boolean {
      return this.$store.getters["ui/IS_LOADING"]("fetchHomeProducts")
    },
    error(): string | null {
      return this.$store.getters["ui/GET_ERROR"]("fetchHomeProducts")
    },
  },
  methods: {
    addToCart(product: Product) {
      const cartItem: CartItem = { product, quantity: 1 }
      this.$store.commit("cart/ADD_TO_CART", cartItem)
    },
    viewAll() {
      this.$router.push({ name: "products-list" })
    },
    retry() {
      this.$store.dispatch("products/fetchHomeProducts")
    },
  },
})
</script>
