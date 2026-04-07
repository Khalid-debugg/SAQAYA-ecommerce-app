<template>
  <textarea
    v-if="type === 'textarea'"
    :value="value"
    :placeholder="placeholder"
    :required="required"
    class="textarea"
    @input="$emit('input', $event.target.value)"
  />
  <input
    v-else
    :type="type"
    :value="value"
    :placeholder="placeholder"
    :required="required"
    class="input"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "AppInput",

  props: {
    value: {
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
})
</script>
