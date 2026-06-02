function InputBar({ value, onChange, onSend, onFocus, onBlur, disabled }) {
  return (
    <div className="relative z-50 shrink-0 w-full max-w-5xl bg-transparent px-0 py-0">
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onSend()
        }}
      >
        <div className="flex items-center gap-3 rounded-[26px] border border-cyan-400/20 bg-[#07111f]/90 p-2.5 shadow-[0_0_34px_rgba(0,212,255,0.08)]">
          <input
            type="text"
            className="h-12 flex-1 rounded-[18px] border border-transparent bg-slate-950/70 px-4 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/40 focus:shadow-[0_0_20px_rgba(0,212,255,0.18)]"
            placeholder="Ask Jarvis anything..."
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            disabled={disabled}
          />

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