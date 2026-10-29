export type StepAccent =
  | 'sky'
  | 'indigo'
  | 'violet'
  | 'fuchsia'
  | 'rose'
  | 'amber'
  | 'emerald'

export interface StepDetail {
  subtitle: string
  text?: string
  list?: readonly string[]
}

export interface RoadmapStep {
  id: number
  title: string
  description: string
  tag: string
  accent: StepAccent
  details: readonly StepDetail[]
}
