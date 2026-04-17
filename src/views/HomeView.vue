<template>
  <div class="home container">
    <hero-banner :slides="slides" />
    <div class="home__divider" />
    <flash-sale :products="flashSaleProducts" />
    <div class="home__divider" />
    <browse-category :categories="productCategories" />
    <div class="home__divider" />
    <explore-products :products="homeProducts" />
    <services-section :services="services" />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapGetters, mapState } from "vuex"
import FlashSale from "@/components/business/FlashSale.vue"
import BrowseCategory from "@/components/business/BrowseCategory.vue"
import ExploreProducts from "@/components/business/ExploreProducts.vue"
import HeroBanner from "@/components/ui/HeroBanner.vue"
import ServicesSection from "@/components/business/ServicesSection.vue"
import appleLogo from "@/assets/images/home/apple-logo.png"
import heroBanner from "@/assets/images/home/hero-banner.jpg"

export default Vue.extend({
  name: "HomeView",
  data: function () {
    return {
      slides: [
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
      ],
      services: [
        {
          icon: "delivery",
          title: "Free and Fast Delivery",
          subtitle: "Free delivery for all orders over $140",
        },
        {
          icon: "headphone",
          title: "24/7 Customer Service",
          subtitle: "Friendly 24/7 customer support",
        },
        {
          icon: "shield",
          title: "Money Back Guarantee",
          subtitle: "We return money within 30 days",
        },
      ],
    }
  },
  components: {
    FlashSale,
    BrowseCategory,
    ExploreProducts,
    HeroBanner,
    ServicesSection,
  },
  computed: {
    ...mapGetters("products", {
      flashSaleProducts: "GET_FLASH_SALE_PRODUCTS",
    }),
    ...mapState("products", ["homeProducts", "productCategories"]),
  },
  mounted() {
    this.$store.dispatch("products/fetchHomeProducts")
    this.$store.dispatch("products/fetchProductCategories")
  },
})
</script>
