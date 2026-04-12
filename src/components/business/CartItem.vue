<template>
  <div class="cart-item">
    <button
      class="cart-item__remove"
      @click="$emit('remove', cartItem.product.id)"
    >
      <app-icon name="close" :width="16" :height="16" />
    </button>
    <img
      class="cart-item__image"
      :src="cartItem.product.thumbnail"
      :alt="cartItem.product.title"
    />
    <p class="cart-item__title">{{ cartItem.product.title }}</p>
    <div class="cart-item__quantity">
      <span>{{ cartItem.quantity }}</span>
      <div class="cart-item__qty-controls">
        <button
          class="cart-item__qty-btn"
          @click="
            $emit('update-quantity', {
              id: cartItem.product.id,
              quantity: cartItem.quantity + 1,
            })
          "
        >
          <app-icon name="arrowUp" width="9" height="6" />
        </button>
        <button
          class="cart-item__qty-btn"
          @click="
            $emit('update-quantity', {
              id: cartItem.product.id,
              quantity: cartItem.quantity - 1,
            })
          "
        >
          <app-icon name="arrowDown" width="9" height="6" />
        </button>
      </div>
    </div>
    <p class="cart-item__total">
      ${{ (cartItem.product.price * cartItem.quantity).toFixed(2) }}
    </p>
  </div>
</template>

<script lang="ts">
import { CartItem } from "@/types/cart"
import Vue, { PropType } from "vue"
import AppIcon from "@/components/ui/AppIcon.vue"

export default Vue.extend({
  name: "CartItem",
  components: { AppIcon },
  props: {
    cartItem: {
      type: Object as PropType<CartItem>,
      required: true,
    },
  },
})
</script>
