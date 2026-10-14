/**
 * Every aggregate the UI shows is computed here from the fixtures plus demo
 * state. Nothing is typed by hand twice.
 */
import { AS_OF, S1, s1Derived } from '../data/scenario'
import { savingsHistory, type SavingsRecord } from '../data/savingsHistory'
import { vendors, vendorById, type Department, type Vendor } from '../data/vendors'
import { daysFromToday, monthKey } from '../lib/format'
import type { DemoState, RequestStage } from './types'

/* ---------- Portfolio (current live terms only) ---------- */

export const portfolioTotal = () => vendors.reduce((sum, v) => sum + v.annualCost, 0)

export const liveContractCount = () => vendors.length

export const futureSignedCount = (s: DemoState) => s.futureTerms.length

export interface DeptSlice {
  department: Department | 'Others'
  amount: number
  share: number
}

/** Top departments by current annual spend, remainder grouped as Others. */
export const spendByDepartment = (top = 5): DeptSlice[] => {
  const total = portfolioTotal()
  const map = new Map<Department, number>()
  for (const v of vendors) map.set(v.department, (map.get(v.department) ?? 0) + v.annualCost)
  const sorted = [...map.entries()].sort((a, b) => b[1] - a[1])
  const head = sorted.slice(0, top).map(([department, amount]) => ({ department, amount, share: amount / total }))
  const rest = sorted.slice(top).reduce((sum, [, a]) => sum + a, 0)
  return rest > 0 ? [...head, { department: 'Others' as const, amount: rest, share: rest / total }] : head
}

/* ---------- Notice deadlines ---------- */

export const noticeDays = (v: Vendor) => (v.noticeDeadline ? daysFromToday(v.noticeDeadline) : null)

export const renewalDays = (v: Vendor) => daysFromToday(v.renewalDate)

export type Urgency = 'passed' | 'critical' | 'soon' | 'upcoming' | 'none'

export const noticeUrgency = (v: Vendor): Urgency => {
  const d = noticeDays(v)
  if (d === null) return 'none'
  if (d < 0) return 'passed'
  if (d <= 14) return 'critical'
  if (d <= 60) return 'soon'
  return 'upcoming'
}

/** Contracts whose notice deadline falls within `days` (including already passed, if recent). */
export const upcomingNotices = (days = 60) =>
  vendors
    .filter((v) => {
      const d = noticeDays(v)
      return d !== null && d <= days && d >= -30
    })
    .sort((a, b) => (noticeDays(a) ?? 0) - (noticeDays(b) ?? 0))

/* ---------- Pipeline: 12 months Nov 2026 – Oct 2027 ---------- */

export const PIPELINE_MONTHS = [
  '2026-11', '2026-12', '2027-01', '2027-02', '2027-03', '2027-04',
  '2027-05', '2027-06', '2027-07', '2027-08', '2027-09', '2027-10',
]

export interface PipelineColumn {
  month: string
  vendors: Vendor[]
  /** Annual value of current contracts still pending renewal in this month. */
  total: number
}

/** Vendors whose next term is already signed through a completed request. */
export const securedVendorIds = (s: DemoState) => new Set(s.futureTerms.map((t) => t.vendorId))

/**
 * Current contracts grouped by renewal month.
 * `in-progress` = the vendor with an active (not completed) renewal request.
 * `upcoming` = everything else; secured renewals stay visible (marked) but are
 * excluded from the pending month total.
 */
export const pipeline = (s: DemoState, view: 'upcoming' | 'in-progress'): PipelineColumn[] => {
  const active = s.request && s.request.stage !== 'completed' ? s.request.vendorId : null
  const secured = securedVendorIds(s)
  const pool = vendors.filter((v) => (view === 'in-progress' ? v.id === active : v.id !== active))
  return PIPELINE_MONTHS.map((month) => {
    const list = pool.filter((v) => monthKey(v.renewalDate) === month).sort((a, b) => b.annualCost - a.annualCost)
    const total = list.filter((v) => !secured.has(v.id)).reduce((sum, v) => sum + v.annualCost, 0)
    return { month, vendors: list, total }
  })
}

/* ---------- Savings ---------- */

export const allSavings = (s: DemoState): SavingsRecord[] => [...savingsHistory, ...s.savingsEntries]

export const savingsSummary = (s: DemoState) => {
  const records = allSavings(s)
  const reduction = records.reduce((sum, r) => sum + r.annualReduction, 0)
  const baseline = records.reduce((sum, r) => sum + r.baselineAnnual, 0)
  // Weighted: sum of reductions / sum of the matching pre-renewal costs.
  return { reduction, baseline, weightedPct: baseline ? reduction / baseline : 0, count: records.length }
}

/* ---------- S1 helpers ---------- */

export type ScenarioStage = RequestStage | 'none'

export const scenarioStage = (s: DemoState): ScenarioStage => s.request?.stage ?? 'none'

export const salesforce = () => {
  const v = vendorById(S1.vendorId)
  if (!v) throw new Error('Salesforce fixture missing')
  return v
}

export const s1Summary = () => ({ ...s1Derived(), noticeDays: daysFromToday(S1.noticeDeadline), termEndDays: daysFromToday(S1.termEnd), asOf: AS_OF })

/** Is the negotiated offer visible yet (approval or later)? */
export const offerVisible = (stage: ScenarioStage) => stage === 'approval' || stage === 'contracting' || stage === 'completed'

export const STAGE_LABEL: Record<ScenarioStage, string> = {
  none: 'Not started',
  requirements: 'Requirements gathering',
  negotiation: 'Vertice-led negotiation',
  approval: 'Final offer: approval needed',
  contracting: 'Approved, contracting pending',
  completed: 'Renewal secured',
}
