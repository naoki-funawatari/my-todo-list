<script setup lang="ts">
import { ref, reactive } from "vue"
import { useTodoListStore } from 'src/stores'
import TodoListItem from "src/features/todolits/TodoListItem.vue"

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
const onMouseMove = (event: Event) => {
  draggable.value = event.target instanceof HTMLDivElement ? "true" : "false"
}
</script>

<template>
  <TodoListItem v-for="item in todoList.sorted" :item="item" :draggable="draggable" @dragstart="onDragStart"
    @dragend="onDragEnd" @dragenter="onDragEnter" @dragover.prevent="onDragOver" @dragleave="onDragLeave"
    @drop.prevent="onDrop" @mousemove.capture="onMouseMove" />
</template>

<style lang="scss" scoped>
[draggable="true"] {
  cursor: move;
}

.dragging {
  color: red
}

.over {
  background-color: rgba(255, 255, 0, 0.3);
}
</style>
