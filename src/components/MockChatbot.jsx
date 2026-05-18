import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { MessageCircle, Send, Sparkles, X } from 'lucide-react'

const WELCOME_TEXT =
  "Hi — I'm a demo assistant for this site. Ask me anything; you'll get mocked replies (no backend yet). Try “pricing”, “features”, or “hello”."

/** @typedef {{ id: string; role: 'user' | 'assistant'; text: string }} ChatMessage */

function makeMockReply(userText) {
  const t = userText.toLowerCase().trim()
  if (!t) {
    return 'Type a message and I’ll respond with a demo answer.'
  }
  if (/^(hi|hello|hey)\b/.test(t)) {
    return 'Hello! I’m here to showcase a chat UI. Real answers would come from your AI service later.'
  }
  if (/price|pricing|cost|plan|billing/.test(t)) {
    return 'This is a mock: pricing would load from your product or CRM. For now, imagine flexible tiers for teams of any size.'
  }
  if (/feature|what can|capabilities|ats/.test(t)) {
    return 'In production, I’d summarize your ATS: sourcing, pipelines, scheduling, analytics — all synced to your branding.'
  }
  if (/demo|trial|signup|book|contact|sales/.test(t)) {
    return 'Great timing — use the CTAs on the page for a real signup flow. Here I’d hand off to calendars or forms.'
  }
  if (/help|support|how/.test(t)) {
    return 'Try short questions like “pricing” or “features”. Anything else gets a rotating placeholder reply.'
  }
  if (/thank/.test(t)) {
    return 'You’re welcome! Ping me anytime (still mock mode).'
  }
  const canned = [
    'Good question — in the shipped product I’d pull answers from your knowledge base or live data.',
    'Demo mode only: plug in OpenAI / your LLM API here when you’re ready.',
    'I’d route this to specialized tools (search, ticketing, CRM) once wired up.',
  ]
  let h = 0
  for (let i = 0; i < t.length; i += 1) h = (h + t.charCodeAt(i) * (i + 1)) % canned.length
  return canned[h]
}

export default function MockChatbot() {
  const titleId = useId()
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const replyTimerRef = useRef(0)

  /** @type {[ChatMessage[], React.Dispatch<React.SetStateAction<ChatMessage[]>>]} */
  const [messages, setMessages] = useState(() => [
    { id: 'welcome', role: 'assistant', text: WELCOME_TEXT },
  ])
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages, open])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    return () => {
      if (replyTimerRef.current) window.clearTimeout(replyTimerRef.current)
    }
  }, [])

  const pushAssistantLater = useCallback((text, delayMs) => {
    if (replyTimerRef.current) window.clearTimeout(replyTimerRef.current)
    replyTimerRef.current = window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${crypto.randomUUID()}`,
          role: 'assistant',
          text,
        },
      ])
      replyTimerRef.current = 0
    }, delayMs)
  }, [])

  function sendDraft() {
    const text = draft.trim()
    if (!text) return
    setDraft('')
    const userMsg = { id: `u-${crypto.randomUUID()}`, role: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    const reply = makeMockReply(text)
    pushAssistantLater(reply, 500 + Math.min(450, text.length * 18))
  }

  return (
    <div className="pointer-events-none fixed bottom-0 right-0 z-[100] flex flex-col items-end gap-3 p-3 safe-bottom safe-right sm:p-6">
      <div
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        className={`pointer-events-auto flex w-[min(calc(100vw-2rem),22rem)] max-h-[min(70vh,28rem)] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-white/15 bg-[var(--app-bg)]/95 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/5 backdrop-blur-md transition-[opacity,transform,visibility] duration-200 dark:border-white/10 ${
          open
            ? 'visible translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none invisible translate-y-3 scale-95 opacity-0'
        }`}
      >
        <header className="flex items-start justify-between gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--accent-rgb))]/20">
                <Sparkles className="h-4 w-4 text-[rgb(var(--accent-rgb))]" aria-hidden />
              </span>
              <div>
                <h2 id={titleId} className="truncate text-sm font-semibold text-[var(--app-fg)]">
                  ATS assistant
                </h2>
                <p className="text-[11px] text-[var(--app-fg)]/55">Demo · mocked replies</p>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg p-1.5 text-[var(--app-fg)]/60 transition hover:bg-white/10 hover:text-[var(--app-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--accent-rgb))]"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div
          ref={scrollRef}
          className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-3"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-snug ${
                  m.role === 'user'
                    ? 'rounded-br-md bg-[rgb(var(--accent-rgb))] text-[rgb(var(--accent-contrast-rgb))]'
                    : 'rounded-bl-md border border-white/10 bg-white/[0.06] text-[var(--app-fg)]/90'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <footer className="border-t border-white/10 bg-white/[0.03] p-3">
          <div className="flex items-end gap-2 rounded-xl border border-white/12 bg-white/[0.04] p-1.5 focus-within:ring-2 focus-within:ring-[rgb(var(--accent-rgb))]/35">
            <textarea
              rows={1}
              value={draft}
              placeholder="Ask something…"
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendDraft()
                }
              }}
              className="max-h-24 min-h-[2.5rem] w-full resize-none bg-transparent px-2 py-2 text-sm text-[var(--app-fg)] placeholder:text-[var(--app-fg)]/35 focus:outline-none"
            />
            <button
              type="button"
              onClick={sendDraft}
              disabled={!draft.trim()}
              className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--accent-rgb))] text-[rgb(var(--accent-contrast-rgb))] transition enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--accent-rgb))]"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </footer>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full shadow-[0_12px_40px_-12px_rgba(var(--accent-rgb),0.85)] ring-4 ring-black/25 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--accent-rgb))] ${
          open
            ? 'bg-[rgb(var(--accent-rgb))] text-[rgb(var(--accent-contrast-rgb))]'
            : 'animate-pulse-soft bg-[rgb(var(--accent-rgb))] text-[rgb(var(--accent-contrast-rgb))]'
        }`}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
      >
        {open ? (
          <X className="h-6 w-6" aria-hidden />
        ) : (
          <MessageCircle className="h-6 w-6" aria-hidden />
        )}
      </button>
    </div>
  )
}
