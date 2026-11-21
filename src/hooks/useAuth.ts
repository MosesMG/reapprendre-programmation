import { useCallback, useEffect, useState } from 'react'
import type { AuthError, Session } from '@supabase/supabase-js'
import {
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  isValidUsername,
  normalizeUsername,
} from '../lib/credentials'
import { supabase } from '../lib/supabase'

export type AuthStatus = 'loading' | 'signed-out' | 'signed-in'

export interface SignUpInput {
  username: string
  email: string
  password: string
}

export interface SignUpResult {
  error: string | null
  /** Le compte existe, mais attend le clic sur le lien reçu par e-mail. */
  needsEmailConfirmation: boolean
}

/** Sauf `signUp`, chaque action renvoie un message d'erreur, ou `null` si tout va bien. */
export interface UseAuthResult {
  enabled: boolean
  status: AuthStatus
  userId: string | null
  username: string | null
  email: string | null
  signIn: (email: string, password: string) => Promise<string | null>
  signUp: (input: SignUpInput) => Promise<SignUpResult>
  signOut: () => Promise<string | null>
  deleteAccount: () => Promise<string | null>
}

const NETWORK_ERROR =
  'Le service de comptes est injoignable. Réessaie dans un moment.'
const NOT_CONFIGURED = 'Les comptes ne sont pas configurés sur ce site.'

function describeAuthError(error: AuthError) {
  switch (error.code) {
    case 'invalid_credentials':
      return 'E-mail ou mot de passe incorrect.'
    case 'email_not_confirmed':
      return 'Confirme d’abord ton adresse avec le lien reçu par e-mail.'
    case 'user_already_exists':
    case 'email_exists':
      return 'Un compte existe déjà avec cette adresse.'
    case 'email_address_invalid':
      return 'Cette adresse e-mail n’est pas acceptée. Vérifie-la ou essaies-en une autre.'
    case 'weak_password':
      return 'Ce mot de passe est trop faible : choisis-en un plus long.'
    case 'over_request_rate_limit':
    case 'over_email_send_rate_limit':
      return 'Trop de tentatives. Réessaie dans quelques minutes.'
  }

  return error.status === 0 || !error.status
    ? NETWORK_ERROR
    : 'L’opération a échoué. Réessaie dans un moment.'
}

function readUsername(session: Session) {
  const username: unknown = session.user.user_metadata.username
  return typeof username === 'string' ? username : null
}

function signUpFailure(error: string): SignUpResult {
  return { error, needsEmailConfirmation: false }
}

/** Gère le compte connecté : nom d'utilisateur, e-mail et mot de passe. */
export function useAuth(): UseAuthResult {
  const [status, setStatus] = useState<AuthStatus>(
    supabase ? 'loading' : 'signed-out',
  )
  const [userId, setUserId] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase) {
      return
    }

    // Supabase envoie aussi la session existante au démarrage. Pas d'appel
    // Supabase attendu dans ce rappel : la documentation le déconseille.
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user.id ?? null)
      setUsername(session ? readUsername(session) : null)
      setEmail(session?.user.email ?? null)
      setStatus(session ? 'signed-in' : 'signed-out')
    })

    return () => data.subscription.unsubscribe()
  }, [])

  const signIn = useCallback(async (rawEmail: string, password: string) => {
    if (!supabase) {
      return NOT_CONFIGURED
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: rawEmail.trim(),
      password,
    })

    return error ? describeAuthError(error) : null
  }, [])

  const signUp = useCallback(async (input: SignUpInput) => {
    if (!supabase) {
      return signUpFailure(NOT_CONFIGURED)
    }

    const username = normalizeUsername(input.username)

    if (!isValidUsername(username)) {
      return signUpFailure(
        `Le nom doit contenir entre ${MIN_USERNAME_LENGTH} et ${MAX_USERNAME_LENGTH} caractères.`,
      )
    }

    if (input.password.length < MIN_PASSWORD_LENGTH) {
      return signUpFailure(
        `Le mot de passe doit contenir au moins ${MIN_PASSWORD_LENGTH} caractères.`,
      )
    }

    const { data, error } = await supabase.auth.signUp({
      email: input.email.trim(),
      password: input.password,
      options: {
        data: { username },
        emailRedirectTo: window.location.origin,
      },
    })

    if (error) {
      return signUpFailure(describeAuthError(error))
    }

    // Sans session, « Confirm email » est actif : le compte attend le lien.
    return { error: null, needsEmailConfirmation: !data.session }
  }, [])

  const signOut = useCallback(async () => {
    if (!supabase) {
      return null
    }

    const { error } = await supabase.auth.signOut({ scope: 'local' })
    return error ? describeAuthError(error) : null
  }, [])

  const deleteAccount = useCallback(async () => {
    if (!supabase) {
      return NOT_CONFIGURED
    }

    const { error } = await supabase.rpc('delete_own_account')

    if (error) {
      return 'La suppression a échoué. Réessaie dans un moment.'
    }

    await supabase.auth.signOut({ scope: 'local' })
    return null
  }, [])

  return {
    enabled: supabase !== null,
    status,
    userId,
    username,
    email,
    signIn,
    signUp,
    signOut,
    deleteAccount,
  }
}
