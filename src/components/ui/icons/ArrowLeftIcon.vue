<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M11 5L4 12L11 19M4 12H20"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "ArrowLeftIcon",
  props: {
    width: { type: Number, default: 24 },
    height: { type: Number, default: 24 },
  },
})
</script>
