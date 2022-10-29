<script setup lang="ts">
import { PropType } from 'vue';
import { Todo } from 'src/types';
import { useTodoListStore } from 'src/stores'
import TextInput from "src/components/TextInput.vue"
import WeightSelector from "src/components/WeightSelector.vue"
import RangeInput from "src/components/RangeInput.vue"

const todoList = useTodoListStore()

defineProps({
  item: {
    type: Object as PropType<Todo>,
    required: true
  },
})

const onDeleteClick = (id: number) => {
  todoList.deleteItem(id)
} 
</script>

<template>
  <div :id="item.id.toString()" :data-order="item.order" class="item">
    <div class="text">
      <TextInput type="text" v-model="item.text" />
    </div>
    <div class="progress-bar">
      <RangeInput v-model="item.progress" />
    </div>
    <div class="progress">{{item.progress}} %</div>
    <div class="weight">
      <WeightSelector v-model="item.weight" />
    </div>
    <div class="proration">{{todoList.proration(item.progress, item.weight, true)}} %</div>
    <div class="delete" @click="onDeleteClick(item.id)">
      <button>削除</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
