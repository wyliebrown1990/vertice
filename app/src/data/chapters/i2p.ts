/**
 * Chapter B: Intake-to-Procure, buy new software. roadmap/FULL-DEMO-PLAN.md §4–5.
 * "LinkDesk Remote" is a fictional vendor: negative risk findings never name a
 * real company. TeamViewer appears only in a neutral, recommended role.
 */
export const I2P_REQUEST_ID = 'req-remote-support-purchase'
export const I2P_PO_ID = 'PO-1042'

export const I2P = {
  title: 'Remote support software',
  requester: 'sam-okafor',
  department: 'Support' as const,
  need: 'Remote desktop support for the Customer Support team so agents can resolve tickets on customer machines.',
  seats: 60,
  start: '2026-11-01',
  end: '2027-10-31',
  termMonths: 12,
  /** The vendor Sam asked for (fictional). */
  requestedVendorId: 'linkdesk',
  requestedQuotePerSeat: 900,
  /** The recommended alternative Alex switches to. */
  chosenVendorId: 'teamviewer',
  chosenQuotePerSeat: 900,
  benchmarkBandLow: 780,
  benchmarkBandHigh: 860,
  negotiatedPricePerSeat: 840,
  /** Routing rule shown on the workflow edge. */
  legalThreshold: 50_000,
  /** Simulated cycle time vs Northwind's pre-fix average (Insights › Procurement). */
  cycleDays: 6,
  orderFormFile: 'LinkDesk_Order-Form_2026.pdf',
} as const

export const i2pDerived = () => {
  const quote = I2P.seats * I2P.chosenQuotePerSeat // 54,000
  const negotiated = I2P.seats * I2P.negotiatedPricePerSeat // 50,400
  return {
    requestedQuote: I2P.seats * I2P.requestedQuotePerSeat,
    quote,
    negotiated,
    costAvoidance: quote - negotiated, // 3,600 (new purchase: avoidance, not an annual reduction)
    aboveLegalThreshold: negotiated > I2P.legalThreshold,
  }
}

/** Fields Vertice AI pre-fills from the uploaded order form, with their source hint. */
export const I2P_PREFILL = [
  { field: 'Vendor', value: 'LinkDesk Remote', source: 'Read from order form' },
  { field: 'Product', value: 'LinkDesk Business', source: 'Read from order form' },
  { field: 'Licenses', value: '60', source: 'Read from order form' },
  { field: 'Quoted price', value: '$900 / license / year', source: 'Read from order form' },
  { field: 'Department', value: 'Support', source: 'Based on 4 previous requests' },
  { field: 'Cost center', value: 'SUP-410', source: 'Matched from contract history' },
] as const

/** AI review results shown on the parallel workflow nodes. */
export const I2P_AI_CHECKS = {
  compliance: [
    { item: 'Payment terms', value: 'Net 30', result: 'Accepted' },
    { item: 'Billing frequency', value: 'Annually', result: 'Accepted' },
    { item: 'Currency', value: 'USD', result: 'Accepted' },
  ],
  legal: [
    { item: 'Termination', value: '30 days for convenience', result: 'Accepted' },
    { item: 'Auto-renewal', value: '12 months, 60-day notice', result: 'Requires Review' },
    { item: 'Liability cap', value: '12 months of fees', result: 'Accepted' },
    { item: 'Data processing', value: 'DPA attached, EU SCCs', result: 'Accepted' },
  ],
} as const
