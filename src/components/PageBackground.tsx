export function PageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-canvas transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute -top-56 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-violet-400/15 blur-[140px] dark:bg-violet-600/20" />
      <div className="absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[120px] dark:bg-cyan-500/10" />
      <div className="absolute -right-40 top-1/2 h-[460px] w-[460px] rounded-full bg-fuchsia-400/10 blur-[130px] dark:bg-fuchsia-500/10" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
    </div>
  )
}
