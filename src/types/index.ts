import { WeightTypes } from "src/constants"

export interface Todo {
  id: number
  text: string
  progress: number
  weight: WeightType
  order: number
}

export type WeightType = typeof WeightTypes[keyof typeof WeightTypes]
