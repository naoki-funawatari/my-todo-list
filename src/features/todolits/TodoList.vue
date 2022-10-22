<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue"
import { WeightTypes } from "src/types"
import type { Todo } from "src/types"
import { todoDefaults } from "src/constants"
import TodoListForm from "src/features/todolits/TodoListForm.vue"
import TodoListHeader from "src/features/todolits/TodoListHeader.vue"
import TodoListItem from "src/features/todolits/TodoListItem.vue"
import TodoListFooter from "src/features/todolits/TodoListFooter.vue"

const list = ref<Todo[]>([])

onBeforeMount(() => {
  const progress = localStorage.getItem("progress")
  list.value = progress ? JSON.parse(progress) as Todo[] : todoDefaults
})

const addItem = (text: string): void => {
  if (text === "") {
    return
  }
  const id = Math.max(...list.value.map(o => o.id)) + 1
  const order = Math.max(...list.value.map(o => o.order)) + 1
  const item: Todo = { id, text, progress: 0, weight: WeightTypes.Low, order }
  list.value = [item, ...list.value]
}
const deleteItem = (id: number) => {
  const newlist = list.value.filter(o => o.id !== id)
  newlist.forEach((o, i) => o.order = i + 1)
  list.value = newlist
}
const changeOrder = (type: "up" | "down", currentOrder: number) => {
  let ordered = [...list.value]
  const index = ordered.findIndex(o => o.order === currentOrder)
  ordered[index].order += (type === "up" ? -1.5 : 1.5)
  ordered.sort((a, b) => a.order - b.order)
  ordered.forEach((o, i) => o.order = i + 1)
  list.value = ordered
}
const registerProgress = () => {
  const value = JSON.stringify(list.value)
  localStorage.setItem("progress", value)
}

const proration = (progress: number, weight: number, trunc: boolean = false) => {
  const totalWeight = list.value.reduce((a, b) => a + Number(b.weight), 0)
  const ratio = weight / totalWeight
  return trunc ? Math.trunc(progress * ratio) : progress * ratio
}

const overallProgress = computed(() => {
  const values = list.value.map(o => proration(o.progress, o.weight))
  const total = values.reduce((a, b) => a + b, 0)
  return Math.trunc(total)
})
const sorted = computed(() => list.value.sort((a, b) => a.order - b.order))
</script>

<template>
  <div>
    <TodoListForm @addClick="addItem" />
    <hr>
    <TodoListHeader />
    <TodoListItem v-for="item in sorted" :item="item" :list="sorted" :proration="proration" @deleteClick="deleteItem"
      @orderClick="changeOrder" />
    <hr>
    <TodoListFooter :overallProgress="overallProgress" @registerClick="registerProgress" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.item) {
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  width: 800px;
  margin-bottom: 5px;

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
