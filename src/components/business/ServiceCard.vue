<template>
  <div class="service-card">
    <div class="service-card__icon-wrapper">
      <div class="service-card__icon-inner">
        <app-icon :name="icon" :width="40" :height="40" />
      </div>
    </div>
    <h3 class="service-card__title">{{ title }}</h3>
    <p class="service-card__subtitle">{{ subtitle }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import AppIcon from "@/components/ui/AppIcon.vue"

export default Vue.extend({
  name: "ServiceCard",
  components: { AppIcon },
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
})
</script>
