import clsx from 'clsx'
import { ArrowUp, Maximize2, Minimize2, RotateCcw, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Avatar, VerticeMark } from '../components/ui/Avatar'
import { SidePanel } from '../components/ui/Overlay'
import type { ChatAction, ChatBlock, ChatMessage } from '../domain/types'
import { contractPath, requestPath } from '../lib/routes'
import { useDemo } from '../store/demo'
import { useUi } from '../store/ui'
import { finishReveals, newId, reply } from './engine'
import { chipsFor } from './scripts'

const REVEAL_MS = 2400

/* ---------------- rendering ---------------- */

function useRevealProgress(msg: ChatMessage) {
  const updateChat = useDemo((s) => s.updateChat)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (msg.status !== 'revealing') return
    const start = performance.now()
    const t = window.setInterval(() => {
      const p = Math.min(1, (performance.now() - start) / REVEAL_MS)
      setProgress(p)
      if (p >= 1) {
        window.clearInterval(t)
        // Only complete if this message still exists (reset/checkpoint may have replaced the chat).
        if (useDemo.getState().chat.some((m) => m.id === msg.id)) updateChat(msg.id, { status: 'done' })
      }
    }, 40)
    return () => window.clearInterval(t)
  }, [msg.id, msg.status, updateChat])
  return msg.status === 'revealing' ? progress : 1
}

const blockWeight = (b: ChatBlock) => (b.kind === 'text' ? b.text.length : b.kind === 'table' ? 140 : b.kind === 'metrics' ? 80 : 30)

/** Fraction of each block revealed at overall progress p (blocks reveal in order). */
function revealFractions(blocks: ChatBlock[], p: number) {
  const weights = blocks.map(blockWeight)
  const total = weights.reduce((a, b) => a + b, 0)
  const target = p * total
  return weights.map((w, i) => {
    const before = weights.slice(0, i).reduce((a, b) => a + b, 0)
    return Math.max(0, Math.min(1, (target - before) / w))
  })
}

function Blocks({ blocks, progress, onAction }: { blocks: ChatBlock[]; progress: number; onAction: (a: ChatAction) => void }) {
  const fracs = revealFractions(blocks, progress)
  return (
    <div className="space-y-3">
      {blocks.map((b, i) => {
        const frac = fracs[i]
        if (frac <= 0) return null
        if (b.kind === 'text') {
          const shown = frac >= 1 ? b.text : b.text.slice(0, Math.floor(b.text.length * frac))
          return (
            <p
              key={i}
              className={clsx(
                'text-[13.5px] leading-relaxed',
                b.tone === 'caveat' ? 'rounded-lg bg-warning-tint/60 px-3 py-2 text-[12.5px] text-ink-2' : b.tone === 'muted' ? 'text-[12.5px] text-ink-3' : 'text-ink',
              )}
            >
              {shown}
              {frac < 1 && <span className="animate-caret ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-primary/60" />}
            </p>
          )
        }
        if (frac < 1) return null
        if (b.kind === 'metrics')
          return (
            <div key={i} className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {b.items.map((m) => (
                <div key={m.label} className={clsx('rounded-lg border px-3 py-2', m.accent ? 'border-success/40 bg-success-tint/40' : 'border-line')}>
                  <div className="text-[11.5px] text-ink-3">{m.label}</div>
                  <div className="mt-0.5 text-[16px] font-semibold text-ink tabular-nums">{m.value}</div>
                  {m.sub && <div className="text-[11.5px] text-ink-3">{m.sub}</div>}
                </div>
              ))}
            </div>
          )
        if (b.kind === 'table')
          return (
            <div key={i}>
              {b.title && <div className="mb-1.5 text-[12.5px] font-semibold text-ink">{b.title}</div>}
              <div className="overflow-x-auto rounded-lg border border-line">
                <table className="w-full text-[12.5px]">
                  <thead className="bg-canvas text-ink-3">
                    <tr>
                      {b.columns.map((c, ci) => (
                        <th key={ci} className={clsx('px-2.5 py-1.5 font-medium whitespace-nowrap', b.align?.[ci] === 'right' ? 'text-right' : 'text-left')}>
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, ri) => (
                      <tr key={ri} className="border-t border-line-soft">
                        {r.map((cell, ci) => (
                          <td
                            key={ci}
                            className={clsx('px-2.5 py-1.5 whitespace-nowrap tabular-nums', ci === 0 ? 'font-medium text-ink' : 'text-ink-2', b.align?.[ci] === 'right' && 'text-right')}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        return (
          <div key={i} className="flex flex-wrap gap-2 pt-1">
            {b.items.map((a) => (
              <button
                key={a.label}
                onClick={() => onAction(a)}
                className={clsx(
                  'inline-flex h-8 items-center rounded-[7px] px-3 text-[13px] font-medium',
                  a.primary ? 'bg-primary text-white hover:bg-primary-hover' : 'border border-line bg-white text-ink hover:bg-canvas',
                )}
              >
                {a.label}
              </button>
            ))}
          </div>
        )
      })}
    </div>
  )
}

function AssistantMessage({ msg, onAction, onRetry }: { msg: ChatMessage; onAction: (a: ChatAction) => void; onRetry: (m: ChatMessage) => void }) {
  const progress = useRevealProgress(msg)
  const updateChat = useDemo((s) => s.updateChat)
  return (
    <div className="flex gap-2.5">
      <VerticeMark className="mt-0.5 size-5 shrink-0" />
      <div className="min-w-0 flex-1">
        {msg.status === 'interrupted' ? (
          <div className="rounded-lg border border-line bg-canvas px-3 py-2.5 text-[13px] text-ink-3">
            This answer was interrupted by a page reload.{' '}
            <button className="inline-flex items-center gap-1 font-medium text-primary hover:underline" onClick={() => onRetry(msg)}>
              <RotateCcw className="size-3" /> Retry
            </button>
          </div>
        ) : (
          <>
            <Blocks blocks={msg.blocks ?? []} progress={progress} onAction={onAction} />
            <div className="mt-2 flex items-center gap-3 text-[11px] text-ink-4">
              <span>Scripted demo response · illustrative Northwind data</span>
              {msg.status === 'revealing' && (
                <button className="font-medium text-primary hover:underline" onClick={() => updateChat(msg.id, { status: 'done' })}>
                  Show answer
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ---------------- panel ---------------- */

export function AiLauncher() {
  const open = useUi((s) => s.aiOpen)
  const setOpen = useUi((s) => s.setAiOpen)
  const expanded = useUi((s) => s.aiExpanded)
  const setExpanded = useUi((s) => s.setAiExpanded)
  const chat = useDemo((s) => s.chat)
  const addChat = useDemo((s) => s.addChat)
  const removeAndReply = useDemo((s) => s.updateChat)
  const startRenewal = useDemo((s) => s.startRenewal)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Navigation finishes any in-flight reveal cleanly.
  useEffect(() => {
    finishReveals()
  }, [pathname])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [chat])

  const revealing = chat.some((m) => m.status === 'revealing')
  const chips = useMemo(() => chipsFor(pathname), [pathname])

  const send = (text: string) => {
    const prompt = text.trim()
    if (!prompt || revealing) return
    addChat({ id: newId(), role: 'user', text: prompt })
    addChat(reply(prompt))
    setInput('')
  }

  const retry = (m: ChatMessage) => {
    if (!m.prompt) return
    const fresh = reply(m.prompt)
    removeAndReply(m.id, { ...fresh, id: m.id })
  }

  const onAction = (a: ChatAction) => {
    finishReveals()
    if (typeof a.id === 'object' && 'advance' in a.id) {
      useDemo.getState().advance(a.id.advance, a.id.from as never, a.id.to as never)
      navigate(a.id.open)
    } else if (typeof a.id === 'object') navigate(a.id.open)
    else if (a.id === 'view-benchmark') navigate(contractPath('salesforce', 'benchmark'))
    else if (a.id === 'view-outcome') navigate(contractPath('salesforce', 'outcomes'))
    else if (a.id === 'start-renewal') {
      startRenewal() // guarded: reopens if it already exists
      navigate(requestPath)
    } else navigate(requestPath)
    setOpen(false)
  }

  const onOpenChange = (o: boolean) => {
    if (!o) finishReveals()
    setOpen(o)
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open Vertice AI"
          className="bg-ai-orb fixed right-6 bottom-6 z-30 flex size-12 items-center justify-center rounded-full text-white shadow-[0_8px_24px_-6px_rgb(96_0_240/0.6)] transition-transform hover:scale-105"
        >
          <Sparkles className="size-5" />
        </button>
      )}
      <SidePanel
        open={open}
        onOpenChange={onOpenChange}
        widthClass={expanded ? 'w-[min(820px,62vw)]' : 'w-[440px]'}
        title={
          <>
            <VerticeMark className="size-5" /> Vertice AI
          </>
        }
        headerActions={
          <button
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? 'Collapse panel' : 'Expand panel'}
            className="rounded-md p-1.5 text-ink-3 hover:bg-line-soft hover:text-ink"
          >
            {expanded ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          </button>
        }
      >
        <div className="flex h-full flex-col">
          <div ref={scrollRef} className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5">
            {chat.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <VerticeMark className="size-9" />
                <h2 className="mt-3 text-[17px] font-semibold text-ink">Hi Alex, how can I help today?</h2>
                <p className="mt-1 text-[12.5px] text-ink-3">Ask about your contracts, renewals and pricing.</p>
                <div className="mt-5 w-full space-y-2">
                  {chips.map((c, i) => (
                    <button
                      key={c.id}
                      onClick={() => send(c.chip)}
                      className={clsx(
                        'w-full rounded-xl border px-3.5 py-2.5 text-left text-[13px] hover:border-primary/50 hover:bg-primary-wash',
                        i < 2 ? 'border-primary/25 text-ink' : 'border-line text-ink-2',
                      )}
                    >
                      {c.chip}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              chat.map((m) =>
                m.role === 'user' ? (
                  <div key={m.id} className="flex justify-end gap-2">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-line-soft px-3.5 py-2 text-[13.5px] text-ink">{m.text}</div>
                    <Avatar name="Alex Morgan" tone="violet" />
                  </div>
                ) : (
                  <AssistantMessage key={m.id} msg={m} onAction={onAction} onRetry={retry} />
                ),
              )
            )}
            {chat.length > 0 && !revealing && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {chips.slice(0, 4).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => send(c.chip)}
                    className="rounded-full border border-line px-3 py-1 text-[12px] text-ink-2 hover:border-primary/50 hover:text-primary"
                  >
                    {c.chip}
                  </button>
                ))}
              </div>
            )}
          </div>
          <form
            className="border-t border-line p-3"
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
          >
            <div className="flex items-end gap-2 rounded-xl border border-line px-3 py-2 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/15">
              <textarea
                ref={inputRef}
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send(input)
                  }
                }}
                placeholder="Ask Vertice"
                aria-label="Ask Vertice"
                className="min-w-0 flex-1 resize-none bg-transparent text-[13.5px] text-ink outline-none placeholder:text-ink-4"
              />
              <button
                type="submit"
                disabled={!input.trim() || revealing}
                aria-label="Send"
                className="flex size-8 items-center justify-center rounded-lg bg-primary text-white disabled:opacity-40"
              >
                <ArrowUp className="size-4" />
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10.5px] text-ink-4">Scripted demo assistant · answers use fictional Northwind data</p>
          </form>
        </div>
      </SidePanel>
    </>
  )
}
