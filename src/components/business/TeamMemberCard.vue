<template>
  <div class="team-member-card">
    <div class="team-member-card__photo">
      <img :src="photo" :alt="name" />
    </div>
    <div class="team-member-card__info">
      <h3 class="team-member-card__name">{{ name }}</h3>
      <p>{{ role }}</p>
      <div class="team-member-card__socials">
        <app-icon
          v-for="social in socials"
          :key="social"
          :name="social"
          :size="20"
          class="team-member-card__social"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import AppIcon from "@/components/ui/AppIcon.vue"

export default Vue.extend({
  name: "TeamMemberCard",
  components: { AppIcon },
  props: {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      socials: ["twitter", "instagram", "linkedin"],
    }
  },
})
</script>
