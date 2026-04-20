<template>
  <div class="contact-box">
    <div class="contact-box__title">
      <app-icon :name="icon" :size="40" class="contact-box__icon" />
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

<script setup lang="ts">
import AppIcon from "@/components/ui/AppIcon.vue"
import { IconName } from "@/components/ui/icons/index"

interface ContactDetail {
  label: string
  value: string
}

defineProps<{
  icon: IconName
  title: string
  description: string
  contact?: ContactDetail[]
}>()
</script>
