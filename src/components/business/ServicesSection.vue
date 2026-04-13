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

<script lang="ts">
import Vue, { PropType } from "vue"
import ServiceCard from "@/components/business/ServiceCard.vue"

interface Service {
  icon: string
  title: string
  subtitle: string
}

export default Vue.extend({
  name: "ServicesSection",
  components: { ServiceCard },
  props: {
    services: {
      type: Array as PropType<Service[]>,
      required: true,
    },
  },
})
</script>
