import { create } from 'zustand'
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware'
import { useShallow } from 'zustand/react/shallow'
import {
  approveOffer,
  checkpoint,
  completeRenewal,
  initialState,
  revealFinalOffer,
  saveDraft,
  startRenewal,
  submitRequirements,
  type CheckpointId,
  type SubmitResult,
} from '../domain/transitions'
import type { ChatMessage, DemoState, Requirements } from '../domain/types'

export const STORAGE_KEY = 'vertice-demo-v1'
const STORAGE_VERSION = 1

/** Falls back to memory if localStorage is unavailable (private mode, blocked). */
const memory = new Map<string, string>()
let storageAvailable = true
const safeStorage: StateStorage = {
  getItem: (k) => {
    try {
      return localStorage.getItem(k)
    } catch {
      storageAvailable = false
      return memory.get(k) ?? null
    }
  },
  setItem: (k, v) => {
    try {
      localStorage.setItem(k, v)
    } catch {
      storageAvailable = false
      memory.set(k, v)
    }
  },
  removeItem: (k) => {
    try {
      localStorage.removeItem(k)
    } catch {
      memory.delete(k)
    }
  },
}
export const isStorageAvailable = () => storageAvailable

// Declared before the store: hydration runs synchronously inside create().
let restoredFromIncompatible = false
export const wasRestoredFromIncompatible = () => restoredFromIncompatible

interface DemoActions {
  /** Increments whenever state is replaced (reset/checkpoint): pending timers must cancel. */
  epoch: number
  startRenewal: () => void
  saveDraft: (d: Requirements) => void
  submitRequirements: (r: Requirements) => SubmitResult
  revealFinalOffer: () => void
  approveOffer: () => void
  completeRenewal: () => void
  loadCheckpoint: (id: CheckpointId) => void
  resetDemo: () => void
  addChat: (m: ChatMessage) => void
  updateChat: (id: string, patch: Partial<ChatMessage>) => void
  clearChat: () => void
}

export type DemoStore = DemoState & DemoActions

const pick = (s: DemoStore): DemoState => ({
  request: s.request,
  draft: s.draft,
  futureTerms: s.futureTerms,
  savingsEntries: s.savingsEntries,
  chat: s.chat,
})

export const useDemo = create<DemoStore>()(
  persist(
    (set, get) => {
      const apply = (fn: (s: DemoState) => DemoState) => set((s) => fn(pick(s)))
      return {
        ...initialState(),
        epoch: 0,
        startRenewal: () => apply(startRenewal),
        saveDraft: (d) => apply((s) => saveDraft(s, d)),
        submitRequirements: (r) => {
          const res = submitRequirements(pick(get()), r)
          if (res.ok) set(res.state)
          return res
        },
        revealFinalOffer: () => apply(revealFinalOffer),
        approveOffer: () => apply(approveOffer),
        completeRenewal: () => apply(completeRenewal),
        loadCheckpoint: (id) => set((s) => ({ ...checkpoint(id), epoch: s.epoch + 1 })),
        resetDemo: () => set((s) => ({ ...initialState(), epoch: s.epoch + 1 })),
        addChat: (m) => set((s) => ({ chat: [...s.chat, m] })),
        updateChat: (id, patch) => set((s) => ({ chat: s.chat.map((m) => (m.id === id ? { ...m, ...patch } : m)) })),
        clearChat: () => set((s) => ({ chat: [], epoch: s.epoch + 1 })),
      }
    },
    {
      name: STORAGE_KEY,
      version: STORAGE_VERSION,
      storage: createJSONStorage(() => safeStorage),
      partialize: (s) => pick(s),
      // Incompatible saved versions restore the seed rather than migrating.
      migrate: () => {
        restoredFromIncompatible = true
        return initialState()
      },
      // A reload cuts any in-flight reveal: mark it interrupted so the panel offers a retry.
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<DemoState>
        const chat = (p.chat ?? []).map((m) => (m.status === 'revealing' ? { ...m, status: 'interrupted' as const } : m))
        return { ...current, ...p, chat }
      },
    },
  ),
)


/**
 * Stable snapshot of the scenario for derived selectors. Zustand v5 requires
 * selectors to return stable references, so compute aggregates outside the hook.
 */
export const useScenario = (): DemoState =>
  useDemo(
    useShallow((s) => ({
      request: s.request,
      draft: s.draft,
      futureTerms: s.futureTerms,
      savingsEntries: s.savingsEntries,
      chat: s.chat,
    })),
  )
