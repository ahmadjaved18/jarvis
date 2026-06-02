import { useEffect, useMemo, useRef, useState } from 'react'
import ChatArea from './components/ChatArea.jsx'
import IntelligencePanel from './components/IntelligencePanel.jsx'
import InputBar from './components/InputBar.jsx'
import TaskStatusLine from './components/TaskStatusLine.jsx'
import Sidebar from './components/Sidebar.jsx'

const WEBHOOK_URL = 'https://bulgur-savanna-foyer.ngrok-free.dev/webhook/n8n'

const QUICK_ACTIONS = [
  {
    label: 'Morning Brief',
    query: 'Give me my full morning briefing',
  },
  {
    label: 'Find Jobs',
    query: 'Find me the latest AI and ML internships in Pakistan',
  },
  {
    label: 'Check Emails',
    query: 'Summarize my inbox and highlight urgent emails',
  },
  {
    label: 'My Calendar',
    query: 'What do I have on my calendar this week?',
  },
]

const INITIAL_MESSAGES = [
  {
    role: 'jarvis',
    content: "Welcome back, Ahmad. I've got your emails, calendar, and the web at the ready.",
  },
]

const TASK_SEQUENCE = [
  'Searching Sources',
  'Analyzing Results',
  'Ranking Opportunities',
  'Generating Response',
]

const CAPABILITIES = [
  {
    id: 'email-assistant',
    icon: '✉',
    title: 'Email Assistant',
    description: 'Sort, summarize, and prioritize messages with a future-ready mail workflow.',
    statusLabel: 'Connected',
    statusTone: 'connected',
    futureReady: 'n8n inbox pipeline',
  },
  {
    id: 'calendar-manager',
    icon: '◷',
    title: 'Calendar Manager',
    description: 'Schedule, inspect, and coordinate meetings across your daily agenda.',
    statusLabel: 'Ready',
    statusTone: 'ready',
    futureReady: 'event automation',
  },
  {
    id: 'weather-intelligence',
    icon: '☁',
    title: 'Weather Intelligence',
    description: 'Pull live conditions and forecast data for mission planning.',
    statusLabel: 'Ready',
    statusTone: 'ready',
    futureReady: 'live API stream',
  },
  {
    id: 'web-research',
    icon: '⌁',
    title: 'Web Research',
    description: 'Collect and synthesize web results for fast research briefs.',
    statusLabel: 'Beta',
    statusTone: 'beta',
    futureReady: 'search agent link',
  },
  {
    id: 'morning-briefing',
    icon: '☼',
    title: 'Morning Briefing',
    description: 'Generate a compact overview of your day, tasks, and priorities.',
    statusLabel: 'Ready',
    statusTone: 'ready',
    futureReady: 'daily orchestration',
  },
  {
    id: 'job-hunter',
    icon: '⌂',
    title: 'Job Hunter',
    description: 'Discover and rank roles, internships, and opportunities by relevance.',
    statusLabel: 'Connected',
    statusTone: 'connected',
    futureReady: 'opportunity search',
  },
  {
    id: 'memory-system',
    icon: '◈',
    title: 'Memory System',
    description: 'Store context, preferences, and mission history for later retrieval.',
    statusLabel: 'Ready',
    statusTone: 'ready',
    futureReady: 'persistent context',
  },
  {
    id: 'automation-engine',
    icon: '⚙',
    title: 'Automation Engine',
    description: 'Trigger chained workflows and orchestrate agent actions on demand.',
    statusLabel: 'Future',
    statusTone: 'comingSoon',
    futureReady: 'n8n execution layer',
  },
]

const PROACTIVE_ITEMS = [
  {
    id: 'emails-3-unread',
    title: 'You have 3 unread emails.',
    description: 'Jarvis detected incoming messages that need attention and can summarize them on request.',
    priority: 'critical',
    priorityLabel: 'Critical',
    timestamp: 'Just now',
    source: 'mail',
    action: 'summarize-emails',
  },
  {
    id: 'meeting-45-minutes',
    title: 'Meeting starts in 45 minutes.',
    description: 'A calendar checkpoint is approaching. Jarvis can prepare a quick briefing or reminder.',
    priority: 'high',
    priorityLabel: 'High',
    timestamp: 'Today',
    source: 'calendar',
    action: 'prepare-meeting',
  },
  {
    id: 'internships-5-found',
    title: '5 new AI internships found.',
    description: 'Fresh opportunities were surfaced and can be ranked by fit, location, and skill match.',
    priority: 'medium',
    priorityLabel: 'Medium',
    timestamp: 'Today',
    source: 'jobs',
    action: 'review-internships',
  },
  {
    id: 'weather-warning-today',
    title: 'Weather warning today.',
    description: 'Jarvis noticed a weather condition that may affect your schedule or travel planning.',
    priority: 'low',
    priorityLabel: 'Low',
    timestamp: 'Today',
    source: 'weather',
    action: 'open-weather-alert',
  },
]

function createTaskLine(query) {
  return {
    visible: true,
    state: 'running',
    text: `${TASK_SEQUENCE[0]}...`,
    tasks: TASK_SEQUENCE,
    activeIndex: 0,
    query,
  }
}

function createResolvedTaskLine(state, text) {
  return {
    visible: true,
    state,
    text,
    tasks: [],
    activeIndex: 0,
    query: '',
  }
}

const SYSTEM_LOG_LIMIT = 60

function formatConsoleTime(timestamp = new Date()) {
  return timestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function createSystemLog(message, tone = 'info', detail = '') {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    time: formatConsoleTime(),
    message,
    detail,
    tone,
  }
}

function normalizeSystemLogEntry(entry, index = 0) {
  if (typeof entry === 'string') {
    return createSystemLog(entry, 'info')
  }

  if (entry && typeof entry === 'object') {
    return {
      id: entry.id ?? `${Date.now()}-${index}`,
      time:
        entry.time ??
        entry.timestamp ??
        formatConsoleTime(entry.timestamp ? new Date(entry.timestamp) : new Date()),
      message: entry.message ?? entry.label ?? entry.text ?? `Log ${index + 1}`,
      detail: entry.detail ?? entry.description ?? '',
      tone: entry.tone ?? entry.status ?? 'info',
    }
  }

  return createSystemLog(`Log ${index + 1}`, 'info')
}

function normalizeResponse(data) {
  if (typeof data === 'string') {
    return data.trim()
  }

  const candidate =
    data?.response ??
    data?.message ??
    data?.text ??
    data?.output ??
    data?.answer ??
    data?.reply ??
    data?.result ??
    data?.content ??
    data?.data

  if (typeof candidate === 'string') {
    return candidate.trim()
  }

  if (candidate && typeof candidate === 'object') {
    return JSON.stringify(candidate, null, 2)
  }

  return 'I received a response, but it did not include readable content.'
}

function App() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [orbState, setOrbState] = useState('idle')
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [historyExpanded, setHistoryExpanded] = useState(true)
  const [taskLine, setTaskLine] = useState(() => ({
    visible: false,
    state: 'idle',
    text: '',
    tasks: [],
    activeIndex: 0,
    query: '',
  }))
  const [systemLogs, setSystemLogs] = useState(() => [
    createSystemLog('Gmail Connected', 'success', 'Email bridge online'),
    createSystemLog('Memory Loaded', 'info', 'Persistent context restored'),
    createSystemLog('Weather Updated', 'info', 'Live forecast synchronized'),
    createSystemLog('Voice Session Started', 'live', 'Audio pipeline ready'),
  ])
  const [activeCapabilityId, setActiveCapabilityId] = useState('email-assistant')
  const [proactiveItems, setProactiveItems] = useState(() => PROACTIVE_ITEMS)
  const transitionTimerRef = useRef(null)
  const returnTimerRef = useRef(null)
  const taskAdvanceTimerRef = useRef(null)
  const taskHideTimerRef = useRef(null)
  const systemStreamTimerRef = useRef(null)

  useEffect(() => {
    const syncAppHeight = () => {
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
    }

    syncAppHeight()
    window.addEventListener('orientationchange', syncAppHeight)

    return () => {
      window.removeEventListener('orientationchange', syncAppHeight)
    }
  }, [])

  const clearTransitionTimer = () => {
    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current)
      transitionTimerRef.current = null
    }
  }

  const clearReturnTimer = () => {
    if (returnTimerRef.current) {
      window.clearTimeout(returnTimerRef.current)
      returnTimerRef.current = null
    }
  }

  const clearTaskAdvanceTimer = () => {
    if (taskAdvanceTimerRef.current) {
      window.clearInterval(taskAdvanceTimerRef.current)
      taskAdvanceTimerRef.current = null
    }
  }

  const clearTaskHideTimer = () => {
    if (taskHideTimerRef.current) {
      window.clearTimeout(taskHideTimerRef.current)
      taskHideTimerRef.current = null
    }
  }

  const clearSystemStreamTimer = () => {
    if (systemStreamTimerRef.current) {
      window.clearInterval(systemStreamTimerRef.current)
      systemStreamTimerRef.current = null
    }
  }

  const pushSystemLog = (message, tone = 'info', detail = '') => {
    setSystemLogs((current) =>
      [...current, createSystemLog(message, tone, detail)].slice(-SYSTEM_LOG_LIMIT),
    )
  }

  const pushSystemLogs = (entries) => {
    const normalized = entries.map((entry, index) => normalizeSystemLogEntry(entry, index))

    setSystemLogs((current) => [...current, ...normalized].slice(-SYSTEM_LOG_LIMIT))
  }

  const handleSelectCapability = (capability) => {
    setActiveCapabilityId(capability.id)
    pushSystemLog(
      `Capability selected: ${capability.title}`,
      'live',
      `${capability.futureReady} | ready for n8n action binding`,
    )
  }

  const normalizeProactiveItem = (item, index = 0) => {
    if (typeof item === 'string') {
      return {
        id: `${Date.now()}-${index}`,
        title: item,
        description: '',
        priority: 'medium',
        priorityLabel: 'Medium',
        timestamp: formatConsoleTime(),
        source: 'n8n',
        action: 'open-item',
      }
    }

    return {
      id: item.id ?? `${Date.now()}-${index}`,
      title: item.title ?? item.message ?? item.label ?? `Recommendation ${index + 1}`,
      description: item.description ?? item.detail ?? '',
      priority: item.priority ?? 'medium',
      priorityLabel:
        item.priorityLabel ??
        (item.priority ? item.priority.charAt(0).toUpperCase() + item.priority.slice(1) : 'Medium'),
      timestamp: item.timestamp ?? item.time ?? formatConsoleTime(),
      source: item.source ?? 'n8n',
      action: item.action ?? item.actionType ?? 'open-item',
    }
  }

  const pushProactiveItems = (items) => {
    const normalized = items.map((item, index) => normalizeProactiveItem(item, index))

    setProactiveItems((current) => [...current, ...normalized].slice(0, 12))
  }

  const handleSelectProactiveItem = (item) => {
    pushSystemLog(`Recommendation selected: ${item.title}`, 'live', `Action: ${item.action}`)
  }

  const handleDismissProactiveItem = (id) => {
    setProactiveItems((current) => current.filter((item) => item.id !== id))
    pushSystemLog('Recommendation dismissed', 'info', `Item ${id} removed from view`)
  }

  const startSystemStream = (query) => {
    clearSystemStreamTimer()

    const sequence = [
      {
        message: 'Command received',
        tone: 'info',
        detail: query,
      },
      {
        message: 'Searching Sources',
        tone: 'live',
        detail: 'Querying connected systems and indexed sources',
      },
      {
        message: 'Analyzing Results',
        tone: 'live',
        detail: 'Filtering and scoring candidate matches',
      },
      {
        message: 'Ranking Opportunities',
        tone: 'live',
        detail: 'Prioritizing the most relevant outcomes',
      },
    ]

    let index = 0

    pushSystemLog(sequence[index].message, sequence[index].tone, sequence[index].detail)

    systemStreamTimerRef.current = window.setInterval(() => {
      index += 1

      if (index >= sequence.length) {
        clearSystemStreamTimer()
        return
      }

      pushSystemLog(sequence[index].message, sequence[index].tone, sequence[index].detail)
    }, 850)
  }

  const transitionToSpeaking = () => {
    clearTransitionTimer()
    transitionTimerRef.current = window.setTimeout(() => {
      setOrbState('speaking')
      transitionTimerRef.current = null
    }, 650)
  }

  useEffect(() => {
    clearReturnTimer()

    if (!['executing', 'speaking', 'error'].includes(orbState)) {
      return undefined
    }

    const durationByState = {
      executing: 1200,
      speaking: 2400,
      error: 2800,
    }

    returnTimerRef.current = window.setTimeout(() => {
      setOrbState(isInputFocused ? 'listening' : 'idle')
      returnTimerRef.current = null
    }, durationByState[orbState])

    return () => clearReturnTimer()
  }, [isInputFocused, orbState])

  useEffect(() => {
    return () => {
      clearTransitionTimer()
      clearReturnTimer()
      clearTaskAdvanceTimer()
      clearTaskHideTimer()
      clearSystemStreamTimer()
    }
  }, [])

  // Fallback global click handler: toggle listening when mic button is clicked
  useEffect(() => {
    const onDocumentClick = (e) => {
      try {
        const target = e.target
        if (!target || !target.closest) return
        const mic = target.closest('button[aria-label="Microphone button"]')
        if (!mic) return
        setOrbState((current) => {
          if (['speaking', 'executing', 'thinking', 'error'].includes(current)) return current
          return current === 'listening' ? 'idle' : 'listening'
        })
      } catch (err) {
        // ignore
      }
    }

    document.addEventListener('click', onDocumentClick)
    return () => document.removeEventListener('click', onDocumentClick)
  }, [])

  useEffect(() => {
    clearTaskAdvanceTimer()

    if (!taskLine.visible || taskLine.state !== 'running' || taskLine.tasks.length === 0) {
      return undefined
    }

    taskAdvanceTimerRef.current = window.setInterval(() => {
      setTaskLine((current) => {
        if (!current.visible || current.state !== 'running' || current.tasks.length === 0) {
          return current
        }

        const nextIndex = Math.min(current.activeIndex + 1, current.tasks.length - 1)

        if (nextIndex === current.activeIndex) {
          return current
        }

        return {
          ...current,
          activeIndex: nextIndex,
          text: `${current.tasks[nextIndex]}...`,
        }
      })
    }, 1200)

    return () => clearTaskAdvanceTimer()
  }, [taskLine.state, taskLine.tasks.length, taskLine.visible])

  const conversationHistory = useMemo(() => {
    return messages
      .filter((message) => message.role === 'user')
      .slice(-6)
      .reverse()
  }, [messages])

  const activeCapability = useMemo(() => {
    return CAPABILITIES.find((capability) => capability.id === activeCapabilityId) ?? CAPABILITIES[0]
  }, [activeCapabilityId])

  const sendQuery = async (query) => {
    const trimmedQuery = query.trim()

    if (!trimmedQuery || isLoading) {
      return
    }

    clearTransitionTimer()
    clearReturnTimer()
    clearTaskHideTimer()
    clearSystemStreamTimer()
    setTaskLine(createTaskLine(trimmedQuery))
    startSystemStream(trimmedQuery)
    setOrbState('thinking')
    setMessages((current) => [...current, { role: 'user', content: trimmedQuery }])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({ query: trimmedQuery }),
      })

      const rawPayload = await response.text()
      let parsedPayload = rawPayload

      try {
        parsedPayload = JSON.parse(rawPayload)
      } catch {
        parsedPayload = rawPayload
      }

      if (!response.ok) {
        throw new Error(
          typeof parsedPayload === 'string'
            ? parsedPayload || `Request failed with status ${response.status}`
            : `Request failed with status ${response.status}`,
        )
      }

      if (parsedPayload && typeof parsedPayload === 'object') {
        const payloadTaskLine = parsedPayload.taskLine ?? parsedPayload.mission?.taskLine
        const payloadConsoleLogs =
          parsedPayload.systemLogs ??
          parsedPayload.console?.logs ??
          parsedPayload.consoleLogs ??
          parsedPayload.logs
        const payloadRecommendations =
          parsedPayload.proactiveItems ??
          parsedPayload.recommendations ??
          parsedPayload.notifications

        if (Array.isArray(payloadConsoleLogs) && payloadConsoleLogs.length > 0) {
          pushSystemLogs(payloadConsoleLogs)
        }

        if (Array.isArray(payloadRecommendations) && payloadRecommendations.length > 0) {
          pushProactiveItems(payloadRecommendations)
        }

        if (payloadTaskLine) {
          const payloadTasks = Array.isArray(payloadTaskLine.tasks)
            ? payloadTaskLine.tasks
                .map((task) => {
                  if (typeof task === 'string') {
                    return task
                  }

                  return task?.label ?? task?.name ?? task?.text ?? ''
                })
                .filter(Boolean)
            : []

          if (payloadTasks.length > 0) {
            setTaskLine({
              visible: payloadTaskLine.visible ?? true,
              state: payloadTaskLine.state ?? 'running',
              text:
                payloadTaskLine.text ?? `${payloadTasks[0]}...`,
              tasks: payloadTasks,
              activeIndex: typeof payloadTaskLine.activeIndex === 'number' ? payloadTaskLine.activeIndex : 0,
              query: payloadTaskLine.query ?? trimmedQuery,
            })
          }
        }
      }

      const replyText = normalizeResponse(parsedPayload)

      setOrbState('executing')
      setMessages((current) => [
        ...current,
        { role: 'jarvis', content: replyText },
      ])
      setTaskLine(createResolvedTaskLine('success', 'Mission complete'))
      clearTaskHideTimer()
      clearSystemStreamTimer()
      taskHideTimerRef.current = window.setTimeout(() => {
        setTaskLine((current) => ({ ...current, visible: false }))
        taskHideTimerRef.current = null
      }, 1100)
      pushSystemLog('Response delivered', 'success', 'System console updated')
      transitionToSpeaking()
    } catch (error) {
      clearTransitionTimer()
      setOrbState('error')
      setTaskLine(createResolvedTaskLine('error', 'Mission error'))
      clearTaskHideTimer()
      clearSystemStreamTimer()
      taskHideTimerRef.current = window.setTimeout(() => {
        setTaskLine((current) => ({ ...current, visible: false }))
        taskHideTimerRef.current = null
      }, 1400)
      pushSystemLog(
        'Connection error',
        'error',
        error instanceof Error ? error.message : 'Unable to complete request',
      )
      setMessages((current) => [
        ...current,
        {
          role: 'jarvis',
          content:
            error instanceof Error
              ? `Connection error: ${error.message}. Please make sure the webhook is running at ${WEBHOOK_URL}.`
              : `Connection error: I could not reach ${WEBHOOK_URL}.`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSend = () => {
    void sendQuery(inputValue)
  }

  const handleQuickAction = (query) => {
    void sendQuery(query)
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed((current) => !current)
  }

  const handleInputFocus = () => {
    setIsInputFocused(true)
  }

  const handleInputBlur = () => {
    setIsInputFocused(false)

    if (!isLoading && orbState === 'listening') {
      setOrbState('idle')
    }
  }

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES)
  }

  const handleToggleMic = () => {
    setOrbState((current) => {
      // Only toggle between idle and listening. Ignore during other transient states.
      if (['speaking', 'executing', 'thinking', 'error'].includes(current)) return current
      const next = current === 'listening' ? 'idle' : 'listening'
      try {
        document.documentElement.setAttribute('data-orb-state', next)
      } catch (e) {
        // ignore
      }
      return next
    })
  }

return (
    <div
      className="fixed left-0 top-0 flex flex-row overflow-hidden bg-slate-950"
      style={{
        height: 'var(--app-height, 100vh)',
        width: '100vw',
        touchAction: 'none',
        overscrollBehavior: 'none',
      }}
    >
      
      {/* BACKGROUND SCENE */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(0,212,255,0.18),_transparent_34%),radial-gradient(circle_at_80%_20%,_rgba(0,102,255,0.2),_transparent_22%),linear-gradient(180deg,_#05070d_0%,_#03040a_100%)]" />

      {/* 1. LEFT PANEL */}
      <div
        className={[
          'group relative z-30 h-full shrink-0 border-r border-cyan-900/30 transition-[width] duration-300 ease-out',
          isSidebarCollapsed ? 'w-4' : 'w-[320px]',
        ].join(' ')}
      >
        <button
          type="button"
          className={[
            'absolute top-4 z-[60] inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/35 bg-slate-950/90 text-cyan-100 shadow-[0_0_24px_rgba(0,212,255,0.22)] backdrop-blur-xl transition hover:border-cyan-200/70 hover:bg-cyan-400/15 hover:shadow-[0_0_34px_rgba(0,212,255,0.32)]',
            isSidebarCollapsed ? '-right-5' : '-right-5',
          ].join(' ')}
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!isSidebarCollapsed}
          onClick={toggleSidebar}
        >
          <span className={['text-xl leading-none transition-transform duration-300', isSidebarCollapsed ? 'rotate-180' : 'rotate-0'].join(' ')}>
            ›
          </span>
        </button>
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          quickActions={QUICK_ACTIONS}
          onQuickAction={handleQuickAction}
          conversationHistory={conversationHistory}
          historyExpanded={historyExpanded}
          onToggleHistory={() => setHistoryExpanded((current) => !current)}
          orbState={orbState}
          isLoading={isLoading}
          activeCapabilityLabel={activeCapability?.title}
          proactiveCount={proactiveItems.length}
          messages={messages}
          onClearChat={handleClearChat}
        />
      </div>

      {/* 2. CENTER PANEL */}
      <div className="flex-1 h-full min-h-0 min-w-0 flex flex-col overflow-hidden">
        <ChatArea messages={messages} orbState={orbState} isLoading={isLoading} onToggleMic={handleToggleMic} onClearChat={handleClearChat}>
          <div className="mx-auto w-full max-w-5xl space-y-2">
            <TaskStatusLine taskLine={taskLine} />
            <InputBar
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSend}
              disabled={isLoading}
            />
          </div>
        </ChatArea>
      </div>

      {/* 3. RIGHT PANEL */}
      <div className="w-[350px] shrink-0 h-full border-l border-cyan-900/30 overflow-y-auto p-4 z-10 relative">
        <IntelligencePanel
          orbState={orbState}
          isLoading={isLoading}
          messages={messages}
          systemLogs={systemLogs}
          capabilities={CAPABILITIES}
          onSelectCapability={handleSelectCapability}
          activeCapabilityId={activeCapabilityId}
          proactiveItems={proactiveItems}
          onSelectProactiveItem={handleSelectProactiveItem}
          onDismissProactiveItem={handleDismissProactiveItem}
        />
      </div>

    </div>
  );
}

export default App;