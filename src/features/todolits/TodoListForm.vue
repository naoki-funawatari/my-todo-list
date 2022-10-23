<script setup lang="ts">
import { ref } from "vue"
import TextInput from "src/components/TextInput.vue"
import { useTodoListStore } from 'src/stores'

const todoList = useTodoListStore()
const input = ref<string>("")

const onAddClick = () => {
  todoList.addItem(input.value)
  input.value = ""
}
</script>

<template>
  <div class="item">
    <div class="text">
      <TextInput type="text" v-model="input" />
    </div>
    <div class="progress-bar">@</div>
    <div class="progress">@</div>
    <div class="weight">@</div>
    <div class="proration">@</div>
    <div class="delete"><button @click="onAddClick">追加</button></div>
    <div class="sorting">@</div>
    <div class="sorting">@</div>
  </div>
</template>

<style lang="scss" scoped>

</style>
