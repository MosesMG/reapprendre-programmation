import type { RoadmapStep } from '../types/roadmap'
import { useExpandedSteps } from '../hooks/useExpandedSteps'
import { RoadmapToolbar } from './RoadmapToolbar'
import { StepCard } from './StepCard'

interface RoadmapSectionProps {
  steps: readonly RoadmapStep[]
}

export function RoadmapSection({ steps }: RoadmapSectionProps) {
  const {
    expandedCount,
    isExpanded,
    toggle,
    expandAll,
    collapseAll,
  } = useExpandedSteps(steps[0] ? [steps[0].id] : [])

  const allExpanded = expandedCount === steps.length

  return (
    <section aria-labelledby="roadmap-title">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2
            id="roadmap-title"
            className="text-sm font-semibold tracking-tight text-ink"
          >
            Les étapes du parcours
          </h2>
          <p className="mt-1 text-xs text-ink-subtle">
            Clique sur une carte pour explorer les détails.
          </p>
        </div>
      </div>

      <RoadmapToolbar
        expandedCount={expandedCount}
        total={steps.length}
        allExpanded={allExpanded}
        onExpandAll={() => expandAll(steps.map((step) => step.id))}
        onCollapseAll={collapseAll}
      />

      <div className="relative mt-5">
        <div
          aria-hidden="true"
          className="absolute bottom-5 left-4 top-5 w-px bg-gradient-to-b from-line-strong via-line to-transparent sm:left-6"
        />
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index}
              expanded={isExpanded(step.id)}
              onToggle={toggle}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}
