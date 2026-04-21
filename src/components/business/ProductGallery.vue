<template>
  <div class="product-gallery">
    <div class="product-gallery__thumbnails">
      <button
        v-for="(img, index) in displayImages"
        :key="index"
        class="product-gallery__thumbnail"
        :class="{
          'product-gallery__thumbnail--active': selectedIndex === index,
        }"
        @click="selectedIndex = index"
      >
        <img
          :src="img"
          :alt="`Product thumbnail ${index + 1}`"
          class="product-gallery__thumbnail-image"
        />
      </button>
    </div>
    <div class="product-gallery__main">
      <img
        :src="displayImages[selectedIndex]"
        :alt="alt"
        class="product-gallery__main-image"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

const THUMBNAIL_COUNT = 4

const props = defineProps<{
  images: string[]
  alt: string
}>()

const selectedIndex = ref(0)

const displayImages = computed((): string[] => {
  if (!props.images.length) return []
  const result: string[] = []
  for (let i = 0; i < THUMBNAIL_COUNT; i++) {
    result.push(props.images[i % props.images.length])
  }
  return result
})
</script>
