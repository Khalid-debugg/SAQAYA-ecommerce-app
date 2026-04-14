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

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "PlusIcon",

  props: {
    width: {
      type: Number,
      default: 24,
    },
    height: {
      type: Number,
      default: 24,
    },
  },
})
</script>
