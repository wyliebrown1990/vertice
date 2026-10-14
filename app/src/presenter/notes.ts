/**
 * Presenter Notes, one per S1 beat. Procurement-first.
 * Published proof is kept separate from the fictional Northwind scenario.
 * Source snapshot: research crawl of vertice.one, captured 2026-10-13.
 */
export type Beat =
  | 'dashboard'
  | 'contract'
  | 'benchmark'
  | 'requirements'
  | 'negotiation'
  | 'approval'
  | 'contracting'
  | 'outcome'
  | 'ai'
  | 'other'

export interface Note {
  headline: string
  evidence: string
  proof?: { text: string; source: string }
  discovery?: string
  transition: string
}

const AA_PROOF = {
  text: 'The AA (Head of Procurement, IT, Digital & Data): $1M benefit on a ~$14M software estate, 440 negotiation hours saved, 5x ROI. Published customer result, not Northwind data.',
  source: 'vertice.one/customer-stories/aa (captured 2026-10-13); research/text/customer-stories__aa.md',
}

export const notes: Record<Beat, Note> = {
  dashboard: {
    headline: 'Renewals cost money when you find out too late. Alex can see where to act first.',
    evidence:
      'The pipeline shows every strategic renewal by month. ZoomInfo and Gong notice dates are 3 days out; Salesforce is the largest at $980K, with 50 days to its notice deadline.',
    proof: AA_PROOF,
    discovery: 'How do you find out about a renewal today, and how many auto-renewed last year without a review?',
    transition: 'Let’s open the biggest one: Salesforce, in January.',
  },
  contract: {
    headline: 'One record holds the decision context: cost, usage, quote and the date options close.',
    evidence:
      'Notice deadline (Dec 2, 50 days) vs term end (Jan 31, 110 days) are different dates. The vendor quoted +12% on the same 500 seats, but only 355 were active in the last 28 days.',
    discovery: 'Who owns the call on Salesforce seat counts today: RevOps, Procurement, or nobody until the invoice?',
    transition: 'Before we react to the quote, what does a fair price look like?',
  },
  benchmark: {
    headline: 'Negotiate from evidence, not from the vendor’s opening number.',
    evidence:
      'Current $1,960/seat/yr sits above the illustrative $1,700–$1,850 band for the same product, tier and term. Scope and price are separate levers.',
    proof: {
      text: 'Vertice positions its pricing intelligence as built from real negotiated deals (32,000+ vendors, 2M+ price points per site copy). The plot here is illustrative fixture data.',
      source: 'research/PRODUCT_FEATURES.md §10 (recommended values)',
    },
    discovery: 'Where would your team get this evidence today?',
    transition: 'Let’s capture what we actually need before negotiating.',
  },
  requirements: {
    headline: 'Agree the requirement with the owner first. Usage is evidence, not a licence cancellation.',
    evidence:
      'Jordan (RevOps) confirms 400 seats: 355 active plus 45 headroom. Downgrade means seat scope, not a tier change.',
    discovery: 'How long does it take today to get a business owner to commit to a number?',
    transition: 'With a clear requirement, Vertice’s expert buyer takes the negotiation.',
  },
  negotiation: {
    headline: 'Extend the team’s capacity: an expert buyer runs the negotiation, supported by AI.',
    evidence:
      'Julian Hayes owns it: validate requirements, benchmark terms and price, negotiate, return for approval. Narrate the time jump; in reality this takes days to weeks.',
    proof: AA_PROOF,
    transition: 'Fast-forward: the final offer is in.',
  },
  approval: {
    headline: 'Humans decide. The offer arrives with the evidence to approve it confidently.',
    evidence:
      '400 seats at $1,764/seat/yr = $705,600 for 12 months from Feb 1, 2027. Reduction vs today $274,400 (28%) = $196,000 scope + $78,400 price.',
    discovery: 'Who signs off a renewal this size at your company, and how long does that usually take?',
    transition: 'Approve, and contracting begins.',
  },
  contracting: {
    headline: 'Approval isn’t a signed contract, and the demo is honest about that.',
    evidence: 'Status reads “Approved, contracting pending”. The next click is a labelled time compression to the signed outcome.',
    transition: 'Skip ahead to the signed renewal.',
  },
  outcome: {
    headline: 'Alex can now take Finance a cost reduction with a clear baseline, agreed scope and an accountable owner.',
    evidence:
      '$274,400 annual reduction (28%), effective Feb 1, 2027. The $117,600 avoided uplift is shown separately and is not double-counted. Current spend doesn’t drop until the new term starts.',
    proof: {
      text: 'Vertice publishes 20% average savings and offers contractually guaranteed savings, subject to the customer’s agreement. Don’t promise 20% on every renewal.',
      source: 'vertice.one/pricing (captured 2026-10-13); roadmap/PLAN.md evidence rules',
    },
    discovery: 'Which upcoming renewal would be worth reviewing first?',
    transition: 'Back to the dashboard: the savings card now includes this renewal.',
  },
  ai: {
    headline: 'The value is making the next procurement decision with evidence, then turning it into action.',
    evidence:
      'Recommendation, then evidence, then the owner’s decision, then a next step. Vertice’s 2026 release calls the assistant “Verity”, which draws on 50+ agents. This demo’s answers are scripted.',
    discovery: 'Where would your team get this evidence today?',
    transition: 'Go straight into requirements; don’t dwell on the chatbot.',
  },
  other: {
    headline: 'Outside the S1 path. Bridge verbally, then return to the renewal.',
    evidence: 'Platform breadth: intake-to-procure workflows, usage insights, vendor risk, procure-to-pay. 60–90 seconds, no screen tour.',
    transition: 'Return to the renewal or the dashboard.',
  },
}
