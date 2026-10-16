/**
 * Reply construction for the scripted assistant, shared by the panel and by
 * page-level "Ask Vertice AI" buttons.
 */
import { scenarioStage } from '../domain/selectors'
import type { ChatMessage, DemoState } from '../domain/types'
import { useDemo } from '../store/demo'
import { useUi } from '../store/ui'
import { fallbackBlocks, matchPrompt } from './scripts'

export const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

let seq = 0
export const newId = () => `m${Date.now().toString(36)}${(seq++).toString(36)}`

const snapshot = (): DemoState => {
  const s = useDemo.getState()
  return { request: s.request, draft: s.draft, futureTerms: s.futureTerms, savingsEntries: s.savingsEntries, chat: s.chat, flows: s.flows, bookings: s.bookings }
}

/** Build the reply from current scenario state at send time. */
export function reply(prompt: string): ChatMessage {
  const state = snapshot()
  const m = matchPrompt(prompt)
  const blocks = m.kind === 'intent' ? m.intent.build(state) : fallbackBlocks(m.kind === 'other-vendor' ? m.vendorName : undefined)
  return {
    id: newId(),
    role: 'assistant',
    blocks,
    status: prefersReducedMotion() ? 'done' : 'revealing',
    stageAtSend: scenarioStage(state),
    prompt,
  }
}

/** Open the panel and ask a question programmatically (e.g. "Ask Vertice AI" buttons on pages). */
export const askVertice = (prompt: string) => {
  const { chat, addChat } = useDemo.getState()
  useUi.getState().setAiOpen(true)
  if (chat.some((m) => m.status === 'revealing')) return
  addChat({ id: newId(), role: 'user', text: prompt })
  addChat(reply(prompt))
}

/** Mark any in-flight reveal as finished (close, navigation, "Show answer"). */
export const finishReveals = () => {
  const { chat, updateChat } = useDemo.getState()
  chat.filter((m) => m.status === 'revealing').forEach((m) => updateChat(m.id, { status: 'done' }))
}

