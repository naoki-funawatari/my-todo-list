<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    required: false,
    default: "",
  }
})

const emits = defineEmits<{
  (event: 'update:modelValue', value: String): void
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emits("update:modelValue", target.value)
}
</script>

<template>
  <input type="text" class="w-full" :value="modelValue" @input="onInput" />
</template>

<style lang="scss" scoped>
.w-full {
  width: 100%
}
</style>
