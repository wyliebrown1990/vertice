/**
 * Chapters E and E2: Usage Analytics, Insights Hub and Procurement insights.
 * Seat counts are authored; active users and every total derive from them and
 * the portfolio utilization in data/vendors.ts (Salesforce 355/500, Gong 104/200).
 */
import { vendors, vendorById, type Vendor } from '../vendors'

/** Licensed seats per seat-based vendor (usage-based vendors are absent). */
export const LICENSED_SEATS: Record<string, number> = {
  zoominfo: 120, linkedin: 150, zoom: 1_500, cursor: 180, gong: 200, salesloft: 90, atlassian: 1_200, hubspot: 60,
  anthropic: 400, salesforce: 500, asana: 280, github: 650, outreach: 120, intercom: 80, openai: 900, google: 1_500,
  slack: 1_500, docusign: 60, okta: 1_500, looker: 120, figma: 210, zendesk: 160, monday: 220, crowdstrike: 1_600,
  navan: 1_500, canva: 150, microsoft: 1_500, miro: 400, tableau: 140, netsuite: 90, greenhouse: 70, jamf: 900,
  servicenow: 300, zscaler: 1_500, workday: 1_500, cultureamp: 1_500,
}

export type UsageFrequency = 'Daily or more' | 'Twice a week' | 'Weekly' | 'Biweekly' | 'Monthly' | 'Occasionally'

const frequency = (u: number): UsageFrequency =>
  u >= 0.85 ? 'Daily or more' : u >= 0.7 ? 'Twice a week' : u >= 0.55 ? 'Weekly' : u >= 0.45 ? 'Biweekly' : u >= 0.35 ? 'Monthly' : 'Occasionally'

const SOURCE: Record<string, string> = { google: 'Google Workspace', microsoft: 'Microsoft Entra ID' }

export interface UsageRow {
  vendor: Vendor
  application: string
  licensed: number
  active: number
  utilization: number
  typically: UsageFrequency
  source: string
  lastUpdate: string
  children?: { application: string; licensed: number; active: number; utilization: number; typically: UsageFrequency }[]
}

export const usageRows = (): UsageRow[] =>
  vendors
    .filter((v) => v.utilization !== null && LICENSED_SEATS[v.id])
    .map((v) => {
      const licensed = LICENSED_SEATS[v.id]
      const active = Math.round(licensed * v.utilization!)
      const row: UsageRow = {
        vendor: v,
        application: v.name,
        licensed,
        active,
        utilization: active / licensed,
        typically: frequency(v.utilization!),
        source: SOURCE[v.id] ?? 'Okta',
        lastUpdate: v.id === 'salesforce' || v.id === 'gong' ? 'Today' : 'Yesterday',
      }
      if (v.id === 'atlassian')
        row.children = [
          { application: 'Jira Software', licensed: 1_100, active: 836, utilization: 836 / 1_100, typically: 'Twice a week' },
          { application: 'Confluence', licensed: 1_150, active: 874, utilization: 874 / 1_150, typically: 'Twice a week' },
        ]
      return row
    })
    .sort((a, b) => a.utilization - b.utilization)

/** Apps found through SSO and expense data that never went through procurement. */
export const SHADOW_IT = [
  { name: 'Notion', users: 34, spend: 3_672, foundVia: 'Okta sign-ins', color: '#111111', mono: 'N' },
  { name: 'Loom', users: 41, spend: 7_380, foundVia: 'Expense reports', color: '#625DF5', mono: 'L' },
  { name: 'Grammarly', users: 66, spend: 11_880, foundVia: 'Okta sign-ins', color: '#15C39A', mono: 'G' },
  { name: 'Calendly', users: 18, spend: 2_160, foundVia: 'Expense reports', color: '#006BFF', mono: 'C' },
] as const

/** Chapter E consolidation: monday.com onto Asana. */
export const CONSOLIDATION = {
  requestId: 'req-monday-consolidation',
  keepId: 'asana',
  eliminateId: 'monday',
} as const

export const consolidationDerived = () => {
  const keep = usageRows().find((r) => r.vendor.id === CONSOLIDATION.keepId)!
  const drop = usageRows().find((r) => r.vendor.id === CONSOLIDATION.eliminateId)!
  return {
    keep,
    drop,
    combinedActive: keep.active + drop.active,
    fitsInKeep: keep.active + drop.active <= keep.licensed,
    annualSaving: drop.vendor.annualCost,
  }
}

/* ---------- Analytics › Recommendations ---------- */

const pairs: [keep: string, drop: string, category: string][] = [
  ['asana', 'monday', 'Project Management'],
  ['outreach', 'salesloft', 'Sales Engagement'],
  ['looker', 'tableau', 'BI & Analytics'],
]

export const recommendations = () => {
  const usage = usageRows()
  const active = (id: string) => usage.find((r) => r.vendor.id === id)?.active ?? 0
  const dedupe = pairs.map(([k, d, category]) => ({
    category,
    keep: vendorById(k)!,
    drop: vendorById(d)!,
    keepActive: active(k),
    dropActive: active(d),
    saving: vendorById(d)!.annualCost,
  }))
  const dedupeIds = new Set(pairs.flatMap(([k, d]) => [k, d]))
  const TERM_RATE = 0.06
  const term = vendors
    .filter((v) => v.autoRenew && (v.utilization ?? 0) >= 0.85 && !dedupeIds.has(v.id))
    .sort((a, b) => b.annualCost - a.annualCost)
    .slice(0, 5)
    .map((v) => ({ vendor: v, saving: Math.round(v.annualCost * TERM_RATE) }))
  const rightsize = vendors
    .filter((v) => v.utilization !== null && v.utilization < 0.45 && !dedupeIds.has(v.id))
    .map((v) => ({ vendor: v, saving: Math.round(v.annualCost * (1 - (v.utilization! + 0.1))) }))
  const sum = (xs: { saving: number }[]) => xs.reduce((s, x) => s + x.saving, 0)
  return {
    dedupe,
    term,
    termRate: TERM_RATE,
    rightsize,
    totals: { dedupe: sum(dedupe), term: sum(term), rightsize: sum(rightsize), all: sum(dedupe) + sum(term) + sum(rightsize) },
  }
}

/* ---------- Insights › Procurement (S4 bottleneck) ---------- */

export const PROCUREMENT_KPIS = {
  before: { activeTasks: 15, overdueTasks: 3, activeRequests: 8, overdueRequests: 2, securityReviewDays: 4.8, newPurchaseCycleDays: 14.6 },
  after: { activeTasks: 12, overdueTasks: 0, activeRequests: 8, overdueRequests: 0, securityReviewDays: 1.9, newPurchaseCycleDays: 11.7 },
  inFlightSpend: 642_000,
  totalSpend30d: 1_184_000,
  requests90d: { succeeded: 15, rejected: 2 },
  renewalCycleDays: 9.8,
}

/** Task completion histogram (last 30 days), before and after the fix. */
export const TASK_HISTOGRAM = {
  buckets: ['0–5', '6–10', '11–15', '16–20', '21–25', '26+'],
  before: [18, 11, 7, 4, 3, 3],
  after: [27, 12, 5, 2, 0, 0],
}

/** Last 6 months, newest last. */
export const SPEND_6M = [
  { month: 'May', newSpend: 96_000, renewed: 590_000, onTime: 4, late: 1 },
  { month: 'Jun', newSpend: 132_000, renewed: 1_380_000, onTime: 5, late: 1 },
  { month: 'Jul', newSpend: 74_000, renewed: 410_000, onTime: 3, late: 1 },
  { month: 'Aug', newSpend: 118_000, renewed: 480_000, onTime: 4, late: 0 },
  { month: 'Sep', newSpend: 88_000, renewed: 860_000, onTime: 5, late: 2 },
  { month: 'Oct', newSpend: 41_000, renewed: 0, onTime: 1, late: 0 },
]

export const ACTIVE_TASKS = [
  { task: 'SaaS - Security Review', vendor: 'linkdesk', type: 'SaaS - New Purchase', days: 6, overdue: true },
  { task: 'IT Security Approval', vendor: 'dell', type: 'Custom - New Purchase', days: 5, overdue: true },
  { task: 'Requirements Gathering', vendor: 'zoominfo', type: 'SaaS - Contract Renewal', days: 3, overdue: false },
  { task: 'Commercial Approval', vendor: 'hubspot', type: 'SaaS - Contract Renewal', days: 1, overdue: false },
  { task: 'Legal Approval', vendor: 'miro', type: 'SaaS - Contract Renewal', days: 0, overdue: false },
]
