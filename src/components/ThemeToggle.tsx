import type { Theme } from '../types/theme'
import { cn } from '../lib/cn'
import { MoonIcon, SunIcon } from './icons'

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Activer le thème ${isDark ? 'clair' : 'sombre'}`}
      title={`Passer en thème ${isDark ? 'clair' : 'sombre'}`}
      onClick={onToggle}
      className="group relative inline-flex h-9 w-16 flex-none cursor-pointer items-center rounded-full border border-line bg-surface p-1 transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 dark:focus-visible:ring-cyan-400/60"
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute flex h-7 w-7 items-center justify-center rounded-full bg-surface-strong text-ink shadow-sm ring-1 ring-line transition-transform duration-300 ease-out',
          isDark ? 'translate-x-7' : 'translate-x-0',
        )}
      >
        {isDark ? (
          <MoonIcon className="h-3.5 w-3.5" />
        ) : (
          <SunIcon className="h-3.5 w-3.5" />
        )}
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none flex w-full items-center justify-between px-1.5 text-ink-subtle"
      >
        <SunIcon className="h-3.5 w-3.5" />
        <MoonIcon className="h-3.5 w-3.5" />
      </span>
    </button>
  )
}
