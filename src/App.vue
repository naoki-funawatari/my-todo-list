<script setup lang="ts">
import { ref, computed } from "vue"

interface todo {
  id: number;
  text: string;
  progress: number;
}

const input = ref<string>("")
const list = ref<todo[]>([
  { id: 1, text: "テスト 1", progress: 0 },
  { id: 2, text: "テスト 2", progress: 0 },
  { id: 3, text: "テスト 3", progress: 0 }
])

const overallProgress = computed(() => {
  const count = list.value.length
  const total = list.value.reduce((a, b) => a + Number(b.progress), 0)
  const progress = Math.trunc(total / count)
  return progress
})

const addList = () => {
  if (input.value === "") {
    return
  }
  const id = Math.max(...list.value.map(o => o.id)) + 1
  const item = { id, text: input.value, progress: 0 }
  list.value = [item, ...list.value]
  input.value = ""
}
const deleteItem = (id: number) => {
  list.value = list.value.filter(o => o.id !== id)
}
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
    <div class="progress-bar"></div>
    <div class="progress"></div>
    <div class="delete"></div>
  </div>
  <div v-for="item in list" class="item">
    <div class="text">{{item.text}}</div>
    <div class="progress-bar">
      <input type="range" min="0" max="100" step="5" v-model="item.progress" />
    </div>
    <div class="progress">
      <span>{{item.progress}} %</span>
    </div>
    <div class="delete" @click="deleteItem(item.id)"><button>削除</button></div>
  </div>
  <hr>
  <div class="item">
    <div class="text">進捗率</div>
    <div class="progress-bar">
      <progress max="100" :value="overallProgress"></progress>
    </div>
    <div class="progress">{{overallProgress}} %</div>
    <div class="delete"></div>
  </div>
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: row;
  width: 500px;
  margin-bottom: 5px;

  .text {
    flex-grow: 1;
    margin-right: 10px;
    border-bottom: 1px solid black
  }

  .progress-bar {
    flex-shrink: 1;
    text-align: right;
    border-bottom: 1px solid black
  }

  .progress {
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
