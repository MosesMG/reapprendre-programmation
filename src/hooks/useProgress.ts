import { useCallback, useEffect, useRef, useState } from 'react'

const API_PATH = '/api/progress'

export type ProgressStatus = 'loading' | 'ready' | 'unavailable'

export interface UseProgressResult {
  status: ProgressStatus
  saveFailed: boolean
  isDone: (taskId: string) => boolean
  setTaskDone: (taskId: string, done: boolean) => void
}

async function fetchDoneTaskIds(signal: AbortSignal): Promise<string[]> {
  const response = await fetch(API_PATH, { signal })

  if (!response.ok) {
    throw new Error(`Lecture impossible (HTTP ${response.status}).`)
  }

  const { doneTaskIds } = (await response.json()) as { doneTaskIds: string[] }
  return doneTaskIds
}

async function saveTask(taskId: string, done: boolean) {
  const response = await fetch(API_PATH, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ taskId, done }),
  })

  if (!response.ok) {
    throw new Error(`Enregistrement impossible (HTTP ${response.status}).`)
  }
}

function withTask(
  ids: ReadonlySet<string>,
  taskId: string,
  done: boolean,
): ReadonlySet<string> {
  const next = new Set(ids)

  if (done) {
    next.add(taskId)
  } else {
    next.delete(taskId)
  }

  return next
}

/**
 * Charge et enregistre les objectifs terminés via l'API du serveur Vite,
 * qui les conserve dans data/progress.json.
 */
export function useProgress(): UseProgressResult {
  const [doneIds, setDoneIds] = useState<ReadonlySet<string>>(() => new Set())
  const [status, setStatus] = useState<ProgressStatus>('loading')
  const [saveFailed, setSaveFailed] = useState(false)
  const saveQueue = useRef<Promise<void>>(Promise.resolve())

  useEffect(() => {
    const controller = new AbortController()

    fetchDoneTaskIds(controller.signal)
      .then((ids) => {
        setDoneIds(new Set(ids))
        setStatus('ready')
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setStatus('unavailable')
        }
      })

    return () => controller.abort()
  }, [])

  const isDone = useCallback((taskId: string) => doneIds.has(taskId), [doneIds])

  const setTaskDone = useCallback((taskId: string, done: boolean) => {
    setDoneIds((current) => withTask(current, taskId, done))

    // Les envois restent dans l'ordre des clics.
    saveQueue.current = saveQueue.current.then(async () => {
      try {
        await saveTask(taskId, done)
        setSaveFailed(false)
      } catch {
        setDoneIds((current) => withTask(current, taskId, !done))
        setSaveFailed(true)
      }
    })
  }, [])

  return { status, saveFailed, isDone, setTaskDone }
}
