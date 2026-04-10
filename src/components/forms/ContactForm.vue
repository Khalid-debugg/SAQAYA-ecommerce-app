<template>
  <form class="contact-form" @submit.prevent="handleSubmit">
    <div class="contact-form__row">
      <app-input v-model="name" placeholder="Your Name *" required />
      <app-input
        v-model="email"
        type="email"
        placeholder="Your Email *"
        required
      />
    </div>
    <app-input
      v-model="message"
      type="textarea"
      modifier="textarea"
      placeholder="Your Message"
    />
    <div class="contact-form__footer">
      <app-button type="submit" modifier="primary">Send Message</app-button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue"
import AppInput from "@/components/ui/AppInput.vue"
import AppButton from "@/components/ui/AppButton.vue"

export default Vue.extend({
  name: "ContactForm",

  components: { AppInput, AppButton },

  data() {
    return {
      name: "",
      email: "",
      message: "",
    }
  },

  methods: {
    handleSubmit() {
      // TODO: to be implemented
    },
  },
})
</script>
