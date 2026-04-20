<template>
  <div class="cart-list">
    <p
      v-if="!cartStore.cartItems.length"
      class="cart-list__empty"
      data-test="cart-empty"
    >
      Your cart is empty
    </p>
    <cart-item
      v-for="item in cartStore.cartItems"
      :key="item.product.id"
      :cartItem="item"
      @remove="cartStore.removeFromCart"
      @update-quantity="updateQuantity"
    />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/store/cart"
import CartItem from "@/components/business/CartItem.vue"

const cartStore = useCartStore()

function updateQuantity({ id, quantity }: { id: number; quantity: number }) {
  if (quantity < 1) {
    cartStore.removeFromCart(id)
    return
  }
  cartStore.updateQuantity(id, quantity)
}
</script>
