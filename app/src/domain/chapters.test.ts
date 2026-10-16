import { describe, expect, test } from 'bun:test'
import { aiAnnual, aiMonthly, aiPotentialMonthly, AI_COMMITMENTS, MODEL_MIX } from '../data/chapters/aiSpend'
import { anaDerived } from '../data/chapters/ana'
import { budgetImpact, departmentBudgets } from '../data/chapters/budgets'
import { cloudTotals, CLOUD, SPEND_BY_ACCOUNT } from '../data/chapters/cloud'
import { i2pDerived } from '../data/chapters/i2p'
import { consolidationDerived, recommendations, usageRows } from '../data/chapters/insights'
import { ZSCALER_CONTRACTED, ZSCALER_INVOICE } from '../data/chapters/p2p'
import { BIDDERS, rfpDerived, weightedScore } from '../data/chapters/rfp'
import { vendors } from '../data/vendors'
import { invoiceMatch, invoices, newContracts, otherBenefits, purchaseOrders, requestRows } from './chapters'
import { advanceFlow, applyChapterPoint, approveI2pReview, CHAPTERS, flowStep, reached } from './flows'
import { allFutureTerms, pipeline, portfolioTotal, savingsSummary } from './selectors'
import { allTasks } from './tasks'
import { checkpoint, initialState } from './transitions'

describe('flow engine', () => {
  test('flows start at their first step and only advance one step at a time', () => {
    const s = initialState()
    expect(flowStep(s, 'ana')).toBe('none')
    expect(advanceFlow(s, 'ana', 'none', 'round1')).toBe(s) // cannot skip
    expect(advanceFlow(s, 'ana', 'briefing', 'round1')).toBe(s) // wrong from
    const b = advanceFlow(s, 'ana', 'none', 'briefing')
    expect(flowStep(b, 'ana')).toBe('briefing')
    expect(advanceFlow(b, 'ana', 'none', 'briefing')).toBe(b) // repeat is a no-op
    expect(reached(b, 'ana', 'none')).toBe(true)
    expect(reached(b, 'ana', 'offer')).toBe(false)
  })

  test('i2p moves to commercial only after both parallel reviews', () => {
    let s = applyChapterPoint(initialState(), 'B', 'mid')
    expect(flowStep(s, 'i2p')).toBe('reviews')
    s = approveI2pReview(s, 'i2p-security')
    expect(flowStep(s, 'i2p')).toBe('reviews')
    expect(approveI2pReview(s, 'i2p-security')).toBe(s)
    s = approveI2pReview(s, 'i2p-legal')
    expect(flowStep(s, 'i2p')).toBe('commercial')
  })

  test('every chapter point applies and keeps S1 untouched', () => {
    const base = checkpoint('final-offer')
    for (const c of CHAPTERS)
      for (const p of ['start', 'mid', 'end'] as const) {
        if (!c.points[p]) continue
        const s = applyChapterPoint(base, c.id, p)
        expect(s.request).toEqual(base.request)
        expect(s.savingsEntries).toEqual(base.savingsEntries)
      }
  })
})

describe('A2 Ana (Gong)', () => {
  const d = anaDerived()
  test('arithmetic', () => {
    expect(d.currentAnnualCost).toBe(vendors.find((v) => v.id === 'gong')!.annualCost)
    expect(d.futureAnnualCost).toBe(160_000)
    expect(d.annualReduction).toBe(50_000)
    expect(d.scopeReduction + d.unitPriceReduction).toBe(d.annualReduction)
    expect(d.avoidedUplift).toBe(18_900)
    expect(d.utilizationPct).toBeCloseTo(0.52, 5)
  })

  test('dashboard: $1,210,000 → $1,484,400 (S1) → $1,534,400 (S1 + Ana)', () => {
    const both = applyChapterPoint(checkpoint('outcome'), 'A2', 'end')
    expect(savingsSummary(both).reduction).toBe(1_534_400)
    const anaOnly = applyChapterPoint(initialState(), 'A2', 'end')
    expect(savingsSummary(anaOnly).reduction).toBe(1_260_000)
    expect(allFutureTerms(anaOnly)).toHaveLength(1)
    // Gong renews in December: secured, so excluded from the pending month total
    const dec = pipeline(anaOnly, 'upcoming').find((c) => c.month === '2026-12')!
    expect(dec.vendors.some((v) => v.id === 'gong')).toBe(true)
    expect(dec.total).toBe(pipeline(initialState(), 'upcoming').find((c) => c.month === '2026-12')!.total - 210_000)
  })

  test('the seeded Gong task is replaced once Ana starts', () => {
    expect(allTasks(initialState()).some((t) => t.id === 'task-gong')).toBe(true)
    const started = applyChapterPoint(initialState(), 'A2', 'mid')
    expect(allTasks(started).some((t) => t.id === 'task-gong')).toBe(false)
    expect(allTasks(started).some((t) => t.id === 'ana-offer')).toBe(true)
  })
})

describe('B Intake-to-Procure', () => {
  test('negotiated $50,400 vs $54,000 quote; above the $50K legal threshold', () => {
    const d = i2pDerived()
    expect(d.quote).toBe(54_000)
    expect(d.negotiated).toBe(50_400)
    expect(d.costAvoidance).toBe(3_600)
    expect(d.aboveLegalThreshold).toBe(true)
  })

  test('budget impact on Support: 12% of budget, year end at 95%', () => {
    const b = budgetImpact('Support', i2pDerived().negotiated)
    expect(b.budget.budget).toBe(420_000)
    expect(Math.round(b.share * 100)).toBe(12)
    expect(Math.round(b.yearEndPct * 100)).toBe(95)
    expect(b.inBudget).toBe(true)
  })

  test('completion creates one not-yet-live contract and PO-1042, without touching savings', () => {
    const done = applyChapterPoint(initialState(), 'B', 'end')
    expect(newContracts(done).map((c) => c.vendorId)).toEqual(['teamviewer'])
    expect(purchaseOrders(done).find((p) => p.id === 'PO-1042')?.amount).toBe(50_400)
    expect(savingsSummary(done).reduction).toBe(1_210_000) // avoidance is separate
    expect(otherBenefits(done).find((b) => b.id === 'ca-teamviewer')?.amount).toBe(3_600)
    expect(portfolioTotal()).toBe(11_415_000)
  })
})

describe('C Sourcing', () => {
  test('Lexora wins on weighted score and comes in under budget', () => {
    const ranked = [...BIDDERS].sort((a, b) => weightedScore(b) - weightedScore(a))
    expect(ranked[0].vendorId).toBe('lexora')
    expect(weightedScore(ranked[0])).toBe(9.1)
    expect(rfpDerived().costAvoidance).toBe(30_000)
    expect(rfpDerived().underBudget).toBe(20_000)
  })
})

describe('D Procure-to-Pay', () => {
  test('Zscaler invoice bills the pre-renewal price: +$90,000 flagged', () => {
    const s = applyChapterPoint(initialState(), 'D', 'start')
    const m = invoiceMatch(s, ZSCALER_INVOICE)
    expect(m.agreed).toBe(ZSCALER_CONTRACTED)
    expect(m.variance).toBe(90_000)
    const resolved = applyChapterPoint(s, 'D', 'end')
    expect(invoiceMatch(resolved, ZSCALER_INVOICE).matched).toBe(true)
    expect(otherBenefits(resolved).find((b) => b.kind === 'Invoice error prevented')?.amount).toBe(90_000)
  })

  test('TeamViewer invoice exists only after the purchase and matches PO-1042 exactly', () => {
    expect(invoices(initialState()).some((i) => i.id === 'INV-TV-0091')).toBe(false)
    const s = applyChapterPoint(initialState(), 'D', 'start')
    const inv = invoices(s).find((i) => i.id === 'INV-TV-0091')!
    expect(invoiceMatch(s, inv).matched).toBe(true)
    expect(purchaseOrders(applyChapterPoint(s, 'D', 'end')).find((p) => p.id === 'PO-1042')?.status).toBe('Paid')
  })

  test('department budgets cover spend', () => {
    for (const b of departmentBudgets()) {
      expect(b.paid + b.invoiced + b.committed + b.free).toBe(b.budget)
      expect(b.free).toBeGreaterThan(0)
    }
  })
})

describe('E Insights + Usage', () => {
  test('usage reconciles with the scenario fixtures', () => {
    const rows = usageRows()
    expect(rows.find((r) => r.vendor.id === 'salesforce')?.active).toBe(355)
    expect(rows.find((r) => r.vendor.id === 'gong')?.active).toBe(104)
  })

  test('monday.com fits into Asana and saves $60,000', () => {
    const d = consolidationDerived()
    expect(d.fitsInKeep).toBe(true)
    expect(d.annualSaving).toBe(60_000)
  })

  test('recommendation totals add up', () => {
    const r = recommendations()
    expect(r.totals.dedupe).toBe(60_000 + 70_000 + 160_000)
    expect(r.totals.all).toBe(r.totals.dedupe + r.totals.term + r.totals.rightsize)
  })

  test('consolidation creates a draft request, never savings', () => {
    const s = applyChapterPoint(initialState(), 'E', 'end')
    expect(requestRows(s).some((r) => r.id === 'req-monday-consolidation')).toBe(true)
    expect(savingsSummary(s).reduction).toBe(1_210_000)
  })
})

describe('F AI + Cloud', () => {
  test('AI spend reconciles with the portfolio and saves ~8%', () => {
    expect(aiAnnual()).toBe(1_015_000)
    expect(aiPotentialMonthly() / aiMonthly()).toBeCloseTo(0.08, 2)
    for (const p of ['anthropic', 'openai', 'cursor'])
      expect(MODEL_MIX.filter((m) => m.provider === p).reduce((s, m) => s + m.share, 0)).toBeCloseTo(1, 5)
    expect(Math.round((AI_COMMITMENTS[0].used / AI_COMMITMENTS[0].commitment) * 100)).toBe(85)
  })

  test('cloud is a separate dataset that reconciles internally', () => {
    const t = cloudTotals()
    expect(t.spend).toBe(CLOUD.annualSpend)
    expect(SPEND_BY_ACCOUNT.reduce((s, a) => s + a.spend, 0)).toBe(CLOUD.annualSpend)
    expect(t.savings).toBe(650_000)
    expect(portfolioTotal()).toBe(11_415_000)
  })
})
