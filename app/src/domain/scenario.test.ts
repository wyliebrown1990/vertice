import { describe, expect, test } from 'bun:test'
import { S1, s1Derived } from '../data/scenario'
import { savingsHistory } from '../data/savingsHistory'
import { vendorById, vendors } from '../data/vendors'
import { daysFromToday } from '../lib/format'
import {
  pipeline,
  PIPELINE_MONTHS,
  portfolioTotal,
  savingsSummary,
  spendByDepartment,
} from './selectors'
import {
  approveOffer,
  checkpoint,
  completeRenewal,
  defaultRequirements,
  initialState,
  revealFinalOffer,
  startRenewal,
  submitRequirements,
} from './transitions'

describe('canonical S1 scenario', () => {
  const d = s1Derived()

  test('Salesforce fixture matches the scenario', () => {
    expect(vendorById('salesforce')?.annualCost).toBe(S1.currentAnnualCost)
    expect(vendorById('salesforce')?.noticeDeadline).toBe(S1.noticeDeadline)
    expect(d.currentPricePerSeat).toBe(1_960)
  })

  test('relative dates are anchored to 2026-10-13', () => {
    expect(daysFromToday(S1.noticeDeadline)).toBe(50)
    expect(daysFromToday(S1.termEnd)).toBe(110)
    expect(daysFromToday('2026-10-16')).toBe(3) // ZoomInfo / Gong notice
    expect(daysFromToday('2026-10-01')).toBe(-12) // LinkedIn notice passed
  })

  test('offer and savings arithmetic', () => {
    expect(d.openingQuote).toBe(1_097_600)
    expect(d.futureAnnualCost).toBe(705_600)
    expect(d.futureTcv).toBe(705_600)
    expect(d.annualReduction).toBe(274_400)
    expect(d.scopeReduction).toBe(196_000)
    expect(d.unitPriceReduction).toBe(78_400)
    expect(d.scopeReduction + d.unitPriceReduction).toBe(d.annualReduction)
    expect(Math.round(d.annualReductionPct * 100)).toBe(28)
    expect(d.avoidedUplift).toBe(117_600)
    expect(d.totalBenefitVsQuote).toBe(392_000)
    expect(d.totalBenefitVsQuotePct * 100).toBeCloseTo(35.7, 1)
    expect(d.headroomSeats).toBe(45)
  })
})

describe('portfolio reconciliation', () => {
  test('42 strategic contracts totalling $11,415,000', () => {
    expect(vendors.length).toBe(42)
    expect(portfolioTotal()).toBe(11_415_000)
  })

  test('department split sums to the portfolio', () => {
    const sum = spendByDepartment().reduce((s, x) => s + x.amount, 0)
    expect(sum).toBe(portfolioTotal())
  })

  test('pipeline months cover every contract exactly once', () => {
    const cols = pipeline(initialState(), 'upcoming')
    expect(cols.map((c) => c.month)).toEqual(PIPELINE_MONTHS)
    expect(cols.reduce((s, c) => s + c.vendors.length, 0)).toBe(42)
    expect(cols.reduce((s, c) => s + c.total, 0)).toBe(portfolioTotal())
    const jan = cols.find((c) => c.month === '2027-01')!
    expect(jan.vendors[0].id).toBe('salesforce') // flagship never hidden behind overflow
  })

  test('history baselines minus reductions equal current costs', () => {
    for (const r of savingsHistory) {
      expect(r.baselineAnnual - r.annualReduction).toBe(vendorById(r.vendorId)!.annualCost)
    }
  })
})

describe('dashboard savings', () => {
  test('baseline $1,210,000 → $1,484,400 after the simulated signed renewal', () => {
    const before = savingsSummary(initialState())
    expect(before.reduction).toBe(1_210_000)
    expect(before.baseline).toBe(5_600_000)
    const after = savingsSummary(checkpoint('outcome'))
    expect(after.reduction).toBe(1_484_400)
    expect(after.weightedPct).toBeCloseTo(1_484_400 / 6_580_000, 10)
  })
})

describe('S1 state machine', () => {
  test('stages advance in order and guards reject skipping', () => {
    let s = startRenewal(initialState())
    expect(s.request?.stage).toBe('requirements')
    expect(revealFinalOffer(s)).toBe(s) // cannot skip negotiation
    expect(approveOffer(s)).toBe(s)
    expect(completeRenewal(s)).toBe(s)
    const r = submitRequirements(s, { ...defaultRequirements(), ownerConfirmed: true })
    expect(r.ok).toBe(true)
    if (!r.ok) return
    s = r.state
    expect(s.request?.stage).toBe('negotiation')
    s = revealFinalOffer(s)
    expect(s.request?.stage).toBe('approval')
    s = approveOffer(s)
    expect(s.request?.stage).toBe('contracting')
    s = completeRenewal(s)
    expect(s.request?.stage).toBe('completed')
  })

  test('unsupported seat counts and unconfirmed owner are rejected', () => {
    const s = startRenewal(initialState())
    expect(submitRequirements(s, { ...defaultRequirements(), seats: 350, ownerConfirmed: true })).toEqual({ ok: false, reason: 'unsupported-seats' })
    expect(submitRequirements(s, defaultRequirements())).toEqual({ ok: false, reason: 'owner-not-confirmed' })
  })

  test('starting twice reopens the same request; completing twice adds one savings record', () => {
    const once = startRenewal(initialState())
    expect(startRenewal(once)).toBe(once)
    const done = checkpoint('outcome')
    const again = completeRenewal(approveOffer(revealFinalOffer(done)))
    expect(again).toBe(done)
    expect(done.savingsEntries.length).toBe(1)
    expect(done.futureTerms.length).toBe(1)
  })

  test('completion keeps the current term live and adds one linked future term', () => {
    const done = checkpoint('outcome')
    expect(done.futureTerms[0]).toMatchObject({ vendorId: 'salesforce', start: '2027-02-01', seats: 400, annualCost: 705_600 })
    expect(portfolioTotal()).toBe(11_415_000) // current spend does not drop early
    const jan = pipeline(done, 'upcoming').find((c) => c.month === '2027-01')!
    expect(jan.vendors.some((v) => v.id === 'salesforce')).toBe(true)
    expect(jan.total).toBe(240_000 + 380_000 + 85_000) // secured renewal excluded from pending total
  })

  test('checkpoints load complete fixtures', () => {
    expect(checkpoint('start')).toEqual(initialState())
    expect(checkpoint('final-offer').request?.stage).toBe('approval')
    expect(checkpoint('outcome').request?.stage).toBe('completed')
  })
})
