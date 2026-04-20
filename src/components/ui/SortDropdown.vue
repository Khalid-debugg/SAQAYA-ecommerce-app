<template>
  <div class="sort-dropdown" ref="dropdown">
    <div class="sort-dropdown__wrapper">
      <span class="sort-dropdown__label" data-test="sort-label">Sort by</span>
      <button
        class="sort-dropdown__trigger"
        data-test="sort-trigger"
        @click="toggleDropdown"
      >
        <span
          class="sort-dropdown__trigger-label"
          data-test="sort-selected-label"
          >{{ modelValue.label }}</span
        >
        <app-icon name="arrow-down" :size="16" />
      </button>
    </div>
    <ul v-if="isOpen" class="sort-dropdown__menu" data-test="sort-menu">
      <li
        v-for="option in options"
        :key="option.value"
        class="sort-dropdown__item"
        :class="{
          'sort-dropdown__item--active': modelValue.value === option.value,
        }"
        :data-test="`sort-option-${option.value}`"
        @click="select(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import AppIcon from "@/components/ui/AppIcon.vue"

interface SortOption {
  label: string
  value: string
  sortBy: string
  order: string
}

defineProps<{
  modelValue: SortOption
  options: SortOption[]
}>()

const emit = defineEmits(["update:modelValue"])

const isOpen = ref(false)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}
const select = (option: SortOption) => {
  emit("update:modelValue", option)
  isOpen.value = false
}
</script>
