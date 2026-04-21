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
      @retry="productsStore.fetchHomeProducts"
      empty-message="No products to show"
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
      <app-button modifier="primary" @click="viewAll">
        View All Products
      </app-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRouter } from "vue-router"
import { Product } from "@/types/product"
import { useCartStore } from "@/store/cart"
import { useUiStore } from "@/store/ui"
import { usePagination } from "@/composables/usePagination"
import ProductCard from "@/components/business/ProductCard.vue"
import SectionHeader from "@/components/ui/SectionHeader.vue"
import AppButton from "@/components/ui/AppButton.vue"
import AsyncList from "@/components/ui/AsyncList.vue"
import { useProductsStore } from "@/store"

const props = defineProps<{
  products: Product[]
}>()

const router = useRouter()
const cartStore = useCartStore()
const uiStore = useUiStore()
const productsStore = useProductsStore()

const itemsPerPage = 4
const items = computed(() => props.products)
const { hasPrev, hasNext, paginatedItems, prev, next } = usePagination(
  items,
  itemsPerPage
)

const isLoading = computed(() => uiStore.isLoading("fetchHomeProducts"))
const error = computed(() => uiStore.getError("fetchHomeProducts"))

const addToCart = (product: Product) => {
  cartStore.addToCart(product, 1)
}
const viewAll = () => {
  router.push({ name: "products-list" })
}
</script>
