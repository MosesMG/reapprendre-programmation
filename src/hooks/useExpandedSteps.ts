import { useCallback, useState } from 'react'

export interface UseExpandedStepsResult {
  expandedIds: ReadonlySet<number>
  expandedCount: number
  isExpanded: (id: number) => boolean
  toggle: (id: number) => void
  expandAll: (ids: readonly number[]) => void
  collapseAll: () => void
}

/**
 * Gère l'ouverture et la fermeture des étapes de la feuille de route.
 * La logique d'état est ainsi isolée des composants de présentation.
 */
export function useExpandedSteps(
  initialIds: readonly number[] = [],
): UseExpandedStepsResult {
  const [expandedIds, setExpandedIds] = useState<ReadonlySet<number>>(
    () => new Set(initialIds),
  )

  const isExpanded = useCallback(
    (id: number) => expandedIds.has(id),
    [expandedIds],
  )

  const toggle = useCallback((id: number) => {
    setExpandedIds((current) => {
      const next = new Set(current)

      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }

      return next
    })
  }, [])

  const expandAll = useCallback((ids: readonly number[]) => {
    setExpandedIds(new Set(ids))
  }, [])

  const collapseAll = useCallback(() => {
    setExpandedIds(new Set())
  }, [])

  return {
    expandedIds,
    expandedCount: expandedIds.size,
    isExpanded,
    toggle,
    expandAll,
    collapseAll,
  }
}
