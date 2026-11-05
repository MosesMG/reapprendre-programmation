import type { StepAccent } from '../types/roadmap'
import { accentClasses } from '../lib/accent'
import { cn } from '../lib/cn'
import { CheckIcon } from './icons'

interface TaskCheckboxProps {
  label: string
  accent: StepAccent
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
}

export function TaskCheckbox({
  label,
  accent,
  checked,
  disabled = false,
  onChange,
}: TaskCheckboxProps) {
  return (
    <label
      className={cn(
        'relative flex min-h-11 items-start gap-3 py-2.5',
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="peer absolute h-5.5 w-5.5 cursor-[inherit] opacity-0"
      />
      <span
        aria-hidden="true"
        className={cn(
          'flex h-5.5 w-5.5 flex-none items-center justify-center rounded-md border-[1.5px] border-ink-subtle transition-colors peer-checked:[&>svg]:opacity-100 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent',
          accentClasses[accent].check,
        )}
      >
        <CheckIcon className="h-3.5 w-3.5 opacity-0" strokeWidth={3} />
      </span>
      <span
        className={cn(
          'text-sm leading-[22px]',
          checked ? 'text-ink-muted' : 'text-ink',
        )}
      >
        {label}
      </span>
    </label>
  )
}
