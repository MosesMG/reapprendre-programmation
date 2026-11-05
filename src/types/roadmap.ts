export type StepAccent =
  | 'sky'
  | 'indigo'
  | 'violet'
  | 'fuchsia'
  | 'rose'
  | 'amber'
  | 'emerald'

export interface StepLink {
  label: string
  url: string
}

export interface StepOption {
  id: string
  label: string
  stack: string
  summary: string
  fit: string
  firstSteps: readonly string[]
}

export interface StepDetail {
  subtitle: string
  text?: string
  options?: readonly StepOption[]
  links?: readonly StepLink[]
}

export interface StepTask {
  /** Identifiant enregistré dans data/progress.json : ne pas le renommer. */
  id: string
  label: string
}

export interface RoadmapStep {
  id: number
  title: string
  description: string
  tag: string
  accent: StepAccent
  tasks: readonly StepTask[]
  details: readonly StepDetail[]
}

export interface Principle {
  id: string
  title: string
  text: string
  accent: StepAccent
}
