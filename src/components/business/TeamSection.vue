<template>
  <div class="team-section">
    <transition-group name="team-fade" tag="div" class="team-section__grid">
      <team-card
        v-for="member in paginatedItems"
        :key="member.name"
        :name="member.name"
        :role="member.role"
        :photo="member.photo"
      />
    </transition-group>
    <div class="team-section__dots">
      <button
        v-for="(_, index) in totalPages"
        :key="index"
        class="team-section__dot"
        :class="{ 'team-section__dot--active': currentPage === index }"
        @click="currentPage = index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { usePagination } from "@/composables/usePagination"
import TeamCard from "@/components/business/TeamCard.vue"

interface TeamMember {
  name: string
  role: string
  photo: string
}

const props = defineProps<{
  members: TeamMember[]
}>()

const itemsPerPage = 3
const items = computed(() => props.members)
const { currentPage, totalPages, paginatedItems } = usePagination(
  items,
  itemsPerPage
)
</script>
