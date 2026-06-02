import { useEffect, useRef, useState } from 'react'
import { Conversation } from '@elevenlabs/client'

function ChatArea({ orbState, onToggleMic, messages = [], isLoading, children }) {
  const messagesEndRef = useRef(null)
  const conversationRef = useRef(null)
  const [isVoiceActive, setIsVoiceActive] = useState(false)

const handleMicClick = async () => {
  try {
    if (isVoiceActive && conversationRef.current) {
      await conversationRef.current.endSession()
      conversationRef.current = null
      setIsVoiceActive(false)
      if (typeof onToggleMic === 'function') onToggleMic()
    } else {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      conversationRef.current = await Conversation.startSession({
        agentId: 'agent_0601kt2ancttesc876z7r8ra89qb',
        onConnect: () => { 
          setIsVoiceActive(true)
          if (typeof onToggleMic === 'function') onToggleMic()
        },
        onDisconnect: () => { 
          setIsVoiceActive(false)
          conversationRef.current = null
        },
        onError: (err) => console.error('ElevenLabs Error:', err),
      })
    }
  } catch (err) {
    console.error('Mic error:', err)
  }
}
  const statusMap = {
    idle: 'Standing by...',
    listening: 'Audio intake active...',
    thinking: 'Processing...',
    speaking: 'Responding...',
    executing: 'Mission active...',
    error: 'System anomaly detected.',
  }

  const orbTextMap = {
    idle: 'IDLE',
    listening: 'LISTENING',
    thinking: 'THINKING',
    speaking: 'SPEAKING',
    executing: 'EXECUTING',
    error: 'ERROR',
  }

  const stateClassMap = {
    idle: 'is-idle',
    listening: 'is-listening',
    thinking: 'is-thinking',
    speaking: 'is-speaking',
    executing: 'is-executing',
    error: 'is-error',
  }

  const visibleState = orbTextMap[orbState] ? orbState : 'idle'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const visibleMessages = messages.length > 0

  return (
    <section className="flex flex-col h-full overflow-hidden rounded-[34px] border border-cyan-400/10 bg-[linear-gradient(180deg,rgba(3,8,18,0.18),rgba(2,6,14,0.08))] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-[1px]">
      <header className="shrink-0 flex flex-col items-center gap-2 pb-5">
        <div
          className={[
            'jarvis-orb-shell relative flex items-center justify-center shrink-0 rounded-full overflow-hidden',
            stateClassMap[visibleState],
          ].join(' ')}
          style={{ width: '120px', height: '120px', '--orb-size': '120px' }}
          aria-label={`Jarvis orb ${orbTextMap[orbState]}`}
        >
          <div className="jarvis-orb-core absolute inset-[8%] rounded-full" />
          <div className="jarvis-orb-rays absolute inset-0 rounded-full" />
          <div className="jarvis-orb-vortex absolute inset-[9%] rounded-full" />
          <div className="jarvis-orb-glow absolute inset-[-6%] rounded-full" />
          <div className="jarvis-orb-particles absolute inset-0 rounded-full" />

          {visibleState === 'listening' && (
            <>
              <div className="jarvis-orb-listening absolute inset-[4%] rounded-full" />
              <div className="jarvis-orb-listening jarvis-orb-listening-alt absolute inset-[14%] rounded-full" />
            </>
          )}
          {visibleState === 'thinking' && (
            <>
              <div className="jarvis-orb-thinking-ring absolute inset-[2%] rounded-full" />
              <div className="jarvis-orb-thinking-ring jarvis-orb-thinking-ring-alt absolute inset-[10%] rounded-full" />
            </>
          )}
          {visibleState === 'speaking' && (
            <div className="jarvis-orb-waveform absolute inset-[5%] rounded-full" />
          )}
          {visibleState === 'executing' && (
            <>
              <div className="jarvis-orb-executing-pulse absolute inset-[1%] rounded-full" />
              <div className="jarvis-orb-executing-scan absolute inset-[8%] rounded-full" />
            </>
          )}
          {visibleState === 'error' && (
            <div className="jarvis-orb-error-halo absolute inset-[3%] rounded-full" />
          )}

          <div className="relative z-10 flex h-[70px] w-[70px] items-center justify-center rounded-full border border-cyan-200/45 bg-[radial-gradient(circle,rgba(0,212,255,0.28),rgba(0,102,255,0.08)_65%,rgba(1,8,20,0.18)_100%)] shadow-[0_0_60px_rgba(0,212,255,0.35)]">
            <div className="font-orbitron text-[clamp(1.8rem,2.5vw,2.4rem)] tracking-[0.2em] text-cyan-50 drop-shadow-[0_0_20px_rgba(0,212,255,0.8)]">
              J
            </div>
          </div>
          <div className="jarvis-orb-ring absolute inset-0 rounded-full" />
          <div className="jarvis-orb-ring jarvis-orb-ring-alt absolute inset-[7%] rounded-full" />
        </div>

        <div className="text-center">
          <p className="font-orbitron text-[clamp(0.95rem,1.3vw,1.2rem)] tracking-[0.38em] text-slate-50">
            JARVIS
          </p>
          <p className="mt-1 font-rajdhani text-[0.7rem] uppercase tracking-[0.34em] text-cyan-200/80">
            {statusMap[visibleState]}
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/[0.03] px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-cyan-100/80">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(0,212,255,0.95)]" />
            {isVoiceActive ? 'VOICE ACTIVE' : orbTextMap[visibleState]}
          </div>

          <button
            type="button"
            onClick={handleMicClick}
            className={[
              'relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border text-white transition duration-300',
              isVoiceActive
                ? 'border-red-400/70 bg-[radial-gradient(circle,rgba(255,80,80,0.98),rgba(200,0,0,0.78)_58%,rgba(150,0,0,0.92))] shadow-[0_0_24px_rgba(255,0,0,0.62)] animate-pulse'
                : 'border-cyan-100/70 bg-[radial-gradient(circle,rgba(72,223,255,0.98),rgba(0,153,255,0.78)_58%,rgba(0,82,196,0.92))] shadow-[0_0_24px_rgba(0,212,255,0.62)]',
            ].join(' ')}
            aria-label="Microphone button"
          >
            <span className="text-base leading-none">{isVoiceActive ? '⏹' : '🎙'}</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 flex-col min-h-0 overflow-hidden rounded-[30px] border border-cyan-400/10 bg-[linear-gradient(180deg,rgba(2,7,16,0.42),rgba(3,8,18,0.22))] shadow-[inset_0_0_0_1px_rgba(0,212,255,0.03)]">
        <div className="flex-1 overflow-y-auto min-h-0 px-4 py-3" style={{ touchAction: 'pan-y' }}>
          <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col justify-end gap-5">
            {visibleMessages ? (
              messages.map((message, index) => {
                const isJarvis = message.role === 'jarvis'
                return (
                  <article
                    key={`${message.role}-${index}-${message.content.slice(0, 24)}`}
                    className={['flex w-full', isJarvis ? 'justify-start' : 'justify-end'].join(' ')}
                  >
                    <div className={['max-w-[90%] px-1 py-0', isJarvis ? 'text-slate-50' : 'text-cyan-50'].join(' ')}>
                      <p className="whitespace-pre-wrap px-1 py-1 text-[0.98rem] leading-7 text-slate-50/98">
                        {message.content}
                      </p>
                    </div>
                  </article>
                )
              })
            ) : (
              <div className="flex min-h-[180px] items-center justify-center rounded-[24px] border border-dashed border-cyan-400/12 bg-white/[0.02] px-6 py-8 text-center text-sm leading-6 text-slate-400">
                Jarvis is ready. Send a command below and the conversation will appear here.
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-[22px] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(6,16,31,0.72),rgba(4,10,20,0.56))] px-4 py-3 text-cyan-100 shadow-[0_0_24px_rgba(0,0,0,0.14)] backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(0,212,255,0.9)]" />
                    <span className="text-[10px] uppercase tracking-[0.34em] text-cyan-200/75">
                      Jarvis is responding
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <footer className="shrink-0 border-t border-cyan-400/10 px-4 py-4">
          <div className="mx-auto w-full max-w-5xl space-y-2">
            {children}
          </div>
        </footer>
      </div>
    </section>
  )
}

export default ChatArea
