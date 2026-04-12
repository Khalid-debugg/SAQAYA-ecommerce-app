<template>
  <div>
    <transition name="drawer-overlay">
      <div v-if="isOpen" class="drawer-overlay" @click="$emit('close')" />
    </transition>
    <transition name="drawer-slide-right">
      <div v-if="isOpen" class="drawer">
        <div class="drawer__header">
          <h2 class="drawer__title">{{ title }}</h2>
          <button class="drawer__close" @click="$emit('close')">
            <app-icon name="close" />
          </button>
        </div>
        <div class="drawer__body">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import AppIcon from "@/components/ui/AppIcon.vue"
export default Vue.extend({
  components: { AppIcon },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
})
</script>
