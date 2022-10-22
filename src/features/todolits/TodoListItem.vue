<script setup lang="ts">
import { PropType } from 'vue';
import { Todo } from 'src/types';
import WeightSelector from "src/components/WeightSelector.vue"
import RangeInput from "src/components/RangeInput.vue"

defineProps({
  item: {
    type: Object as PropType<Todo>,
    required: true
  },
  list: {
    type: Object as PropType<Todo[]>,
    required: true
  },
  proration: {
    type: Function as PropType<(progress: number, weight: number, trunc: boolean) => number>,
    required: true
  },
})

const emits = defineEmits<{
  (event: 'deleteClick', id: number): void,
  (event: 'orderClick', type: "up" | "down", currentOrder: number): void
}>()
const onDeleteClick = (id: number) => {
  emits("deleteClick", id)
}
const onOrderClick = (type: "up" | "down", currentOrder: number) => {
  emits('orderClick', type, currentOrder)
}
</script>

<template>
  <div class="item">
    <div class="text">{{item.text}}</div>
    <div class="progress-bar">
      <RangeInput v-model="item.progress" />
    </div>
    <div class="progress">
      <span>{{item.progress}} %</span>
    </div>
    <div class="weight">
      <WeightSelector v-model="item.weight" />
    </div>
    <div class="proration">{{proration(item.progress, item.weight, true)}} %</div>
    <div class="delete" @click="onDeleteClick(item.id)">
      <button>削除</button>
    </div>
    <div class="sorting">
      <button v-if="item.order!==1" @click="onOrderClick('up', item.order)">👆</button>
    </div>
    <div class="sorting">
      <button v-if="item.order!==list.length" @click="onOrderClick('down', item.order)">👇</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
