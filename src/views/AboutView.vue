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

<script setup lang="ts">
import { IconName } from "@/components/ui/icons/index"
import AboutHero from "@/components/business/AboutHero.vue"
import StatCard from "@/components/ui/StatCard.vue"
import TeamSection from "@/components/business/TeamSection.vue"
import ServicesSection from "@/components/business/ServicesSection.vue"
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

const stats: Stat[] = [
  { icon: "shop", value: "10.5k", label: "Sallers active our site" },
  { icon: "sale", value: "33k", label: "Monthly Product Sale" },
  {
    icon: "shopping-bag",
    value: "45.5k",
    label: "Customer active in our site",
  },
  { icon: "money-bag", value: "25k", label: "Annual gross sale in our site" },
]
const members: TeamMember[] = [
  { name: "Tom Cruise", role: "Founder & Chairman", photo: tomCruise },
  { name: "Emma Watson", role: "Managing Director", photo: emmaWatson },
  { name: "Will Smith", role: "Product Designer", photo: willSmith },
  { name: "Emma Watson", role: "Managing Director", photo: emmaWatson },
  { name: "Tom Cruise", role: "Founder & Chairman", photo: tomCruise },
  { name: "Will Smith", role: "Product Designer", photo: willSmith },
]
const services = [
  {
    icon: "delivery" as IconName,
    title: "Free and Fast Delivery",
    subtitle: "Free delivery for all orders over $140",
  },
  {
    icon: "headphone" as IconName,
    title: "24/7 Customer Service",
    subtitle: "Friendly 24/7 customer support",
  },
  {
    icon: "shield" as IconName,
    title: "Money Back Guarantee",
    subtitle: "We return money within 30 days",
  },
]
</script>
