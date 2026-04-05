<template>
  <div>
    <transition name="drawer-overlay">
      <div v-if="isOpen" class="drawer-overlay" @click="$emit('close')" />
    </transition>

    <transition name="drawer-slide-right">
      <div v-if="isOpen" class="drawer">
        <div class="drawer__header">
          <h2 class="drawer__title">Shopping Cart</h2>
          <button class="drawer__close" @click="$emit('close')">
            <app-icon name="close" />
          </button>
        </div>

        <div class="drawer__body cart-sidebar__products">
          <!-- TODO: products list -->
        </div>

        <div class="drawer__footer">
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
              <span class="cart-sidebar__price">$0</span>
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
              <button type="button" class="cart-sidebar__cta">Apply</button>
            </div>

            <button
              type="submit"
              class="cart-sidebar__cta cart-sidebar__order-btn"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import AppIcon from "@/components/icons/AppIcon.vue"
import { PaymentMethod, bankLogos } from "./config"

export default Vue.extend({
  name: "CartSideBar",

  components: { AppIcon },

  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },

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
