<script setup lang="ts">
import TodoList from "src/features/todolist/TodoList.vue"
</script>

<template>
  <h1>My Todo List</h1>
  <TodoList />
</template>

<style lang="scss" scoped>
:deep(*) {
  box-sizing: border-box;
}
</style>
