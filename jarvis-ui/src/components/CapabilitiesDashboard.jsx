function CapabilityCard({ capability, onSelect }) {
  const toneClasses = {
    ready: 'border-cyan-300/30 bg-cyan-400/10 text-cyan-100',
    connected: 'border-emerald-300/30 bg-emerald-400/10 text-emerald-100',
    beta: 'border-amber-300/30 bg-amber-400/10 text-amber-100',
    comingSoon: 'border-slate-400/20 bg-white/[0.03] text-slate-300',
  }

  return (
    <div
      className="group w-full text-left"
      role="button"
      tabIndex={0}
      onClick={() => onSelect(capability)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect(capability)
        }
      }}
      aria-label={`Open capability ${capability.title}`}
    >
      <div className="rounded-[22px] border border-cyan-400/10 bg-black/15 p-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:border-cyan-300/30 group-hover:bg-cyan-400/10 group-hover:shadow-[0_0_28px_rgba(0,212,255,0.12)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-slate-950/70 text-xl shadow-[0_0_18px_rgba(0,212,255,0.08)]">
              {capability.icon}
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold tracking-[0.12em] text-slate-50">
                {capability.title}
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                {capability.description}
              </p>
            </div>
          </div>

          <span
            className={[
              'shrink-0 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.28em]',
              toneClasses[capability.statusTone],
            ].join(' ')}
          >
            {capability.statusLabel}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.05] pt-3">
          <span className="text-[10px] uppercase tracking-[0.32em] text-cyan-300/50">
            {capability.futureReady}
          </span>
          <button
            type="button"
            className="rounded-full border border-cyan-300/30 bg-cyan-400/12 px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-cyan-100 transition hover:border-cyan-200/50 hover:bg-cyan-400/20"
            onClick={(event) => {
              event.stopPropagation()
              onSelect(capability)
            }}
          >
            Trigger
          </button>
        </div>
      </div>
    </div>
  )
}

function CapabilitiesDashboard({ capabilities, onSelectCapability, activeCapabilityId }) {
  return (
    <section className="rounded-[28px] border border-cyan-400/12 bg-slate-950/60 p-4 shadow-[0_0_40px_rgba(0,212,255,0.06)] backdrop-blur-2xl">
      <div className="border-b border-cyan-400/10 pb-4">
        <p className="font-orbitron text-[10px] uppercase tracking-[0.45em] text-cyan-300/70">
          Capabilities Dashboard
        </p>
        <h3 className="mt-2 text-base font-semibold tracking-[0.18em] text-slate-50">
          Jarvis Abilities
        </h3>
      </div>

      <div className="mt-4 grid gap-3">
        {capabilities.map((capability) => (
          <div
            key={capability.id}
            className={activeCapabilityId === capability.id ? 'rounded-[22px] ring-1 ring-cyan-300/40' : ''}
          >
            <CapabilityCard capability={capability} onSelect={onSelectCapability} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default CapabilitiesDashboard