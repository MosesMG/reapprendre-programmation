import type { Principle } from '../types/roadmap'
import { accentClasses } from '../lib/accent'
import { cn } from '../lib/cn'

interface PrinciplesSectionProps {
  principles: readonly Principle[]
}

export function PrinciplesSection({ principles }: PrinciplesSectionProps) {
  return (
    <section aria-labelledby="principles-title">
      <h2
        id="principles-title"
        className="text-xl font-semibold tracking-tight text-ink"
      >
        À garder en tête
      </h2>

      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {principles.map((principle) => (
          <li
            key={principle.id}
            className="rounded-2xl border border-line bg-surface p-5 backdrop-blur-sm"
          >
            <h3 className="flex items-center gap-2 text-sm font-semibold tracking-tight text-ink">
              <span
                aria-hidden="true"
                className={cn(
                  'h-1.5 w-1.5 flex-none rounded-full',
                  accentClasses[principle.accent].dot,
                )}
              />
              {principle.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {principle.text}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
