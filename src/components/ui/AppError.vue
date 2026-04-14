<template>
  <div class="app-error">
    <p class="app-error__message">{{ message }}</p>
    <app-button modifier="outline" @click.native="retry">
      Try again
    </app-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import AppButton from "@/components/ui/AppButton.vue"

export default Vue.extend({
  name: "AppError",
  components: { AppButton },
  props: {
    message: {
      type: String,
      default: "Something went wrong. Please try again.",
    },
  },
  methods: {
    retry() {
      this.$emit("retry")
    },
  },
})
</script>
