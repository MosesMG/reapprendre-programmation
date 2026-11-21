import type { EmailConfirmationResult } from '../hooks/useEmailConfirmation'
import { cn } from '../lib/cn'
import { CloseIcon } from './icons'

interface EmailConfirmationNoticeProps {
  result: EmailConfirmationResult | null
  onDismiss: () => void
}

export function EmailConfirmationNotice({
  result,
  onDismiss,
}: EmailConfirmationNoticeProps) {
  if (!result) {
    return null
  }

  return (
    <div
      role={result.ok ? 'status' : 'alert'}
      className="flex items-start gap-3 rounded-xl border border-line-strong bg-surface px-4 py-3 text-sm"
    >
      <p
        className={cn(
          'flex-1',
          result.ok
            ? 'text-emerald-700 dark:text-emerald-300'
            : 'text-rose-700 dark:text-rose-300',
        )}
      >
        {result.message}
      </p>
      <button
        type="button"
        aria-label="Fermer le message"
        onClick={onDismiss}
        className="-m-1 grid size-7 shrink-0 cursor-pointer place-items-center rounded-md text-ink-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60"
      >
        <CloseIcon className="size-4" />
      </button>
    </div>
  )
}
