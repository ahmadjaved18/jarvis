import { useEffect, useRef } from 'react'

function toneClasses(tone) {
  switch (tone) {
    case 'success':
      return 'border-emerald-300/30 bg-emerald-400/12 text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.08)]'
    case 'warning':
      return 'border-amber-300/30 bg-amber-400/12 text-amber-100 shadow-[0_0_18px_rgba(245,158,11,0.08)]'
    case 'error':
      return 'border-rose-300/30 bg-rose-400/12 text-rose-100 shadow-[0_0_18px_rgba(244,63,94,0.08)]'
    case 'live':
      return 'border-cyan-300/40 bg-cyan-400/12 text-cyan-100 shadow-[0_0_18px_rgba(0,212,255,0.1)]'
    default:
      return 'border-sky-300/25 bg-sky-400/10 text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.06)]'
  }
}

function SystemConsole({ logs }) {
  const logViewportRef = useRef(null)

  useEffect(() => {
    const viewport = logViewportRef.current

    if (!viewport) {
      return
    }

    viewport.scrollTop = viewport.scrollHeight
  }, [logs])

  return (
    <section className="flex h-[280px] min-h-0 flex-col overflow-hidden rounded-[28px] border border-cyan-400/12 bg-[linear-gradient(180deg,rgba(5,10,18,0.94),rgba(4,8,16,0.78))] p-4 shadow-[0_0_40px_rgba(0,212,255,0.07)] backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-4 border-b border-cyan-400/10 pb-4">
        <div>
          <p className="font-orbitron text-[10px] uppercase tracking-[0.45em] text-cyan-300/70">
            System Console
          </p>
          <h3 className="mt-2 text-base font-semibold tracking-[0.18em] text-slate-50">
            Live Log Stream
          </h3>
        </div>

        <div className="rounded-full border border-cyan-400/15 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-cyan-100/80">
          {logs.length} Events
        </div>
      </div>

      <div ref={logViewportRef} className="mt-4 flex-1 min-h-0 overflow-y-auto pr-1 scrollbar-hidden">
        {logs.length > 0 ? (
          <div className="space-y-1">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 rounded-2xl border border-white/[0.04] bg-black/15 px-3 py-2.5"
              >
                <span
                  className={[
                    'mt-1 h-2.5 w-2.5 shrink-0 rounded-full border',
                    toneClasses(log.tone),
                  ].join(' ')}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-[10px] uppercase tracking-[0.32em] text-cyan-200/55">
                      {log.time}
                    </span>
                    <span className="text-sm font-medium text-slate-100">
                      {log.message}
                    </span>
                  </div>

                  {log.detail ? (
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                      {log.detail}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-cyan-400/15 bg-white/[0.02] px-4 py-8 text-sm text-slate-400">
            No logs yet. System events will appear here in real time.
          </div>
        )}
      </div>
    </section>
  )
}

export default SystemConsole