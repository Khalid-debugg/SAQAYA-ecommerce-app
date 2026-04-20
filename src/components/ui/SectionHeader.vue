<template>
  <div class="section-header">
    <div class="section-header__left">
      <div v-if="label" class="section-header__top">
        <span class="section-header__indicator"></span>
        <span class="section-header__label">{{ label }}</span>
      </div>
      <h2 v-if="title" class="section-header__title">{{ title }}</h2>
    </div>
    <div v-if="hasPrev !== undefined" class="section-header__nav">
      <button
        class="section-header__arrow"
        :disabled="!hasPrev"
        @click="onPrev"
      >
        <app-icon name="arrow-left" />
      </button>
      <button
        class="section-header__arrow"
        :disabled="!hasNext"
        @click="onNext"
      >
        <app-icon name="arrow-right" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppIcon from "@/components/ui/AppIcon.vue"

defineProps<{
  label?: string
  title?: string
  hasPrev?: boolean
  hasNext?: boolean
}>()

const emit = defineEmits(["prev", "next"])

const onPrev = () => {
  emit("prev")
}
const onNext = () => {
  emit("next")
}
</script>
