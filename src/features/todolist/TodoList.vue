<script setup lang="ts">
import { onBeforeMount } from "vue"
import type { Todo } from "src/types"
import { todoDefaults } from "src/constants"
import { useTodoListStore } from 'src/stores'
import TodoListForm from "src/features/todolist/TodoListForm.vue"
import TodoListHeader from "src/features/todolist/TodoListHeader.vue"
import TodoListBody from "src/features/todolist/TodoListBody.vue"
import TodoListFooter from "src/features/todolist/TodoListFooter.vue"

const todoList = useTodoListStore()

onBeforeMount(() => {
  const progress = localStorage.getItem("progress")
  todoList.list = progress ? JSON.parse(progress) as Todo[] : todoDefaults
})
</script>

<template>
  <div>
    <TodoListForm />
    <hr>
    <TodoListHeader />
    <TodoListBody />
    <hr>
    <TodoListFooter />
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
    border-bottom: 1px solid black;
  }

  .progress-bar {
    width: 160px;
    text-align: right;
    border-bottom: 1px solid black
  }

  .progress {
    width: 52px;
    text-align: right;
    border-bottom: 1px solid black
  }

  .weight {
    width: 38px;
    text-align: right;
    border-bottom: 1px solid black
  }

  .proration {
    width: 52px;
    text-align: right;
    border-bottom: 1px solid black
  }

  .delete {
    width: 50px;
    text-align: right;
  }
}
</style>
