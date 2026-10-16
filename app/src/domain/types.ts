import type { SavingsRecord } from '../data/savingsHistory'

/**
 * S1 request lifecycle (roadmap/PLAN.md "S1 interaction contract"):
 * requirements → negotiation → approval → contracting → completed.
 * `approval` = final offer revealed, awaiting Alex's decision.
 * `contracting` = approved, contracting pending (not yet a signed contract).
 */
export type RequestStage = 'requirements' | 'negotiation' | 'approval' | 'contracting' | 'completed'

export type RenewalType = 'Downgrade' | 'Flat' | 'Upgrade'

export interface Requirements {
  seats: number
  renewalType: RenewalType
  reason: string
  ownerConfirmed: boolean
}

export interface RenewalRequest {
  id: string
  vendorId: string
  createdOn: string
  stage: RequestStage
  requirements: Requirements | null
  approvedOn: string | null
  completedOn: string | null
}

export interface FutureTerm {
  id: string
  vendorId: string
  requestId: string
  start: string
  end: string
  seats: number
  annualCost: number
  pricePerSeat: number
}

export type ChatBlock =
  | { kind: 'text'; text: string; tone?: 'muted' | 'caveat' }
  | { kind: 'metrics'; items: { label: string; value: string; sub?: string; accent?: boolean }[] }
  | { kind: 'table'; title?: string; columns: string[]; rows: string[][]; align?: ('left' | 'right')[] }
  | { kind: 'actions'; items: ChatAction[] }

export type ChatActionId =
  | 'view-benchmark'
  | 'start-renewal'
  | 'view-renewal'
  | 'view-outcome'
  | { open: string }
  /** Advance a full-demo flow (guarded), then navigate. */
  | { advance: FlowId; from: string; to: string; open: string }

export interface ChatAction {
  id: ChatActionId
  label: string
  primary?: boolean
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text?: string
  blocks?: ChatBlock[]
  /** Assistant replies reveal briefly; `interrupted` means a reload cut the reveal. */
  status?: 'revealing' | 'done' | 'interrupted'
  /** Scenario stage when the reply was authored (history is a snapshot). */
  stageAtSend?: RequestStage | 'none'
  /** Prompt that produced this reply, for retry after interruption. */
  prompt?: string
}

/**
 * Full-demo chapters beyond S1 (roadmap/FULL-DEMO-PLAN.md). Each flow is a
 * linear list of steps (domain/flows.ts); the state stores the current step id.
 * Outcomes (savings, contracts, POs, tasks) are derived from these steps, never
 * stored twice.
 */
export type FlowId =
  | 'ana'
  | 'i2p'
  | 'i2p-security'
  | 'i2p-legal'
  | 'rfp'
  | 'p2p-zscaler'
  | 'p2p-teamviewer'
  | 'bottleneck'
  | 'consolidation'
  | 'ai-commit'
  | 'cloud-edp'
  | 'contract-upload'

export interface DemoState {
  request: RenewalRequest | null
  /** Requirements form draft (kept while the modal is closed). */
  draft: Requirements | null
  futureTerms: FutureTerm[]
  savingsEntries: SavingsRecord[]
  chat: ChatMessage[]
  /** Current step per full-demo flow; a missing flow is at its first step. */
  flows: Partial<Record<FlowId, string>>
  /** Expert Engage services booked in this session (service ids). */
  bookings: string[]
}
