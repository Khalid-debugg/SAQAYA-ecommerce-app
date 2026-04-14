<template>
  <div class="service-card stat-card">
    <div class="service-card__icon-wrapper">
      <div class="service-card__icon-inner">
        <app-icon :name="icon" :size="32" />
      </div>
    </div>
    <span class="stat-card__value">{{ value }}</span>
    <span>{{ label }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import AppIcon from "@/components/ui/AppIcon.vue"
import { IconName } from "@/components/ui/icons/index"

export default Vue.extend({
  name: "StatCard",
  components: { AppIcon },
  props: {
    icon: {
      type: String as () => IconName,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
})
</script>
