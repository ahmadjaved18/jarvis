function priorityStyles(priority) {
  switch (priority) {
    case 'critical':
      return {
        chip: 'border-rose-300/35 bg-rose-400/14 text-rose-100',
        glow: 'shadow-[0_0_20px_rgba(244,63,94,0.14)]',
        dot: 'bg-rose-300 shadow-[0_0_16px_rgba(244,63,94,0.95)]',
      }
    case 'high':
      return {
        chip: 'border-rose-300/30 bg-rose-400/12 text-rose-100',
        glow: 'shadow-[0_0_18px_rgba(244,63,94,0.10)]',
        dot: 'bg-rose-300 shadow-[0_0_14px_rgba(244,63,94,0.85)]',
      }
    case 'medium':
      return {
        chip: 'border-amber-300/30 bg-amber-400/12 text-amber-100',
        glow: 'shadow-[0_0_18px_rgba(245,158,11,0.08)]',
        dot: 'bg-amber-300 shadow-[0_0_14px_rgba(245,158,11,0.8)]',
      }
    default:
      return {
        chip: 'border-cyan-300/30 bg-cyan-400/12 text-cyan-100',
        glow: 'shadow-[0_0_18px_rgba(0,212,255,0.08)]',
        dot: 'bg-cyan-300 shadow-[0_0_14px_rgba(0,212,255,0.75)]',
      }
  }
}

function ProactiveCard({ item, onSelect, onDismiss }) {
  const styles = priorityStyles(item.priority)

  return (
    <div className={['w-full flex flex-col gap-2 overflow-hidden rounded-[22px] border bg-black/15 p-3 transition', styles.glow, styles.chip].join(' ')}>
      <button
        type="button"
        className="group flex w-full min-w-0 flex-col gap-2 text-left"
        onClick={() => onSelect(item)}
        aria-label={`Prepare proactive insight ${item.title}`}
      >
        <div className="flex w-full min-w-0 items-start gap-3">
          <span className={['mt-1 h-2.5 w-2.5 shrink-0 rounded-full', styles.dot].join(' ')} />

          <div className="w-full min-w-0 flex-1">
            <div className="flex w-full min-w-0 items-start justify-between gap-3">
              <div className="w-full min-w-0 flex-1">
                <p className="whitespace-normal break-words text-sm font-semibold tracking-[0.12em] text-slate-50">
                  {item.title}
                </p>
                <p className="mt-1 w-full whitespace-normal break-words text-[11px] leading-relaxed text-slate-400">
                  {item.description}
                </p>
              </div>

              <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.28em] text-cyan-100/80">
                {item.priorityLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-white/[0.05] pt-2">
          <span className="text-[10px] uppercase tracking-[0.32em] text-slate-400">
            Future-ready for n8n
          </span>

          <span className="text-[10px] uppercase tracking-[0.32em] text-cyan-300/55">
            {item.source}
          </span>
        </div>
      </button>

      <div className="mt-2 flex flex-row justify-end gap-2">
        <button
          type="button"
          className="rounded-full border border-cyan-300/30 bg-cyan-400/12 px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-cyan-100 transition hover:border-cyan-200/50 hover:bg-cyan-400/20"
          onClick={() => onSelect(item)}
        >
          Prepare
        </button>

        <button
          type="button"
          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-slate-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/10 hover:text-cyan-100"
          onClick={() => onDismiss(item.id)}
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}

function ProactiveIntelligenceWidget({ items, onSelectItem, onDismissItem }) {
  return (
    <section className="rounded-[28px] border border-cyan-400/12 bg-slate-950/60 p-4 shadow-[0_0_40px_rgba(0,212,255,0.06)] backdrop-blur-2xl">
      <div className="border-b border-cyan-400/10 pb-4">
        <p className="font-orbitron text-[10px] uppercase tracking-[0.45em] text-cyan-300/70">
          Proactive Intelligence
        </p>
        <h3 className="mt-2 text-base font-semibold tracking-[0.18em] text-slate-50">
          Live Recommendations
        </h3>
      </div>

      <div className="mt-4 grid gap-3">
        {items.length > 0 ? (
          items.map((item) => (
            <ProactiveCard
              key={item.id}
              item={item}
              onSelect={onSelectItem}
              onDismiss={onDismissItem}
            />
          ))
        ) : (
          <div className="rounded-[22px] border border-dashed border-cyan-400/15 bg-white/[0.02] px-4 py-5 text-sm text-slate-400">
            No active recommendations. Jarvis will surface new opportunities as they arrive.
          </div>
        )}
      </div>
    </section>
  )
}

export default ProactiveIntelligenceWidget