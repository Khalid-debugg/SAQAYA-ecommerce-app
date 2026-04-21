<template>
  <div class="app-error">
    <p class="app-error__message">{{ message }}</p>
    <app-button modifier="outline" @click="retry"> Try again </app-button>
  </div>
</template>

<script setup lang="ts">
import AppButton from "@/components/ui/AppButton.vue"

withDefaults(
  defineProps<{
    message?: string
  }>(),
  {
    message: "Something went wrong. Please try again.",
  }
)

const emit = defineEmits(["retry"])

const retry = () => {
  emit("retry")
}
</script>
