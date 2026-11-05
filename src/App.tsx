import { NextObjective } from './components/NextObjective'
import { PageBackground } from './components/PageBackground'
import { PageFooter } from './components/PageFooter'
import { PageHeader } from './components/PageHeader'
import { PrinciplesSection } from './components/PrinciplesSection'
import { ProgressNotice } from './components/ProgressNotice'
import { RoadmapSection } from './components/RoadmapSection'
import { principles, roadmapSteps } from './data/roadmap'
import { useProgress } from './hooks/useProgress'
import { useTheme } from './hooks/useTheme'
import type { RoadmapStep } from './types/roadmap'

const steps: readonly RoadmapStep[] = roadmapSteps
const entries = steps.flatMap((step) =>
  step.tasks.map((task) => ({ task, step })),
)

function App() {
  const { theme, toggleTheme } = useTheme()
  const { status, saveFailed, isDone, setTaskDone } = useProgress()

  const doneCount = entries.filter(({ task }) => isDone(task.id)).length
  const next = entries.find(({ task }) => !isDone(task.id)) ?? null
  const ready = status === 'ready'

  return (
    <div className="relative flex min-h-screen flex-col">
      <PageBackground />

      <PageHeader
        status={status}
        doneCount={doneCount}
        total={entries.length}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-9 px-6 pb-4">
        <ProgressNotice status={status} saveFailed={saveFailed} />

        {ready && <NextObjective next={next} />}

        <RoadmapSection
          steps={steps}
          currentStepId={status === 'loading' ? null : (next?.step.id ?? null)}
          tasksEnabled={ready}
          isTaskDone={isDone}
          onTaskChange={setTaskDone}
        />

        <PrinciplesSection principles={principles} />
      </main>

      <PageFooter />
    </div>
  )
}

export default App
