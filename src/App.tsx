import { PageBackground } from './components/PageBackground'
import { PageFooter } from './components/PageFooter'
import { PageHeader } from './components/PageHeader'
import { RoadmapSection } from './components/RoadmapSection'
import { roadmapSteps } from './data/roadmap'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="relative flex min-h-screen flex-col">
      <PageBackground />

      <PageHeader
        stepCount={roadmapSteps.length}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="mx-auto w-full max-w-4xl flex-1 px-6 pb-4">
        <RoadmapSection steps={roadmapSteps} />
      </main>

      <PageFooter />
    </div>
  )
}

export default App
