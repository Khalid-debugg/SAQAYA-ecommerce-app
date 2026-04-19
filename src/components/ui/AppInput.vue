<template>
  <textarea
    v-if="type === 'textarea'"
    :value="modelValue"
    :placeholder="placeholder"
    :required="required"
    class="textarea"
    @input="updateValue($event)"
  />
  <input
    v-else
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :required="required"
    class="input"
    @input="updateValue($event)"
  />
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "AppInput",

  props: {
    modelValue: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    updateValue(event: Event) {
      this.$emit("update:modelValue", (event.target as HTMLInputElement).value)
    },
  },
})
</script>
