<script setup lang="ts">
import { useTodoListStore } from 'src/stores'

const todoList = useTodoListStore()
const onRegisterClick = () => todoList.registerProgress()
</script>

<template>
  <div class="item">
    <div class="text">進捗率</div>
    <div class="progress-bar">
      <progress max="100" :value="todoList.overallProgress"></progress>
    </div>
    <div class="progress">@</div>
    <div class="weight">@</div>
    <div class="proration">{{todoList.overallProgress}} %</div>
    <div class="delete">
      <button @click="onRegisterClick">保存</button>
    </div>
    <div class="sorting">@</div>
    <div class="sorting">@</div>
  </div>
</template>

<style lang="scss" scoped>

</style>
