<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="20" fill="#DB4444" />
    <path
      d="M10 13L20 20L30 13M10 27H30V13H10V27Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "MailIcon",

  props: {
    width: {
      type: Number,
      default: 40,
    },
    height: {
      type: Number,
      default: 40,
    },
  },
})
</script>
