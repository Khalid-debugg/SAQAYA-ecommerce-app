<template>
  <div class="section-header">
    <div class="section-header__left">
      <div class="section-header__top">
        <span class="section-header__indicator"></span>
        <span v-if="label" class="section-header__label">{{ label }}</span>
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

<script lang="ts">
import Vue from "vue"
import AppIcon from "@/components/ui/AppIcon.vue"

export default Vue.extend({
  name: "SectionHeader",
  components: { AppIcon },
  props: {
    label: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    hasPrev: {
      type: Boolean,
      default: undefined,
    },
    hasNext: {
      type: Boolean,
      default: undefined,
    },
  },
  methods: {
    onPrev() {
      this.$emit("prev")
    },
    onNext() {
      this.$emit("next")
    },
  },
})
</script>
