import type { StepDetail, StepAccent } from '../types/roadmap'
import { accentClasses } from '../lib/accent'
import { cn } from '../lib/cn'

interface StepDetailsProps {
  details: readonly StepDetail[]
  accent: StepAccent
}

export function StepDetails({ details, accent }: StepDetailsProps) {
  const styles = accentClasses[accent]

  return (
    <div className="border-t border-line px-5 pb-6 pt-5 sm:px-6">
      <dl className="space-y-5">
        {details.map((detail) => (
          <div key={detail.subtitle}>
            <dt className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-subtle">
              <span className={cn('h-1.5 w-1.5 rounded-full', styles.dot)} />
              {detail.subtitle}
            </dt>

            <dd className="mt-2.5 text-sm leading-relaxed text-ink-muted">
              {detail.text}

              {detail.list && (
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {detail.list.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 rounded-lg border border-line bg-surface-subtle px-3.5 py-2.5"
                    >
                      <span
                        className={cn(
                          'mt-1.5 h-1 w-1 flex-none rounded-full',
                          styles.dot,
                        )}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
