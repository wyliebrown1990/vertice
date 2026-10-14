/**
 * Canonical S1 scenario: the Salesforce renewal at fictional Northwind Systems.
 * Planning spec: roadmap/PLAN.md, "Canonical S1 scenario". Every S1 price, date
 * and result on every screen derives from these constants via domain/selectors.
 *
 * Authored demo data. Not real Salesforce pricing, and not a prediction from
 * Vertice's proprietary benchmarks.
 */

/** The demo's frozen "today". Relative labels use this, never the laptop clock. */
export const AS_OF = '2026-10-13'

export const COMPANY = {
  name: 'Northwind Systems',
  legalName: 'Northwind Systems, Inc.',
  employees: 1500,
} as const

export const SALESFORCE_ID = 'salesforce'
export const S1_REQUEST_ID = 'req-salesforce-renewal-2027'

export const S1 = {
  vendorId: SALESFORCE_ID,
  product: 'Sales Cloud + Einstein',
  tier: 'Unlimited',
  currentAnnualCost: 980_000,
  currentSeats: 500,
  activeUsers28d: 355,
  /** Owner-approved requirement: 355 active + 45 seats of headroom. */
  targetSeats: 400,
  noticeDeadline: '2026-12-02',
  signDate: '2026-01-20',
  termStart: '2026-02-01',
  termEnd: '2027-01-31',
  nextTermStart: '2027-02-01',
  nextTermEnd: '2028-01-31',
  termMonths: 12,
  billing: 'Annually',
  paymentTerms: 'Net 30',
  /** Vendor's opening renewal quote: same 500-seat scope with a 12% uplift. */
  quoteUpliftPct: 0.12,
  benchmarkBandLow: 1_700,
  benchmarkBandHigh: 1_850,
  negotiatedPricePerSeat: 1_764,
  owner: 'jordan-reyes',
  buyer: 'julian-hayes',
} as const

/** Values used by both the fixture and its reconciliation test. */
export const s1Derived = () => {
  const currentPricePerSeat = S1.currentAnnualCost / S1.currentSeats // 1,960
  const openingQuote = Math.round(S1.currentAnnualCost * (1 + S1.quoteUpliftPct)) // 1,097,600
  const futureAnnualCost = S1.targetSeats * S1.negotiatedPricePerSeat // 705,600
  const annualReduction = S1.currentAnnualCost - futureAnnualCost // 274,400
  const scopeReduction = (S1.currentSeats - S1.targetSeats) * currentPricePerSeat // 196,000
  const unitPriceReduction = S1.targetSeats * (currentPricePerSeat - S1.negotiatedPricePerSeat) // 78,400
  const avoidedUplift = openingQuote - S1.currentAnnualCost // 117,600
  const totalBenefitVsQuote = openingQuote - futureAnnualCost // 392,000
  return {
    currentPricePerSeat,
    openingQuote,
    openingQuotePricePerSeat: openingQuote / S1.currentSeats,
    futureAnnualCost,
    futureTcv: futureAnnualCost * (S1.termMonths / 12),
    annualReduction,
    annualReductionPct: annualReduction / S1.currentAnnualCost,
    scopeReduction,
    unitPriceReduction,
    avoidedUplift,
    totalBenefitVsQuote,
    totalBenefitVsQuotePct: totalBenefitVsQuote / openingQuote,
    headroomSeats: S1.targetSeats - S1.activeUsers28d,
    utilizationPct: S1.activeUsers28d / S1.currentSeats,
    idleSeats: S1.currentSeats - S1.activeUsers28d,
  }
}
