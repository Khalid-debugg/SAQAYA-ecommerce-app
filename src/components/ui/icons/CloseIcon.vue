<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="1.5" />
    <path
      d="M16 8L8 16"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M8 8L16 16"
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
