<template>
  <component :is="icon" :width="size" :height="size" class="app-icon" />
</template>

<script lang="ts">
import Vue from "vue"
import { icons, IconName } from "./icons/index"

export default Vue.extend({
  name: "AppIcon",

  props: {
    name: {
      type: String as () => IconName,
      required: true,
    },
    size: {
      type: Number,
      default: 24,
    },
  },

  computed: {
    icon() {
      return icons[this.name as string as IconName] ?? icons["close"]
    },
  },
})
</script>

<style lang="scss" scoped>
.app-icon {
  display: block;
  flex-shrink: 0;
}
</style>
