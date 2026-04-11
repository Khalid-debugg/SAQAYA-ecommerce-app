<template>
  <div class="cart-sidebar__summary">
    <div class="cart-sidebar__wrapper">
      <div class="cart-sidebar__row">
        <span>Subtotal:</span>
        <span>$0</span>
      </div>
      <div class="cart-sidebar__divider" />

      <div class="cart-sidebar__row">
        <span>Shipping:</span>
        <span>Free</span>
      </div>
      <div class="cart-sidebar__divider" />

      <div class="cart-sidebar__row">
        <span>Total:</span>
        <span>$0</span>
      </div>
    </div>
    <form class="cart-sidebar__form" @submit.prevent="handlePlaceOrder">
      <div class="cart-sidebar__wrapper">
        <div class="cart-sidebar__payment">
          <div class="cart-sidebar__radio">
            <input
              v-model="paymentMethod"
              type="radio"
              name="paymentMethod"
              value="bank"
              id="bank"
            />
            <label for="bank">Bank</label>
          </div>
          <div class="cart-sidebar__bank-logos">
            <img
              v-for="logo in bankLogos"
              :src="logo.src"
              :alt="logo.name"
              :key="logo.name"
            />
          </div>
        </div>

        <div class="cart-sidebar__payment">
          <div class="cart-sidebar__radio">
            <input
              v-model="paymentMethod"
              type="radio"
              name="paymentMethod"
              value="cash"
              id="cash"
            />
            <label for="cash">Cash on delivery</label>
          </div>
        </div>
      </div>

      <div class="cart-sidebar__coupon">
        <input
          v-model="couponCode"
          type="text"
          class="cart-sidebar__coupon-input"
          placeholder="Coupon Code"
        />
        <app-button
          type="button"
          class="cart-sidebar__apply-btn"
          @click="applyCoupon"
          >Apply</app-button
        >
      </div>

      <app-button type="submit" class="cart-sidebar__order-btn">
        Place Order
      </app-button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import AppButton from "@/components/ui/AppButton.vue"

type PaymentMethod = "bank" | "cash"
type BankLogo = { name: string; fileName: string }

export const bankLogos: BankLogo[] = [
  { name: "B kash", fileName: "b-kash" },
  { name: "Visa", fileName: "visa" },
  { name: "Master Card", fileName: "master-card" },
  { name: "Indian Bank", fileName: "indian-bank" },
].map((logo) => ({
  ...logo,
  src: require(`@/assets/images/logos/${logo.fileName}.png`),
}))
export default Vue.extend({
  components: { AppButton },

  data() {
    return {
      paymentMethod: "cash" as PaymentMethod,
      bankLogos,
      couponCode: "" as string,
    }
  },

  methods: {
    handlePlaceOrder() {
      // TODO: to be implemented
    },
    applyCoupon() {
      // TODO: to be implemented
    },
  },
})
</script>
