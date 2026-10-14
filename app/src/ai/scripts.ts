/**
 * Authored Vertice AI responses (roadmap/Sprint-3). Every number is read from
 * selectors at send time, so answers always match the screens and the current
 * scenario stage. Scripted demo content, no live model.
 */
import { S1 } from '../data/scenario'
import { vendorById, vendors } from '../data/vendors'
import { noticeDays, s1Summary, scenarioStage, type ScenarioStage } from '../domain/selectors'
import type { ChatAction, ChatBlock, DemoState } from '../domain/types'
import { formatDate, formatShortDate, num, pct, usd, usdCompact } from '../lib/format'

export type IntentId = 's1-savings' | 's1-renewals' | 's2-usage' | 's2-overlap'

export interface Intent {
  id: IntentId
  chip: string
  /** Normalized keyword groups: every group must have at least one hit. */
  keywords: string[][]
  build: (s: DemoState) => ChatBlock[]
}

const renewalAction = (stage: ScenarioStage): ChatAction =>
  stage === 'none'
    ? { id: 'start-renewal', label: 'Start renewal', primary: true }
    : stage === 'completed'
      ? { id: 'view-outcome', label: 'View outcome', primary: true }
      : { id: 'view-renewal', label: 'View renewal', primary: true }

function s1Savings(s: DemoState): ChatBlock[] {
  const d = s1Summary()
  const stage = scenarioStage(s)
  if (stage === 'completed') {
    return [
      {
        kind: 'text',
        text: `The Salesforce renewal is already secured. The signed (simulated) next term starts ${formatDate(S1.nextTermStart)}: ${num(S1.targetSeats)} seats at ${usd(S1.negotiatedPricePerSeat)} per seat, ${usd(d.futureAnnualCost)} a year.`,
      },
      {
        kind: 'metrics',
        items: [
          { label: 'Annual reduction', value: usd(d.annualReduction), sub: `${pct(d.annualReductionPct)} vs today`, accent: true },
          { label: 'Scope', value: usd(d.scopeReduction), sub: '100 fewer seats' },
          { label: 'Price', value: usd(d.unitPriceReduction), sub: `${usd(d.currentPricePerSeat - S1.negotiatedPricePerSeat)}/seat lower` },
        ],
      },
      { kind: 'text', tone: 'muted', text: `Avoided uplift of ${usd(d.avoidedUplift)} is tracked separately. Current spend stays at ${usd(S1.currentAnnualCost)} until ${formatDate(S1.termEnd)}.` },
      { kind: 'actions', items: [renewalAction(stage)] },
    ]
  }
  return [
    {
      kind: 'text',
      text: `Recommendation: renegotiate before the notice deadline (${formatShortDate(S1.noticeDeadline)}, ${d.noticeDays} days). Reject the ${pct(S1.quoteUpliftPct)} uplift and right-size to ${num(S1.targetSeats)} seats. That could reduce annual spend by up to ${usd(d.annualReduction)}.`,
    },
    {
      kind: 'table',
      title: 'Evidence',
      columns: ['', 'Today', 'Quote', 'Target'],
      align: ['left', 'right', 'right', 'right'],
      rows: [
        ['Seats', num(S1.currentSeats), num(S1.currentSeats), num(S1.targetSeats)],
        ['$/seat/yr', usd(d.currentPricePerSeat), usd(d.openingQuotePricePerSeat), usd(S1.negotiatedPricePerSeat)],
        ['Annual cost', usd(S1.currentAnnualCost), usd(d.openingQuote), usd(d.futureAnnualCost)],
      ],
    },
    {
      kind: 'metrics',
      items: [
        { label: 'Potential annual reduction', value: usd(d.annualReduction), sub: `${pct(d.annualReductionPct)} vs today`, accent: true },
        { label: 'Avoided uplift (separate)', value: usd(d.avoidedUplift), sub: 'vs the opening quote' },
      ],
    },
    {
      kind: 'text',
      tone: 'caveat',
      text: `Why ${num(S1.targetSeats)}: ${num(S1.activeUsers28d)} of ${num(S1.currentSeats)} seats were active in 28 days (${pct(d.utilizationPct)}); ${num(S1.targetSeats)} keeps ${d.headroomSeats} seats of headroom. ${personName(S1.owner)} should confirm before anything changes. The ${usd(S1.benchmarkBandLow)}–${usd(S1.benchmarkBandHigh)} band is an illustrative benchmark fixture.`,
    },
    { kind: 'actions', items: [{ id: 'view-benchmark', label: 'View benchmark' }, renewalAction(stage)] },
  ]
}

const personName = (id: string) => (id === 'jordan-reyes' ? 'Jordan Reyes (RevOps)' : id)

function s1Renewals(s: DemoState): ChatBlock[] {
  const stage = scenarioStage(s)
  const soon = vendors
    .filter((v) => {
      const d = noticeDays(v)
      return d !== null && d >= 0 && d <= 60
    })
    .sort((a, b) => (noticeDays(a) ?? 0) - (noticeDays(b) ?? 0))
  const passed = vendors.filter((v) => (noticeDays(v) ?? 1) < 0)
  const stageLabel = (id: string) => {
    if (id !== 'salesforce') return 'Not started'
    return stage === 'none' ? 'Not started' : stage === 'completed' ? 'Secured' : 'In progress'
  }
  return [
    {
      kind: 'text',
      text: `${soon.length} renewals have notice deadlines in the next 60 days. ZoomInfo and Gong are 3 days out; Salesforce is the largest at ${usd(S1.currentAnnualCost)}, with ${s1Summary().noticeDays} days to act.`,
    },
    {
      kind: 'table',
      columns: ['Vendor', 'Annual', 'Notice', 'Renews', 'Stage'],
      align: ['left', 'right', 'left', 'left', 'left'],
      rows: soon.map((v) => [
        v.name,
        usdCompact(v.annualCost),
        `${formatShortDate(v.noticeDeadline!)} · ${noticeDays(v)}d`,
        formatShortDate(v.renewalDate),
        stageLabel(v.id),
      ]),
    },
    ...(passed.length
      ? [
          {
            kind: 'text' as const,
            tone: 'caveat' as const,
            text: `${passed.map((v) => v.name).join(', ')}: notice deadline already passed, so it will auto-renew ${formatShortDate(passed[0].renewalDate)} unless the vendor agrees otherwise.`,
          },
        ]
      : []),
    {
      kind: 'actions',
      items: [
        { id: { open: '/contracts/zoominfo/overview' }, label: 'Open ZoomInfo' },
        { id: { open: '/contracts/gong/overview' }, label: 'Open Gong' },
        { id: { open: '/contracts/salesforce/overview' }, label: 'Open Salesforce', primary: true },
      ],
    },
  ]
}

/* ---------- Optional S2 breadth (sampled, standalone, no deferred-route actions) ---------- */

function s2Usage(): ChatBlock[] {
  const sample = ['zoom', 'salesloft', 'monday', 'asana', 'zoominfo', 'tableau', 'slack', 'okta'].map((id) => vendorById(id)!)
  return [
    { kind: 'text', text: 'Here’s a sample of seat utilization from the last 28-day SSO snapshot, lowest first:' },
    {
      kind: 'table',
      columns: ['Application', 'Owner', 'Utilization', 'Annual cost'],
      align: ['left', 'left', 'right', 'right'],
      rows: sample
        .sort((a, b) => (a.utilization ?? 1) - (b.utilization ?? 1))
        .map((v) => [`${v.utilization! < 0.5 ? '🔴' : v.utilization! < 0.8 ? '🟠' : '🟢'} ${v.name}`, v.department, pct(v.utilization!), usd(v.annualCost)]),
    },
    { kind: 'text', tone: 'caveat', text: 'A sample of the strategic portfolio, not all apps. Low usage is a review prompt for the owner, not proof a tool can be cut.' },
  ]
}

function s2Overlap(): ChatBlock[] {
  const pair = (a: string, b: string) => {
    const va = vendorById(a)!
    const vb = vendorById(b)!
    return [`${va.name} / ${vb.name}`, `${usd(va.annualCost)} + ${usd(vb.annualCost)}`, usd(va.annualCost + vb.annualCost)]
  }
  return [
    { kind: 'text', text: 'These tools overlap in function and are worth an owner review before their renewals:' },
    {
      kind: 'table',
      columns: ['Overlap', 'Annual cost', 'Spend at issue'],
      align: ['left', 'right', 'right'],
      rows: [pair('microsoft', 'google'), pair('zendesk', 'intercom'), pair('outreach', 'salesloft'), pair('looker', 'tableau')],
    },
    {
      kind: 'text',
      tone: 'caveat',
      text: 'Overlap is an investigation candidate, not proof either tool can be cancelled: teams, integrations and contract dates differ. These aren’t included in the Salesforce savings.',
    },
  ]
}

export const intents: Intent[] = [
  {
    id: 's1-savings',
    chip: 'What savings opportunities are there for my Salesforce renewal?',
    keywords: [['salesforce', 'crm', 'sfdc', 'sales cloud'], ['saving', 'save', 'opportunit', 'cheaper', 'reduce', 'overpay', 'negotiat', 'benchmark', 'price', 'renew']],
    build: s1Savings,
  },
  {
    id: 's1-renewals',
    chip: 'What contracts do I have coming up for renewal?',
    keywords: [['renewal', 'renew', 'expir', 'coming up', 'upcoming', 'deadline', 'notice'], ['contract', 'what', 'which', 'list', 'show', 'upcoming', 'coming']],
    build: s1Renewals,
  },
  {
    id: 's2-usage',
    chip: 'Tell me about application usage across my SaaS stack',
    keywords: [['usage', 'utiliz', 'utilis', 'active user', 'adoption', 'unused', 'shelfware']],
    build: s2Usage,
  },
  {
    id: 's2-overlap',
    chip: 'Are there duplicated or overlapping tools?',
    keywords: [['duplicat', 'overlap', 'redundan', 'consolidat']],
    build: s2Overlap,
  },
]

const normalize = (t: string) =>
  t
    .toLowerCase()
    .replace(/sales\s*force/g, 'salesforce')
    .replace(/renwal|reneal|rewnal/g, 'renewal')
    .replace(/savigns|saveings|svings/g, 'savings')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')

/** Vendors named in the prompt other than Salesforce (so we never answer with Salesforce numbers). */
const otherVendorMentioned = (t: string) =>
  vendors.find((v) => v.id !== 'salesforce' && (t.includes(v.name.toLowerCase()) || t.includes(v.id)))

export type Match = { kind: 'intent'; intent: Intent } | { kind: 'other-vendor'; vendorName: string } | { kind: 'unknown' }

export function matchPrompt(raw: string): Match {
  const exact = intents.find((i) => i.chip === raw)
  if (exact) return { kind: 'intent', intent: exact }
  const t = normalize(raw)
  const other = otherVendorMentioned(t)
  const hit = (i: Intent) => i.keywords.every((group) => group.some((k) => t.includes(k)))
  const s1 = intents.find((i) => i.id === 's1-savings')!
  if (hit(s1) && !other) return { kind: 'intent', intent: s1 }
  if (other && ['sav', 'renew', 'price', 'negotiat', 'cost', 'cheaper', 'discount', 'benchmark'].some((k) => t.includes(k)))
    return { kind: 'other-vendor', vendorName: other.name }
  const found = intents.filter((i) => i.id !== 's1-savings').find(hit)
  return found ? { kind: 'intent', intent: found } : { kind: 'unknown' }
}

export const fallbackBlocks = (vendorName?: string): ChatBlock[] => [
  {
    kind: 'text',
    text: vendorName
      ? `This demo covers the Salesforce renewal, so I can’t analyse ${vendorName} here. Try one of these questions.`
      : 'This demo covers the Salesforce renewal. Try one of these questions.',
  },
]

export const s1Chips = () => intents.filter((i) => i.id.startsWith('s1'))
export const s2Chips = () => intents.filter((i) => i.id.startsWith('s2'))
