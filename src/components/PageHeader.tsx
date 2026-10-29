import type { Theme } from '../types/theme'
import { ThemeToggle } from './ThemeToggle'
import { LogoIcon, SparkIcon } from './icons'

interface PageHeaderProps {
  stepCount: number
  theme: Theme
  onToggleTheme: () => void
}

export function PageHeader({
  stepCount,
  theme,
  onToggleTheme,
}: PageHeaderProps) {
  const highlights = [
    { label: 'Étapes', value: String(stepCount) },
    { label: 'Rythme', value: '45 min/jour' },
    { label: 'Cap', value: 'Projets' },
  ] as const

  return (
    <header className="relative">
      <div className="mx-auto w-full max-w-4xl px-6 pt-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-violet-500/15 text-cyan-700 ring-1 ring-inset ring-line dark:from-cyan-400/20 dark:to-violet-500/20 dark:text-cyan-200">
              <LogoIcon className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight text-ink">
                Parcours dev
              </p>
              <p className="text-[11px] text-ink-subtle">
                Feuille de route personnelle
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink-muted sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.7)] dark:bg-emerald-400" />
              {stepCount} étapes
            </span>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl px-6 pb-12 pt-16 text-center sm:pb-16 sm:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-ink-muted">
          <SparkIcon className="h-3.5 w-3.5 text-violet-500 dark:text-violet-300" />
          Apprendre autrement
        </span>

        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-6xl">
          Réapprendre à{' '}
          <span className="bg-gradient-to-r from-cyan-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-cyan-300 dark:via-violet-300 dark:to-fuchsia-300">
            programmer
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
          Un parcours structuré et progressif pour repartir sur de bonnes bases,
          sans se disperser.
        </p>

        <dl className="mx-auto mt-9 grid max-w-md grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-surface py-4 backdrop-blur-sm">
          {highlights.map(({ label, value }) => (
            <div key={label} className="px-2 text-center">
              <dt className="text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
                {label}
              </dt>
              <dd className="mt-1.5 text-xs font-medium text-ink sm:text-sm">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  )
}
