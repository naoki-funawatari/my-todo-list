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

const WeightTypeA = {
  Low: 1,
  Midium: 3,
  High: 5
} as const

export type WeightType = typeof WeightTypeA[keyof typeof WeightTypeA]
