import type { StepAccent } from '../types/roadmap'

export interface AccentClasses {
  text: string
  dot: string
  bar: string
  chip: string
  node: string
  glow: string
}

/**
 * Classes Tailwind associées à chaque accent, déclinées pour les deux thèmes.
 * Elles restent statiques pour que le compilateur puisse les détecter.
 */
export const accentClasses: Record<StepAccent, AccentClasses> = {
  sky: {
    text: 'text-sky-600 dark:text-sky-300',
    dot: 'bg-sky-500 dark:bg-sky-400',
    bar: 'from-sky-500/80 to-sky-500/0 dark:from-sky-400/90 dark:to-sky-400/0',
    chip: 'bg-sky-500/10 text-sky-700 ring-sky-500/20 dark:bg-sky-400/10 dark:text-sky-200 dark:ring-sky-400/25',
    node: 'border-sky-500/40 text-sky-700 dark:border-sky-400/40 dark:text-sky-200',
    glow: 'hover:shadow-xl hover:shadow-sky-500/15',
  },
  indigo: {
    text: 'text-indigo-600 dark:text-indigo-300',
    dot: 'bg-indigo-500 dark:bg-indigo-400',
    bar: 'from-indigo-500/80 to-indigo-500/0 dark:from-indigo-400/90 dark:to-indigo-400/0',
    chip: 'bg-indigo-500/10 text-indigo-700 ring-indigo-500/20 dark:bg-indigo-400/10 dark:text-indigo-200 dark:ring-indigo-400/25',
    node: 'border-indigo-500/40 text-indigo-700 dark:border-indigo-400/40 dark:text-indigo-200',
    glow: 'hover:shadow-xl hover:shadow-indigo-500/15',
  },
  violet: {
    text: 'text-violet-600 dark:text-violet-300',
    dot: 'bg-violet-500 dark:bg-violet-400',
    bar: 'from-violet-500/80 to-violet-500/0 dark:from-violet-400/90 dark:to-violet-400/0',
    chip: 'bg-violet-500/10 text-violet-700 ring-violet-500/20 dark:bg-violet-400/10 dark:text-violet-200 dark:ring-violet-400/25',
    node: 'border-violet-500/40 text-violet-700 dark:border-violet-400/40 dark:text-violet-200',
    glow: 'hover:shadow-xl hover:shadow-violet-500/15',
  },
  fuchsia: {
    text: 'text-fuchsia-600 dark:text-fuchsia-300',
    dot: 'bg-fuchsia-500 dark:bg-fuchsia-400',
    bar: 'from-fuchsia-500/80 to-fuchsia-500/0 dark:from-fuchsia-400/90 dark:to-fuchsia-400/0',
    chip: 'bg-fuchsia-500/10 text-fuchsia-700 ring-fuchsia-500/20 dark:bg-fuchsia-400/10 dark:text-fuchsia-200 dark:ring-fuchsia-400/25',
    node: 'border-fuchsia-500/40 text-fuchsia-700 dark:border-fuchsia-400/40 dark:text-fuchsia-200',
    glow: 'hover:shadow-xl hover:shadow-fuchsia-500/15',
  },
  rose: {
    text: 'text-rose-600 dark:text-rose-300',
    dot: 'bg-rose-500 dark:bg-rose-400',
    bar: 'from-rose-500/80 to-rose-500/0 dark:from-rose-400/90 dark:to-rose-400/0',
    chip: 'bg-rose-500/10 text-rose-700 ring-rose-500/20 dark:bg-rose-400/10 dark:text-rose-200 dark:ring-rose-400/25',
    node: 'border-rose-500/40 text-rose-700 dark:border-rose-400/40 dark:text-rose-200',
    glow: 'hover:shadow-xl hover:shadow-rose-500/15',
  },
  amber: {
    text: 'text-amber-600 dark:text-amber-300',
    dot: 'bg-amber-500 dark:bg-amber-400',
    bar: 'from-amber-500/80 to-amber-500/0 dark:from-amber-400/90 dark:to-amber-400/0',
    chip: 'bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:bg-amber-400/10 dark:text-amber-200 dark:ring-amber-400/25',
    node: 'border-amber-500/40 text-amber-700 dark:border-amber-400/40 dark:text-amber-200',
    glow: 'hover:shadow-xl hover:shadow-amber-500/15',
  },
  emerald: {
    text: 'text-emerald-600 dark:text-emerald-300',
    dot: 'bg-emerald-500 dark:bg-emerald-400',
    bar: 'from-emerald-500/80 to-emerald-500/0 dark:from-emerald-400/90 dark:to-emerald-400/0',
    chip: 'bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:bg-emerald-400/10 dark:text-emerald-200 dark:ring-emerald-400/25',
    node: 'border-emerald-500/40 text-emerald-700 dark:border-emerald-400/40 dark:text-emerald-200',
    glow: 'hover:shadow-xl hover:shadow-emerald-500/15',
  },
}
