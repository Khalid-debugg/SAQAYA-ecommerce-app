<template>
  <div>
    <app-skeleton v-if="isLoading" />
    <app-error v-else-if="error" :message="error" @retry="retry" />
    <p v-else-if="isEmpty">{{ emptyMessage }}</p>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import AppSkeleton from "@/components/ui/AppSkeleton.vue"
import AppError from "@/components/ui/AppError.vue"

withDefaults(
  defineProps<{
    isLoading: boolean
    error: string | null
    isEmpty: boolean
    emptyMessage?: string
  }>(),
  {
    emptyMessage: "Nothing to show",
  }
)

const emit = defineEmits(["retry"])

const retry = () => {
  emit("retry")
}
</script>
