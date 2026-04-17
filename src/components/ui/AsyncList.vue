<template>
  <div>
    <app-skeleton v-if="isLoading" />
    <app-error v-else-if="error" :message="error" @retry="retry" />
    <p v-else-if="isEmpty">{{ emptyMessage }}</p>
    <slot v-else />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import AppSkeleton from "@/components/ui/AppSkeleton.vue"
import AppError from "@/components/ui/AppError.vue"

export default Vue.extend({
  name: "AsyncList",

  components: { AppSkeleton, AppError },

  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String as () => string | null,
      default: null,
    },
    isEmpty: {
      type: Boolean,
      default: false,
    },
    emptyMessage: {
      type: String,
      default: "Nothing to show.",
    },
  },
  methods: {
    retry() {
      this.$emit("retry")
    },
  },
})
</script>
