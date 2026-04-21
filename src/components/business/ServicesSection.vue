<template>
  <div class="services">
    <service-card
      v-for="service in services"
      :key="service.title"
      :icon="service.icon"
      :title="service.title"
      :subtitle="service.subtitle"
    />
  </div>
</template>

<script setup lang="ts">
import ServiceCard from "@/components/business/ServiceCard.vue"
import { IconName } from "../ui/icons"

interface Service {
  icon: IconName
  title: string
  subtitle: string
}

defineProps<{
  services: Service[]
}>()
</script>
