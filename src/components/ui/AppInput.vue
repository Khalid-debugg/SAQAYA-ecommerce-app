<template>
  <textarea
    v-if="type === 'textarea'"
    :value="modelValue"
    :placeholder="placeholder"
    :required="required"
    class="textarea"
    @input="updateValue"
  />
  <input
    v-else
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :required="required"
    class="input"
    @input="updateValue"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string
    type?: string
    placeholder?: string
    required?: boolean
  }>(),
  {
    type: "text",
    placeholder: "",
  }
)

const emit = defineEmits(["update:modelValue"])

const updateValue = (event: Event) =>
  emit("update:modelValue", (event.target as HTMLInputElement).value)
</script>
