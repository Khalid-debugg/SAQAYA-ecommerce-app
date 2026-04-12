<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 9 6"
    fill="none"
  >
    <path
      d="M4.24267 1.8853L0.942667 5.1853L0 4.24264L4.24267 -3.05176e-05L8.48533 4.24264L7.54267 5.1853L4.24267 1.8853Z"
      fill="currentColor"
    />
  </svg>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "ArrowUpIcon",
  props: {
    width: { type: Number, default: 24 },
    height: { type: Number, default: 24 },
  },
})
</script>
