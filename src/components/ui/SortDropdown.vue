<template>
  <div class="sort-dropdown" ref="dropdown">
    <div class="sort-dropdown__wrapper">
      <span class="sort-dropdown__label">Sort by</span>
      <button class="sort-dropdown__trigger" @click="toggleDropdown">
        <span>{{ selectedLabel }}</span>
        <app-icon name="arrow-down" :size="16" />
      </button>
    </div>
    <ul v-if="isOpen" class="sort-dropdown__menu">
      <li
        v-for="option in options"
        :key="option.value"
        class="sort-dropdown__item"
        :class="{ 'sort-dropdown__item--active': value === option.value }"
        @click="select(option.value)"
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
}

export default Vue.extend({
  name: "SortDropdown",

  components: { AppIcon },

  props: {
    value: {
      type: String,
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

  computed: {
    selectedLabel(): string {
      const selected = this.options.find((o) => o.value === this.value)
      return selected ? selected.label : ""
    },
  },

  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },

    select(value: string) {
      this.$emit("input", value)
      this.isOpen = false
    },
  },
})
</script>
