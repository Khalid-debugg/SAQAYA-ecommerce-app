<template>
  <form class="contact-form">
    <div class="contact-form__row">
      <app-input v-model="name" placeholder="Your Name *" required />
      <app-input
        v-model="email"
        type="email"
        placeholder="Your Email *"
        required
      />
    </div>
    <app-input v-model="message" type="textarea" placeholder="Your Message" />
    <div class="contact-form__footer">
      <app-button type="submit" modifier="primary">Send Message</app-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue"
import AppInput from "@/components/ui/AppInput.vue"
import AppButton from "@/components/ui/AppButton.vue"

const name = ref("")
const email = ref("")
const message = ref("")
</script>
