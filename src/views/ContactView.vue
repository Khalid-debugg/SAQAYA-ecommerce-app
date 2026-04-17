<template>
  <div class="contact">
    <div class="container contact__flex">
      <div class="contact__image">
        <img
          src="@/assets/images/contact/contact-us.jpg"
          alt="Contact us"
          class="contact__image-src"
        />
      </div>
      <div class="contact__right">
        <div class="contact__box">
          <contact-box
            icon="phone"
            title="Call us"
            description="We are available 24/7, 7 days a week."
            :contact="[{ label: 'Phone', value: '+8801611122222' }]"
          />
          <div class="contact__divider" />
          <contact-box
            icon="mail"
            title="Write To US"
            description="Fill out our form and we will contact you within 24 hours."
          />
        </div>
        <div class="contact__box">
          <contact-form />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import ContactBox from "@/components/business/ContactBox.vue"
import ContactForm from "@/components/forms/ContactForm.vue"

export default Vue.extend({
  name: "ContactView",
  components: { ContactBox, ContactForm },
})
</script>
