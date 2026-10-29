export function PageFooter() {
  return (
    <footer className="relative mt-16 border-t border-line">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-3 px-6 py-8 text-center text-xs text-ink-subtle sm:flex-row sm:text-left">
        <p className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500/80 dark:bg-violet-400/80" />
          La constance vaut mieux que l’intensité.
        </p>
        <p>Parcours dev · {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
