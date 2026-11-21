import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import PhoneInput from 'react-phone-input-2'
import countryNames from 'react-phone-input-2/lang/fr.json'
import { useAccountPhone } from '../hooks/useAccountPhone'
import type { UseAuthResult } from '../hooks/useAuth'
import { HOME_HREF } from '../hooks/useHashRoute'
import { isValidPhone, toInternationalPhone } from '../lib/credentials'
import { cn } from '../lib/cn'
import { FormError } from './FormError'
import { PRIMARY_BUTTON_CLASS, SECONDARY_BUTTON_CLASS } from './formStyles'
import { ChevronDownIcon } from './icons'

const DEFAULT_COUNTRY = 'tg'
const DEFAULT_DIAL_CODE = '228'
const PHONE_MASKS = { tg: '.. .. .. ..', ci: '.. .. .. .. ..' }

function AccountCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-5 backdrop-blur-sm sm:p-6">
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  )
}

interface PhoneFormProps {
  initialPhone: string | null
  onSave: (phone: string | null) => Promise<boolean>
}

function PhoneForm({ initialPhone, onSave }: PhoneFormProps) {
  const [digits, setDigits] = useState(initialPhone?.slice(1) ?? '')
  const [dialCode, setDialCode] = useState(DEFAULT_DIAL_CODE)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Rien après l'indicatif : la personne retire son numéro.
    const phone = digits.slice(dialCode.length)
      ? toInternationalPhone(digits, dialCode)
      : null

    setSaved(false)

    if (phone && !isValidPhone(phone)) {
      setError('Numéro invalide : vérifie le pays et le numéro saisis.')
      return
    }

    setPending(true)
    setError(null)
    const ok = await onSave(phone)
    setPending(false)

    if (ok) {
      setDigits(phone?.slice(1) ?? dialCode)
      setSaved(true)
    } else {
      setError('L’enregistrement a échoué. Réessaie dans un moment.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
      {/* Pas de <label> englobant : un clic sur le choix du pays
          donnerait le focus au champ et gênerait la liste. */}
      <div className="text-sm font-medium">
        <label htmlFor="account-phone">Numéro de téléphone</label>
        <PhoneInput
          country={DEFAULT_COUNTRY}
          value={digits}
          onMount={(_value, country) => {
            if ('dialCode' in country) {
              setDialCode(country.dialCode)
            }
          }}
          onChange={(value, country) => {
            setDigits(value)
            setSaved(false)

            if ('dialCode' in country) {
              setDialCode(country.dialCode)
            }
          }}
          localization={countryNames}
          masks={PHONE_MASKS}
          enableSearch
          disableSearchIcon
          searchPlaceholder="Rechercher un pays"
          searchNotFound="Aucun pays trouvé"
          countryCodeEditable={false}
          // Les masques du package sont datés : sans ceci, ils couperaient
          // les chiffres en trop, comme le dernier de 06 12 34 56 78.
          enableLongNumbers
          containerClass="account-phone mt-1.5"
          inputProps={{
            id: 'account-phone',
            name: 'phone',
            autoComplete: 'tel',
          }}
        />
      </div>

      <p className="text-xs leading-relaxed text-ink-muted">
        Facultatif. Il n’est ni affiché sur le site ni partagé, et aucun SMS
        n’est envoyé. Vide le champ pour le retirer.
      </p>

      <FormError message={error} />

      {saved && (
        <p role="status" className="text-sm text-emerald-700 dark:text-emerald-300">
          Modification enregistrée.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={cn(PRIMARY_BUTTON_CLASS, 'sm:w-auto sm:self-start sm:px-4')}
      >
        Enregistrer
      </button>
    </form>
  )
}

function PhoneSection({ userId }: { userId: string }) {
  const { status, phone, savePhone } = useAccountPhone(userId)

  if (status === 'loading') {
    return <p className="mt-4 text-sm text-ink-muted">Chargement…</p>
  }

  if (status === 'unavailable') {
    return (
      <div className="mt-4">
        <FormError message="Impossible de charger ton numéro. Réessaie dans un moment." />
      </div>
    )
  }

  return <PhoneForm initialPhone={phone} onSave={savePhone} />
}

interface AccountPageProps {
  auth: UseAuthResult
  userId: string
}

/** Page « Mon compte » : informations, numéro, déconnexion et suppression. */
export function AccountPage({ auth, userId }: AccountPageProps) {
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  // En cas de succès, la session disparaît et App revient à l'accueil.
  const run = async (action: () => Promise<string | null>) => {
    setPending(true)
    setError(null)
    const message = await action()
    setPending(false)
    setError(message)
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-5 px-6 pb-10">
      <a
        href={HOME_HREF}
        className="inline-flex items-center gap-1.5 self-start text-sm text-ink-muted underline-offset-2 transition-colors hover:text-ink hover:underline"
      >
        <ChevronDownIcon className="size-4 rotate-90" />
        Retour au parcours
      </a>

      <h1 className="text-3xl font-semibold tracking-tight">Mon compte</h1>

      <AccountCard title="Mes informations">
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-[10rem_1fr]">
          <dt className="text-ink-muted">Nom d’utilisateur</dt>
          <dd className="break-words font-medium">{auth.username ?? '–'}</dd>
          <dt className="text-ink-muted">Adresse e-mail</dt>
          <dd className="break-words font-medium">{auth.email ?? '–'}</dd>
        </dl>
      </AccountCard>

      <AccountCard title="Téléphone">
        <PhoneSection userId={userId} />
      </AccountCard>

      <AccountCard title="Session et compte">
        <div className="mt-4 flex flex-col gap-4">
          <FormError message={error} />

          <button
            type="button"
            disabled={pending}
            onClick={() => void run(auth.signOut)}
            className={cn(SECONDARY_BUTTON_CLASS, 'self-start')}
          >
            Me déconnecter
          </button>

          <div className="border-t border-line pt-4">
            {confirmingDelete ? (
              <>
                <p className="text-sm">
                  Ton compte et ta progression seront définitivement supprimés.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => void run(auth.deleteAccount)}
                    className={cn(
                      SECONDARY_BUTTON_CLASS,
                      'text-rose-700 dark:text-rose-300',
                    )}
                  >
                    Supprimer définitivement
                  </button>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => setConfirmingDelete(false)}
                    className={SECONDARY_BUTTON_CLASS}
                  >
                    Annuler
                  </button>
                </div>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmingDelete(true)}
                className="cursor-pointer text-sm text-rose-700 underline-offset-2 hover:underline dark:text-rose-300"
              >
                Supprimer mon compte
              </button>
            )}
          </div>
        </div>
      </AccountCard>
    </main>
  )
}
