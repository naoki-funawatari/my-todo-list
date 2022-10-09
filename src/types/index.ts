export interface Todo {
  id: number
  text: string
  progress: number
  weight: WeightType
}

export interface Weight {
  value: number
  text: string
}

export const WeightTypes = {
  Low: 1,
  Medium: 3,
  High: 5,
} as const

export type WeightType = typeof WeightTypes[keyof typeof WeightTypes]
