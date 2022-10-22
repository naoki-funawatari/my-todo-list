<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue"
import WeightSelector from "src/components/WeightSelector.vue"
import RangeInput from "src/components/RangeInput.vue"
import { WeightTypes } from "src/types"
import type { Todo } from "src/types"
import { todoDefaults } from "src/constants"
import TodoListHeader from "src/features/todolits/TodoListHeader.vue"

const list = ref<Todo[]>([])

onBeforeMount(() => {
  const progress = localStorage.getItem("progress")
  list.value = progress ? JSON.parse(progress) as Todo[] : todoDefaults
})

const addList = (text: string): void => {
  const id = Math.max(...list.value.map(o => o.id)) + 1
  const order = Math.max(...list.value.map(o => o.order)) + 1
  const item: Todo = { id, text, progress: 0, weight: WeightTypes.Low, order }
  list.value = [item, ...list.value]
}
const deleteItem = (id: number) => {
  list.value = list.value.filter(o => o.id !== id)
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
    <TodoListHeader :addList="addList" />
    <hr>
    <div class="item">
      <div class="text">内容</div>
      <div class="progress-bar">@</div>
      <div class="progress">@</div>
      <div class="weight">@</div>
      <div class="proration">@</div>
      <div class="delete">@</div>
      <div class="sorting">@</div>
      <div class="sorting">@</div>
    </div>
    <div v-for="item in sorted" class="item">
      <div class="text">{{item.text}}</div>
      <div class="progress-bar">
        <RangeInput v-model="item.progress" />
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
      <div class="sorting">
        <button v-if="item.order!==1" @click="changeOrder('up', item.order)">👆</button>
      </div>
      <div class="sorting">
        <button v-if="item.order!==list.length" @click="changeOrder('down', item.order)">👇</button>
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
      <div class="sorting">@</div>
      <div class="sorting">@</div>
    </div>
    <hr>
    <div class="item">
      <div class="text">@</div>
      <div class="progress-bar">@</div>
      <div class="progress">@</div>
      <div class="weight">@</div>
      <div class="proration">@</div>
      <div class="delete">
        <button @click="registerProgress">保存</button>
      </div>
      <div class="sorting">@</div>
      <div class="sorting">@</div>
    </div>
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

input[type=range],
progress {
  width: 150px;
}

.noborder {
  border: none;
}
</style>
