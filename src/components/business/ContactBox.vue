<template>
  <div class="contact-box">
    <div class="contact-box__title">
      <app-icon :name="icon" :size="40" />
      <p>{{ title }}</p>
    </div>
    <p class="contact-box__description">{{ description }}</p>
    <p
      v-for="item in contact"
      :key="item.label"
      class="contact-box__description"
    >
      {{ item.label }}: {{ item.value }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import AppIcon from "@/components/ui/AppIcon.vue"
import { IconName } from "@/components/ui/icons/index"

interface ContactDetail {
  label: string
  value: string
}

export default Vue.extend({
  name: "ContactBox",

  components: { AppIcon },

  props: {
    icon: {
      type: String as () => IconName,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    contact: {
      type: Array as () => ContactDetail[],
      default: () => [],
    },
  },
})
</script>
