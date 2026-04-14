<template>
  <div class="team-section">
    <transition-group name="team-fade" tag="div" class="team-section__grid">
      <team-member-card
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

<script lang="ts">
import Vue, { PropType } from "vue"
import TeamMemberCard from "@/components/business/TeamMemberCard.vue"
import { paginationMixin } from "@/mixins/pagination"

interface TeamMember {
  name: string
  role: string
  photo: string
}

export default Vue.extend({
  name: "TeamSection",
  components: { TeamMemberCard },
  mixins: [paginationMixin],
  props: {
    members: {
      type: Array as PropType<TeamMember[]>,
      required: true,
    },
  },
  data() {
    return {
      itemsPerPage: 3,
    }
  },
  computed: {
    items(): TeamMember[] {
      return this.members
    },
  },
})
</script>
