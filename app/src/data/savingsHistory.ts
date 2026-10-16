/**
 * Completed sample renewals Northwind ran through Vertice, Apr–Sep 2026.
 * Each vendor's current annual cost (data/vendors.ts) equals its baseline minus
 * the reduction, because the current term is the renewed term.
 * These are historical savings records, kept separate from current portfolio spend.
 * Totals: $1,210,000 annualized reduction against $5,600,000 of baselines.
 */
export interface SavingsRecord {
  id: string
  vendorId: string
  completedOn: string
  /** Annual cost before the renewal. */
  baselineAnnual: number
  /** Contracted annualized reduction. */
  annualReduction: number
  /** history = seeded; s1 = Salesforce renewal; ana = Gong renewal negotiated by Ana. */
  source: 'history' | 's1' | 'ana'
}

export const savingsHistory: SavingsRecord[] = [
  { id: 'sav-okta-2026', vendorId: 'okta', completedOn: '2026-04-01', baselineAnnual: 320_000, annualReduction: 60_000, source: 'history' },
  { id: 'sav-datadog-2026', vendorId: 'datadog', completedOn: '2026-04-30', baselineAnnual: 640_000, annualReduction: 190_000, source: 'history' },
  { id: 'sav-figma-2026', vendorId: 'figma', completedOn: '2026-05-01', baselineAnnual: 160_000, annualReduction: 50_000, source: 'history' },
  { id: 'sav-crowdstrike-2026', vendorId: 'crowdstrike', completedOn: '2026-05-31', baselineAnnual: 460_000, annualReduction: 70_000, source: 'history' },
  { id: 'sav-mongodb-2026', vendorId: 'mongodb', completedOn: '2026-06-01', baselineAnnual: 430_000, annualReduction: 150_000, source: 'history' },
  { id: 'sav-microsoft-2026', vendorId: 'microsoft', completedOn: '2026-06-30', baselineAnnual: 1_380_000, annualReduction: 230_000, source: 'history' },
  { id: 'sav-netsuite-2026', vendorId: 'netsuite', completedOn: '2026-07-31', baselineAnnual: 530_000, annualReduction: 120_000, source: 'history' },
  { id: 'sav-servicenow-2026', vendorId: 'servicenow', completedOn: '2026-08-31', baselineAnnual: 620_000, annualReduction: 140_000, source: 'history' },
  { id: 'sav-zscaler-2026', vendorId: 'zscaler', completedOn: '2026-09-15', baselineAnnual: 330_000, annualReduction: 90_000, source: 'history' },
  { id: 'sav-workday-2026', vendorId: 'workday', completedOn: '2026-09-30', baselineAnnual: 730_000, annualReduction: 110_000, source: 'history' },
]

export const SAVINGS_PERIOD_LABEL = 'April 2026 to date'
