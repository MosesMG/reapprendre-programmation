import { CollapseIcon, ExpandIcon } from './icons'

interface RoadmapToolbarProps {
  expandedCount: number
  total: number
  allExpanded: boolean
  onExpandAll: () => void
  onCollapseAll: () => void
}

export function RoadmapToolbar({
  expandedCount,
  total,
  allExpanded,
  onExpandAll,
  onCollapseAll,
}: RoadmapToolbarProps) {
  const progress = total === 0 ? 0 : Math.round((expandedCount / total) * 100)

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5">
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-4 text-[11px]">
          <span className="font-medium uppercase tracking-[0.18em] text-ink-subtle">
            Progression
          </span>
          <span className="font-mono text-ink-muted">
            {expandedCount}/{total}
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={expandedCount}
          aria-label="Étapes ouvertes"
          className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-progress-track"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={allExpanded ? onCollapseAll : onExpandAll}
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-line bg-surface px-3.5 py-2 text-xs font-medium text-ink transition-colors hover:border-line-strong hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 dark:focus-visible:ring-cyan-400/60"
      >
        {allExpanded ? (
          <CollapseIcon className="h-3.5 w-3.5" />
        ) : (
          <ExpandIcon className="h-3.5 w-3.5" />
        )}
        {allExpanded ? 'Tout replier' : 'Tout déplier'}
      </button>
    </div>
  )
}
