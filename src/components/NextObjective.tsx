import type { RoadmapStep, StepTask } from '../types/roadmap'
import { accentClasses } from '../lib/accent'
import { cn } from '../lib/cn'
import { ResourceLinks } from './ResourceLinks'

interface NextObjectiveProps {
  next: { task: StepTask; step: RoadmapStep } | null
}

const cardClasses =
  'relative overflow-hidden rounded-2xl border border-line-strong bg-surface-strong p-5 pl-6 shadow-card backdrop-blur-sm sm:p-6 sm:pl-7'

export function NextObjective({ next }: NextObjectiveProps) {
  if (!next) {
    return (
      <section className={cardClasses}>
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          Parcours terminé. Il ne reste qu’à continuer à pratiquer.
        </h2>
      </section>
    )
  }

  const { task, step } = next
  const styles = accentClasses[step.accent]
  const resources = step.details.find((detail) => detail.links)

  return (
    <section
      aria-labelledby="next-title"
      className={cn(cardClasses, 'flex flex-col gap-3.5')}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b',
          styles.bar,
        )}
      />

      <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-[13px]">
        <h2 id="next-title" className={cn('font-semibold', styles.text)}>
          Prochain objectif
        </h2>
        <p className="text-ink-muted">
          Étape {step.id} · {step.title}
        </p>
      </div>

      <p className="text-xl font-semibold leading-tight tracking-tight text-ink sm:text-2xl">
        {task.label}
      </p>

      {resources?.links && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="text-[13px] text-ink-muted">{resources.subtitle}</p>
          <ResourceLinks links={resources.links} />
        </div>
      )}
    </section>
  )
}
