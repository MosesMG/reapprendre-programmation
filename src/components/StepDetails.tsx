import type { StepAccent, StepDetail, StepTask } from '../types/roadmap'
import { accentClasses } from '../lib/accent'
import { cn } from '../lib/cn'
import { ResourceLinks } from './ResourceLinks'
import { StepOptions } from './StepOptions'
import { TaskCheckbox } from './TaskCheckbox'

interface StepDetailsProps {
  stepId: number
  accent: StepAccent
  tasks: readonly StepTask[]
  details: readonly StepDetail[]
  tasksEnabled: boolean
  isTaskDone: (taskId: string) => boolean
  onTaskChange: (taskId: string, done: boolean) => void
}

export function StepDetails({
  stepId,
  accent,
  tasks,
  details,
  tasksEnabled,
  isTaskDone,
  onTaskChange,
}: StepDetailsProps) {
  return (
    <div className="space-y-5 border-t border-line px-4 pb-5 pt-3 sm:px-5">
      <ul aria-label={`Objectifs de l’étape ${stepId}`}>
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskCheckbox
              label={task.label}
              accent={accent}
              checked={isTaskDone(task.id)}
              disabled={!tasksEnabled}
              onChange={(done) => onTaskChange(task.id, done)}
            />
          </li>
        ))}
      </ul>

      <dl className="space-y-5">
        {details.map((detail) => (
          <div key={detail.subtitle}>
            <dt className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-subtle">
              <span
                aria-hidden="true"
                className={cn(
                  'h-1.5 w-1.5 rounded-full',
                  accentClasses[accent].dot,
                )}
              />
              {detail.subtitle}
            </dt>

            <dd className="mt-2 space-y-3 text-sm leading-relaxed text-ink-muted">
              {detail.text && <p>{detail.text}</p>}
              {detail.options && <StepOptions options={detail.options} />}
              {detail.links && <ResourceLinks links={detail.links} />}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
