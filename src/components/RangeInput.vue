<script setup lang="ts">
defineProps({
  modelValue: {
    type: Number,
    required: false,
    default: 1,
  }
})

const emits = defineEmits<{
  (event: 'update:modelValue', value: Number): void
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = Number(target.value)
  emits("update:modelValue", value)
}
</script>

<template>
  <input type="range" min="0" max="100" step="5" :value="modelValue" @input="onInput" />
</template>

<style lang="scss" scoped>

</style>
