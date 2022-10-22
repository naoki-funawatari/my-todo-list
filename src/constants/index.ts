import { Todo, WeightTypes } from "../types"

export const todoDefaults: Todo[] = [
  {
    id: 1,
    text: "テスト 1",
    progress: 60,
    weight: WeightTypes.Low,
    order: 1,
  },
  {
    id: 2,
    text: "テスト 2",
    progress: 45,
    weight: WeightTypes.Medium,
    order: 2,
  },
  {
    id: 3,
    text: "テスト 3",
    progress: 0,
    weight: WeightTypes.High,
    order: 3,
  },
  {
    id: 4,
    text: "テスト 4",
    progress: 90,
    weight: WeightTypes.Low,
    order: 4,
  },
  {
    id: 5,
    text: "テスト 5",
    progress: 35,
    weight: WeightTypes.High,
    order: 5,
  },
  {
    id: 6,
    text: "テスト 6",
    progress: 60,
    weight: WeightTypes.Medium,
    order: 6,
  },
]
