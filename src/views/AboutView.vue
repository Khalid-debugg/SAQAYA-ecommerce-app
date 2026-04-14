<template>
  <div class="about container">
    <about-hero />

    <div class="about__stats">
      <stat-card
        v-for="stat in stats"
        :key="stat.label"
        :icon="stat.icon"
        :value="stat.value"
        :label="stat.label"
      />
    </div>

    <team-section :members="members" />

    <services-section :services="services" />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import AboutHero from "@/components/business/AboutHero.vue"
import StatCard from "@/components/ui/StatCard.vue"
import TeamSection from "@/components/business/TeamSection.vue"
import ServicesSection from "@/components/business/ServicesSection.vue"
import { IconName } from "@/components/ui/icons/index"
import tomCruise from "@/assets/images/about/tom-cruise.png"
import emmaWatson from "@/assets/images/about/emma-watson.png"
import willSmith from "@/assets/images/about/will-smith.png"

interface Stat {
  icon: IconName
  value: string
  label: string
}

interface TeamMember {
  name: string
  role: string
  photo: string
}

export default Vue.extend({
  name: "AboutView",
  components: { AboutHero, StatCard, TeamSection, ServicesSection },
  data() {
    return {
      stats: [
        { icon: "search", value: "10.5k", label: "Sallers active our site" },
        { icon: "cart", value: "33k", label: "Monthly Product Sale" },
        { icon: "heart", value: "45.5k", label: "Customer active in our site" },
        {
          icon: "return",
          value: "25k",
          label: "Annual gross sale in our site",
        },
      ] as Stat[],
      members: [
        { name: "Tom Cruise", role: "Founder & Chairman", photo: tomCruise },
        { name: "Emma Watson", role: "Managing Director", photo: emmaWatson },
        { name: "Will Smith", role: "Product Designer", photo: willSmith },
        { name: "Emma Watson", role: "Managing Director", photo: emmaWatson },
        { name: "Tom Cruise", role: "Founder & Chairman", photo: tomCruise },
        { name: "Will Smith", role: "Product Designer", photo: willSmith },
      ] as TeamMember[],
      services: [
        {
          icon: "delivery",
          title: "Free and Fast Delivery",
          subtitle: "Free delivery for all orders over $140",
        },
        {
          icon: "headphone",
          title: "24/7 Customer Service",
          subtitle: "Friendly 24/7 customer support",
        },
        {
          icon: "shield",
          title: "Money Back Guarantee",
          subtitle: "We return money within 30 days",
        },
      ],
    }
  },
})
</script>
