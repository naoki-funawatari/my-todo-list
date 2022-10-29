// https://pinia.vuejs.org/core-concepts/#setup-stores
import { computed, ref } from "vue"
import { defineStore } from "pinia"
import { Todo } from "src/types"
import { WeightTypes } from "src/constants"

export const useTodoListStore = defineStore("todoList", () => {
  const list = ref<Todo[]>([])
  const sorted = computed(() => list.value.sort((a, b) => a.order - b.order))

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
    newlist.forEach((o, i) => (o.order = i + 1))
    list.value = newlist
  }
  const changeOrder = (type: "up" | "down", currentOrder: number) => {
    let ordered = [...list.value]
    const index = ordered.findIndex(o => o.order === currentOrder)
    ordered[index].order += type === "up" ? -1.5 : 1.5
    ordered.sort((a, b) => a.order - b.order)
    ordered.forEach((o, i) => (o.order = i + 1))
    list.value = ordered
  }
  const registerProgress = () => {
    const value = JSON.stringify(list.value)
    localStorage.setItem("progress", value)
  }

  const proration = (
    progress: number,
    weight: number,
    trunc: boolean = false
  ) => {
    const totalWeight = list.value.reduce((a, b) => a + Number(b.weight), 0)
    const ratio = weight / totalWeight
    return trunc ? Math.trunc(progress * ratio) : progress * ratio
  }

  const overallProgress = computed(() => {
    const values = list.value.map(o => proration(o.progress, o.weight))
    const total = values.reduce((a, b) => a + b, 0)
    return Math.trunc(total)
  })

  return {
    list,
    sorted,
    addItem,
    deleteItem,
    changeOrder,
    registerProgress,
    proration,
    overallProgress,
  }
})
