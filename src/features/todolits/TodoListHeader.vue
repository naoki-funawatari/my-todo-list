<script setup lang="ts">
import { ref, PropType } from "vue"
import TextInput from "src/components/TextInput.vue"

const { addList } = defineProps({
  addList: {
    type: Function as PropType<(text: string) => void>,
    required: true
  }
})

const input = ref<string>("")

const handleAddClick = () => {
  if (input.value === "") {
    return
  }
  addList(input.value)
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
    <div class="delete"><button @click="handleAddClick">追加</button></div>
    <div class="sorting">@</div>
    <div class="sorting">@</div>
  </div>
</template>

<style lang="scss" scoped>

</style>
