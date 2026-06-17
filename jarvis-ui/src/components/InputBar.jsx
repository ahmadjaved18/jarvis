import { useState, useRef } from 'react'

function InputBar({ value, onChange, onSend, onFocus, onBlur, disabled }) {
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

  async function startVoiceRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        if (audioChunksRef.current.length === 0) {
          setIsRecording(false)
          return
        }
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        await sendToTranscribe(audioBlob)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (err) {
      console.warn('Mic permission denied:', err)
    }
  }

  function stopVoiceRecording() {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  async function sendToTranscribe(audioBlob) {
    try {
      const formData = new FormData()
      formData.append('audio', audioBlob, 'recording.webm')

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok && data.text) {
        onSend(data.text)
      }
    } catch (err) {
      console.warn('Transcription failed:', err)
    }
  }

  const handleMicClick = () => {
    if (isRecording) {
      stopVoiceRecording()
    } else {
      void startVoiceRecording()
    }
  }

  return (
    <div className="relative z-50 shrink-0 w-full max-w-5xl bg-transparent px-0 py-0">
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onSend()
        }}
      >
        <div className="flex items-center gap-3 rounded-[26px] border border-cyan-400/20 bg-[#07111f]/90 p-2.5 shadow-[0_0_34px_rgba(0,212,255,0.08)]">
          <div className="relative flex-1">
            <input
              type="text"
              className="h-12 w-full rounded-[18px] border border-transparent bg-slate-950/70 pr-12 pl-4 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/40 focus:shadow-[0_0_20px_rgba(0,212,255,0.18)]"
              placeholder="Ask Jarvis anything..."
              value={value}
              onChange={(event) => onChange(event.target.value)}
              onFocus={onFocus}
              onBlur={onBlur}
              disabled={disabled}
            />
            <button
              type="button"
              onClick={handleMicClick}
              className={[
                'absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-50',
                isRecording
                  ? 'text-red-400 bg-red-400/20 shadow-[0_0_12px_rgba(255,0,0,0.5)] animate-pulse'
                  : 'text-cyan-300/70 hover:text-cyan-200 hover:bg-cyan-400/10'
              ].join(' ')}
              aria-label="Microphone button"
              disabled={disabled}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </button>
          </div>

          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-[18px] border border-cyan-300/40 bg-[linear-gradient(180deg,rgba(0,212,255,0.28),rgba(0,102,255,0.42))] px-5 text-sm font-semibold tracking-[0.16em] text-cyan-50 shadow-[0_0_30px_rgba(0,212,255,0.28)] transition hover:-translate-y-0.5 hover:border-cyan-200/60 hover:shadow-[0_0_38px_rgba(0,212,255,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={disabled || !value.trim()}
          >
            SEND
          </button>
        </div>
      </form>
    </div>
  )
}

export default InputBar