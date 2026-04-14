<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 9 6"
    fill="currentColor"
  >
    <path
      d="M4.24268 3.3L7.54268 0L8.48535 0.942666L4.24268 5.18533L1.71661e-05 0.942666L0.942683 0L4.24268 3.3Z"
      fill="currentColor"
    />
  </svg>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "ArrowDownIcon",
  props: {
    width: { type: Number, default: 24 },
    height: { type: Number, default: 24 },
  },
})
</script>
