import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type { UseAuthResult } from '../hooks/useAuth'
import { ACCOUNT_HREF } from '../hooks/useHashRoute'
import {
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from '../lib/credentials'
import { cn } from '../lib/cn'
import { FormError } from './FormError'
import {
  INPUT_CLASS,
  PRIMARY_BUTTON_CLASS,
  SECONDARY_BUTTON_CLASS,
} from './formStyles'
import { CloseIcon, EyeIcon, EyeOffIcon } from './icons'

interface AccountControlProps {
  auth: UseAuthResult
}

type FormMode = 'sign-in' | 'sign-up'

const HEADER_CONTROL_CLASS =
  'inline-flex h-9 max-w-40 cursor-pointer items-center truncate rounded-full border border-line bg-surface px-3.5 text-sm text-ink transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 disabled:cursor-wait disabled:opacity-60'

type ResendState = 'idle' | 'pending' | 'sent'

/** Renvoie l'e-mail de confirmation, par exemple si le premier est perdu ou expiré. */
function ResendConfirmationButton({
  auth,
  email,
  className,
}: {
  auth: UseAuthResult
  email: string
  className?: string
}) {
  const [state, setState] = useState<ResendState>('idle')
  const [error, setError] = useState<string | null>(null)

  const resend = async () => {
    setState('pending')
    setError(null)
    const message = await auth.resendConfirmation(email)
    setError(message)
    setState(message ? 'idle' : 'sent')
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {state === 'sent' ? (
        <p role="status" className="text-sm text-emerald-700 dark:text-emerald-300">
          Nouveau lien envoyé à <strong>{email}</strong>. Pense à regarder dans
          les spams.
        </p>
      ) : (
        <button
          type="button"
          disabled={state === 'pending'}
          onClick={resend}
          className={cn(SECONDARY_BUTTON_CLASS, 'w-full')}
        >
          Renvoyer le lien de confirmation
        </button>
      )}
      <FormError message={error} />
    </div>
  )
}

interface AuthFormProps {
  auth: UseAuthResult
  onSuccess: () => void
}

function AuthForm({ auth, onSuccess }: AuthFormProps) {
  const [mode, setMode] = useState<FormMode>('sign-in')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmationEmail, setConfirmationEmail] = useState<string | null>(null)
  // Connexion refusée car l'adresse n'est pas confirmée : on propose de renvoyer le lien.
  const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null)
  const isSignUp = mode === 'sign-up'

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const fields = new FormData(form)
    const email = String(fields.get('email'))
    const password = String(fields.get('password'))

    setPending(true)
    setError(null)
    setUnconfirmedEmail(null)

    if (isSignUp) {
      const result = await auth.signUp({
        username: String(fields.get('username')),
        email,
        password,
      })

      setPending(false)

      if (result.error) {
        setError(result.error)
      } else if (result.needsEmailConfirmation) {
        setConfirmationEmail(email.trim())
      } else {
        onSuccess()
      }

      return
    }

    const result = await auth.signIn(email, password)
    setPending(false)

    if (result.error) {
      setError(result.error)
      setUnconfirmedEmail(result.needsEmailConfirmation ? email.trim() : null)
    } else {
      onSuccess()
    }
  }

  if (confirmationEmail) {
    return (
      <>
        <h2 className="pr-8 text-lg font-semibold tracking-tight">
          Vérifie ta boîte mail
        </h2>
        <p className="mt-1 break-words text-sm text-ink-muted">
          Un lien d’activation vient d’être envoyé à{' '}
          <strong className="text-ink">{confirmationEmail}</strong>. Clique
          dessus : ton compte sera activé et ta session ouverte
          automatiquement.
        </p>
        <p className="mt-2 text-sm text-ink-muted">
          Rien reçu après quelques minutes ? Regarde dans les spams, ou
          demande un nouveau lien.
        </p>
        <ResendConfirmationButton
          auth={auth}
          email={confirmationEmail}
          className="mt-5"
        />
        <button
          type="button"
          onClick={() => {
            setConfirmationEmail(null)
            setPasswordVisible(false)
            setMode('sign-in')
          }}
          className={cn(PRIMARY_BUTTON_CLASS, 'mt-3')}
        >
          Retour à la connexion
        </button>
      </>
    )
  }

  return (
    <>
      <h2 className="pr-8 text-lg font-semibold tracking-tight">
        {isSignUp ? 'Créer un compte' : 'Se connecter'}
      </h2>
      <p className="mt-1 text-sm text-ink-muted">
        Retrouve ta progression sur tous tes appareils. Tes coches actuelles
        seront ajoutées à ton compte.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
        {isSignUp && (
          <label className="block text-sm font-medium">
            Nom d’utilisateur
            <input
              name="username"
              required
              minLength={MIN_USERNAME_LENGTH}
              maxLength={MAX_USERNAME_LENGTH}
              autoComplete="name"
              className={INPUT_CLASS}
            />
          </label>
        )}

        <label className="block text-sm font-medium">
          Adresse e-mail
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={INPUT_CLASS}
          />
        </label>

        {/* Le bouton reste hors du <label> : un clic dessus ne doit pas
            déplacer le focus vers le champ. */}
        <div className="text-sm font-medium">
          <label htmlFor="account-password">Mot de passe</label>
          <div className="relative">
            <input
              id="account-password"
              name="password"
              type={passwordVisible ? 'text' : 'password'}
              required
              minLength={isSignUp ? MIN_PASSWORD_LENGTH : undefined}
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              className={cn(INPUT_CLASS, 'pr-11')}
            />
            <button
              type="button"
              aria-label={
                passwordVisible
                  ? 'Masquer le mot de passe'
                  : 'Afficher le mot de passe'
              }
              aria-pressed={passwordVisible}
              onClick={() => setPasswordVisible((visible) => !visible)}
              className="absolute right-1 top-1/2 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-md text-ink-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60"
            >
              {passwordVisible ? (
                <EyeOffIcon className="size-4" />
              ) : (
                <EyeIcon className="size-4" />
              )}
            </button>
          </div>
        </div>

        <FormError message={error} />

        {unconfirmedEmail && (
          <ResendConfirmationButton
            key={unconfirmedEmail}
            auth={auth}
            email={unconfirmedEmail}
          />
        )}

        <button type="submit" disabled={pending} className={PRIMARY_BUTTON_CLASS}>
          {isSignUp ? 'Créer mon compte' : 'Me connecter'}
        </button>
      </form>

      {!isSignUp && (
        <p className="mt-3 text-xs text-ink-muted">
          Mot de passe oublié ? Contacte l’administrateur du site pour le
          réinitialiser.
        </p>
      )}

      <p className="mt-5 border-t border-line pt-4 text-center text-sm text-ink-muted">
        {isSignUp ? 'Déjà un compte ?' : 'Pas encore de compte ?'}{' '}
        <button
          type="button"
          onClick={() => {
            setMode(isSignUp ? 'sign-in' : 'sign-up')
            setError(null)
            setUnconfirmedEmail(null)
          }}
          className="cursor-pointer font-medium text-accent underline-offset-2 hover:underline"
        >
          {isSignUp ? 'Se connecter' : 'Créer un compte'}
        </button>
      </p>
    </>
  )
}

/** Dans l'en-tête : lien vers « Mon compte », ou bouton ouvrant la connexion. */
export function AccountControl({ auth }: AccountControlProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  // Change à chaque fermeture pour vider le formulaire : un mot de passe ne
  // doit pas rester dans la page, encore moins affiché en clair.
  const [formKey, setFormKey] = useState(0)

  if (!auth.enabled) {
    return null
  }

  if (auth.status === 'signed-in') {
    return (
      <a href={ACCOUNT_HREF} className={HEADER_CONTROL_CLASS}>
        <span className="truncate">{auth.username ?? 'Mon compte'}</span>
      </a>
    )
  }

  const close = () => dialog.current?.close()

  return (
    <>
      <button
        type="button"
        disabled={auth.status === 'loading'}
        onClick={() => dialog.current?.showModal()}
        className={HEADER_CONTROL_CLASS}
      >
        Se connecter
      </button>

      <dialog
        ref={dialog}
        onClose={() => setFormKey((key) => key + 1)}
        aria-label="Connexion"
        className="relative m-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-line-strong bg-canvas p-6 text-ink backdrop:bg-black/60"
      >
        <AuthForm key={formKey} auth={auth} onSuccess={close} />

        {/* Dernier dans le DOM : à l'ouverture, le focus va au formulaire. */}
        <button
          type="button"
          aria-label="Fermer"
          onClick={close}
          className="absolute right-3 top-3 grid size-9 cursor-pointer place-items-center rounded-lg text-ink-muted transition-colors hover:bg-surface-strong hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60"
        >
          <CloseIcon className="size-4" />
        </button>
      </dialog>
    </>
  )
}
