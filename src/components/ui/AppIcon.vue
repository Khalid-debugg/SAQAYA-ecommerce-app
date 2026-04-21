<template>
  <component :is="icon" :width="size" :height="size" class="app-icon" />
</template>

<script setup lang="ts">
import { computed } from "vue"
import { icons, IconName } from "./icons/index"

const props = defineProps<{
  name: IconName
  size?: number
}>()

const icon = computed(() => icons[props.name as IconName] ?? icons["close"])
</script>

<style lang="scss" scoped>
.app-icon {
  display: block;
  flex-shrink: 0;
}
</style>
