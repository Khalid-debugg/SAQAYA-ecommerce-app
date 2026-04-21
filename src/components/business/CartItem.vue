<template>
  <div class="cart-item">
    <button
      class="cart-item__remove"
      data-test="remove-btn"
      @click="removeItem"
    >
      <app-icon name="close" :size="16" />
    </button>
    <img
      class="cart-item__image"
      :src="cartItem.product.thumbnail"
      :alt="cartItem.product.title"
      data-test="product-image"
    />
    <p class="cart-item__title" data-test="product-title">
      {{ cartItem.product.title }}
    </p>
    <div class="cart-item__quantity">
      <span data-test="quantity">{{ cartItem.quantity }}</span>
      <div class="cart-item__qty-controls">
        <button
          class="cart-item__qty-btn"
          data-test="increment-btn"
          @click="incrementItemQuantity"
        >
          <app-icon name="arrow-up" :size="9" />
        </button>
        <button
          class="cart-item__qty-btn"
          data-test="decrement-btn"
          @click="decrementItemQuantity"
        >
          <app-icon name="arrow-down" :size="9" />
        </button>
      </div>
    </div>
    <p class="cart-item__total" data-test="total">
      ${{ (cartItem.product.price * cartItem.quantity).toFixed(2) }}
    </p>
  </div>
</template>

<script setup lang="ts">
import AppIcon from "@/components/ui/AppIcon.vue"
import { CartItem } from "@/types/cart"

const props = defineProps<{
  cartItem: CartItem
}>()

const emit = defineEmits(["update-quantity", "remove"])

const removeItem = () => {
  emit("remove", props.cartItem.product.id)
}
const incrementItemQuantity = () => {
  emit("update-quantity", {
    id: props.cartItem.product.id,
    quantity: props.cartItem.quantity + 1,
  })
}
const decrementItemQuantity = () => {
  emit("update-quantity", {
    id: props.cartItem.product.id,
    quantity: props.cartItem.quantity - 1,
  })
}
</script>
