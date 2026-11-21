/**
 * Adresse de la page d'accueil du site (sans hash ni paramètres), là où les
 * liens envoyés par e-mail doivent ramener. Elle suit le site où l'on se
 * trouve : l'adresse Vercel en ligne, `localhost` en développement. Chacune
 * doit figurer dans les « Redirect URLs » de Supabase.
 */
export function getSiteUrl() {
  const { origin, pathname } = window.location
  return origin + pathname
}
