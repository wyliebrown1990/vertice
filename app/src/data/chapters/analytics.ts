/**
 * Insights › Analytics calculations (Chapter E). Everything derives from the
 * 42-contract portfolio, savings history and demo state, so the tabs reconcile
 * with the dashboard. Contract length, billing and payment-term splits are
 * illustrative attributes.
 */
import { allFutureTerms, allSavings } from '../../domain/selectors'
import type { DemoState } from '../../domain/types'
import { AS_OF } from '../scenario'
import { savingsHistory } from '../savingsHistory'
import { vendors, type Vendor } from '../vendors'
import { LICENSED_SEATS } from './insights'

const LENGTH_36 = new Set(['workday', 'servicenow'])
const LENGTH_24 = new Set(['microsoft', 'snowflake', 'datadog', 'netsuite'])
const QUARTERLY = new Set(['snowflake', 'datadog', 'openai', 'anthropic'])
const MONTHLY = new Set(['cursor', 'canva'])
const NET60 = new Set(['workday', 'servicenow', 'microsoft'])
const NET45 = new Set(['atlassian', 'slack'])

export const contractLength = (v: Vendor) => (LENGTH_36.has(v.id) ? '36 months' : LENGTH_24.has(v.id) ? '24 months' : '12 months')
export const billing = (v: Vendor) => (QUARTERLY.has(v.id) ? 'Quarterly' : MONTHLY.has(v.id) ? 'Monthly' : 'Annually')
export const paymentTerms = (v: Vendor) => (NET60.has(v.id) ? 'Net 60' : NET45.has(v.id) ? 'Net 45' : 'Net 30')

/** Renewals at or above this value are negotiated by Vertice's experts. */
export const VERTICE_THRESHOLD = 200_000

export const negotiationSupport = (v: Vendor) => {
  if (savingsHistory.some((r) => r.vendorId === v.id)) return 'Negotiated by Vertice'
  if (v.annualCost >= VERTICE_THRESHOLD) return 'To be negotiated by Vertice'
  return 'Northwind-led (Ana eligible)'
}

const groupSum = (key: (v: Vendor) => string) => {
  const m = new Map<string, number>()
  for (const v of vendors) m.set(key(v), (m.get(key(v)) ?? 0) + v.annualCost)
  return [...m.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value)
}

const topN = (xs: { label: string; value: number }[], n: number) =>
  xs.length <= n ? xs : [...xs.slice(0, n - 1), { label: 'Other', value: xs.slice(n - 1).reduce((s, x) => s + x.value, 0) }]

export const spendInsights = () => {
  const total = vendors.reduce((s, v) => s + v.annualCost, 0)
  return {
    total,
    live: vendors.length,
    average: Math.round(total / vendors.length),
    toNegotiate: vendors.filter((v) => negotiationSupport(v) === 'To be negotiated by Vertice').reduce((s, v) => s + v.annualCost, 0),
    byDepartment: topN(groupSum((v) => v.department), 7),
    byCategory: topN(groupSum((v) => v.category), 8),
    bySupport: groupSum(negotiationSupport),
    byLength: groupSum(contractLength),
    byBilling: groupSum(billing),
    byTerms: groupSum(paymentTerms),
  }
}

/* ---------- Savings and ROI ---------- */

const quarterOf = (iso: string) => `Q${Math.floor((Number(iso.slice(5, 7)) - 1) / 3) + 1} ${iso.slice(2, 4)}`

export const savingsRoi = (s: DemoState) => {
  const records = allSavings(s)
  const quarters = ['Q2 26', 'Q3 26', 'Q4 26']
  const byQuarter = quarters.map((q) => {
    const rs = records.filter((r) => quarterOf(r.completedOn) === q)
    return { label: q, value: rs.reduce((sum, r) => sum + r.annualReduction, 0), count: rs.length }
  })
  let run = 0
  const cumulative = [...records]
    .sort((a, b) => a.completedOn.localeCompare(b.completedOn))
    .map((r) => {
      run += r.annualReduction
      return { label: r.completedOn.slice(5).replace('-', '/'), value: run }
    })
  const byDept = new Map<string, number>()
  for (const r of records) {
    const d = vendors.find((v) => v.id === r.vendorId)!.department
    byDept.set(d, (byDept.get(d) ?? 0) + r.annualReduction)
  }
  return {
    total: records.reduce((sum, r) => sum + r.annualReduction, 0),
    baseline: records.reduce((sum, r) => sum + r.baselineAnnual, 0),
    negotiations: records.length,
    byQuarter,
    cumulative,
    byDepartment: [...byDept.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value),
  }
}

/* ---------- Cost / cash forecast (Jan 2026 – Dec 2027) ---------- */

export const FORECAST_INFLATION = 0.06

const monthsBetween = (from: string, to: string) => {
  const out: string[] = []
  let [y, m] = from.split('-').map(Number)
  const [ty, tm] = to.split('-').map(Number)
  while (y < ty || (y === ty && m <= tm)) {
    out.push(`${y}-${String(m).padStart(2, '0')}`)
    m += 1
    if (m > 12) {
      m = 1
      y += 1
    }
  }
  return out
}

export const FORECAST_MONTHS = monthsBetween('2026-01', '2027-12')
export const FORECAST_SPLIT = FORECAST_MONTHS.indexOf(AS_OF.slice(0, 7))

/** Annual cost of a vendor in a given month (YYYY-MM), applying renewals. */
const annualAt = (s: DemoState, v: Vendor, month: string) => {
  const hist = savingsHistory.find((r) => r.vendorId === v.id)
  if (hist && month < hist.completedOn.slice(0, 7)) return hist.baselineAnnual
  const renewMonth = v.renewalDate.slice(0, 7)
  if (month <= renewMonth) return v.annualCost
  const future = allFutureTerms(s).find((t) => t.vendorId === v.id)
  return future ? future.annualCost : Math.round(v.annualCost * (1 + FORECAST_INFLATION))
}

export const costForecast = (s: DemoState) => {
  const cost = FORECAST_MONTHS.map((m) => ({ label: m, value: Math.round(vendors.reduce((sum, v) => sum + annualAt(s, v, m), 0) / 12) }))
  // Cash: annual billing lands in the month each term starts; other frequencies spread evenly.
  const cash = FORECAST_MONTHS.map((m) => {
    let total = 0
    for (const v of vendors) {
      const startMonth = Number(v.renewalDate.slice(5, 7)) % 12
      const isStart = Number(m.slice(5, 7)) % 12 === startMonth
      const annual = annualAt(s, v, m)
      if (billing(v) === 'Annually') total += isStart ? annual : 0
      else if (billing(v) === 'Quarterly') total += (Number(m.slice(5, 7)) - startMonth) % 3 === 0 ? annual / 4 : 0
      else total += annual / 12
    }
    return { label: m, value: Math.round(total) }
  })
  const first = cost[0].value * 12
  const last = cost[cost.length - 1].value * 12
  return { cost, cash, first, last, growth: last / first - 1 }
}

/* ---------- Benchmarking (illustrative bands, $ per seat per year) ---------- */

const BANDS: Record<string, [number, number]> = {
  salesforce: [1_700, 1_850],
  gong: [960, 1_080],
  zoom: [70, 90],
  slack: [210, 260],
  zoominfo: [1_250, 1_500],
  hubspot: [3_400, 4_100],
  atlassian: [300, 380],
  zendesk: [1_300, 1_500],
  github: [430, 520],
  figma: [480, 560],
}

export const benchmarkRows = () =>
  Object.entries(BANDS).map(([id, [low, high]]) => {
    const v = vendors.find((x) => x.id === id)!
    const price = Math.round(v.annualCost / LICENSED_SEATS[id])
    const position = price > high ? 'Above' : price < low ? 'Below' : 'Within'
    const saving = position === 'Above' ? (price - high) * LICENSED_SEATS[id] : 0
    return { vendor: v, price, low, high, position, saving, percentile: position === 'Above' ? 90 : position === 'Within' ? 55 : 25 }
  })
