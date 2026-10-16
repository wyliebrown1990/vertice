/**
 * Chapter C: choose a vendor (Sourcing RFP) and onboard it. FULL-DEMO-PLAN.md §4–5.
 * All four bidders are fictional so that comparative scores never rate a real company.
 */
export const RFP_REQUEST_ID = 'req-contract-ai-rfp'

export const RFP = {
  title: 'Contract review AI for Legal',
  requester: 'leah-brooks',
  department: 'Legal' as const,
  need: 'An AI contract-review tool that redlines third-party paper against Northwind’s legal playbook.',
  budget: 140_000,
  seats: 25,
  winnerId: 'lexora',
  responseDeadline: '2026-10-27',
} as const

export const RFP_WEIGHTS = [
  { id: 'security', label: 'Security & data handling', weight: 30 },
  { id: 'functionality', label: 'Functionality', weight: 30 },
  { id: 'price', label: 'Price', weight: 25 },
  { id: 'integrations', label: 'Integrations', weight: 15 },
] as const

export type CriterionId = (typeof RFP_WEIGHTS)[number]['id']

export const RFP_INTEGRATIONS = [
  { id: 'docusign', label: 'DocuSign', mustHave: true },
  { id: 'ironclad', label: 'Ironclad', mustHave: false },
  { id: 'gdrive', label: 'Google Drive', mustHave: true },
  { id: 'slack', label: 'Slack', mustHave: false },
] as const

export interface Bidder {
  vendorId: string
  badge?: string
  /** Annual price for 25 seats. */
  price: number
  listPrice: number
  /** 0–10 per criterion. */
  scores: Record<CriterionId, number>
  response: 'received' | 'reminder'
  highlights: string
}

export const BIDDERS: Bidder[] = [
  {
    vendorId: 'lexora',
    badge: 'Trending · 2x growth',
    price: 120_000,
    listPrice: 150_000,
    scores: { security: 10, functionality: 9, price: 8, integrations: 9 },
    response: 'received',
    highlights: 'Playbook-based redlines in Word; DocuSign + Google Drive native; EU data residency',
  },
  {
    vendorId: 'clausewise',
    badge: 'Most popular · 41% of peers',
    price: 132_000,
    listPrice: 140_000,
    scores: { security: 8, functionality: 9, price: 6, integrations: 7 },
    response: 'received',
    highlights: 'Strong clause library; no Google Drive connector yet',
  },
  {
    vendorId: 'pactly',
    price: 98_000,
    listPrice: 110_000,
    scores: { security: 8, functionality: 6, price: 10, integrations: 6 },
    response: 'received',
    highlights: 'Lowest price; limited playbook customisation',
  },
  {
    vendorId: 'draftly',
    badge: 'New entrant',
    price: 90_000,
    listPrice: 90_000,
    scores: { security: 5, functionality: 7, price: 10, integrations: 5 },
    response: 'reminder',
    highlights: 'SOC 2 Type I only; response pending',
  },
]

/** Weighted score out of 10, one decimal. */
export const weightedScore = (b: Bidder) => {
  const total = RFP_WEIGHTS.reduce((sum, w) => sum + b.scores[w.id] * w.weight, 0)
  return Math.round((total / 100) * 10) / 10
}

export const rfpDerived = () => {
  const winner = BIDDERS.find((b) => b.vendorId === RFP.winnerId)!
  return { winner, costAvoidance: winner.listPrice - winner.price, underBudget: RFP.budget - winner.price }
}

/** "Vertice drafted 12 questions". */
export const RFP_QUESTIONS = [
  'Describe how your product applies a customer’s legal playbook to third-party paper.',
  'Which document formats and redlining workflows (Word track changes, PDF) are supported?',
  'Where is customer data stored and processed? Is EU data residency available?',
  'Is customer data used to train or fine-tune models? Provide the contractual commitment.',
  'Provide your most recent SOC 2 Type II report and ISO 27001 certificate.',
  'List native integrations with DocuSign, Ironclad and Google Drive.',
  'Describe SSO (SAML) and SCIM support and admin roles.',
  'What accuracy metrics do you publish for clause detection, and how are they measured?',
  'Provide pricing for 25 users on 12- and 24-month terms, including any usage limits.',
  'Describe implementation timeline and services included.',
  'Provide two customer references of similar size in software or SaaS.',
  'Describe your support SLAs and uptime commitment.',
] as const

/** Vendor Portal onboarding tasks sent to the winner. */
export const ONBOARDING_TASKS = [
  { id: 'banking', title: 'Banking details', type: 'Payments', fields: ['Bank name', 'IBAN / account number', 'SWIFT / routing number'] },
  { id: 'tax', title: 'W-9 tax form', type: 'Finance', fields: ['File upload'] },
  { id: 'security', title: 'Security evidence', type: 'Security', fields: ['SOC 2 Type II report', 'Penetration test summary'] },
  { id: 'dpa', title: 'Data processing agreement', type: 'Legal', fields: ['Signed DPA'] },
] as const
