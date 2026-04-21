<template>
  <div class="product-details container">
    <template v-if="productsStore.selectedProduct">
      <div class="product-details__layout">
        <product-gallery
          :images="productsStore.selectedProduct.images"
          :alt="productsStore.selectedProduct.title"
        />
        <product-info :product="productsStore.selectedProduct" />
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
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue"
import { useRoute } from "vue-router"
import { useProductsStore } from "@/store/products"
import { useUiStore } from "@/store/ui"
import { useCartStore } from "@/store/cart"
import { Product } from "@/types/product"
import ProductGallery from "@/components/business/ProductGallery.vue"
import ProductInfo from "@/components/business/ProductInfo.vue"
import ProductCard from "@/components/business/ProductCard.vue"
import SectionHeader from "@/components/ui/SectionHeader.vue"
import AsyncList from "@/components/ui/AsyncList.vue"

const route = useRoute()
const productsStore = useProductsStore()
const uiStore = useUiStore()
const cartStore = useCartStore()

const isLoading = computed(() => uiStore.isLoading("fetchProducts"))
const error = computed(() => uiStore.getError("fetchProducts"))

const relatedProducts = computed((): Product[] =>
  productsStore.productsList
    .filter((p) => p.id !== productsStore.selectedProduct?.id)
    .slice(0, 4)
)
const addToCart = (product: Product) => {
  cartStore.addToCart(product, 1)
}
const fetchRelated = () => {
  if (!productsStore.selectedProduct) return
  productsStore.productsList = []
  productsStore.currentCategory = productsStore.selectedProduct.category
  productsStore.fetchProductsByCategory({
    category: productsStore.selectedProduct.category,
    limit: 5,
    skip: 0,
  })
}

watch(
  () => route.params.id,
  (newId) => {
    productsStore.fetchProductById(Number(newId))
  }
)

onMounted(() => {
  fetchRelated()
})
</script>
