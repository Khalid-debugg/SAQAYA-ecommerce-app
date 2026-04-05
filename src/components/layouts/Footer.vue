<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          <router-link to="/" class="footer__logo">Exclusive</router-link>
          <h3 class="footer__heading">Subscribe</h3>
          <p class="footer__text">Get 10% off your first order</p>
          <form class="footer__subscribe" @submit="onSubscribe">
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
            <p class="footer__text">
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            </p>
            <a href="mailto:exclusive@gmail.com" class="footer__link"
              >exclusive@gmail.com</a
            >
            <a href="tel:+88015-88888-9999" class="footer__link"
              >+88015-88888-9999</a
            >
          </address>
        </div>

        <div class="footer__col">
          <h3 class="footer__heading">Account</h3>
          <ul class="footer__links">
            <li>
              <router-link to="#" class="footer__link">My Account</router-link>
            </li>
            <li>
              <router-link to="#" class="footer__link"
                >Login / Register</router-link
              >
            </li>
            <li>
              <button class="footer__link" @click="$emit('open-cart')">
                Cart
              </button>
            </li>
            <li>
              <router-link to="#" class="footer__link">Wishlist</router-link>
            </li>
            <li>
              <router-link to="/products" class="footer__link"
                >Shop</router-link
              >
            </li>
          </ul>
        </div>

        <div class="footer__col">
          <h3 class="footer__heading">Quick Link</h3>
          <ul class="footer__links">
            <li>
              <router-link to="#" class="footer__link"
                >Privacy Policy</router-link
              >
            </li>
            <li>
              <router-link to="#" class="footer__link"
                >Terms Of Use</router-link
              >
            </li>
            <li>
              <router-link to="#" class="footer__link">FAQ</router-link>
            </li>
            <li>
              <router-link to="/contact" class="footer__link"
                >Contact</router-link
              >
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
                src="@/assets/images/footer/google-play.svg"
                alt="Google Play Badge"
                class="footer__badge"
              />
              <img
                src="@/assets/images/footer/app-store.svg"
                alt="App Store Badge"
                class="footer__badge"
              />
            </div>
          </div>
          <div class="footer__socials">
            <app-icon name="facebook" class="footer__social" />
            <app-icon name="twitter" class="footer__social" />
            <app-icon name="instagram" class="footer__social" />
            <app-icon name="linkedin" class="footer__social" />
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
import AppIcon from "@/components/icons/AppIcon.vue"

export default Vue.extend({
  name: "Footer",

  components: { AppIcon },

  data() {
    return {
      email: "",
    }
  },

  methods: {
    onSubscribe() {
      // TODO: to be implemented
    },
  },
})
</script>
