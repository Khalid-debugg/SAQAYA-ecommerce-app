<template>
  <div class="team-card">
    <div class="team-card__photo">
      <img :src="photo" :alt="name" class="team-card__photo-image" />
    </div>
    <div class="team-card__info">
      <h3 class="team-card__name">{{ name }}</h3>
      <p>{{ role }}</p>
      <div class="team-card__socials">
        <app-icon
          v-for="social in socials"
          :key="social"
          :name="social as IconName"
          :size="20"
          class="team-card__social"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppIcon from "@/components/ui/AppIcon.vue"
import { IconName } from "../ui/icons"

defineProps<{
  name: string
  role: string
  photo: string
}>()

const socials = ["twitter", "instagram", "linkedin"]
</script>
