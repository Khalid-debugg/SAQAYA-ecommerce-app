<template>
  <div class="service-card">
    <div class="service-card__icon-wrapper">
      <div class="service-card__icon-inner">
        <app-icon :name="icon" :size="40" />
      </div>
    </div>
    <h3 class="service-card__title">{{ title }}</h3>
    <p class="service-card__subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
import AppIcon from "@/components/ui/AppIcon.vue"
import { IconName } from "../ui/icons"

defineProps<{
  icon: IconName
  title: string
  subtitle: string
}>()
</script>
