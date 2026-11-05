import type { StepLink } from '../types/roadmap'

interface ResourceLinksProps {
  links: readonly StepLink[]
}

export function ResourceLinks({ links }: ResourceLinksProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((link) => (
        <li key={link.url}>
          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-line px-3 text-[13px] font-medium text-ink transition-colors hover:border-line-strong hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {link.label}
            <span aria-hidden="true">↗</span>
            <span className="sr-only">(nouvel onglet)</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
