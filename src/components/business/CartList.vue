<template>
  <div class="cart-list">
    <p v-if="!cartItems.length" class="cart-list__empty" data-test="cart-empty">
      Your cart is empty
    </p>
    <cart-item-component
      v-for="item in cartItems"
      :key="item.product.id"
      :cartItem="item"
      @remove="removeFromCart"
      @update-quantity="updateQuantity"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapState } from "vuex"
import CartItemComponent from "@/components/business/CartItem.vue"

export default Vue.extend({
  name: "CartList",
  components: { CartItemComponent },
  computed: {
    ...mapState("cart", ["cartItems"]),
  },
  methods: {
    removeFromCart(productId: number) {
      this.$store.commit("cart/REMOVE_FROM_CART", productId)
    },
    updateQuantity({ id, quantity }: { id: number; quantity: number }) {
      if (quantity < 1) {
        this.$store.commit("cart/REMOVE_FROM_CART", id)
        return
      }
      this.$store.commit("cart/UPDATE_QUANTITY", { productId: id, quantity })
    },
  },
})
</script>
