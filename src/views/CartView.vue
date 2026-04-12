<template>
  <div class="cart-view">
    <cart-list />
    <cart-summary />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import CartList from "@/components/business/CartList.vue"
import CartSummary from "@/components/business/CartSummary.vue"

export default Vue.extend({
  name: "CartView",
  components: { CartList, CartSummary },
})
</script>
