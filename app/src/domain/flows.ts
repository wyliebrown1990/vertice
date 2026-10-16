/**
 * Full-demo flows (roadmap/FULL-DEMO-PLAN.md). Each flow is a fixed, linear list
 * of steps, like S1's stages. Transitions are guarded: a transition only applies
 * from the expected step to the next one, so repeats are no-ops and outcomes are
 * added once. Outcomes are derived in domain/chapters.ts.
 */
import type { DemoState, FlowId } from './types'

export const FLOW_STEPS = {
  ana: ['none', 'briefing', 'round1', 'round2', 'offer', 'completed'],
  i2p: ['none', 'intake', 'risk', 'reviews', 'commercial', 'signing', 'completed'],
  'i2p-security': ['pending', 'approved'],
  'i2p-legal': ['pending', 'approved'],
  rfp: ['none', 'builder', 'sent', 'responses', 'awarded', 'onboarding', 'completed'],
  'p2p-zscaler': ['needs-review', 'disputed', 'resolved'],
  'p2p-teamviewer': ['needs-review', 'approved', 'paid'],
  bottleneck: ['before', 'fixed'],
  consolidation: ['none', 'requested'],
  'ai-commit': ['none', 'requested'],
  'cloud-edp': ['none', 'engaged'],
  'contract-upload': ['none', 'extracted', 'created'],
} as const satisfies Record<FlowId, readonly string[]>

export type StepOf<F extends FlowId> = (typeof FLOW_STEPS)[F][number]

export const flowStep = <F extends FlowId>(s: Pick<DemoState, 'flows'>, f: F): StepOf<F> =>
  (s.flows[f] as StepOf<F> | undefined) ?? (FLOW_STEPS[f][0] as StepOf<F>)

const idx = (f: FlowId, step: string) => (FLOW_STEPS[f] as readonly string[]).indexOf(step)

/** Has the flow reached (or passed) `step`? */
export const reached = <F extends FlowId>(s: Pick<DemoState, 'flows'>, f: F, step: StepOf<F>) => idx(f, flowStep(s, f)) >= idx(f, step)

/** Guarded single-step advance. Returns the same state object when it does not apply. */
export const advanceFlow = <F extends FlowId>(s: DemoState, f: F, from: StepOf<F>, to: StepOf<F>): DemoState => {
  if (flowStep(s, f) !== from) return s
  if (idx(f, to) !== idx(f, from) + 1) return s
  return { ...s, flows: { ...s.flows, [f]: to } }
}

/** Security and Legal approvals run in parallel; the request moves on once both are in. */
export const approveI2pReview = (s: DemoState, which: 'i2p-security' | 'i2p-legal'): DemoState => {
  if (flowStep(s, 'i2p') !== 'reviews') return s
  const next = advanceFlow(s, which, 'pending', 'approved')
  if (next === s) return s
  const both = flowStep(next, 'i2p-security') === 'approved' && flowStep(next, 'i2p-legal') === 'approved'
  return both ? advanceFlow(next, 'i2p', 'reviews', 'commercial') : next
}

export const bookExpert = (s: DemoState, serviceId: string): DemoState =>
  s.bookings.includes(serviceId) ? s : { ...s, bookings: [...s.bookings, serviceId] }

/* ---------- Chapter checkpoints (presenter) ---------- */

export type ChapterId = 'A2' | 'B' | 'C' | 'D' | 'E' | 'E2' | 'F' | 'L'
export type PointId = 'start' | 'mid' | 'end'

export interface Chapter {
  id: ChapterId
  title: string
  persona: string
  points: Partial<Record<PointId, { label: string; flows: DemoState['flows']; route: string }>>
}

const I2P_DONE = { i2p: 'completed', 'i2p-security': 'approved', 'i2p-legal': 'approved' } as const

export const CHAPTERS: Chapter[] = [
  {
    id: 'B',
    title: 'Buy new software (Intake-to-Procure)',
    persona: 'Requester → Procurement → Security, Legal, Finance',
    points: {
      start: { label: 'Slack intake', flows: { i2p: 'none', 'i2p-security': 'pending', 'i2p-legal': 'pending' }, route: '/intake/slack' },
      mid: { label: 'Parallel reviews', flows: { i2p: 'reviews', 'i2p-security': 'pending', 'i2p-legal': 'pending' }, route: '/intelligent-workflows/requests/req-remote-support-purchase/workflow' },
      end: { label: 'PO created', flows: { ...I2P_DONE }, route: '/intelligent-workflows/requests/req-remote-support-purchase/overview' },
    },
  },
  {
    id: 'C',
    title: 'Choose a vendor (Sourcing + Onboarding)',
    persona: 'Legal → Procurement → Vertice expert',
    points: {
      start: { label: 'New RFP', flows: { rfp: 'none' }, route: '/intelligent-workflows/requests' },
      mid: { label: 'Responses in', flows: { rfp: 'responses' }, route: '/sourcing/rfp' },
      end: { label: 'Vendor onboarded', flows: { rfp: 'completed' }, route: '/vendors/lexora' },
    },
  },
  {
    id: 'D',
    title: 'Pay correctly (Procure-to-Pay)',
    persona: 'Finance',
    points: {
      start: { label: 'Invoices to review', flows: { ...I2P_DONE, 'p2p-zscaler': 'needs-review', 'p2p-teamviewer': 'needs-review' }, route: '/invoices' },
      mid: { label: 'Zscaler disputed', flows: { ...I2P_DONE, 'p2p-zscaler': 'disputed', 'p2p-teamviewer': 'needs-review' }, route: '/invoices' },
      end: { label: 'All paid', flows: { ...I2P_DONE, 'p2p-zscaler': 'resolved', 'p2p-teamviewer': 'paid' }, route: '/purchase-orders' },
    },
  },
  {
    id: 'E',
    title: 'See waste (Insights + Usage)',
    persona: 'Finance + Procurement + IT',
    points: {
      start: { label: 'Analytics', flows: { consolidation: 'none' }, route: '/analytics/spend-insights' },
      end: { label: 'Consolidation requested', flows: { consolidation: 'requested' }, route: '/intelligent-workflows/requests/req-monday-consolidation/overview' },
    },
  },
  {
    id: 'E2',
    title: 'Fix the bottleneck (Workflow Builder)',
    persona: 'Procurement',
    points: {
      start: { label: 'Procurement insights', flows: { bottleneck: 'before' }, route: '/insights/procurement' },
      end: { label: 'Fix live', flows: { bottleneck: 'fixed' }, route: '/insights/procurement' },
    },
  },
  {
    id: 'A2',
    title: 'Let Ana renew the long tail (Gong)',
    persona: 'Procurement',
    points: {
      start: { label: 'Gong contract', flows: { ana: 'none' }, route: '/contracts/gong/overview' },
      mid: { label: 'Negotiation complete', flows: { ana: 'offer' }, route: '/intelligent-workflows/requests/req-gong-ana-renewal/overview' },
      end: { label: 'Approved', flows: { ana: 'completed' }, route: '/contracts/gong/outcomes' },
    },
  },
  {
    id: 'F',
    title: 'Beyond SaaS (AI + Cloud cost)',
    persona: 'Finance + Cloud engineering',
    points: {
      start: { label: 'AI spend', flows: { 'ai-commit': 'none', 'cloud-edp': 'none' }, route: '/insights/ai-spend' },
      end: { label: 'Commitments handed off', flows: { 'ai-commit': 'requested', 'cloud-edp': 'engaged' }, route: '/cloud/overview' },
    },
  },
  {
    id: 'L',
    title: 'Legal: Contract Center AI',
    persona: 'Legal',
    points: {
      start: { label: 'Documents', flows: { 'contract-upload': 'none' }, route: '/documents' },
      end: { label: 'Comparison ready', flows: { 'contract-upload': 'created' }, route: '/documents' },
    },
  },
]

/** Apply a chapter point on top of the current state (other chapters are kept). */
export const applyChapterPoint = (s: DemoState, chapter: ChapterId, point: PointId): DemoState => {
  const p = CHAPTERS.find((c) => c.id === chapter)?.points[point]
  if (!p) return s
  const bookings = chapter === 'F' && point === 'end' ? [...new Set([...s.bookings, 'edp'])] : s.bookings
  return { ...s, flows: { ...s.flows, ...p.flows }, bookings }
}
