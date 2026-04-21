<template>
  <div class="service-card stat-card">
    <div class="service-card__icon-wrapper">
      <div class="service-card__icon-inner">
        <app-icon :name="icon" :size="40" />
      </div>
    </div>
    <span class="stat-card__value">{{ value }}</span>
    <span class="stat-card__label">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import AppIcon from "@/components/ui/AppIcon.vue"
import { IconName } from "@/components/ui/icons/index"

defineProps<{
  icon: IconName
  value: string
  label: string
}>()
</script>
