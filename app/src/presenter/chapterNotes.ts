/**
 * Presenter Notes for the full-demo chapters (roadmap/FULL-DEMO-PLAN.md §4).
 * Published proof points come from the 2026-10-15 visual audit of vertice.one
 * (research/site-audit-2026-10-15/); Northwind figures are fictional.
 */
import type { Note } from './notes'

export type ChapterBeat =
  | 'ana'
  | 'intake'
  | 'i2p-risk'
  | 'i2p-reviews'
  | 'i2p-commercial'
  | 'i2p-done'
  | 'rfp'
  | 'vendor'
  | 'expert'
  | 'invoice'
  | 'p2p'
  | 'budgets'
  | 'savings'
  | 'analytics'
  | 'usage'
  | 'procurement'
  | 'workflow'
  | 'ai-spend'
  | 'cloud'
  | 'documents'
  | 'settings'

const SRC = (page: string) => `vertice.one/${page} (captured 2026-10-15); research/site-audit-2026-10-15/`

export const chapterNotes: Record<ChapterBeat, Note> = {
  ana: {
    headline: 'Experts for strategic deals, Ana for the long tail, and a human approves both.',
    evidence: 'Gong: $210K, notice in 3 days, 104 of 200 seats active, +9% quote. Ana reads the contract, plans 3 scenarios inside guardrails Alex approves, negotiates by email and returns 160 seats at $1,000: $50,000 (24%) a year lower.',
    proof: { text: 'Vertice’s Ana page cites 18% average savings and 15 days cut from renewal cycles. Those are published claims, not Northwind data.', source: SRC('ana') },
    discovery: 'How many renewals under $250K renew untouched because nobody has time?',
    transition: 'Approve, and the saving lands on the dashboard next to Salesforce.',
  },
  intake: {
    headline: 'One front door: requests start where people already work.',
    evidence: 'Sam asks in Slack and uploads a quote. Vertice AI reads it and pre-fills 6 fields, suggests preferred vendors, shows the benchmark band and checks the Support budget before anything is submitted.',
    proof: { text: 'Dynamic Intake page: “cut approval delays by over 50%”. Intake-to-Procure page: 50% faster purchasing, 70% fewer manual steps.', source: SRC('platform/intake-management-software') },
    discovery: 'How many places can someone buy software at Northwind today?',
    transition: 'Submit, and the workflow takes over.',
  },
  'i2p-risk': {
    headline: 'Risk is caught before money is committed, with a better option ready.',
    evidence: 'Vertice AI - TPRM rates LinkDesk (fictional) High on Security & Privacy and recommends TeamViewer, already preferred and Low risk. One click switches vendor and tells Sam in Slack.',
    proof: { text: 'Risk Management page: alerts with “Show alternatives” and ratings from Vanta, OneTrust and Dun & Bradstreet.', source: SRC('platform/supplier-risk-management-software') },
    discovery: 'Who checks a new vendor’s security today, and how late in the process?',
    transition: 'Now the reviews run in parallel.',
  },
  'i2p-reviews': {
    headline: 'Policy as a workflow: Security, Compliance and Legal in parallel, not in a queue.',
    evidence: 'Dana approves from Slack. Vertice AI - Compliance passes Net 30 and annual billing. Vertice AI - Legal flags a 60-day auto-renewal against Legal’s preferences, so Leah approves with a redline. Show the Workflow tab.',
    discovery: 'Which approval usually holds up a purchase?',
    transition: 'With reviews done, Finance sees the money.',
  },
  'i2p-commercial': {
    headline: 'Finance approves with budget context, not a spreadsheet.',
    evidence: '$54,000 quote negotiated to $50,400 with benchmark data. It uses 12% of the Support budget; year end lands at 95%. In budget.',
    proof: { text: 'Budget Management page: “This will take up 16% of your IT budget” and “You will end the financial year at 96%” (their example).', source: SRC('platform/budget-management') },
    transition: 'Approve, sign in DocuSign, and the PO is created automatically.',
  },
  'i2p-done': {
    headline: 'From Slack message to signed contract and PO, with no handoffs.',
    evidence: 'Contract created (Not yet live), PO-1042 synced to NetSuite, $3,600 cost avoidance tracked separately. Simulated 6 days vs a 14.6-day average.',
    proof: { text: 'Procurement tour: “Once all approvals are completed, the contract is signed, and the purchase order is created, the request is complete.”', source: 'vertice.one/self-guided-tour (captured 2026-10-15)' },
    transition: 'Next: the invoice for this PO, and one that doesn’t match.',
  },
  rfp: {
    headline: 'No vendor yet? Run a competitive RFP in days, not weeks.',
    evidence: 'Legal needs contract AI. Vertice suggests 4 vendors (all fictional), drafts 12 questions, chases responses, scores them on Legal’s weights and recommends Lexora at 9.1/10: $120K, 20% below list.',
    proof: { text: 'Sourcing page: 7-step RFP Builder ending in “Onboard [winner]”.', source: SRC('platform/sourcing') },
    discovery: 'How do you run an RFP today, and who scores the responses?',
    transition: 'Award, and onboarding starts automatically.',
  },
  vendor: {
    headline: 'Collect supplier data once, keep risk current.',
    evidence: 'The Vendor Portal sends banking, W-9, security and DPA tasks. The vendor record holds contracts, requests, documents and a continuously refreshed risk assessment.',
    proof: { text: 'Vendor Onboarding page: questionnaire tasks (Banking details, IBAN, SWIFT) → “Task sent to vendor”.', source: SRC('platform/vendor-management-software') },
    transition: 'Back to the money: purchase orders and invoices.',
  },
  expert: {
    headline: 'Procurement expertise on demand, for any step.',
    evidence: '10 services across Save money, Source and evaluate vendors, and Plan and optimize, plus cloud EDP negotiation. Book a slot with a named expert.',
    proof: { text: 'Expert Engage page: 7x ROI and at least 20% savings guaranteed (subject to agreement); Holidu saved $155K on one renewal.', source: SRC('platform/expert-engage') },
    transition: 'Which of these would your team use first?',
  },
  invoice: {
    headline: 'Protect the savings you negotiated, at invoice time.',
    evidence: 'Zscaler renewed in September at $240K, but the October invoice bills $330K. Contract Price Match flags +$90,000 before payment; the Email agent drafts the return. The TeamViewer invoice matches PO-1042 and routes to Sam and Priya under the ≥ $5,000 rule.',
    proof: { text: 'Procure-to-Pay page: “Auto matched · Exceeds PO by $7,000” (their example). Their FAQ lists goods-receipt (three-way) matching as planned, so the demo shows two-way only.', source: SRC('procure-to-pay') },
    discovery: 'How would you know today if a vendor billed the old price after a renewal?',
    transition: 'Every PO and payment syncs to NetSuite.',
  },
  p2p: {
    headline: 'Contract to payment, without the handoff.',
    evidence: 'POs are created from approved requests, synced to NetSuite and tracked Committed → Invoiced → Paid. Catalog punchouts handle everyday buying.',
    transition: 'Finance sees the same data as budgets.',
  },
  budgets: {
    headline: 'Live budgets, because commitments land as they are approved.',
    evidence: 'FY2027 budgets per department: paid, invoiced, committed and free. TeamViewer shows in Support as committed the moment the PO exists.',
    transition: 'And the savings ledger keeps every number honest.',
  },
  savings: {
    headline: 'Three kinds of value, never double-counted.',
    evidence: 'Renewal reductions count toward Total savings. Cost avoidance on new purchases and invoice errors prevented are real but tracked separately.',
    proof: { text: 'Pricing page: 20% average savings and 90-day typical payback; savings guarantee subject to the customer’s agreement.', source: SRC('pricing') },
    transition: 'Where does the next saving come from? Usage.',
  },
  analytics: {
    headline: 'Insights Hub: where the next decision comes from.',
    evidence: 'Spend Insights, Savings and ROI, Cost/Cash Forecast (signed renewals change the projection), Recommendations, and the SaaS Stack Matrix for leverage. 9 of the 20 real tabs are built.',
    discovery: 'How confident are you in next year’s software forecast?',
    transition: 'Let’s look at usage behind those numbers.',
  },
  usage: {
    headline: 'Find waste the owners can act on.',
    evidence: 'Utilization from Okta. Asana (41%) and monday.com (39%) overlap: 201 active users fit in Asana’s 280 licenses, so monday.com’s $60K can go at its April notice date. Shadow IT shows 4 unapproved apps.',
    proof: { text: 'Usage Analytics page: “1 in 3 SaaS user licences are not used or are duplicates”.', source: SRC('platform/saas-usage-analytics') },
    discovery: 'How do you find tools nobody approved?',
    transition: 'Create the consolidation request: it feeds straight into renewals.',
  },
  procurement: {
    headline: 'See where work stalls, then fix the process itself.',
    evidence: 'Security Review adds 4.8 days; 3 tasks overdue. Ask Vertice AI for the bottleneck, then “Take me to the flow”. After the fix: 1.9 days, 0 overdue, new purchases 14.6 → 11.7 days.',
    discovery: 'Which step would you fix first if you could see it?',
    transition: 'Into the no-code Workflow Builder.',
  },
  workflow: {
    headline: 'No-code workflows: Procurement changes the process without an IT ticket.',
    evidence: 'Drag “Create Jira Ticket” onto the flagged IT Approval: it becomes IT Approval Request → Resolution in Jira. Warnings clear; Set as Live. AI nodes (Legal, Compliance, Negotiation, Sourcing) live in the same palette.',
    proof: { text: 'Product tour: “IT approval tasks are now automatically synced between Jira and Vertice, removing manual work and reducing delays.”', source: 'vertice.one/self-guided-tour (captured 2026-10-15)' },
    transition: 'Back to Procurement insights to see the impact.',
  },
  'ai-spend': {
    headline: 'Savings beyond SaaS: AI is the fastest-growing line.',
    evidence: '$84.6K a month across Anthropic, OpenAI and Cursor (matching the three contracts), up 61% since February. $6,750 a month (8%) in savings. Anthropic is 85% through its commitment, so start that renewal now.',
    proof: { text: 'AI Cost Optimization page: tabs Spend / Usage / Commitments / Alerts / Setup; “85% of annual commitment used” alert (their example).', source: SRC('platform/ai-cost-optimization') },
    discovery: 'Who owns AI spend at Northwind: Engineering, IT or Finance?',
    transition: 'And the biggest commitment of all: cloud.',
  },
  cloud: {
    headline: 'One view across SaaS, AI and cloud spend.',
    evidence: 'AWS is a separate $3.48M dataset (not in SaaS totals). 104 tests found $650K (18.7%); RI automation; the EDP is consumed above commitment, so hand the renewal to Vertice’s experts.',
    proof: { text: 'Cloud Cost Optimization page: 100+ tests, 34% average savings on EC2 + RDS, 64% average commitment rate.', source: SRC('cloud-cost-optimization-software') },
    discovery: 'Who negotiates your AWS commitment today?',
    transition: 'Close: which of these would be worth reviewing first?',
  },
  documents: {
    headline: 'Legal reviews every purchase before it happens.',
    evidence: 'Drop Asana’s renewal order form: Vertice AI extracts the fields and flags a 10% uplift, a longer notice period and a reduced liability cap. Ask “uncapped liability?” across all documents.',
    proof: { text: 'Contract Center page: “Create contract from file”, “AI Comparison: Auto-renewal clause added”, liability Q&A across indexed docs.', source: SRC('platform/contract-management') },
    discovery: 'How many contracts auto-renew without Legal seeing them?',
    transition: 'The same preferences drive the Legal agent inside workflows.',
  },
  settings: {
    headline: 'Your policy, applied by the agents.',
    evidence: 'Compliance and Legal preferences (Accepted / Requires Review / Not Accepted) are what Vertice AI checks on every request. Integrations connect ERP, Slack, SSO, DocuSign, Jira and AI providers.',
    transition: 'Back to a request to see them in action.',
  },
}
