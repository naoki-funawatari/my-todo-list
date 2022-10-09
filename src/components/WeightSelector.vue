<script setup lang="ts">
import { ref } from "vue"

defineProps({
  modelValue: {
    type: Number,
    required: false,
    default: 1
  }
})

const emits = defineEmits<{
  (event: 'update:modelValue', value: Number): void
}>()

const list = ref([
  { value: 1, text: "小" },
  { value: 3, text: "中" },
  { value: 5, text: "大" },
])

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const value = Number(target.value)
  emits("update:modelValue", value)
}
</script>

<template>
  <select :value="modelValue" @change="onChange">
    <option v-for="(item, key) in list" :value="item.value" :key="key">{{item.text}}</option>
  </select>
</template>

<style lang="scss" scoped>

</style>
