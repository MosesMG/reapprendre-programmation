import type { ProgressStatus } from '../hooks/useProgress'

interface ProgressNoticeProps {
  status: ProgressStatus
  saveFailed: boolean
}

function getNotice(status: ProgressStatus, saveFailed: boolean) {
  if (status === 'unavailable') {
    return 'Impossible de charger la progression de ton compte. Réessaie dans un moment.'
  }

  return saveFailed ? 'La dernière coche n’a pas pu être enregistrée.' : null
}

export function ProgressNotice({ status, saveFailed }: ProgressNoticeProps) {
  return (
    <p
      role="status"
      className="rounded-xl border border-line-strong bg-surface px-4 py-3 text-sm text-rose-700 empty:hidden dark:text-rose-300"
    >
      {getNotice(status, saveFailed)}
    </p>
  )
}
