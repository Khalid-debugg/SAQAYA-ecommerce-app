<template>
  <div class="cart-summary">
    <div class="cart-summary__totals">
      <div class="cart-summary__row">
        <span>Subtotal:</span>
        <span data-test="subtotal">${{ subtotalUSD.toFixed(2) }}</span>
      </div>
      <div class="cart-summary__divider" />
      <div class="cart-summary__row">
        <span>Shipping:</span>
        <span data-test="shipping">{{
          shippingCost === 0 ? "Free" : "$" + shippingCost.toFixed(2)
        }}</span>
      </div>
      <div class="cart-summary__divider" />
      <div class="cart-summary__row">
        <span>Total:</span>
        <span data-test="total">${{ totalUSD.toFixed(2) }}</span>
      </div>
    </div>

    <form class="cart-summary__form">
      <div class="cart-summary__payment">
        <div class="cart-summary__payment-option">
          <div class="cart-summary__radio">
            <input
              v-model="paymentMethod"
              type="radio"
              name="paymentMethod"
              value="bank"
              id="bank"
              class="cart-summary__radio-input"
            />
            <label for="bank" class="cart-summary__radio-label">Bank</label>
          </div>
          <div class="cart-summary__bank-logos">
            <img
              v-for="logo in bankLogos"
              :key="logo.name"
              :src="logo.src"
              :alt="logo.name"
              class="cart-summary__bank-logo"
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
              class="cart-summary__radio-input"
            />
            <label for="cash" class="cart-summary__radio-label"
              >Cash on delivery</label
            >
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
        <app-button type="button" class="cart-summary__coupon-btn"
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
import bKash from "@/assets/images/logos/b-kash.png"
import visa from "@/assets/images/logos/visa.png"
import masterCard from "@/assets/images/logos/master-card.png"
import indianBank from "@/assets/images/logos/indian-bank.png"

type PaymentMethod = "bank" | "cash"
type BankLogo = { name: string; src: string }

const bankLogos: BankLogo[] = [
  { name: "B kash", src: bKash },
  { name: "Visa", src: visa },
  { name: "Master Card", src: masterCard },
  { name: "Indian Bank", src: indianBank },
]

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
    subtotalUSD(): number {
      return this.$store.getters["cart/GET_SUBTOTAL_USD"]
    },
    shippingCost(): number {
      return this.$store.getters["cart/GET_SHIPPING_COST"]
    },
    totalUSD(): number {
      return this.$store.getters["cart/GET_TOTAL_USD"]
    },
  },
})
</script>
