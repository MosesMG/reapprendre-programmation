import type { ProgressStatus } from '../hooks/useProgress'
import type { Theme } from '../types/theme'
import { ThemeToggle } from './ThemeToggle'
import { LogoIcon, SparkIcon } from './icons'

interface PageHeaderProps {
  status: ProgressStatus
  doneCount: number
  total: number
  theme: Theme
  onToggleTheme: () => void
}

export function PageHeader({
  status,
  doneCount,
  total,
  theme,
  onToggleTheme,
}: PageHeaderProps) {
  const progress = total === 0 ? 0 : Math.round((doneCount / total) * 100)

  return (
    <header className="mx-auto w-full max-w-4xl px-6 pb-9 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-violet-500/15 text-cyan-700 ring-1 ring-inset ring-line dark:from-cyan-400/20 dark:to-violet-500/20 dark:text-cyan-200">
            <LogoIcon className="h-5 w-5" />
          </span>
          <p className="text-sm font-semibold tracking-tight text-ink">
            Parcours dev
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[13px] text-ink-muted">
              {status === 'ready' ? doneCount : '–'}/{total} objectifs
            </span>
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={doneCount}
              aria-label="Objectifs terminés"
              className="h-1.5 w-24 overflow-hidden rounded-full bg-progress-track sm:w-40"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>

      <div className="mt-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-ink-muted">
          <SparkIcon className="h-3.5 w-3.5 text-violet-500 dark:text-violet-300" />
          Apprendre autrement
        </span>

        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">
          Réapprendre à{' '}
          <span className="bg-gradient-to-r from-cyan-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-cyan-300 dark:via-violet-300 dark:to-fuchsia-300">
            programmer
          </span>
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-pretty text-[15px] leading-relaxed text-ink-muted sm:text-base">
          Un parcours structuré et progressif pour repartir sur de bonnes bases,
          sans se disperser.
        </p>
      </div>
    </header>
  )
}
