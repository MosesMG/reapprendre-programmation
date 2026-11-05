import type { RoadmapStep } from '../types/roadmap'
import { accentClasses } from '../lib/accent'
import { cn } from '../lib/cn'
import { StepDetails } from './StepDetails'
import { CheckIcon, ChevronDownIcon } from './icons'

interface StepCardProps {
  step: RoadmapStep
  index: number
  isCurrent: boolean
  isLast: boolean
  expanded: boolean
  onToggle: (id: number) => void
  tasksEnabled: boolean
  isTaskDone: (taskId: string) => boolean
  onTaskChange: (taskId: string, done: boolean) => void
}

export function StepCard({
  step,
  index,
  isCurrent,
  isLast,
  expanded,
  onToggle,
  tasksEnabled,
  isTaskDone,
  onTaskChange,
}: StepCardProps) {
  const styles = accentClasses[step.accent]
  const detailsId = `step-details-${step.id}`
  const titleId = `step-title-${step.id}`
  const metaId = `step-meta-${step.id}`
  const taskCount = step.tasks.length
  const doneCount = step.tasks.filter((task) => isTaskDone(task.id)).length
  const completed = taskCount > 0 && doneCount === taskCount
  const stateLabel = completed ? ', terminée' : isCurrent ? ', en cours' : ''

  return (
    <li
      className="animate-fade-up flex gap-3 sm:gap-4"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div aria-hidden="true" className="flex w-8 flex-none flex-col items-center">
        <span
          className={cn(
            'mt-5 flex h-8 w-8 flex-none items-center justify-center rounded-full border-[1.5px] font-mono text-[13px] font-medium transition-all duration-300',
            completed ? styles.nodeDone : cn('bg-node', styles.node),
            isCurrent && 'scale-110 shadow-lg shadow-black/10 dark:shadow-black/40',
          )}
        >
          {completed ? (
            <CheckIcon className="h-4 w-4" strokeWidth={3} />
          ) : (
            step.id
          )}
        </span>
        {!isLast && (
          <span
            className={cn(
              'w-0.5 flex-1 transition-colors duration-300',
              completed ? styles.rail : 'bg-line',
            )}
          />
        )}
      </div>

      <div className="min-w-0 flex-1 pb-4">
        <article
          className={cn(
            'relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300',
            expanded
              ? 'border-line-strong bg-surface-strong shadow-card'
              : cn(
                  'border-line bg-surface hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-hover',
                  styles.glow,
                ),
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

          {/* Le ::after du bouton couvre tout l'en-tête : la zone reste cliquable
              sans placer de titre ni de paragraphe dans le bouton. */}
          <div className="relative flex items-start justify-between gap-4 p-4 sm:p-5">
            <div className="min-w-0">
              <span
                className={cn(
                  'mb-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset',
                  styles.chip,
                )}
              >
                {step.tag}
              </span>
              <h3
                id={titleId}
                className={cn(
                  'text-base font-semibold tracking-tight sm:text-lg',
                  completed ? 'text-ink-muted' : 'text-ink',
                )}
              >
                <button
                  type="button"
                  onClick={() => onToggle(step.id)}
                  aria-expanded={expanded}
                  aria-controls={detailsId}
                  aria-describedby={metaId}
                  className="cursor-pointer text-left outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-accent"
                >
                  {step.title}
                </button>
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                {step.description}
              </p>
            </div>

            <div className="flex flex-none items-center gap-3 text-ink-muted">
              <span id={metaId} className="font-mono text-[13px]">
                <span aria-hidden="true">
                  {doneCount}/{taskCount}
                </span>
                <span className="sr-only">
                  Étape {step.id}
                  {stateLabel}, {doneCount} objectifs terminés sur {taskCount}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface transition-all duration-300',
                  expanded && 'rotate-180 border-line-strong text-ink',
                )}
              >
                <ChevronDownIcon className="h-4 w-4" />
              </span>
            </div>
          </div>

          <div
            id={detailsId}
            role="region"
            aria-labelledby={titleId}
            {...(!expanded && { inert: '' })}
            className={cn(
              'grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
              expanded
                ? 'grid-rows-[1fr] opacity-100'
                : 'grid-rows-[0fr] opacity-0',
            )}
          >
            <div className="overflow-hidden">
              <StepDetails
                stepId={step.id}
                accent={step.accent}
                tasks={step.tasks}
                details={step.details}
                tasksEnabled={tasksEnabled}
                isTaskDone={isTaskDone}
                onTaskChange={onTaskChange}
              />
            </div>
          </div>
        </article>
      </div>
    </li>
  )
}
