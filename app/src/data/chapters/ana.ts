/**
 * Chapter A2: Ana renews the long tail (Gong). roadmap/FULL-DEMO-PLAN.md §4–5.
 * Authored demo data. Not real Gong pricing; the vendor contact is fictional.
 */
import { AS_OF } from '../scenario'

export const ANA_REQUEST_ID = 'req-gong-ana-renewal'

export const ANA = {
  vendorId: 'gong',
  product: 'Revenue Intelligence',
  currentSeats: 200,
  currentPricePerSeat: 1_050,
  activeUsers28d: 104,
  /** Vendor's renewal quote: same 200 seats with a 9% uplift. */
  quoteUpliftPct: 0.09,
  benchmarkBandLow: 960,
  benchmarkBandHigh: 1_080,
  /** Owner-approved requirement: 104 active plus hiring plan headroom. */
  targetSeats: 160,
  negotiatedPricePerSeat: 1_000,
  termMonths: 24,
  noticeDeadline: '2026-10-16',
  termEnd: '2026-12-15',
  nextTermStart: '2026-12-16',
  nextTermEnd: '2028-12-15',
  hoursSaved: 28,
  owner: 'jordan-reyes',
  vendorContact: 'Morgan Ellis, Account Executive (fictional)',
  completedOn: AS_OF,
} as const

export const anaDerived = () => {
  const currentAnnualCost = ANA.currentSeats * ANA.currentPricePerSeat // 210,000
  const openingQuote = Math.round(currentAnnualCost * (1 + ANA.quoteUpliftPct)) // 228,900
  const futureAnnualCost = ANA.targetSeats * ANA.negotiatedPricePerSeat // 160,000
  const annualReduction = currentAnnualCost - futureAnnualCost // 50,000
  const scopeReduction = (ANA.currentSeats - ANA.targetSeats) * ANA.currentPricePerSeat // 42,000
  const unitPriceReduction = ANA.targetSeats * (ANA.currentPricePerSeat - ANA.negotiatedPricePerSeat) // 8,000
  return {
    currentAnnualCost,
    openingQuote,
    futureAnnualCost,
    futureTcv: futureAnnualCost * (ANA.termMonths / 12), // 320,000
    annualReduction,
    annualReductionPct: annualReduction / currentAnnualCost,
    scopeReduction,
    unitPriceReduction,
    avoidedUplift: openingQuote - currentAnnualCost, // 18,900
    utilizationPct: ANA.activeUsers28d / ANA.currentSeats,
  }
}

/** Ana's three negotiation scenarios (the plan shows all three; Balanced is the recommendation). */
export const ANA_SCENARIOS = [
  { id: 'conservative', label: 'Conservative', seats: 180, price: 1_050, likelihood: 0.9, note: 'Hold price flat, trim 20 seats' },
  { id: 'balanced', label: 'Balanced', seats: 160, price: 1_000, likelihood: 0.7, note: 'Right-size to 160 and reject the uplift with a 2-year lock', recommended: true },
  { id: 'aggressive', label: 'Aggressive', seats: 150, price: 960, likelihood: 0.35, note: 'Benchmark floor; real risk of a walk-away' },
] as const

export interface AnaEmail {
  id: string
  from: 'ana' | 'vendor'
  subject: string
  body: string
  /** Flow step at which this message is visible. */
  visibleFrom: 'round1' | 'round2' | 'offer'
}

export const ANA_THREAD: AnaEmail[] = [
  {
    id: 'e1',
    from: 'ana',
    subject: 'Northwind Systems · Gong renewal',
    body: 'Hi Morgan, ahead of our notice date on Oct 16 we’ve reviewed Gong usage: 104 of 200 seats were active in the last 28 days. We’d like to renew 150 seats at $960 per seat on a 24-month term. Can you confirm by Thursday?',
    visibleFrom: 'round1',
  },
  {
    id: 'e2',
    from: 'vendor',
    subject: 'RE: Northwind Systems · Gong renewal',
    body: 'Thanks for the detail. We can’t go below list at 150 seats. We could offer 180 seats at $1,020 per seat with a 24-month term, which also waives the 9% uplift.',
    visibleFrom: 'round2',
  },
  {
    id: 'e3',
    from: 'ana',
    subject: 'RE: Northwind Systems · Gong renewal',
    body: 'Appreciated. Northwind can commit to 160 seats at $1,000 per seat, locked for 24 months, with seats added later at the same unit price. Otherwise we’ll give notice on Oct 16 and run a competitive review.',
    visibleFrom: 'round2',
  },
  {
    id: 'e4',
    from: 'vendor',
    subject: 'RE: Northwind Systems · Gong renewal',
    body: 'Agreed: 160 seats at $1,000 per seat for 24 months, price locked, add-on seats at the same rate. I’ll send the order form today.',
    visibleFrom: 'offer',
  },
]
