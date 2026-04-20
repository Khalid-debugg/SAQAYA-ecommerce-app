<template>
  <footer class="the-footer">
    <div class="container">
      <div class="the-footer__grid">
        <div class="the-footer__brand">
          <router-link to="/" class="the-footer__logo">Exclusive</router-link>
          <h3 class="the-footer__heading">Subscribe</h3>
          <p class="the-footer__text">Get 10% off your first order</p>
          <div class="the-footer__subscribe">
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="the-footer__subscribe-input"
            />
            <button type="button" class="the-footer__subscribe-btn">
              <app-icon name="send" />
            </button>
          </div>
        </div>

        <div class="the-footer__col">
          <h3 class="the-footer__heading">Support</h3>
          <address class="the-footer__address">
            <p class="the-footer__text">{{ support.address }}</p>
            <a :href="`mailto:${support.email}`" class="the-footer__link">{{
              support.email
            }}</a>
            <a :href="`tel:${support.phone}`" class="the-footer__link">{{
              support.phone
            }}</a>
          </address>
        </div>

        <div
          v-for="col in navColumns"
          :key="col.heading"
          class="the-footer__col"
        >
          <h3 class="the-footer__heading">{{ col.heading }}</h3>
          <ul class="the-footer__links">
            <li v-for="link in col.links" :key="link.label">
              <button
                v-if="link.action"
                class="the-footer__link"
                @click="link.action"
              >
                {{ link.label }}
              </button>
              <router-link v-else :to="link.to" class="the-footer__link">
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <div class="the-footer__col">
          <h3 class="the-footer__heading">Download App</h3>
          <p class="the-footer__text the-footer__text--small">
            Save $3 with App New User Only
          </p>
          <div class="the-footer__apps">
            <img
              src="@/assets/images/footer/qr-code.png"
              alt="QR code to download the app"
            />
            <div class="the-footer__badges">
              <img
                v-for="badge in appBadges"
                :key="badge.alt"
                :src="badge.src"
                :alt="badge.alt"
                class="the-footer__badge"
              />
            </div>
          </div>
          <div class="the-footer__socials">
            <app-icon
              v-for="social in socials"
              :key="social"
              :name="social as IconName"
              class="the-footer__social"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="the-footer__bottom">
      <div class="container">
        <p class="the-footer__copyright">
          © Copyright Rimel 2022. All right reserved
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue"
import AppIcon from "@/components/ui/AppIcon.vue"
import googlePlay from "@/assets/images/footer/google-play.svg"
import appStore from "@/assets/images/footer/app-store.svg"
import { IconName } from "../ui/icons"

const emit = defineEmits(["open-cart"])

const email = ref("")

const support = {
  address: "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.",
  email: "exclusive@gmail.com",
  phone: "+88015-88888-9999",
}

const navColumns = [
  {
    heading: "Account",
    links: [
      { label: "My Account", to: "#", action: null },
      { label: "Login / Register", to: "#", action: null },
      { label: "Cart", to: null, action: () => emit("open-cart") },
      { label: "Wishlist", to: "#", action: null },
      { label: "Shop", to: "/products", action: null },
    ],
  },
  {
    heading: "Quick Link",
    links: [
      { label: "Privacy Policy", to: "#", action: null },
      { label: "Terms Of Use", to: "#", action: null },
      { label: "FAQ", to: "#", action: null },
      { label: "Contact", to: "/contact", action: null },
    ],
  },
]

const appBadges = [
  { src: googlePlay, alt: "Google Play Badge" },
  { src: appStore, alt: "App Store Badge" },
]

const socials = ["facebook", "twitter", "instagram", "linkedin"]
</script>
