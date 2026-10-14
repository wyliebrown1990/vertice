/**
 * Pure, guarded S1 transitions. Each returns the same state object when the
 * action does not apply to the current stage, so repeats are no-ops and the
 * savings entry can only be added once.
 */
import { AS_OF, S1, S1_REQUEST_ID, s1Derived } from '../data/scenario'
import type { DemoState, Requirements } from './types'

export const initialState = (): DemoState => ({
  request: null,
  draft: null,
  futureTerms: [],
  savingsEntries: [],
  chat: [],
})

export const defaultRequirements = (): Requirements => ({
  seats: S1.targetSeats,
  renewalType: 'Downgrade',
  reason: 'Right-size seats to active usage plus headroom',
  ownerConfirmed: false,
})

/** The only quantity this demo models an offer for. */
export const isSupportedSeatCount = (seats: number) => seats === S1.targetSeats

export const startRenewal = (s: DemoState): DemoState => {
  if (s.request) return s
  return {
    ...s,
    request: {
      id: S1_REQUEST_ID,
      vendorId: S1.vendorId,
      createdOn: AS_OF,
      stage: 'requirements',
      requirements: null,
      approvedOn: null,
      completedOn: null,
    },
    draft: s.draft ?? defaultRequirements(),
  }
}

export const saveDraft = (s: DemoState, draft: Requirements): DemoState => {
  if (!s.request || s.request.stage !== 'requirements') return s
  return { ...s, draft }
}

export type SubmitResult = { ok: true; state: DemoState } | { ok: false; reason: 'stage' | 'unsupported-seats' | 'owner-not-confirmed' }

export const submitRequirements = (s: DemoState, req: Requirements): SubmitResult => {
  if (!s.request || s.request.stage !== 'requirements') return { ok: false, reason: 'stage' }
  if (!isSupportedSeatCount(req.seats)) return { ok: false, reason: 'unsupported-seats' }
  if (!req.ownerConfirmed) return { ok: false, reason: 'owner-not-confirmed' }
  return {
    ok: true,
    state: { ...s, draft: null, request: { ...s.request, stage: 'negotiation', requirements: req } },
  }
}

/** Presenter time-compression: the negotiated final offer arrives. */
export const revealFinalOffer = (s: DemoState): DemoState => {
  if (!s.request || s.request.stage !== 'negotiation') return s
  return { ...s, request: { ...s.request, stage: 'approval' } }
}

export const approveOffer = (s: DemoState): DemoState => {
  if (!s.request || s.request.stage !== 'approval') return s
  return { ...s, request: { ...s.request, stage: 'contracting', approvedOn: AS_OF } }
}

/** Presenter time-compression: contracting completes and the renewal is signed. */
export const completeRenewal = (s: DemoState): DemoState => {
  if (!s.request || s.request.stage !== 'contracting') return s
  const d = s1Derived()
  const already = s.savingsEntries.some((e) => e.source === 's1')
  return {
    ...s,
    request: { ...s.request, stage: 'completed', completedOn: AS_OF },
    futureTerms: s.futureTerms.some((t) => t.requestId === s.request!.id)
      ? s.futureTerms
      : [
          ...s.futureTerms,
          {
            id: 'term-salesforce-2027',
            vendorId: S1.vendorId,
            requestId: s.request.id,
            start: S1.nextTermStart,
            end: S1.nextTermEnd,
            seats: S1.targetSeats,
            annualCost: d.futureAnnualCost,
            pricePerSeat: S1.negotiatedPricePerSeat,
          },
        ],
    savingsEntries: already
      ? s.savingsEntries
      : [
          ...s.savingsEntries,
          {
            id: 'sav-salesforce-2027',
            vendorId: S1.vendorId,
            completedOn: AS_OF,
            baselineAnnual: S1.currentAnnualCost,
            annualReduction: d.annualReduction,
            source: 's1',
          },
        ],
  }
}

/* ---------- Recovery checkpoints (complete fixtures, not a replay engine) ---------- */

export type CheckpointId = 'start' | 'final-offer' | 'outcome'

export const checkpoint = (id: CheckpointId): DemoState => {
  const start = initialState()
  if (id === 'start') return start
  const created = startRenewal(start)
  const submitted = submitRequirements(created, { ...defaultRequirements(), ownerConfirmed: true })
  if (!submitted.ok) throw new Error('Checkpoint fixture failed to submit requirements')
  const offer = revealFinalOffer(submitted.state)
  if (id === 'final-offer') return offer
  return completeRenewal(approveOffer(offer))
}

export const checkpointRoute = (id: CheckpointId) =>
  id === 'start' ? '/dashboard' : id === 'final-offer' ? `/intelligent-workflows/requests/${S1_REQUEST_ID}/overview` : `/contracts/${S1.vendorId}/outcomes`
