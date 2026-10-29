import type { RoadmapStep } from '../types/roadmap'
import { accentClasses } from '../lib/accent'
import { cn } from '../lib/cn'
import { StepDetails } from './StepDetails'
import { ChevronDownIcon } from './icons'

interface StepCardProps {
  step: RoadmapStep
  index: number
  expanded: boolean
  onToggle: (id: number) => void
}

export function StepCard({ step, index, expanded, onToggle }: StepCardProps) {
  const styles = accentClasses[step.accent]
  const stepNumber = String(step.id).padStart(2, '0')
  const detailsId = `step-details-${step.id}`
  const titleId = `step-title-${step.id}`

  return (
    <li
      className="animate-fade-up relative pl-10 sm:pl-16"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute left-4 top-5 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border bg-node font-mono text-[11px] font-medium transition-all duration-300 sm:left-6 sm:top-6',
          styles.node,
          expanded && 'scale-110 shadow-lg shadow-black/40',
        )}
      >
        {stepNumber}
      </span>

      <article
        className={cn(
          'relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300',
          expanded
            ? 'border-line-strong bg-surface-strong shadow-card'
            : 'border-line bg-surface hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-hover',
          !expanded && styles.glow,
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b transition-opacity duration-300',
            styles.bar,
            expanded ? 'opacity-100' : 'opacity-60',
          )}
        />

        <button
          type="button"
          onClick={() => onToggle(step.id)}
          aria-expanded={expanded}
          aria-controls={detailsId}
          className="w-full cursor-pointer rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-500/60 dark:focus-visible:ring-cyan-400/60"
        >
          <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
            <div className="min-w-0">
              <div className="mb-2.5 flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">
                  Étape {stepNumber}
                </span>
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset',
                    styles.chip,
                  )}
                >
                  {step.tag}
                </span>
              </div>

              <h2
                id={titleId}
                className="text-base font-semibold tracking-tight text-ink sm:text-lg"
              >
                {step.title}
              </h2>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-muted">
                {step.description}
              </p>
            </div>

            <span
              aria-hidden="true"
              className={cn(
                'mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full border border-line bg-surface text-ink-subtle transition-all duration-300',
                expanded && 'rotate-180 border-line-strong text-ink',
              )}
            >
              <ChevronDownIcon className="h-4 w-4" />
            </span>
          </div>
        </button>

        <div
          id={detailsId}
          role="region"
          aria-labelledby={titleId}
          aria-hidden={!expanded}
          className={cn(
            'grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
            expanded
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0',
          )}
        >
          <div className="overflow-hidden">
            <StepDetails details={step.details} accent={step.accent} />
          </div>
        </div>
      </article>
    </li>
  )
}
