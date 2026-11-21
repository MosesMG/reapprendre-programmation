import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export type AccountPhoneStatus = 'loading' | 'ready' | 'unavailable'

export interface UseAccountPhoneResult {
  status: AccountPhoneStatus
  phone: string | null
  /** Renvoie `false` si l'enregistrement a échoué. `null` efface le numéro. */
  savePhone: (phone: string | null) => Promise<boolean>
}

/** Lit et modifie le numéro, facultatif, de la personne connectée. */
export function useAccountPhone(userId: string): UseAccountPhoneResult {
  const [status, setStatus] = useState<AccountPhoneStatus>('loading')
  const [phone, setPhone] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      if (!supabase) {
        setStatus('unavailable')
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('phone')
        .eq('user_id', userId)
        .single()

      if (cancelled) {
        return
      }

      setPhone(error ? null : (data.phone as string | null))
      setStatus(error ? 'unavailable' : 'ready')
    }

    setStatus('loading')
    void load()

    return () => {
      cancelled = true
    }
  }, [userId])

  const savePhone = useCallback(
    async (next: string | null) => {
      if (!supabase) {
        return false
      }

      // `single` fait échouer une mise à jour qui ne toucherait aucune ligne.
      const { error } = await supabase
        .from('profiles')
        .update({ phone: next })
        .eq('user_id', userId)
        .select('phone')
        .single()

      if (!error) {
        setPhone(next)
      }

      return !error
    },
    [userId],
  )

  return { status, phone, savePhone }
}
