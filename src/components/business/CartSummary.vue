<template>
  <div class="cart-summary">
    <div class="cart-summary__totals">
      <div class="cart-summary__row">
        <span>Subtotal:</span>
        <span>${{ totalUSD.toFixed(2) }}</span>
      </div>
      <div class="cart-summary__divider" />
      <div class="cart-summary__row">
        <span>Shipping:</span>
        <span>Free</span>
      </div>
      <div class="cart-summary__divider" />
      <div class="cart-summary__row">
        <span>Total:</span>
        <span>${{ totalUSD.toFixed(2) }}</span>
      </div>
    </div>

    <form class="cart-summary__form" @submit.prevent="handlePlaceOrder">
      <div class="cart-summary__payment">
        <div class="cart-summary__payment-option">
          <div class="cart-summary__radio">
            <input
              v-model="paymentMethod"
              type="radio"
              name="paymentMethod"
              value="bank"
              id="bank"
            />
            <label for="bank">Bank</label>
          </div>
          <div class="cart-summary__bank-logos">
            <img
              v-for="logo in bankLogos"
              :key="logo.name"
              :src="logo.src"
              :alt="logo.name"
            />
          </div>
        </div>
        <div class="cart-summary__payment-option">
          <div class="cart-summary__radio">
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

      <div class="cart-summary__coupon">
        <input
          v-model="couponCode"
          type="text"
          class="cart-summary__coupon-input"
          placeholder="Coupon Code"
        />
        <app-button
          type="button"
          @click="applyCoupon"
          class="cart-summary__coupon-btn"
          >Apply</app-button
        >
      </div>

      <app-button type="submit" class="cart-summary__order-btn">
        Place Order
      </app-button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import AppButton from "@/components/ui/AppButton.vue"

type PaymentMethod = "bank" | "cash"
type BankLogo = { name: string; fileName: string; src: string }

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
  name: "CartSummary",
  components: { AppButton },
  data() {
    return {
      paymentMethod: "cash" as PaymentMethod,
      bankLogos,
      couponCode: "" as string,
    }
  },
  computed: {
    totalUSD(): number {
      return this.$store.getters["cart/GET_TOTAL_USD"]
    },
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
