<script setup lang="ts">
import { PropType, ref } from "vue"
import { WeightTypes } from "../types"
import type { Weight, WeightType } from "../types"

defineProps({
  modelValue: {
    type: Number as PropType<WeightType>,
    required: false,
    default: 1,
  }
})

const emits = defineEmits<{
  (event: 'update:modelValue', value: Number): void
}>()

const list = ref<Weight[]>([
  { value: WeightTypes.Low, text: "小" },
  { value: WeightTypes.Medium, text: "中" },
  { value: WeightTypes.High, text: "大" },
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
