import { useEffect, useState } from 'react'

function Sidebar({
  isCollapsed,
  quickActions,
  onQuickAction,
  conversationHistory,
  historyExpanded,
  onToggleHistory,
  orbState,
  isLoading,
  activeCapabilityLabel,
  proactiveCount,
  messages,
  onClearChat,
}) {
  const [currentTime, setCurrentTime] = useState(() => new Date())

  const greeting = (() => {
    const hour = currentTime.getHours()

    if (hour < 12) {
      return 'GOOD MORNING'
    }

    if (hour < 18) {
      return 'GOOD AFTERNOON'
    }

    return 'GOOD EVENING'
  })()

  const stateLabel = (() => {
    if (isLoading) {
      return 'Mission executing'
    }

    if (orbState === 'listening') {
      return 'Listening for command'
    }

    if (orbState === 'thinking') {
      return 'Processing intelligence'
    }

    if (orbState === 'speaking') {
      return 'Responding to user'
    }

    if (orbState === 'executing') {
      return 'Automation active'
    }

    return 'Systems in standby'
  })()

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [])

  return (
    <aside
      className={[
        'relative z-40 h-full min-h-0 border-r border-cyan-400/20 bg-slate-950/90 px-6 py-6 backdrop-blur-2xl transition-all duration-300 ease-out md:flex md:flex-col md:border-r md:border-cyan-400/15',
        isCollapsed
          ? 'w-0 min-w-0 max-w-0 px-0 opacity-0 pointer-events-none overflow-hidden md:translate-x-[-100%]'
          : 'w-[min(86vw,320px)] md:w-[320px] opacity-100 md:translate-x-0',
      ].join(' ')}
    >
      <div className="flex h-full min-h-0 min-w-0 flex-col overflow-y-auto rounded-[28px] border border-cyan-400/10 bg-white/[0.03] p-6 shadow-[0_0_40px_rgba(0,212,255,0.08)]">
        <div className="border-b border-cyan-400/10 pb-4">
          <p className="max-w-full break-words font-orbitron text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">
            {greeting}
          </p>
          <p className="mt-2 max-w-full text-pretty text-[11px] leading-relaxed text-slate-300">
            Jarvis is tracking your workspace, priorities, and active intelligence state.
          </p>
          <div className="w-full overflow-hidden rounded-xl border border-cyan-400/20 p-3">
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex flex-col text-xs font-medium uppercase tracking-wider leading-tight text-gray-400">
                <span>System</span>
                <span>State</span>
              </div>
              <div className="flex-shrink-0 rounded-full border border-cyan-500/30 bg-cyan-900/30 px-2 py-1 text-[10px] whitespace-nowrap text-cyan-300">
                SYSTEMS IN STANDBY
              </div>
            </div>

            <div className="flex w-full items-center justify-between gap-2 pt-4">
              <div className="flex flex-col text-xs font-medium uppercase tracking-wider leading-tight text-gray-400">
                <span>Total</span>
                <span>Messages: {messages.length}</span>
              </div>
              <button
                type="button"
                onClick={onClearChat}
                className="flex-shrink-0 rounded-full border border-gray-600/50 px-3 py-1 text-xs text-gray-400 transition-all hover:border-red-400/50 hover:text-red-400"
              >
                CLEAR
              </button>
            </div>
          </div>
          <p className="mt-4 font-orbitron text-[10px] uppercase tracking-[0.22em] text-cyan-200/55 whitespace-nowrap">
            {currentTime.toLocaleString([], {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </p>
        </div>

        <div className="mt-6 flex items-start justify-between gap-3 border-b border-cyan-400/10 pb-5">
          <div>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/40 bg-[radial-gradient(circle,_rgba(0,212,255,0.4),_rgba(0,102,255,0.08))] text-lg font-bold text-cyan-100 shadow-[0_0_24px_rgba(0,212,255,0.55)]">
                J
              </div>
              <div>
                <h1 className="font-orbitron text-2xl tracking-[0.26em] text-slate-50">
                  JARVIS
                </h1>
                <p className="mt-1 text-xs uppercase tracking-[0.35em] text-emerald-300/80">
                  Always At Your Service
                </p>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-5 space-y-3">
          <p className="font-orbitron text-[10px] uppercase tracking-[0.45em] text-cyan-300/60">
            Quick Actions
          </p>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                type="button"
                className="group w-full rounded-2xl border border-cyan-400/15 bg-slate-900/80 px-4 py-3 text-left text-sm text-slate-100 transition hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-cyan-400/10 hover:shadow-[0_0_24px_rgba(0,212,255,0.14)]"
                onClick={() => onQuickAction(action.query)}
              >
                <span className="block font-medium text-slate-100 transition group-hover:text-cyan-100">
                  {action.label}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-400">
                  {action.query}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex min-h-0 flex-1 flex-col overflow-hidden">
          <button
            type="button"
            className="flex items-center justify-between text-left"
            onClick={onToggleHistory}
          >
            <p className="font-orbitron text-[10px] uppercase tracking-[0.45em] text-cyan-300/60">
              Conversation History
            </p>
            <span className="rounded-full border border-cyan-400/15 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-cyan-100">
              {historyExpanded ? 'Hide' : 'Show'}
            </span>
          </button>

          {historyExpanded ? (
            <div className="mt-3 flex-1 space-y-3 overflow-y-auto pr-1">
              {conversationHistory.length > 0 ? (
                conversationHistory.map((item, index) => (
                  <div
                    key={`${item.content}-${index}`}
                    className="rounded-2xl border border-white/5 bg-black/20 px-4 py-3 text-sm text-slate-300"
                  >
                    <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-300/40">
                      Recent Command
                    </p>
                    <p className="mt-2 line-clamp-3 leading-relaxed text-slate-200">
                      {item.content}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-cyan-400/20 bg-white/[0.02] px-4 py-5 text-sm text-slate-400">
                  No commands yet. Start a conversation to populate your mission log.
                </div>
              )}
            </div>
          ) : (
            <div className="mt-3 rounded-2xl border border-dashed border-cyan-400/15 bg-white/[0.02] px-4 py-4 text-sm text-slate-400">
              History is collapsed.
            </div>
          )}
        </div>

        <div className="mt-auto pt-6 border-t border-cyan-400/10 text-center">
          <p className="font-rajdhani text-[10px] uppercase tracking-widest text-cyan-400/50">
            Built by Ahmad Javed
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar