/**
 * Platform reference data: Expert Engage services, integrations, settings
 * preferences (which drive the Compliance and Legal AI agents) and documents.
 * Names follow the 2026-10-15 site audit (research/site-audit-2026-10-15/).
 */

export interface ExpertService {
  id: string
  group: 'Save money' | 'Source and evaluate vendors' | 'Plan and optimize'
  title: string
  blurb: string
  deliverables: string[]
  turnaround: string
}

export const EXPERT_SERVICES: ExpertService[] = [
  { id: 'benchmarking', group: 'Save money', title: 'Vendor price benchmarking', blurb: 'See how your contract compares to real-world deals for the same product, tier and term.', deliverables: ['Benchmark band and percentile', 'Price drivers', 'Negotiation targets'], turnaround: '2 business days' },
  { id: 'negotiation', group: 'Save money', title: 'Expert negotiation support', blurb: 'A Vertice buyer runs the negotiation end to end, backed by the savings guarantee.', deliverables: ['Negotiation strategy', 'Vendor communications', 'Final offer for approval'], turnaround: 'Starts within 1 business day' },
  { id: 'consolidation', group: 'Save money', title: 'Software consolidation', blurb: 'Find overlapping tools and plan the switch, including contract dates and migration effort.', deliverables: ['Overlap map', 'Consolidation roadmap', 'Savings estimate'], turnaround: '1 week' },
  { id: 'recommendation', group: 'Source and evaluate vendors', title: 'Vendor recommendation', blurb: 'A shortlist of vendors that fit your requirements, with peer adoption and pricing context.', deliverables: ['Shortlist of 3–5 vendors', 'Fit summary', 'Typical pricing'], turnaround: '3 business days' },
  { id: 'rfi', group: 'Source and evaluate vendors', title: 'Request for information (RFI)', blurb: 'Gather structured information from a long list of vendors before you shortlist.', deliverables: ['Question set', 'Vendor outreach', 'Response summary'], turnaround: '1–2 weeks' },
  { id: 'rfp', group: 'Source and evaluate vendors', title: 'Request for proposal (RFP)', blurb: 'Run a competitive sourcing event with scored responses and a recommendation.', deliverables: ['RFP document', 'Vendor management', 'Scored comparison', 'Award recommendation'], turnaround: '2–3 weeks' },
  { id: 'rfq', group: 'Source and evaluate vendors', title: 'Request for quotation (RFQ)', blurb: 'Collect comparable quotes when requirements are already clear.', deliverables: ['Quote template', 'Vendor outreach', 'Price comparison'], turnaround: '1 week' },
  { id: 'budget', group: 'Plan and optimize', title: 'Budget planning & analysis', blurb: 'Build next year’s software budget from contracts, renewals and forecast inflation.', deliverables: ['Department budgets', 'Renewal forecast', 'Risk register'], turnaround: '2 weeks' },
  { id: 'peer', group: 'Plan and optimize', title: 'Peer group analysis', blurb: 'Compare your stack and spend per employee against similar companies.', deliverables: ['Peer comparison', 'Outlier vendors', 'Recommendations'], turnaround: '1 week' },
  { id: 'maturity', group: 'Plan and optimize', title: 'Procurement maturity assessment', blurb: 'Score your procurement process and get a prioritised improvement plan.', deliverables: ['Maturity score', 'Gap analysis', '90-day plan'], turnaround: '1 week' },
  { id: 'edp', group: 'Save money', title: 'Cloud commitment (EDP) negotiation', blurb: 'Vertice experts negotiate your AWS Enterprise Discount Program renewal.', deliverables: ['Commitment sizing', 'Discount benchmark', 'Negotiated EDP terms'], turnaround: 'Starts within 1 business day' },
]

export const expertById = (id: string) => EXPERT_SERVICES.find((s) => s.id === id)

export const EXPERT_SLOTS = ['Thu, Oct 15 · 10:00', 'Thu, Oct 15 · 14:30', 'Fri, Oct 16 · 09:00', 'Mon, Oct 19 · 11:00'] as const

export interface Integration {
  name: string
  category: string
  status: 'Connected' | 'Available'
  note: string
  color: string
  mono: string
}

export const INTEGRATIONS: Integration[] = [
  { name: 'NetSuite', category: 'ERP', status: 'Connected', note: 'Purchase orders, vendors and invoices sync both ways', color: '#1F3A5F', mono: 'NS' },
  { name: 'Microsoft Dynamics', category: 'ERP', status: 'Available', note: 'PO and invoice sync', color: '#0B53CE', mono: 'MD' },
  { name: 'Slack', category: 'Communication', status: 'Connected', note: 'Intake, approvals and notifications', color: '#4A154B', mono: 'S' },
  { name: 'Microsoft Teams', category: 'Communication', status: 'Available', note: 'Intake and approvals', color: '#5059C9', mono: 'T' },
  { name: 'Okta', category: 'SaaS usage monitoring (SSO)', status: 'Connected', note: 'Sign-in data for Usage insights', color: '#007DC1', mono: 'O' },
  { name: 'Google Workspace', category: 'SaaS usage monitoring (SSO)', status: 'Connected', note: 'Sign-in data for Usage insights', color: '#4285F4', mono: 'G' },
  { name: 'Anthropic Console', category: 'AI usage', status: 'Connected', note: 'Token usage by model and workspace', color: '#D97757', mono: 'A' },
  { name: 'OpenAI Platform', category: 'AI usage', status: 'Connected', note: 'Token usage by model and project', color: '#10A37F', mono: 'AI' },
  { name: 'AWS', category: 'Cloud', status: 'Connected', note: 'Cost and usage reports for Cloud Optimizer', color: '#232F3E', mono: 'aws' },
  { name: 'Adaptive Planning', category: 'Budgeting', status: 'Available', note: 'Department budgets', color: '#E35205', mono: 'AP' },
  { name: 'DocuSign', category: 'Legal', status: 'Connected', note: 'Send contracts for signature from workflows', color: '#4C00FF', mono: 'D' },
  { name: 'Ironclad', category: 'Legal', status: 'Available', note: 'Contract signature and repository', color: '#1C1C1C', mono: 'Ic' },
  { name: 'VisoTrust', category: 'Third-Party Risk Management (TPRM)', status: 'Available', note: 'Security assessments from workflows', color: '#2A5BD7', mono: 'VT' },
  { name: 'Vanta', category: 'Third-Party Risk Management (TPRM)', status: 'Connected', note: 'Vendor security ratings', color: '#3A2A85', mono: 'V' },
  { name: 'Snowflake', category: 'Data', status: 'Available', note: 'Export procurement data', color: '#29B5E8', mono: 'S' },
  { name: 'Jira', category: 'Business processes & ticketing', status: 'Connected', note: 'Create, sync and update tickets from workflow steps', color: '#0052CC', mono: 'J' },
  { name: 'ServiceNow', category: 'Business processes & ticketing', status: 'Available', note: 'Turn tickets into intake requests', color: '#62D84E', mono: 'now' },
  { name: 'Workday', category: 'HRIS', status: 'Connected', note: 'Employees, departments and managers for routing', color: '#F38B00', mono: 'W' },
]

export type PrefResult = 'Accepted' | 'Requires Review' | 'Not Accepted'

export interface Preference {
  id: string
  label: string
  options: { value: string; result: PrefResult }[]
}

export const COMPLIANCE_PREFS: Preference[] = [
  { id: 'payment-terms', label: 'Payment terms', options: [ { value: 'Net 30', result: 'Accepted' }, { value: 'Net 45', result: 'Accepted' }, { value: 'Net 60', result: 'Requires Review' }, { value: 'Payment in advance', result: 'Not Accepted' } ] },
  { id: 'billing', label: 'Billing frequency', options: [ { value: 'Annually', result: 'Accepted' }, { value: 'Quarterly', result: 'Accepted' }, { value: 'Monthly', result: 'Requires Review' }, { value: 'Multi-year upfront', result: 'Not Accepted' } ] },
  { id: 'currency', label: 'Contract currency', options: [ { value: 'USD', result: 'Accepted' }, { value: 'EUR / GBP', result: 'Requires Review' } ] },
]

export const LEGAL_PREFS: Preference[] = [
  { id: 'termination', label: 'Termination notice period', options: [ { value: '≤ 30 days', result: 'Accepted' }, { value: '31–60 days', result: 'Requires Review' }, { value: '> 60 days', result: 'Not Accepted' } ] },
  { id: 'auto-renewal', label: 'Auto-renewal', options: [ { value: 'None', result: 'Accepted' }, { value: 'With ≤ 30-day notice', result: 'Accepted' }, { value: 'With > 30-day notice', result: 'Requires Review' } ] },
  { id: 'liability', label: 'Limitation of liability', options: [ { value: '≥ 12 months of fees', result: 'Accepted' }, { value: '< 12 months of fees', result: 'Requires Review' }, { value: 'Uncapped for customer', result: 'Not Accepted' } ] },
  { id: 'law', label: 'Governing law', options: [ { value: 'Delaware / New York', result: 'Accepted' }, { value: 'Other US state', result: 'Requires Review' }, { value: 'Non-US', result: 'Requires Review' } ] },
]

export interface DocumentRecord {
  id: string
  name: string
  vendorId: string
  type: 'Order form' | 'MSA' | 'DPA' | 'Renewal quote' | 'Security report'
  uploaded: string
  pages: number
}

export const DOCUMENTS: DocumentRecord[] = [
  { id: 'd1', name: 'Salesforce_Order-Form_2026.pdf', vendorId: 'salesforce', type: 'Order form', uploaded: '2026-01-20', pages: 6 },
  { id: 'd2', name: 'Salesforce_MSA.pdf', vendorId: 'salesforce', type: 'MSA', uploaded: '2024-01-18', pages: 22 },
  { id: 'd3', name: 'Salesforce_Renewal-Quote_2027.pdf', vendorId: 'salesforce', type: 'Renewal quote', uploaded: '2026-10-02', pages: 4 },
  { id: 'd4', name: 'Gong_Order-Form_2025.pdf', vendorId: 'gong', type: 'Order form', uploaded: '2025-12-10', pages: 5 },
  { id: 'd5', name: 'Gong_Renewal-Quote_2026.pdf', vendorId: 'gong', type: 'Renewal quote', uploaded: '2026-10-05', pages: 3 },
  { id: 'd6', name: 'Snowflake_MSA.pdf', vendorId: 'snowflake', type: 'MSA', uploaded: '2025-03-28', pages: 31 },
  { id: 'd7', name: 'Zscaler_Order-Form_2026.pdf', vendorId: 'zscaler', type: 'Order form', uploaded: '2026-09-15', pages: 7 },
  { id: 'd8', name: 'Okta_DPA.pdf', vendorId: 'okta', type: 'DPA', uploaded: '2025-03-30', pages: 12 },
  { id: 'd9', name: 'Workday_Order-Form_2026.pdf', vendorId: 'workday', type: 'Order form', uploaded: '2026-09-30', pages: 9 },
  { id: 'd10', name: 'Atlassian_Order-Form_2026.pdf', vendorId: 'atlassian', type: 'Order form', uploaded: '2025-12-28', pages: 4 },
]

/** "Create contract from file": the renewal order form Legal drops in. */
export const UPLOAD_DEMO = {
  file: 'Asana_Renewal-Order-Form_2027.pdf',
  vendorId: 'asana',
  extracted: [
    { field: 'Vendor', value: 'Asana' },
    { field: 'Contract category', value: 'SaaS Contract' },
    { field: 'Contract type', value: 'Renewal' },
    { field: 'Start date', value: 'Feb 1, 2027' },
    { field: 'Annual cost', value: '$93,500' },
    { field: 'Licenses', value: '280 Enterprise' },
  ],
  comparison: [
    { metric: 'Annual price', renewal: '$93,500', current: '$85,000', flag: '+10% uplift' },
    { metric: 'Licenses', renewal: '280', current: '280', flag: '' },
    { metric: 'Term', renewal: '12 months', current: '12 months', flag: '' },
    { metric: 'Auto-renewal notice', renewal: '60 days', current: '30 days', flag: 'Notice period extended' },
    { metric: 'Limitation of liability', renewal: '6 months of fees', current: '12 months of fees', flag: 'Liability cap reduced' },
  ],
} as const

/** Document Analysis agent: "Do any contracts mention uncapped liability?" */
export const LIABILITY_REVIEW = [
  { doc: 'Salesforce_MSA.pdf', clause: '§11.2 Limitation of liability', finding: 'Capped at 12 months of fees; carve-outs for confidentiality breach', risk: 'Low' as const },
  { doc: 'Snowflake_MSA.pdf', clause: '§13.1 Liability cap', finding: 'General cap at fees paid; data-breach super-cap at 2× fees', risk: 'Medium' as const },
  { doc: 'Okta_DPA.pdf', clause: '§9 Liability', finding: 'Defers to MSA cap; no separate uncapped exposure', risk: 'Low' as const },
  { doc: 'LinkDesk_MSA (intake)', clause: '§8.2 Indemnity', finding: 'Customer indemnity is uncapped; vendor cap at 3 months of fees', risk: 'High' as const },
]
