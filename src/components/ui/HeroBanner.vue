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

<script lang="ts">
import Vue, { PropType } from "vue"
import AppIcon from "@/components/ui/AppIcon.vue"

interface BannerSlide {
  brandIcon: string
  brandName: string
  title: string
  image: string
}

export default Vue.extend({
  name: "HeroBanner",
  components: { AppIcon },
  props: {
    slides: {
      type: Array as PropType<BannerSlide[]>,
      default: () => [],
    },
  },
  data() {
    return {
      currentSlide: 0,
      timer: null as ReturnType<typeof setInterval> | null,
    }
  },
  computed: {
    trackStyle(): object {
      return { transform: `translateX(-${this.currentSlide * 100}%)` }
    },
  },
  mounted() {
    this.startTimer()
  },
  beforeDestroy() {
    this.stopTimer()
  },
  methods: {
    goToSlide(index: number) {
      this.currentSlide = index
      this.restartTimer()
    },
    next() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length
    },
    startTimer() {
      this.timer = setInterval(this.next, 5000)
    },
    stopTimer() {
      if (this.timer) clearInterval(this.timer)
    },
    restartTimer() {
      this.stopTimer()
      this.startTimer()
    },
  },
})
</script>
