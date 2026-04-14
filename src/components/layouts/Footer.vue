<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          <router-link to="/" class="footer__logo">Exclusive</router-link>
          <h3 class="footer__heading">Subscribe</h3>
          <p class="footer__text">Get 10% off your first order</p>
          <form class="footer__subscribe">
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
            />
            <button type="submit">
              <app-icon name="send" />
            </button>
          </form>
        </div>

        <div class="footer__col">
          <h3 class="footer__heading">Support</h3>
          <address class="footer__address">
            <p class="footer__text">{{ support.address }}</p>
            <a :href="`mailto:${support.email}`" class="footer__link">{{
              support.email
            }}</a>
            <a :href="`tel:${support.phone}`" class="footer__link">{{
              support.phone
            }}</a>
          </address>
        </div>

        <div v-for="col in navColumns" :key="col.heading" class="footer__col">
          <h3 class="footer__heading">{{ col.heading }}</h3>
          <ul class="footer__links">
            <li v-for="link in col.links" :key="link.label">
              <button
                v-if="link.action"
                class="footer__link"
                @click="link.action"
              >
                {{ link.label }}
              </button>
              <router-link v-else :to="link.to" class="footer__link">
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <div class="footer__col">
          <h3 class="footer__heading">Download App</h3>
          <p class="footer__text footer__text--small">
            Save $3 with App New User Only
          </p>
          <div class="footer__apps">
            <img
              src="@/assets/images/footer/qr-code.png"
              alt="QR code to download the app"
            />
            <div class="footer__badges">
              <img
                v-for="badge in appBadges"
                :key="badge.alt"
                :src="badge.src"
                :alt="badge.alt"
                class="footer__badge"
              />
            </div>
          </div>
          <div class="footer__socials">
            <app-icon
              v-for="social in socials"
              :key="social"
              :name="social"
              class="footer__social"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="container">
        <p class="footer__copyright">
          © Copyright Rimel 2022. All right reserved
        </p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from "vue"
import AppIcon from "@/components/ui/AppIcon.vue"
import googlePlay from "@/assets/images/footer/google-play.svg"
import appStore from "@/assets/images/footer/app-store.svg"

export default Vue.extend({
  name: "Footer",

  components: { AppIcon },

  data() {
    return {
      email: "",

      support: {
        address: "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.",
        email: "exclusive@gmail.com",
        phone: "+88015-88888-9999",
      },

      navColumns: [
        {
          heading: "Account",
          links: [
            { label: "My Account", to: "#" },
            { label: "Login / Register", to: "#" },
            { label: "Cart", to: null, action: () => this.$emit("open-cart") },
            { label: "Wishlist", to: "#" },
            { label: "Shop", to: "/products" },
          ],
        },
        {
          heading: "Quick Link",
          links: [
            { label: "Privacy Policy", to: "#" },
            { label: "Terms Of Use", to: "#" },
            { label: "FAQ", to: "#" },
            { label: "Contact", to: "/contact" },
          ],
        },
      ],

      appBadges: [
        {
          src: googlePlay,
          alt: "Google Play Badge",
        },
        {
          src: appStore,
          alt: "App Store Badge",
        },
      ],

      socials: ["facebook", "twitter", "instagram", "linkedin"],
    }
  },
})
</script>
