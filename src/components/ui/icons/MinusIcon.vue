<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 18 2"
    fill="currentColor"
  >
    <path
      d="M16.75 0.75H0.75"
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
