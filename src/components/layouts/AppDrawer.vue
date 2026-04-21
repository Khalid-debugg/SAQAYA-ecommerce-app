<template>
  <div>
    <transition name="drawer-overlay">
      <div v-if="isOpen" class="drawer-overlay" @click="close" />
    </transition>
    <transition name="drawer-slide-right">
      <div v-if="isOpen" class="drawer">
        <div class="drawer__header">
          <h2 class="drawer__title">{{ title }}</h2>
          <button class="drawer__close" @click="close">
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

<script setup lang="ts">
import AppIcon from "@/components/ui/AppIcon.vue"

defineProps<{
  isOpen: boolean
  title: string
}>()

const emit = defineEmits(["close"])

const close = () => {
  emit("close")
}
</script>
