import SystemConsole from './SystemConsole.jsx'
import CapabilitiesDashboard from './CapabilitiesDashboard.jsx'
import ProactiveIntelligenceWidget from './ProactiveIntelligenceWidget.jsx'

function StatusItem({ label, value, active = false }) {
  return (
    <div
      className={[
        'rounded-2xl border px-4 py-3 transition',
        active
          ? 'border-cyan-300/40 bg-cyan-400/10 shadow-[0_0_24px_rgba(0,212,255,0.1)]'
          : 'border-cyan-400/10 bg-black/15',
      ].join(' ')}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] uppercase tracking-[0.35em] text-cyan-200/60">
          {label}
        </span>
        <span
          className={[
            'h-2.5 w-2.5 rounded-full',
            active ? 'bg-cyan-300 shadow-[0_0_14px_rgba(0,212,255,0.95)]' : 'bg-slate-600',
          ].join(' ')}
        />
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-100">{value}</p>
    </div>
  )
}

function TimelineItem({ title, meta, tone = 'cyan' }) {
  const toneClasses =
    tone === 'emerald'
      ? 'border-emerald-400/20 bg-emerald-400/10'
      : tone === 'blue'
        ? 'border-blue-400/20 bg-blue-400/10'
        : 'border-cyan-400/20 bg-cyan-400/10'

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center pt-1">
        <span className={`h-3 w-3 rounded-full border ${toneClasses}`} />
        <span className="mt-2 h-full w-px bg-cyan-400/10" />
      </div>
      <div className="pb-4">
        <p className="text-sm text-slate-100">{title}</p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-slate-400">
          {meta}
        </p>
      </div>
    </div>
  )
}

function IntelligencePanel({
  orbState,
  isLoading,
  messages,
  systemLogs,
  capabilities,
  onSelectCapability,
  activeCapabilityId,
  proactiveItems,
  onSelectProactiveItem,
  onDismissProactiveItem,
}) {
  const activity = [
    {
      title: 'Core systems stabilized',
      meta: 'Jarvis runtime synchronized',
      tone: 'cyan',
    },
    {
      title: isLoading ? 'Processing active command' : 'Awaiting next command',
      meta: isLoading ? 'Webhook request in flight' : 'Idle mission queue',
      tone: isLoading ? 'blue' : 'emerald',
    },
    ...messages
      .slice(-4)
      .reverse()
      .map((message) => ({
        title:
          message.role === 'user'
            ? `User: ${message.content}`
            : `Jarvis: ${message.content}`,
        meta: message.role === 'user' ? 'Command logged' : 'Response received',
        tone: message.role === 'user' ? 'emerald' : 'blue',
      })),
  ]

  return (
    <aside className="relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[30px] border border-cyan-400/12 bg-slate-950/65 p-4 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,212,255,0.06)]">
      <div className="border-b border-cyan-400/10 pb-4">
        <p className="font-orbitron text-[10px] uppercase tracking-[0.45em] text-cyan-300/70">
          Intelligence Panel
        </p>
        <h2 className="mt-2 text-lg font-semibold tracking-[0.18em] text-slate-50">
          Command Telemetry
        </h2>
      </div>

      <div className="mt-4 flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-1 scrollbar-hidden">
        <section className="shrink-0">
          <p className="font-orbitron text-[10px] uppercase tracking-[0.45em] text-cyan-300/55">
            System Status
          </p>
          <div className="mt-3 grid gap-3">
            <StatusItem label="AI Engine" value={orbState === 'thinking' ? 'Thinking' : 'Stable'} active={orbState !== 'idle'} />
            <StatusItem label="Voice Engine" value={isLoading ? 'Listening' : 'Ready'} active={isLoading} />
            <StatusItem label="Email" value="Connected" active />
            <StatusItem label="Calendar" value="Synced" active />
            <StatusItem label="Weather" value="Live Feed" active={false} />
            <StatusItem label="Memory" value="Indexed" active />
            <StatusItem label="Automation" value="Armed" active={orbState === 'speaking'} />
          </div>
        </section>

        <section className="shrink-0">
          <SystemConsole logs={systemLogs} />
        </section>

        <section className="shrink-0">
          <CapabilitiesDashboard
            capabilities={capabilities}
            onSelectCapability={onSelectCapability}
            activeCapabilityId={activeCapabilityId}
          />
        </section>

        <section className="shrink-0">
          <ProactiveIntelligenceWidget
            items={proactiveItems}
            onSelectItem={onSelectProactiveItem}
            onDismissItem={onDismissProactiveItem}
          />
        </section>

        <section className="shrink-0">
          <p className="font-orbitron text-[10px] uppercase tracking-[0.45em] text-cyan-300/55">
            Today's Summary
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-cyan-400/10 bg-black/15 px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Emails</p>
              <p className="mt-2 text-xl font-semibold text-cyan-100">12</p>
            </div>
            <div className="rounded-2xl border border-cyan-400/10 bg-black/15 px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Meetings</p>
              <p className="mt-2 text-xl font-semibold text-cyan-100">4</p>
            </div>
            <div className="rounded-2xl border border-cyan-400/10 bg-black/15 px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Tasks</p>
              <p className="mt-2 text-xl font-semibold text-cyan-100">7</p>
            </div>
            <div className="rounded-2xl border border-cyan-400/10 bg-black/15 px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Weather</p>
              <p className="mt-2 text-xl font-semibold text-cyan-100">24°</p>
            </div>
          </div>
        </section>

        <section className="shrink-0">
          <p className="font-orbitron text-[10px] uppercase tracking-[0.45em] text-cyan-300/55">
            Live Activity Feed
          </p>
          <div className="mt-3 space-y-0">
            {activity.map((item, index) => (
              <TimelineItem
                key={`${item.title}-${index}`}
                title={item.title}
                meta={item.meta}
                tone={item.tone}
              />
            ))}
          </div>
        </section>
      </div>
    </aside>
  )
}

export default IntelligencePanel