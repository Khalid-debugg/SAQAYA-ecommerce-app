<template>
  <div class="sort-dropdown" ref="dropdown">
    <div class="sort-dropdown__wrapper">
      <span class="sort-dropdown__label">Sort by</span>
      <button class="sort-dropdown__trigger" @click="toggleDropdown">
        <span class="sort-dropdown__trigger-label">{{ value.label }}</span>
        <app-icon name="arrow-down" :size="16" />
      </button>
    </div>
    <ul v-if="isOpen" class="sort-dropdown__menu">
      <li
        v-for="option in options"
        :key="option.value"
        class="sort-dropdown__item"
        :class="{ 'sort-dropdown__item--active': value.value === option.value }"
        @click="select(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue"
import AppIcon from "@/components/ui/AppIcon.vue"

interface SortOption {
  label: string
  value: string
  sortBy: string
  order: string
}

export default Vue.extend({
  name: "SortDropdown",

  components: { AppIcon },

  props: {
    value: {
      type: Object as PropType<SortOption>,
      required: true,
    },
    options: {
      type: Array as PropType<SortOption[]>,
      required: true,
    },
  },

  data() {
    return {
      isOpen: false,
    }
  },

  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },

    select(option: SortOption) {
      this.$emit("input", option)
      this.isOpen = false
    },
  },
})
</script>
