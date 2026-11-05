import { useCallback, useState } from 'react'

export interface UseExpandedStepsResult {
  allExpanded: boolean
  isExpanded: (id: number) => boolean
  toggle: (id: number) => void
  expandAll: () => void
  collapseAll: () => void
}

/**
 * Gère l'ouverture des étapes : l'étape en cours est ouverte par défaut, et un
 * choix de l'utilisateur sur une étape prend ensuite le dessus sur ce défaut.
 */
export function useExpandedSteps(
  stepIds: readonly number[],
  currentStepId: number | null,
): UseExpandedStepsResult {
  const [choices, setChoices] = useState<ReadonlyMap<number, boolean>>(
    () => new Map(),
  )

  const isExpanded = useCallback(
    (id: number) => choices.get(id) ?? id === currentStepId,
    [choices, currentStepId],
  )

  const toggle = useCallback(
    (id: number) => {
      setChoices((current) => {
        const expanded = current.get(id) ?? id === currentStepId
        return new Map(current).set(id, !expanded)
      })
    },
    [currentStepId],
  )

  const setAll = (expanded: boolean) => {
    setChoices(new Map(stepIds.map((id) => [id, expanded])))
  }

  return {
    allExpanded: stepIds.every(isExpanded),
    isExpanded,
    toggle,
    expandAll: () => setAll(true),
    collapseAll: () => setAll(false),
  }
}
