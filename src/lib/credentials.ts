export const MIN_USERNAME_LENGTH = 2
export const MAX_USERNAME_LENGTH = 50

// Accepte un nom complet : espaces, accents, apostrophes, toutes les écritures.
const USERNAME_PATTERN = new RegExp(
  `^[^\\p{Cc}]{${MIN_USERNAME_LENGTH},${MAX_USERNAME_LENGTH}}$`,
  'u',
)
const PHONE_PATTERN = /^\+[1-9]\d{7,14}$/

// Pays où le 0 de tête fait partie du numéro international : Italie, Côte
// d'Ivoire, Gabon, Congo-Brazzaville. Partout ailleurs, il n'existe que dans le
// format national (06… en France devient +336…).
const DIAL_CODES_KEEPING_ZERO = new Set(['39', '225', '241', '242'])

export const MIN_PASSWORD_LENGTH = 8

/** Retire les espaces au début et à la fin, et réduit ceux entre les mots. */
export function normalizeUsername(input: string) {
  return input.trim().replace(/\s+/g, ' ')
}

export function isValidUsername(username: string) {
  return USERNAME_PATTERN.test(username)
}

export function isValidPhone(phone: string) {
  return PHONE_PATTERN.test(phone)
}

/**
 * Assemble les chiffres du champ téléphone (indicatif inclus) au format
 * international, sans le 0 national qui rendrait le numéro injoignable.
 */
export function toInternationalPhone(digits: string, dialCode: string) {
  const national = digits.slice(dialCode.length)
  const number = DIAL_CODES_KEEPING_ZERO.has(dialCode)
    ? national
    : national.replace(/^0+/, '')

  return `+${dialCode}${number}`
}
