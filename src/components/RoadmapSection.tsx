import type { RoadmapStep } from '../types/roadmap'
import { useExpandedSteps } from '../hooks/useExpandedSteps'
import { StepCard } from './StepCard'
import { CollapseIcon, ExpandIcon } from './icons'

interface RoadmapSectionProps {
  steps: readonly RoadmapStep[]
  currentStepId: number | null
  tasksEnabled: boolean
  isTaskDone: (taskId: string) => boolean
  onTaskChange: (taskId: string, done: boolean) => void
}

export function RoadmapSection({
  steps,
  currentStepId,
  tasksEnabled,
  isTaskDone,
  onTaskChange,
}: RoadmapSectionProps) {
  const { allExpanded, isExpanded, toggle, expandAll, collapseAll } =
    useExpandedSteps(
      steps.map((step) => step.id),
      currentStepId,
    )

  return (
    <section aria-labelledby="roadmap-title">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2
          id="roadmap-title"
          className="text-xl font-semibold tracking-tight text-ink"
        >
          Le parcours
        </h2>
        <button
          type="button"
          onClick={allExpanded ? collapseAll : expandAll}
          className="inline-flex min-h-9 flex-none cursor-pointer items-center gap-2 rounded-lg border border-line px-3 text-[13px] font-medium text-ink transition-colors hover:border-line-strong hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {allExpanded ? (
            <CollapseIcon className="h-3.5 w-3.5" />
          ) : (
            <ExpandIcon className="h-3.5 w-3.5" />
          )}
          {allExpanded ? 'Tout replier' : 'Tout déplier'}
        </button>
      </div>

      <ol>
        {steps.map((step, index) => (
          <StepCard
            key={step.id}
            step={step}
            index={index}
            isCurrent={step.id === currentStepId}
            isLast={index === steps.length - 1}
            expanded={isExpanded(step.id)}
            onToggle={toggle}
            tasksEnabled={tasksEnabled}
            isTaskDone={isTaskDone}
            onTaskChange={onTaskChange}
          />
        ))}
      </ol>
    </section>
  )
}
