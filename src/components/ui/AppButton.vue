<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="`btn ${modifier ? `btn--${modifier}` : ''}`"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  modifier?: "primary" | "outline" | "dark"
  type?: "button" | "reset" | "submit"
  disabled?: boolean
}>()
</script>
