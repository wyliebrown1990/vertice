import { create } from 'zustand'

/**
 * Session-only UI state. Never persisted to the demo store:
 * - presenter mode is opt-in via ?presenter=1 and survives navigation within the tab session
 * - notes are always closed on load
 */
const PRESENTER_KEY = 'vertice-demo-presenter'

const readPresenter = () => {
  try {
    const url = new URL(window.location.href)
    const flag = url.searchParams.get('presenter')
    if (flag === '1') sessionStorage.setItem(PRESENTER_KEY, '1')
    if (flag === '0') sessionStorage.removeItem(PRESENTER_KEY)
    return sessionStorage.getItem(PRESENTER_KEY) === '1'
  } catch {
    return false
  }
}

export interface Toast {
  id: number
  text: string
  tone?: 'success' | 'info' | 'warning'
}

interface UiState {
  presenter: boolean
  notesOpen: boolean
  aiOpen: boolean
  aiExpanded: boolean
  toasts: Toast[]
  setPresenter: (on: boolean) => void
  setNotesOpen: (open: boolean) => void
  setAiOpen: (open: boolean) => void
  setAiExpanded: (on: boolean) => void
  toast: (text: string, tone?: Toast['tone']) => void
  dismissToast: (id: number) => void
}

let toastId = 0

export const useUi = create<UiState>()((set) => ({
  presenter: readPresenter(),
  notesOpen: false,
  aiOpen: false,
  aiExpanded: false,
  toasts: [],
  setPresenter: (on) => {
    try {
      if (on) sessionStorage.setItem(PRESENTER_KEY, '1')
      else sessionStorage.removeItem(PRESENTER_KEY)
    } catch {
      /* session-only convenience */
    }
    set((s) => ({ presenter: on, notesOpen: on ? s.notesOpen : false }))
  },
  setNotesOpen: (open) => set({ notesOpen: open }),
  setAiOpen: (open) => set({ aiOpen: open }),
  setAiExpanded: (on) => set({ aiExpanded: on }),
  toast: (text, tone = 'success') => {
    const id = ++toastId
    set((s) => ({ toasts: [...s.toasts, { id, text, tone }] }))
    window.setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 3200)
  },
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
