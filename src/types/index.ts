export interface Todo {
  id: number
  text: string
  progress: number
  weight: WeightType
  order: number
}

export const WeightTypes = {
  Low: 1,
  Medium: 3,
  High: 5,
} as const

export type WeightType = typeof WeightTypes[keyof typeof WeightTypes]
