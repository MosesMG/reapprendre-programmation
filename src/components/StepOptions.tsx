import { useState } from 'react'
import type { StepOption } from '../types/roadmap'
import { cn } from '../lib/cn'
import { ChevronDownIcon } from './icons'

interface StepOptionsProps {
  options: readonly StepOption[]
}

/** Liste de choix dont un seul reste déroulé, pour comparer sans se perdre. */
export function StepOptions({ options }: StepOptionsProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <ul className="border-t border-line">
      {options.map((option) => {
        const open = option.id === openId
        const panelId = `option-panel-${option.id}`

        return (
          <li key={option.id} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpenId(open ? null : option.id)}
              aria-expanded={open}
              aria-controls={panelId}
              className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 px-1 py-1.5 text-left transition-colors outline-none hover:bg-surface-hover focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
            >
              <span className="min-w-0">
                <span className="font-semibold text-ink">{option.label}</span>{' '}
                <span className="text-[13px] text-ink-muted">
                  · {option.stack}
                </span>
              </span>
              <ChevronDownIcon
                className={cn(
                  'h-4 w-4 flex-none transition-transform duration-300',
                  open && 'rotate-180',
                )}
              />
            </button>

            <div
              id={panelId}
              {...(!open && { inert: '' })}
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
                open
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <div className="space-y-2 px-1 pb-4 pt-1">
                  <p>{option.summary}</p>
                  <p>
                    <span className="font-semibold text-ink">Pour toi si : </span>
                    {option.fit}
                  </p>
                  <div>
                    <p className="font-semibold text-ink">
                      Premières sous-étapes
                    </p>
                    <ol className="mt-1 list-decimal space-y-0.5 pl-5">
                      {option.firstSteps.map((firstStep) => (
                        <li key={firstStep}>{firstStep}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
