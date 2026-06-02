function TaskStatusLine({ taskLine }) {
  const isVisible = Boolean(taskLine?.visible && taskLine?.text)
  const isActive = taskLine?.state === 'running'
  const progress =
    taskLine?.tasks?.length > 0
      ? Math.round((((taskLine.activeIndex ?? 0) + 1) / taskLine.tasks.length) * 100)
      : 0
  const nextTask =
    taskLine?.tasks?.length > 0 && taskLine.activeIndex < taskLine.tasks.length - 1
      ? taskLine.tasks[taskLine.activeIndex + 1]
      : null

  if (!isVisible) {
    return null
  }

  return (
    <section
      className={[
        'rounded-[18px] border border-cyan-400/12 bg-transparent p-2.5 transition-all duration-300 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'pointer-events-none -translate-y-1 opacity-0',
      ].join(' ')}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-start justify-between gap-2.5">
        <div>
          <p className="font-orbitron text-[8px] uppercase tracking-[0.38em] text-cyan-300/55">
            Mission Execution
          </p>
          <div className="mt-1 flex items-center gap-2 text-[0.8rem] text-cyan-300/90">
            <span
              className={[
                'inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(0,212,255,0.55)]',
                isActive ? 'animate-pulse' : '',
              ].join(' ')}
            />
            <span className="min-w-0 truncate font-medium tracking-[0.08em]">
              {taskLine?.text}
            </span>
          </div>
          <p className="mt-1 text-[9px] uppercase tracking-[0.24em] text-slate-400">
            {nextTask ? `Next: ${nextTask}` : 'Mission sequence synchronized'}
          </p>
        </div>

        <div className="text-right">
          <span className="rounded-full border border-cyan-400/15 bg-white/[0.03] px-2.5 py-0.5 text-[8px] uppercase tracking-[0.24em] text-cyan-100/80">
            {taskLine?.state === 'success'
              ? 'Complete'
              : taskLine?.state === 'error'
                ? 'Error'
                : 'Live'}
          </span>
          <div className="mt-1.5 h-1.5 w-20 overflow-hidden rounded-full bg-white/[0.04]">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,rgba(0,212,255,0.35),rgba(0,212,255,0.95),rgba(0,102,255,0.78))] transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TaskStatusLine