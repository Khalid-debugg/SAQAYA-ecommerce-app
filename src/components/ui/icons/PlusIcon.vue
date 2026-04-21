<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 18 18"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.75 16.75V8.75M8.75 8.75V0.75M8.75 8.75H16.75M8.75 8.75H0.75"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: number
    height?: number
  }>(),
  {
    width: 24,
    height: 24,
  }
)
</script>
