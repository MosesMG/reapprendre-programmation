import { useEffect, useState } from 'react'
import type { EmailOtpType } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export interface EmailConfirmationResult {
  ok: boolean
  message: string
}

const CONFIRMATION_TYPES: readonly string[] = ['email', 'signup']

let verification: Promise<EmailConfirmationResult> | null | undefined

/**
 * Lit le lien de confirmation (`?token_hash=…&type=email`, voir
 * `supabase/templates/confirm-signup.html`) puis le retire de la barre d'adresse.
 * Une seule fois par chargement : un lien ne peut servir qu'une fois, et le
 * mode strict de React lance les effets deux fois.
 */
function verifyLinkOnce() {
  if (verification !== undefined) {
    return verification
  }

  const url = new URL(window.location.href)
  const tokenHash = url.searchParams.get('token_hash')
  const type = url.searchParams.get('type')

  if (!tokenHash || !type || !CONFIRMATION_TYPES.includes(type)) {
    verification = null
    return verification
  }

  url.searchParams.delete('token_hash')
  url.searchParams.delete('type')
  window.history.replaceState(window.history.state, '', url)

  verification = verify(tokenHash, type as EmailOtpType)
  return verification
}

async function verify(
  tokenHash: string,
  type: EmailOtpType,
): Promise<EmailConfirmationResult> {
  if (!supabase) {
    return { ok: false, message: 'Les comptes ne sont pas configurés sur ce site.' }
  }

  const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type })

  if (!error) {
    return {
      ok: true,
      message: 'Bienvenue ! Ton adresse est confirmée et ta session est ouverte.',
    }
  }

  if (error.code === 'otp_expired') {
    return {
      ok: false,
      message:
        'Ce lien de confirmation a expiré ou a déjà servi. Connecte-toi : si ton adresse n’est pas encore confirmée, tu pourras demander un nouveau lien.',
    }
  }

  return {
    ok: false,
    message: 'La confirmation de ton adresse a échoué. Réessaie dans un moment.',
  }
}

/** Résultat du lien de confirmation ouvert depuis l'e-mail, s'il y en a un. */
export function useEmailConfirmation() {
  const [result, setResult] = useState<EmailConfirmationResult | null>(null)

  useEffect(() => {
    let active = true

    void verifyLinkOnce()?.then((value) => {
      if (active) {
        setResult(value)
      }
    })

    return () => {
      active = false
    }
  }, [])

  return { result, dismiss: () => setResult(null) }
}
