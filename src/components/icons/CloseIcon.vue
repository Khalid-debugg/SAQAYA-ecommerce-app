<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M6 6L18 18"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "CloseIcon",
  props: {
    width: { type: Number, default: 24 },
    height: { type: Number, default: 24 },
  },
})
</script>
