import { useCallback, useEffect, useState } from 'react'
import type { Theme } from '../types/theme'

const STORAGE_KEY = 'tuto-code-theme'

function getInitialTheme(): Theme {
  if (typeof document !== 'undefined') {
    const current = document.documentElement.dataset.theme

    if (current === 'light' || current === 'dark') {
      return current
    }
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)

    if (stored === 'light' || stored === 'dark') {
      return stored
    }
  } catch {
    // localStorage peut être indisponible (navigation privée, etc.).
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
}

export interface UseThemeResult {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

/**
 * Gère le thème actif et sa persistance.
 * Le thème est appliqué sur <html data-theme="..."> pour rester accessible
 * depuis les variables CSS et l'attribut color-scheme.
 */
export function useTheme(): UseThemeResult {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.style.colorScheme = theme

    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // On ignore les erreurs de stockage : le thème reste appliqué.
    }

    const themeColor = document.querySelector('meta[name="theme-color"]')
    themeColor?.setAttribute(
      'content',
      theme === 'dark' ? '#05060c' : '#f6f7fb',
    )
  }, [theme])

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, setTheme, toggleTheme }
}
