import { useSyncExternalStore } from 'react'

export const HOME_HREF = '#/'
export const ACCOUNT_HREF = '#/compte'

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function readHash() {
  return window.location.hash
}

/** Adresse de la page dans le hash : aucune configuration requise chez l'hébergeur. */
export function useHashRoute() {
  return useSyncExternalStore(subscribe, readHash)
}
