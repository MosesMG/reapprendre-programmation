import { useCallback, useEffect, useState } from 'react'
import type { Theme } from '../types/theme'

// Le script en ligne de index.html utilise les mêmes valeurs : il s'exécute
// avant le bundle et ne peut pas les importer. Modifier les deux ensemble.
const STORAGE_KEY = 'tuto-code-theme'
const THEME_COLORS: Record<Theme, string> = {
  dark: '#05060c',
  light: '#f6f7fb',
}
const LIGHT_SCHEME_QUERY = '(prefers-color-scheme: light)'

function getStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : null
  } catch {
    // localStorage peut être indisponible (navigation privée, etc.).
    return null
  }
}

function storeTheme(theme: Theme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // On ignore les erreurs de stockage : le thème reste appliqué.
  }
}

/** Le script de index.html a déjà résolu le thème : on reprend sa valeur. */
function getInitialTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export interface UseThemeResult {
  theme: Theme
  toggleTheme: () => void
}

/**
 * Gère le thème actif. Il suit la préférence du système tant que l'utilisateur
 * n'a pas fait de choix ; seul un choix explicite est enregistré.
 */
export function useTheme(): UseThemeResult {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.style.colorScheme = theme

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLORS[theme])
  }, [theme])

  useEffect(() => {
    const query = window.matchMedia(LIGHT_SCHEME_QUERY)

    const handleChange = (event: MediaQueryListEvent) => {
      if (getStoredTheme() === null) {
        setTheme(event.matches ? 'light' : 'dark')
      }
    }

    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    storeTheme(nextTheme)
    setTheme(nextTheme)
  }, [theme])

  return { theme, toggleTheme }
}
