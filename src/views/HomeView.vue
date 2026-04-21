<template>
  <div class="home container">
    <hero-banner :slides="slides" />
    <div class="home__divider" />
    <flash-sale :products="productsStore.flashSaleProducts" />
    <div class="home__divider" />
    <browse-category :categories="productsStore.productCategories" />
    <div class="home__divider" />
    <explore-products :products="productsStore.homeProducts" />
    <services-section :services="services" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { useProductsStore } from "@/store/products"
import FlashSale from "@/components/business/FlashSale.vue"
import BrowseCategory from "@/components/business/BrowseCategory.vue"
import ExploreProducts from "@/components/business/ExploreProducts.vue"
import HeroBanner from "@/components/ui/HeroBanner.vue"
import ServicesSection from "@/components/business/ServicesSection.vue"
import appleLogo from "@/assets/images/home/apple-logo.png"
import heroBanner from "@/assets/images/home/hero-banner.jpg"
import { IconName } from "@/components/ui/icons"

const productsStore = useProductsStore()

const slides = [
  {
    brandIcon: appleLogo,
    brandName: "iPhone 14 Series",
    title: "Up to 10% off Voucher",
    image: heroBanner,
  },
  {
    brandIcon: appleLogo,
    brandName: "iPhone 14 Series",
    title: "Up to 10% off Voucher",
    image: heroBanner,
  },
  {
    brandIcon: appleLogo,
    brandName: "iPhone 14 Series",
    title: "Up to 10% off Voucher",
    image: heroBanner,
  },
  {
    brandIcon: appleLogo,
    brandName: "iPhone 14 Series",
    title: "Up to 10% off Voucher",
    image: heroBanner,
  },
  {
    brandIcon: appleLogo,
    brandName: "iPhone 14 Series",
    title: "Up to 10% off Voucher",
    image: heroBanner,
  },
]

const services = [
  {
    icon: "delivery" as IconName,
    title: "Free and Fast Delivery",
    subtitle: "Free delivery for all orders over $140",
  },
  {
    icon: "headphone" as IconName,
    title: "24/7 Customer Service",
    subtitle: "Friendly 24/7 customer support",
  },
  {
    icon: "shield" as IconName,
    title: "Money Back Guarantee",
    subtitle: "We return money within 30 days",
  },
]

onMounted(() => {
  productsStore.fetchHomeProducts()
  productsStore.fetchProductCategories()
})
</script>
