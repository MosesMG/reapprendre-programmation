import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { AuthStatus } from './useAuth'

const STORAGE_KEY = 'tuto-code-progress'
const TABLE = 'task_progress'
const TASK_ID_PATTERN = /^[a-z0-9-]{1,64}$/

export type ProgressStatus = 'loading' | 'ready' | 'unavailable'

export interface UseProgressResult {
  status: ProgressStatus
  saveFailed: boolean
  isDone: (taskId: string) => boolean
  setTaskDone: (taskId: string, done: boolean) => void
}

function readLocalIds(): string[] {
  try {
    const parsed: unknown = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) ?? '[]',
    )

    return Array.isArray(parsed)
      ? parsed.filter(
          (id): id is string =>
            typeof id === 'string' && TASK_ID_PATTERN.test(id),
        )
      : []
  } catch {
    // Contenu illisible ou localStorage indisponible (navigation privée, etc.).
    return []
  }
}

function writeLocalIds(ids: ReadonlySet<string>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
    return true
  } catch {
    return false
  }
}

function clearLocalIds() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Rien à effacer si localStorage est indisponible.
  }
}

/** Ajoute au compte les coches locales, puis charge toute sa progression. */
async function loadAccountIds(userId: string): Promise<string[]> {
  if (!supabase) {
    throw new Error('Supabase n’est pas configuré.')
  }

  const localIds = readLocalIds()

  if (localIds.length > 0) {
    const { error } = await supabase.from(TABLE).upsert(
      localIds.map((task_id) => ({ user_id: userId, task_id })),
      { onConflict: 'user_id,task_id', ignoreDuplicates: true },
    )

    if (error) {
      throw error
    }

    // Effacées seulement une fois enregistrées : rien n'est perdu en cas d'échec.
    clearLocalIds()
  }

  const { data, error } = await supabase.from(TABLE).select('task_id')

  if (error) {
    throw error
  }

  return data.map((row) => row.task_id as string)
}

async function saveAccountTask(userId: string, taskId: string, done: boolean) {
  if (!supabase) {
    throw new Error('Supabase n’est pas configuré.')
  }

  const { error } = done
    ? await supabase
        .from(TABLE)
        .upsert(
          { user_id: userId, task_id: taskId },
          { onConflict: 'user_id,task_id', ignoreDuplicates: true },
        )
    : await supabase
        .from(TABLE)
        .delete()
        .eq('user_id', userId)
        .eq('task_id', taskId)

  if (error) {
    throw error
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
 * Conserve les objectifs terminés dans le compte de la personne connectée, ou
 * dans ce navigateur (localStorage) sans compte.
 */
export function useProgress(
  authStatus: AuthStatus,
  userId: string | null,
): UseProgressResult {
  const [doneIds, setDoneIds] = useState<ReadonlySet<string>>(() => new Set())
  const [status, setStatus] = useState<ProgressStatus>('loading')
  const [saveFailed, setSaveFailed] = useState(false)
  const saveQueue = useRef<Promise<void>>(Promise.resolve())
  const currentUserId = useRef(userId)
  currentUserId.current = userId

  useEffect(() => {
    let cancelled = false

    setStatus('loading')
    setSaveFailed(false)
    setDoneIds(new Set())

    if (authStatus === 'loading') {
      return
    }

    if (!userId) {
      setDoneIds(new Set(readLocalIds()))
      setStatus('ready')
      return
    }

    loadAccountIds(userId)
      .then((ids) => {
        if (!cancelled) {
          setDoneIds(new Set(ids))
          setStatus('ready')
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus('unavailable')
        }
      })

    return () => {
      cancelled = true
    }
  }, [authStatus, userId])

  const isDone = useCallback((taskId: string) => doneIds.has(taskId), [doneIds])

  const setTaskDone = useCallback(
    (taskId: string, done: boolean) => {
      if (!userId) {
        const saved = writeLocalIds(withTask(new Set(readLocalIds()), taskId, done))
        setDoneIds((current) => withTask(current, taskId, done))
        setSaveFailed(!saved)
        return
      }

      setDoneIds((current) => withTask(current, taskId, done))

      // Les envois restent dans l'ordre des clics.
      saveQueue.current = saveQueue.current.then(async () => {
        try {
          await saveAccountTask(userId, taskId, done)

          if (currentUserId.current === userId) {
            setSaveFailed(false)
          }
        } catch {
          // La personne a pu se déconnecter entre-temps : ne pas toucher à
          // l'affichage d'un autre compte.
          if (currentUserId.current === userId) {
            setDoneIds((current) => withTask(current, taskId, !done))
            setSaveFailed(true)
          }
        }
      })
    },
    [userId],
  )

  return { status, saveFailed, isDone, setTaskDone }
}
