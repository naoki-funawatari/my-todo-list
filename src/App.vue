<script setup lang="ts">
import { ref, computed } from "vue"
import WeightSelector from "./components/WeightSelector.vue"
import type { Todo } from "./types"

const input = ref<string>("")
const list = ref<Todo[]>([
  { id: 3, text: "テスト 4", progress: 10, weight: 1 },
  { id: 3, text: "テスト 3", progress: 0, weight: 5 },
  { id: 2, text: "テスト 2", progress: 45, weight: 3 },
  { id: 1, text: "テスト 1", progress: 60, weight: 1 },
])

const addList = () => {
  if (input.value === "") {
    return
  }
  const id = Math.max(...list.value.map(o => o.id)) + 1
  const item: Todo = { id, text: input.value, progress: 0, weight: 1 }
  list.value = [item, ...list.value]
  input.value = ""
}
const deleteItem = (id: number) => {
  list.value = list.value.filter(o => o.id !== id)
}
const proration = (progress: number, weight: number, trunc: boolean = false) => {
  const totalWeight = list.value.reduce((a, b) => a + Number(b.weight), 0)
  const ratio = weight / totalWeight
  return trunc ? Math.trunc(progress * ratio) : progress * ratio
}

const overallProgress = computed(() => {
  // const count = list.value.length
  // const total = list.value.reduce((a, b) => a + Number(b.progress), 0)
  // const progress = Math.trunc(total / count)
  // return progress
  const values = list.value.map(o => proration(o.progress, o.weight))
  const total = values.reduce((a, b) => a + b, 0)
  return Math.trunc(total)
})
</script>

<template>
  <h1>My Todo List</h1>
  <div>
    <input type="text" v-model="input">
    <button @click="addList">追加</button>
  </div>
  <hr>
  <div class="item">
    <div class="text">内容</div>
    <div class="progress-bar">@</div>
    <div class="progress">@</div>
    <div class="weight">@</div>
    <div class="proration">@</div>
    <div class="delete">@</div>
  </div>
  <div v-for="item in list" class="item">
    <div class="text">{{item.text}}</div>
    <div class="progress-bar">
      <input type="range" min="0" max="100" step="5" v-model="item.progress" />
    </div>
    <div class="progress">
      <span>{{item.progress}} %</span>
    </div>
    <div class="weight">
      <WeightSelector v-model="item.weight" />
    </div>
    <div class="proration">{{proration(item.progress, item.weight, true)}} %</div>
    <div class="delete" @click="deleteItem(item.id)">
      <button>削除</button>
    </div>
  </div>
  <hr>
  <div class="item">
    <div class="text">進捗率</div>
    <div class="progress-bar">
      <progress max="100" :value="overallProgress"></progress>
    </div>
    <div class="progress">@</div>
    <div class="weight">@</div>
    <div class="proration">{{overallProgress}} %</div>
    <div class="delete">@</div>
  </div>
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  width: 600px;
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
}

input[type=range],
progress {
  width: 150px;
}

.noborder {
  border: none;
}
</style>
