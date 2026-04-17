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
        <img :src="img" :alt="`Product thumbnail ${index + 1}`" />
      </button>
    </div>
    <div class="product-gallery__main">
      <img :src="displayImages[selectedIndex]" :alt="alt" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

const THUMBNAIL_COUNT = 4

export default Vue.extend({
  name: "ProductGallery",
  props: {
    images: { type: Array as () => string[], required: true },
    alt: { type: String, default: "" },
  },
  data() {
    return { selectedIndex: 0 }
  },
  computed: {
    displayImages(): string[] {
      if (!this.images.length) return []
      const result: string[] = []
      for (let i = 0; i < THUMBNAIL_COUNT; i++) {
        result.push(this.images[i % this.images.length])
      }
      return result
    },
  },
})
</script>
