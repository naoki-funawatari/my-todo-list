<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount } from "vue"
import { WeightTypes } from "src/types"
import type { Todo } from "src/types"
import { todoDefaults } from "src/constants"
import TodoListForm from "src/features/todolits/TodoListForm.vue"
import TodoListHeader from "src/features/todolits/TodoListHeader.vue"
import TodoListItem from "src/features/todolits/TodoListItem.vue"
import TodoListFooter from "src/features/todolits/TodoListFooter.vue"
import { useTodoListStore } from 'src/stores'

onBeforeMount(() => {
  const progress = localStorage.getItem("progress")
  todoList.list = progress ? JSON.parse(progress) as Todo[] : todoDefaults
})

const todoList = useTodoListStore()

const draggable = ref("true")
const orders = reactive({ from: 0, to: 0 })
const onDragStart = (event: DragEvent) => {
  const target = event.currentTarget as HTMLDivElement
  target.classList.add("dragging")
  const order = target.dataset.order
  if (order) {
    orders.from = Number(order)
  }
}
const onDragEnd = (event: DragEvent) => {
  const target = event.currentTarget as HTMLDivElement
  target.classList.remove("dragging")
}
const onDragEnter = (event: DragEvent) => {
  const target = event.currentTarget as HTMLDivElement
  target.classList.add("over")
  const order = target.dataset.order
  if (order) {
    orders.to = Number(order)
  }
}
const onDragOver = (event: Event) => { }
const onDrop = (event: Event) => {
  const target = event.currentTarget as HTMLDivElement
  target.classList.remove("over")
  const item = todoList.list.find(o => o.order === orders.from)!
  if (orders.to > orders.from) {
    // 後ろにずらす
    item.order = orders.to + 0.5
  } else if (orders.from > orders.to) {
    // 前にずらす
    item.order = orders.to - 0.5
  } else {
    // 変更なし
  }

  let ordered = [...todoList.list]
  ordered.sort((a, b) => a.order - b.order)
  ordered.forEach((o, i) => o.order = i + 1)
  todoList.list = ordered
}
const onDragLeave = (event: DragEvent) => {
  const target = event.currentTarget as HTMLDivElement
  target.classList.remove("over")
}
const onMouseEnter = (event: Event) => {
  draggable.value = event.target instanceof HTMLDivElement ? "true" : "false"
}
</script>

<template>
  <div>
    <TodoListForm />
    <hr>
    <TodoListHeader />
    <TodoListItem v-for="item in todoList.sorted" :item="item" :list="todoList.list" :draggable="draggable"
      :proration="todoList.proration" @deleteClick="todoList.deleteItem" @orderClick="todoList.changeOrder"
      @dragstart="onDragStart" @dragend="onDragEnd" @dragenter="onDragEnter" @dragover.prevent="onDragOver"
      @dragleave="onDragLeave" @drop.prevent="onDrop" @mouseenter.capture="onMouseEnter" />
    <hr>
    <TodoListFooter :overallProgress="todoList.overallProgress" @registerClick="todoList.registerProgress" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.item) {
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  width: 800px;
  margin-bottom: 5px;

  &[draggable="true"] {
    cursor: move;
  }

  &.dragging {
    color: red
  }

  &.over {
    background-color: rgba(255, 255, 0, 0.3);
  }

  .text {
    flex-grow: 1;
    border-bottom: 1px solid black
  }

  .progress-bar {
    width: 160px;
    text-align: right;
    border-bottom: 1px solid black
  }

  .progress {
    width: 60px;
    text-align: right;
    border-bottom: 1px solid black
  }

  .weight {
    width: 60px;
    text-align: right;
    border-bottom: 1px solid black
  }

  .proration {
    width: 60px;
    text-align: right;
    border-bottom: 1px solid black
  }

  .delete {
    width: 50px;
    text-align: right;
  }

  .sorting {
    width: 30px;
    text-align: right;
  }
}
</style>
