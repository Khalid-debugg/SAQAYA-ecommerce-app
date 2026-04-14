<template>
  <div class="cart-item">
    <button class="cart-item__remove" @click="removeItem">
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
        <button class="cart-item__qty-btn" @click="incrementItemQuantity">
          <app-icon name="arrow-up" width="9" height="6" />
        </button>
        <button class="cart-item__qty-btn" @click="decrementItemQuantity">
          <app-icon name="arrow-down" width="9" height="6" />
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
  methods: {
    removeItem() {
      this.$emit("remove", this.cartItem.product.id)
    },
    incrementItemQuantity() {
      this.$emit("update-quantity", {
        id: this.cartItem.product.id,
        quantity: this.cartItem.quantity + 1,
      })
    },
    decrementItemQuantity() {
      this.$emit("update-quantity", {
        id: this.cartItem.product.id,
        quantity: this.cartItem.quantity - 1,
      })
    },
  },
})
</script>
