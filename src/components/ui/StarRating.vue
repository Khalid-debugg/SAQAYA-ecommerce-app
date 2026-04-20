<template>
  <div class="star-rating">
    <div v-for="index in 5" :key="index" class="star-rating__star">
      <app-icon name="star" :size="size" class="star-rating__empty" />
      <div class="star-rating__filled" :style="{ width: getFill(index) + '%' }">
        <app-icon name="star" :size="size" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppIcon from "@/components/ui/AppIcon.vue"

const props = defineProps<{
  rating: number
  size?: number
}>()

const getFill = (index: number): number => {
  const diff = props.rating - (index - 1)
  if (diff >= 1) return 100
  if (diff <= 0) return 0
  return Math.round(diff * 100)
}
</script>
