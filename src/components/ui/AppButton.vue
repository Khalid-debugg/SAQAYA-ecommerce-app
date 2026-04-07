<template>
  <button :type="type" :class="`btn ${modifier ? `btn--${modifier}` : ''}`">
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "AppButton",

  props: {
    modifier: {
      type: String,
      default: "primary",
    },
    type: {
      type: String,
      default: "button",
    },
  },
})
</script>
