export type Todo = {
  id: number;
  text: string;
  progress: number;
  weight: WeightType;
};

export type Weight = { value: number; text: string };

const WeightType = {
  Low: 1,
  Midium: 3,
  High: 5,
} as const;

export type WeightType = typeof WeightType[keyof typeof WeightType];
