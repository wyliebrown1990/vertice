/**
 * Workflow definitions rendered by the read-only canvas (request Workflow tab)
 * and the Workflow Builder. Node names follow the real app (tour audit):
 * "Vertice AI - Compliance", "Create Purchase Order", "Cost > 100k", ...
 */

export type NodeKind = 'start' | 'end' | 'form' | 'approval' | 'ai' | 'integration' | 'gateway' | 'vertice' | 'service'

export interface WfNode {
  id: string
  label: string
  kind: NodeKind
  /** Grid position (column, row); the canvas converts to pixels. */
  x: number
  y: number
  owner?: string
  sub?: string
  integration?: 'NetSuite' | 'DocuSign' | 'Jira' | 'Slack' | 'Ironclad'
}

export interface WfEdge {
  from: string
  to: string
  label?: string
}

export interface Workflow {
  id: string
  name: string
  requestType: string
  status: 'Live' | 'Draft'
  version: string
  edited: string
  nodes: WfNode[]
  edges: WfEdge[]
}

/** Lay out a simple chain left to right on row 1. */
const chain = (labels: [label: string, kind: NodeKind, owner?: string, integration?: WfNode['integration']][]): Pick<Workflow, 'nodes' | 'edges'> => {
  const nodes: WfNode[] = [{ id: 'start', label: 'Start', kind: 'start', x: 0, y: 1 }]
  labels.forEach(([label, kind, owner, integration], i) => nodes.push({ id: `n${i}`, label, kind, owner, integration, x: i + 1, y: 1 }))
  nodes.push({ id: 'end', label: 'End', kind: 'end', x: labels.length + 1, y: 1 })
  const edges = nodes.slice(1).map((n, i) => ({ from: nodes[i].id, to: n.id }))
  return { nodes, edges }
}

/** Chapter B runtime workflow. Node states come from the i2p flow (domain/flows.ts). */
export const I2P_WORKFLOW: Workflow = {
  id: 'purchase-new-software',
  name: 'Purchase New Software (I2P)',
  requestType: 'SaaS - New Purchase',
  status: 'Live',
  version: 'v7',
  edited: '2026-09-02',
  nodes: [
    { id: 'start', label: 'Start', kind: 'start', x: 0, y: 1 },
    { id: 'intake', label: 'Intake Form', kind: 'form', x: 1, y: 1, owner: 'Requester' },
    { id: 'requirements', label: 'Requirements Gathering', kind: 'form', x: 2, y: 1, owner: 'Procurement' },
    { id: 'tprm', label: 'Vendor Risk Assessment', kind: 'ai', x: 3, y: 1, sub: 'Vertice AI - TPRM' },
    { id: 'security', label: 'SaaS - Security Review', kind: 'approval', x: 4, y: 0, owner: 'IT Security' },
    { id: 'compliance', label: 'Vertice AI - Compliance', kind: 'ai', x: 4, y: 1, sub: 'Payment & billing terms' },
    { id: 'legal-ai', label: 'Vertice AI - Legal', kind: 'ai', x: 4, y: 2, sub: 'Contract terms' },
    { id: 'legal', label: 'Legal Approval', kind: 'approval', x: 5, y: 2, owner: 'Legal' },
    { id: 'commercial', label: 'Commercial Approval', kind: 'approval', x: 6, y: 1, owner: 'Finance' },
    { id: 'sign', label: 'Sign Contract in DocuSign', kind: 'integration', x: 7, y: 1, integration: 'DocuSign' },
    { id: 'contract', label: 'Create SaaS Contract', kind: 'vertice', x: 8, y: 1, owner: 'Vertice' },
    { id: 'po', label: 'Create Purchase Order', kind: 'integration', x: 9, y: 1, integration: 'NetSuite' },
    { id: 'end', label: 'End', kind: 'end', x: 10, y: 1 },
  ],
  edges: [
    { from: 'start', to: 'intake' },
    { from: 'intake', to: 'requirements' },
    { from: 'requirements', to: 'tprm' },
    { from: 'tprm', to: 'security', label: 'Parallel' },
    { from: 'tprm', to: 'compliance' },
    { from: 'tprm', to: 'legal-ai' },
    { from: 'legal-ai', to: 'legal', label: 'Above $50K' },
    { from: 'security', to: 'commercial' },
    { from: 'compliance', to: 'commercial' },
    { from: 'legal', to: 'commercial' },
    { from: 'commercial', to: 'sign', label: 'Approved' },
    { from: 'sign', to: 'contract' },
    { from: 'contract', to: 'po' },
    { from: 'po', to: 'end' },
  ],
}

/** Chapter E2: the workflow with the Security Review bottleneck. */
export const NEW_PURCHASE_WORKFLOW: Workflow = {
  id: 'new-purchase-advanced',
  name: 'New Purchase - Advanced with Pre-approval',
  requestType: 'SaaS - New Purchase',
  status: 'Live',
  version: 'v4',
  edited: '2026-07-21',
  nodes: [
    { id: 'start', label: 'Start', kind: 'start', x: 0, y: 1 },
    { id: 'intake', label: 'Request Intake', kind: 'form', x: 1, y: 1, owner: 'Request owner', sub: '7 days' },
    { id: 'triage', label: 'Triage / Pre-Approval', kind: 'approval', x: 2, y: 1, owner: 'Procurement' },
    { id: 'requirements', label: 'Requirements Gathering', kind: 'form', x: 3, y: 1, owner: 'Procurement' },
    { id: 'security', label: 'SaaS - Security Review', kind: 'form', x: 4, y: 1, owner: 'IT Security' },
    { id: 'it-approval', label: 'IT Approval', kind: 'approval', x: 5, y: 1, owner: 'No assignee', sub: '7 days to complete' },
    { id: 'gw', label: 'Cost > 100k', kind: 'gateway', x: 6, y: 1 },
    { id: 'vertice-neg', label: 'Vertice-Led Negotiation', kind: 'vertice', x: 7, y: 0, owner: 'Vertice' },
    { id: 'internal-neg', label: 'Internal - SaaS Negotiation', kind: 'form', x: 7, y: 2, owner: 'Procurement' },
    { id: 'legal', label: 'Legal Approval', kind: 'approval', x: 8, y: 1, owner: 'Legal' },
    { id: 'exec', label: 'Executive Approval', kind: 'approval', x: 9, y: 1, owner: 'CFO' },
    { id: 'contract', label: 'Create Contract Record', kind: 'service', x: 10, y: 1 },
    { id: 'end', label: 'End', kind: 'end', x: 11, y: 1 },
  ],
  edges: [
    { from: 'start', to: 'intake' },
    { from: 'intake', to: 'triage' },
    { from: 'triage', to: 'requirements', label: 'Pre-approved' },
    { from: 'requirements', to: 'security' },
    { from: 'security', to: 'it-approval' },
    { from: 'it-approval', to: 'gw' },
    { from: 'gw', to: 'vertice-neg', label: 'Assigned to Vertice (Above Threshold)' },
    { from: 'gw', to: 'internal-neg', label: 'Assigned to Internal (Below Threshold)' },
    { from: 'vertice-neg', to: 'legal', label: 'Negotiation Complete' },
    { from: 'internal-neg', to: 'legal' },
    { from: 'legal', to: 'exec' },
    { from: 'exec', to: 'contract' },
    { from: 'contract', to: 'end' },
  ],
}

/** After the fix: the manual IT Approval is replaced by two Jira steps. */
export const fixedNewPurchaseWorkflow = (): Workflow => {
  const shift = (x: number) => (x > 5 ? x + 1 : x)
  const nodes = NEW_PURCHASE_WORKFLOW.nodes
    .filter((n) => n.id !== 'it-approval')
    .map((n) => ({ ...n, x: shift(n.x) }))
  nodes.push(
    { id: 'jira-request', label: 'IT Approval Request', kind: 'integration', x: 5, y: 1, integration: 'Jira', sub: 'Create Jira Ticket' },
    { id: 'jira-resolution', label: 'IT Approval Resolution', kind: 'integration', x: 6, y: 1, integration: 'Jira', sub: 'Sync from Jira Ticket' },
  )
  const edges = NEW_PURCHASE_WORKFLOW.edges
    .filter((e) => e.from !== 'it-approval' && e.to !== 'it-approval')
    .concat([
      { from: 'security', to: 'jira-request' },
      { from: 'jira-request', to: 'jira-resolution' },
      { from: 'jira-resolution', to: 'gw', label: 'Approved' },
    ])
  return { ...NEW_PURCHASE_WORKFLOW, version: 'v5', status: 'Live', nodes, edges }
}

export const OTHER_WORKFLOWS: Workflow[] = [
  {
    id: 'saas-renewal',
    name: 'SaaS Renewal',
    requestType: 'SaaS - Contract Renewal',
    status: 'Live',
    version: 'v9',
    edited: '2026-08-14',
    ...chain([
      ['Requirements Gathering', 'form', 'Procurement'],
      ['Commercial Approval', 'approval', 'Finance'],
      ['Vertice-Led Negotiation', 'vertice', 'Vertice'],
      ['Approve Final Offer', 'approval', 'Procurement'],
      ['Vertice - SaaS Contracting', 'vertice', 'Vertice'],
      ['Create Contract Record', 'service'],
    ]),
  },
  {
    id: 'ana-renewal',
    name: 'SaaS Renewal - Ana (autonomous)',
    requestType: 'SaaS - Contract Renewal',
    status: 'Live',
    version: 'v1',
    edited: '2026-09-28',
    ...chain([
      ['Requirements Gathering', 'form', 'Procurement'],
      ['Vertice AI - Negotiation', 'ai'],
      ['Approve Opening Strategy', 'approval', 'Procurement'],
      ['Approve Final Offer', 'approval', 'Procurement'],
      ['Sign Contract in DocuSign', 'integration', undefined, 'DocuSign'],
      ['Create Contract Record', 'service'],
    ]),
  },
  {
    id: 'it-hardware',
    name: 'IT Hardware Purchase',
    requestType: 'Custom - New Purchase',
    status: 'Live',
    version: 'v3',
    edited: '2026-06-03',
    ...chain([
      ['Confirm Requirements', 'form', 'Procurement'],
      ['Manager approval', 'approval', 'Manager'],
      ['FP&A Approval', 'approval', 'Finance'],
      ['Input Purchase Details', 'form', 'Procurement'],
      ['Create Purchase Order', 'integration', undefined, 'NetSuite'],
      ['Confirm Delivery/Receipt of Goods', 'form', 'Requester'],
    ]),
  },
  {
    id: 'vendor-onboarding',
    name: 'Vendor Onboarding',
    requestType: 'Vendor onboarding',
    status: 'Live',
    version: 'v2',
    edited: '2026-05-19',
    ...chain([
      ['Create Vendor Portal Task From Template', 'service'],
      ['Supplier Information & Documents', 'form', 'Vendor'],
      ['Vertice AI - Compliance', 'ai'],
      ['Risk Approval', 'approval', 'IT Security'],
      ['Sync vendor to ERP', 'integration', undefined, 'NetSuite'],
    ]),
  },
  {
    id: 'rfp',
    name: 'Request for Proposal [RFP]',
    requestType: 'Select a vendor',
    status: 'Live',
    version: 'v2',
    edited: '2026-08-30',
    ...chain([
      ['Vertice AI - Sourcing Vendor Suggestion', 'ai'],
      ['Questionnaire builder', 'form', 'Procurement'],
      ['Vertice AI - Sourcing Questionnaire Generation', 'ai'],
      ['Evaluate responses', 'ai', undefined],
      ['Vendor selection', 'approval', 'Requester'],
      ['Vendor Onboarding', 'service'],
    ]),
  },
  {
    id: 'legal-ai',
    name: 'Legal AI Agents',
    requestType: 'Contract review',
    status: 'Live',
    version: 'v1',
    edited: '2026-09-10',
    nodes: [
      { id: 'start', label: 'Start', kind: 'start', x: 0, y: 1 },
      { id: 'upload', label: 'Contract Upload', kind: 'form', x: 1, y: 1, owner: 'Request owner' },
      { id: 'legal-ai', label: 'Vertice AI - Legal', kind: 'ai', x: 2, y: 0 },
      { id: 'comp-ai', label: 'Vertice AI - Compliance', kind: 'ai', x: 2, y: 2 },
      { id: 'review', label: 'Legal Review', kind: 'approval', x: 3, y: 1, owner: 'Legal' },
      { id: 'end', label: 'End', kind: 'end', x: 4, y: 1 },
    ],
    edges: [
      { from: 'start', to: 'upload' },
      { from: 'upload', to: 'legal-ai' },
      { from: 'upload', to: 'comp-ai' },
      { from: 'legal-ai', to: 'review' },
      { from: 'comp-ai', to: 'review' },
      { from: 'review', to: 'end' },
    ],
  },
]

export const WORKFLOW_TEMPLATES = [
  { id: 't-saas-purchase', name: 'SaaS purchase', when: 'Use this template when a team wants to buy new software.', steps: 9 },
  { id: 't-saas-renewal', name: 'SaaS renewal', when: 'Use this template for renewals, with Vertice-led or internal negotiation.', steps: 7 },
  { id: 't-it-hardware', name: 'IT hardware purchase', when: 'Use this template for laptops, peripherals and other equipment.', steps: 8 },
  { id: 't-vendor-onboarding', name: 'Vendor onboarding', when: 'Use this template to collect supplier details through the Vendor Portal.', steps: 6 },
  { id: 't-contractor', name: 'Contractor', when: 'Use this template to engage contractors and agencies.', steps: 7 },
  { id: 't-general', name: 'General purchase with Finance review', when: 'Use this template for non-software spend above your approval threshold.', steps: 6 },
  { id: 't-legal', name: 'Legal review', when: 'Use this template to route third-party paper through Legal and the AI agents.', steps: 5 },
  { id: 't-rfx', name: 'RF[x] vendor engagement', when: 'Use this template to run an RFI, RFP or RFQ.', steps: 8 },
] as const

/** Workflow Builder palette (exact names from the real app). */
export const PALETTE = [
  { group: 'Nodes', items: ['End'] },
  { group: 'Tasks', items: ['Approval', 'Form task', 'Service task'] },
  { group: 'Gateways', items: ['Exclusive', 'Inclusive', 'Join'] },
  {
    group: 'Vertice AI',
    items: [
      'Vertice AI - Legal',
      'Vertice AI - Compliance',
      'Vertice AI - Custom',
      'Vertice AI - Negotiation',
      'Vertice AI - Sourcing Response Evaluation',
      'Vertice AI - Sourcing Vendor Suggestion',
      'Vertice AI - Sourcing Questionnaire Generation',
    ],
  },
  { group: 'Integrations', items: ['Fetch Document', 'Create Jira Ticket', 'Sync from Jira Ticket', 'Update Jira Ticket', 'Send HTTP Request', 'VisoTrust - Start Security Assessment'] },
] as const

export const allWorkflows = (fixed: boolean): Workflow[] => [
  I2P_WORKFLOW,
  fixed ? fixedNewPurchaseWorkflow() : NEW_PURCHASE_WORKFLOW,
  ...OTHER_WORKFLOWS,
]
