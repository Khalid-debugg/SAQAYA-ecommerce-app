<template>
  <div class="hero-banner">
    <div class="hero-banner__track" :style="trackStyle">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="hero-banner__slide"
      >
        <div class="hero-banner__content">
          <div class="hero-banner__brand">
            <img
              :src="slide.brandIcon"
              :alt="slide.brandName"
              class="hero-banner__brand-icon"
            />
            <span class="hero-banner__brand-name">{{ slide.brandName }}</span>
          </div>
          <h2 class="hero-banner__title">{{ slide.title }}</h2>
          <router-link to="/products" class="hero-banner__cta">
            <span class="hero-banner__cta-label">Shop Now</span>
            <app-icon name="arrow-right" class="hero-banner__cta-arrow" />
          </router-link>
        </div>
        <img :src="slide.image" :alt="slide.title" class="hero-banner__image" />
      </div>
    </div>
    <div class="hero-banner__dots">
      <button
        v-for="(_, index) in slides"
        :key="index"
        class="hero-banner__dot"
        :class="{ 'hero-banner__dot--active': currentSlide === index }"
        @click="goToSlide(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue"
import AppIcon from "@/components/ui/AppIcon.vue"

interface BannerSlide {
  brandIcon: string
  brandName: string
  title: string
  image: string
}

const props = defineProps<{ slides: BannerSlide[] }>()

const currentSlide = ref(0)
const timer = ref<ReturnType<typeof setInterval> | null>(null)

const trackStyle = computed(() => ({
  transform: `translateX(-${currentSlide.value * 100}%)`,
}))

const goToSlide = (index: number) => {
  currentSlide.value = index
  restartTimer()
}
const next = () => {
  currentSlide.value = (currentSlide.value + 1) % props.slides.length
}
const startTimer = () => {
  timer.value = setInterval(next, 5000)
}
const stopTimer = () => {
  if (timer.value) clearInterval(timer.value)
}
const restartTimer = () => {
  stopTimer()
  startTimer()
}

onMounted(() => startTimer())
onBeforeUnmount(() => stopTimer())
</script>
