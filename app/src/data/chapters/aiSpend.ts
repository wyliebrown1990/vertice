/**
 * Chapter F: AI Cost Optimization. Provider totals reconcile with the portfolio
 * (Anthropic $380K, OpenAI $540K, Cursor $95K). Model mix is illustrative.
 */
import { vendorById } from '../vendors'

export const AI_PROVIDERS = ['anthropic', 'openai', 'cursor'] as const

export const aiAnnual = () => AI_PROVIDERS.reduce((s, id) => s + vendorById(id)!.annualCost, 0) // 1,015,000

export const aiMonthly = () => Math.round(aiAnnual() / 12)

/** Share of each provider's monthly spend by model or product. Shares sum to 1 per provider. */
export const MODEL_MIX: { provider: (typeof AI_PROVIDERS)[number]; model: string; share: number }[] = [
  { provider: 'anthropic', model: 'Claude Opus (API)', share: 0.46 },
  { provider: 'anthropic', model: 'Claude Sonnet (API)', share: 0.32 },
  { provider: 'anthropic', model: 'Claude Team seats', share: 0.22 },
  { provider: 'openai', model: 'ChatGPT Enterprise seats', share: 0.55 },
  { provider: 'openai', model: 'GPT frontier (API)', share: 0.3 },
  { provider: 'openai', model: 'GPT mini (API)', share: 0.15 },
  { provider: 'cursor', model: 'Cursor Business seats', share: 1 },
]

export const AI_BY_DEPARTMENT = [
  { department: 'Engineering', share: 0.58 },
  { department: 'Support', share: 0.14 },
  { department: 'Sales', share: 0.11 },
  { department: 'Marketing', share: 0.09 },
  { department: 'Other', share: 0.08 },
]

export interface AiRecommendation {
  id: string
  title: string
  detail: string
  monthlySaving: number
  potential: 'High' | 'Medium'
  action?: { label: string; to: string }
}

export const AI_RECOMMENDATIONS: AiRecommendation[] = [
  {
    id: 'routing',
    title: 'Route classification jobs to a faster model',
    detail: 'Support ticket triage runs on Claude Opus. Sonnet scores within 1% on Northwind’s eval set at a lower token price.',
    monthlySaving: 3_100,
    potential: 'High',
  },
  {
    id: 'commitment',
    title: 'Right-size the OpenAI commitment at renewal',
    detail: 'Northwind has used 61% of its OpenAI commitment with 4.5 months left. Resize before the Jan 29 notice date.',
    monthlySaving: 2_900,
    potential: 'High',
    action: { label: 'View OpenAI contract', to: '/contracts/openai/overview' },
  },
  {
    id: 'seats',
    title: 'Reclaim idle ChatGPT Enterprise seats',
    detail: '378 of 900 seats had no activity in 28 days. Reclaim 300 and keep headroom.',
    monthlySaving: 750,
    potential: 'Medium',
  },
]

export const aiPotentialMonthly = () => AI_RECOMMENDATIONS.reduce((s, r) => s + r.monthlySaving, 0)

/** Annual commitments and burn to date (as of 2026-10-13). */
export const AI_COMMITMENTS = [
  { provider: 'anthropic', commitment: 380_000, used: 323_000, termEnd: '2027-01-15', note: '85% used with 3 months left: on track to exceed before renewal' },
  { provider: 'openai', commitment: 540_000, used: 329_400, termEnd: '2027-02-28', note: '61% used with 4.5 months left: likely under-consumed' },
] as const

export const AI_ALERTS = [
  { level: 'High' as const, text: 'Anthropic: 85% of annual commitment used. Overage pricing applies from ~Dec 10.', to: '/insights/ai-spend?tab=commitments' },
  { level: 'Medium' as const, text: 'Engineering AI spend is 2.1x the peer benchmark per engineer.', to: '/insights/ai-spend?tab=spend' },
  { level: 'Medium' as const, text: 'Retry rate on the support summarisation job rose to 7% this week.', to: '/insights/ai-spend?tab=usage' },
]

export const ANTHROPIC_REQUEST_ID = 'req-anthropic-renewal'

/** Monthly AI spend, last 9 months (newest last), ending at the current run-rate. */
export const aiTrend = () => {
  const now = aiMonthly()
  const factors = [0.62, 0.66, 0.71, 0.76, 0.81, 0.86, 0.91, 0.96, 1]
  const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
  return months.map((m, i) => ({ label: m, value: Math.round(now * factors[i]) }))
}
