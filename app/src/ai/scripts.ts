/**
 * Authored Vertice AI responses (roadmap/Sprint-3). Every number is read from
 * selectors at send time, so answers always match the screens and the current
 * scenario stage. Scripted demo content, no live model.
 */
import { aiMonthly, aiPotentialMonthly, AI_COMMITMENTS } from '../data/chapters/aiSpend'
import { ANA, ANA_REQUEST_ID, anaDerived } from '../data/chapters/ana'
import { budgetImpact } from '../data/chapters/budgets'
import { CLOUD, cloudTotals, OPTIMIZATION_TESTS } from '../data/chapters/cloud'
import { i2pDerived, I2P } from '../data/chapters/i2p'
import { CONSOLIDATION, consolidationDerived, PROCUREMENT_KPIS } from '../data/chapters/insights'
import { LIABILITY_REVIEW } from '../data/platform'
import { S1 } from '../data/scenario'
import { vendorById, vendors } from '../data/vendors'
import { flowStep, reached } from '../domain/flows'
import { noticeDays, s1Summary, scenarioStage, type ScenarioStage } from '../domain/selectors'
import type { ChatAction, ChatBlock, DemoState } from '../domain/types'
import { formatDate, formatShortDate, num, pct, usd, usdCompact } from '../lib/format'

export type IntentId =
  | 's1-savings'
  | 's1-renewals'
  | 's2-usage'
  | 's2-overlap'
  | 'ana-gong'
  | 'liability'
  | 'bottleneck'
  | 'leverage'
  | 'consolidate'
  | 'ai-spend'
  | 'budget'
  | 'cloud'

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

/* ---------- Full-demo chapter answers ---------- */

const anaPath = `/intelligent-workflows/requests/${ANA_REQUEST_ID}/overview`

function anaGong(s: DemoState): ChatBlock[] {
  const d = anaDerived()
  const step = flowStep(s, 'ana')
  if (step === 'completed')
    return [
      { kind: 'text', text: `Ana already secured the Gong renewal: ${num(ANA.targetSeats)} seats at ${usd(ANA.negotiatedPricePerSeat)}, locked for ${ANA.termMonths} months. That’s ${usd(d.annualReduction)} a year (${pct(d.annualReductionPct)}) lower.` },
      { kind: 'actions', items: [{ id: { open: '/contracts/gong/outcomes' }, label: 'View outcome', primary: true }] },
    ]
  return [
    {
      kind: 'text',
      text: `Gong’s notice deadline is ${formatShortDate(ANA.noticeDeadline)}, 3 days away, and the quote adds ${pct(ANA.quoteUpliftPct)}. Only ${num(ANA.activeUsers28d)} of ${num(ANA.currentSeats)} seats were active in 28 days. That’s a good fit for Ana: she can negotiate today within guardrails you approve.`,
    },
    {
      kind: 'metrics',
      items: [
        { label: 'Current annual cost', value: usd(d.currentAnnualCost), sub: `${num(ANA.currentSeats)} seats` },
        { label: 'Vendor quote', value: usd(d.openingQuote), sub: `+${pct(ANA.quoteUpliftPct)} uplift` },
        { label: 'Benchmark', value: `${usd(ANA.benchmarkBandLow)}–${usd(ANA.benchmarkBandHigh)}`, sub: 'per seat (illustrative)', accent: true },
      ],
    },
    {
      kind: 'actions',
      items: [
        step === 'none'
          ? { id: { advance: 'ana', from: 'none', to: 'briefing', open: anaPath }, label: 'Negotiate with Ana', primary: true }
          : { id: { open: anaPath }, label: 'View Ana negotiation', primary: true },
        { id: { open: '/contracts/gong/overview' }, label: 'Open Gong contract' },
      ],
    },
  ]
}

function liability(): ChatBlock[] {
  return [
    { kind: 'text', text: `I reviewed ${LIABILITY_REVIEW.length} indexed documents. One contract has uncapped exposure for Northwind; the rest are capped.` },
    {
      kind: 'table',
      title: 'Liability Risk Overview',
      columns: ['Document', 'Clause', 'Finding', 'Risk'],
      rows: LIABILITY_REVIEW.map((r) => [r.doc, r.clause, r.finding, `${r.risk === 'High' ? '🔴' : r.risk === 'Medium' ? '🟠' : '🟢'} ${r.risk}`]),
    },
    { kind: 'text', tone: 'caveat', text: 'Clause extraction is AI-assisted. Legal should confirm before relying on it. LinkDesk is a fictional vendor from the intake demo.' },
    { kind: 'actions', items: [{ id: { open: '/documents' }, label: 'Open Documents', primary: true }] },
  ]
}

function bottleneck(s: DemoState): ChatBlock[] {
  const k = PROCUREMENT_KPIS
  if (reached(s, 'bottleneck', 'fixed'))
    return [
      { kind: 'text', text: `Since the Jira steps went live, Security Review averages ${k.after.securityReviewDays} days (was ${k.before.securityReviewDays}) and new purchases complete in ${k.after.newPurchaseCycleDays} days (was ${k.before.newPurchaseCycleDays}). No tasks are overdue.` },
      { kind: 'actions', items: [{ id: { open: '/insights/procurement' }, label: 'View procurement insights', primary: true }] },
    ]
  return [
    {
      kind: 'text',
      text: `Bottleneck: the Security Review step is the biggest delay in your SaaS - New Purchase workflow, adding ${k.before.securityReviewDays} days on average. The IT Approval task has no assignee and isn’t connected to your security team’s tooling.`,
    },
    {
      kind: 'text',
      text: 'Recommendation: you already have an Atlassian contract, so add a Jira integration step. It creates a ticket for the Security & Compliance team and syncs the decision back to Vertice, removing the manual hand-off.',
    },
    { kind: 'actions', items: [{ id: { open: '/workflows/edit/new-purchase-advanced?focus=it-approval' }, label: 'Take me to the flow and identify the relevant task', primary: true }] },
  ]
}

function leverage(): ChatBlock[] {
  const top = [...vendors].sort((a, b) => b.annualCost - a.annualCost).slice(0, 6)
  const lever = (id: string, util: number | null) => {
    if (id === 'salesforce') return 'Quote +12%, 71% utilized'
    if (util === null) return 'Usage-based: commit sizing'
    if (util < 0.7) return 'Low utilization'
    return 'Term commitment'
  }
  return [
    { kind: 'text', text: 'Your highest-cost vendors, with the lever that gives you the most negotiation leverage at renewal:' },
    {
      kind: 'table',
      columns: ['Vendor', 'Annual', 'Utilization', 'Renews', 'Leverage'],
      align: ['left', 'right', 'right', 'left', 'left'],
      rows: top.map((v) => [v.name, usdCompact(v.annualCost), v.utilization === null ? 'Usage-based' : pct(v.utilization), formatShortDate(v.renewalDate), lever(v.id, v.utilization)]),
    },
    { kind: 'actions', items: [{ id: { open: '/analytics/saas-stack-matrix' }, label: 'Open SaaS Stack Matrix', primary: true }, { id: { open: '/analytics/recommendations' }, label: 'Recommendations' }] },
  ]
}

function consolidate(s: DemoState): ChatBlock[] {
  const d = consolidationDerived()
  const reqPath = `/intelligent-workflows/requests/${CONSOLIDATION.requestId}/overview`
  return [
    {
      kind: 'text',
      text: `Asana (${d.keep.vendor.department}) and monday.com (${d.drop.vendor.department}) do the same job and are both under-used: ${pct(d.keep.utilization)} and ${pct(d.drop.utilization)}. Their ${num(d.combinedActive)} combined active users fit in Asana’s ${num(d.keep.licensed)} licenses.`,
    },
    {
      kind: 'table',
      columns: ['Keep', 'Eliminate', 'Potential saving', 'Act by'],
      align: ['left', 'left', 'right', 'left'],
      rows: [['Asana', 'monday.com', usd(d.annualSaving), `${formatShortDate(d.drop.vendor.noticeDeadline!)} (notice)`]],
    },
    { kind: 'text', tone: 'caveat', text: 'Both owners should confirm the migration plan. Savings count only once the monday.com contract ends.' },
    {
      kind: 'actions',
      items: [
        reached(s, 'consolidation', 'requested')
          ? { id: { open: reqPath }, label: 'View consolidation request', primary: true }
          : { id: { advance: 'consolidation', from: 'none', to: 'requested', open: reqPath }, label: 'Create consolidation request', primary: true },
        { id: { open: '/insights/usage' }, label: 'Open Usage insights' },
      ],
    },
  ]
}

function aiSpend(): ChatBlock[] {
  const a = AI_COMMITMENTS[0]
  return [
    { kind: 'text', text: `Northwind spends about ${usd(aiMonthly())} a month on AI across Anthropic, OpenAI and Cursor. I found ${usd(aiPotentialMonthly())} a month (${pct(aiPotentialMonthly() / aiMonthly())}) in savings.` },
    {
      kind: 'metrics',
      items: [
        { label: 'Monthly AI spend', value: usd(aiMonthly()) },
        { label: 'Potential monthly savings', value: usd(aiPotentialMonthly()), sub: pct(aiPotentialMonthly() / aiMonthly()), accent: true },
        { label: 'Anthropic commitment used', value: pct(a.used / a.commitment), sub: 'renewal notice Dec 16' },
      ],
    },
    { kind: 'actions', items: [{ id: { open: '/insights/ai-spend' }, label: 'Open AI spend', primary: true }] },
  ]
}

function budget(): ChatBlock[] {
  const amount = i2pDerived().negotiated
  const b = budgetImpact(I2P.department, amount)
  return [
    { kind: 'text', text: `The remote support purchase (${usd(amount)}) uses ${pct(b.share)} of the Support budget. Support would end the fiscal year at ${pct(b.yearEndPct)} of budget, so it stays in budget.` },
    {
      kind: 'metrics',
      items: [
        { label: 'Support budget', value: usd(b.budget.budget) },
        { label: 'Free before', value: usd(b.budget.free) },
        { label: 'Free after', value: usd(b.freeAfter), accent: true },
      ],
    },
    { kind: 'actions', items: [{ id: { open: '/insights/budgets' }, label: 'View budgets', primary: true }] },
  ]
}

function cloud(): ChatBlock[] {
  const t = cloudTotals()
  return [
    { kind: 'text', text: `Northwind’s AWS spend is ${usd(CLOUD.annualSpend)} a year. ${OPTIMIZATION_TESTS.run} optimization tests found ${usd(t.savings)} (${pct(t.savingsPct)}) in savings, most of it in compute.` },
    { kind: 'text', tone: 'caveat', text: `The EDP commitment (${usd(CLOUD.edpCommitment)} a year) ends ${formatDate(CLOUD.edpTermEnd)}. Vertice’s experts can negotiate the renewal.` },
    { kind: 'actions', items: [{ id: { open: '/cloud/overview' }, label: 'Open Cloud Optimizer', primary: true }, { id: { open: '/cloud/edp' }, label: 'EDP renewal' }] },
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
  {
    id: 'ana-gong',
    chip: 'Negotiate my Gong renewal and get me the best price',
    keywords: [['gong'], ['negotiat', 'renew', 'sav', 'price', 'cheaper', 'best', 'cost', 'deal']],
    build: anaGong,
  },
  {
    id: 'liability',
    chip: 'Do any contracts mention uncapped liability?',
    keywords: [['liabilit', 'indemn', 'uncapped']],
    build: () => liability(),
  },
  {
    id: 'bottleneck',
    chip: 'What is the main bottleneck in my SaaS - New Purchase request workflow?',
    keywords: [['bottleneck', 'delay', 'slow', 'stuck', 'cycle time', 'take me to the flow']],
    build: bottleneck,
  },
  {
    id: 'leverage',
    chip: 'Show my highest cost vendors where I have most negotiation leverage',
    keywords: [['leverage', 'highest cost', 'most expensive', 'biggest vendor', 'top vendor', 'biggest spend']],
    build: () => leverage(),
  },
  {
    id: 'consolidate',
    chip: 'What could I save by consolidating Asana and monday.com?',
    keywords: [['asana', 'monday'], ['consolidat', 'sav', 'overlap', 'merge', 'duplicat', 'combine']],
    build: consolidate,
  },
  {
    id: 'ai-spend',
    chip: 'Where can we reduce AI spend?',
    keywords: [['ai spend', 'ai cost', 'token', 'llm', 'ai usage', 'ai tools', 'model cost', 'genai']],
    build: () => aiSpend(),
  },
  {
    id: 'budget',
    chip: 'How does the remote support purchase affect the Support budget?',
    keywords: [['budget']],
    build: () => budget(),
  },
  {
    id: 'cloud',
    chip: 'Where can we save on AWS?',
    keywords: [['aws', 'cloud', 'ec2', 'edp', 'reserved instance']],
    build: () => cloud(),
  },
]

/** Intents checked before the "other vendor" fallback (they name vendors on purpose). */
const CHAPTER_INTENTS: IntentId[] = ['ana-gong', 'consolidate', 'liability', 'bottleneck', 'leverage', 'ai-spend', 'budget', 'cloud']

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
  const chapter = intents.filter((i) => CHAPTER_INTENTS.includes(i.id)).find(hit)
  if (chapter) return { kind: 'intent', intent: chapter }
  if (other && ['sav', 'renew', 'price', 'negotiat', 'cost', 'cheaper', 'discount', 'benchmark'].some((k) => t.includes(k)))
    return { kind: 'other-vendor', vendorName: other.name }
  const found = intents.filter((i) => i.id !== 's1-savings' && !CHAPTER_INTENTS.includes(i.id)).find(hit)
  return found ? { kind: 'intent', intent: found } : { kind: 'unknown' }
}

export const fallbackBlocks = (vendorName?: string): ChatBlock[] => [
  {
    kind: 'text',
    text: vendorName
      ? `I don’t have a scripted analysis for ${vendorName} in this demo. I can help with the Salesforce and Gong renewals, usage, AI and cloud spend, bottlenecks and contract terms.`
      : 'I can help with renewals (Salesforce, Gong with Ana), usage and overlap, AI and cloud spend, workflow bottlenecks and contract terms. Try one of these questions.',
  },
]

export const s1Chips = () => intents.filter((i) => i.id.startsWith('s1'))
export const s2Chips = () => intents.filter((i) => i.id.startsWith('s2'))

const byIds = (ids: IntentId[]) => ids.map((id) => intents.find((i) => i.id === id)!)

/** Suggestion chips for the current page: S1 first, then what fits the screen. */
export const chipsFor = (pathname: string): Intent[] => {
  const extra: IntentId[] = pathname.startsWith('/contracts/gong')
    ? ['ana-gong']
    : pathname.startsWith('/insights/procurement') || pathname.startsWith('/workflows')
      ? ['bottleneck']
      : pathname.startsWith('/analytics') || pathname.startsWith('/insights/usage')
        ? ['leverage', 'consolidate', 's2-usage']
        : pathname.startsWith('/documents') || pathname.startsWith('/contracts')
          ? ['liability']
          : pathname.startsWith('/insights/ai-spend') || pathname.startsWith('/cloud')
            ? ['ai-spend', 'cloud']
            : pathname.startsWith('/insights/budgets') || pathname.includes('req-remote-support')
              ? ['budget']
              : ['s2-usage', 'ana-gong', 'bottleneck']
  return [...s1Chips(), ...byIds(extra)]
}
