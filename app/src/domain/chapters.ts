/**
 * Everything the full-demo chapters add to the shared screens (dashboard,
 * requests, tasks, contracts, POs, invoices, savings) is derived here from flow
 * steps. Nothing is stored twice; S1 selectors stay in domain/selectors.ts.
 */
import { ANA, ANA_REQUEST_ID, anaDerived } from '../data/chapters/ana'
import { ANTHROPIC_REQUEST_ID } from '../data/chapters/aiSpend'
import { I2P, I2P_PO_ID, I2P_REQUEST_ID, i2pDerived } from '../data/chapters/i2p'
import { CONSOLIDATION, consolidationDerived } from '../data/chapters/insights'
import {
  SEEDED_INVOICES,
  SEEDED_POS,
  TEAMVIEWER_INVOICE_ID,
  ZSCALER_CONTRACTED,
  ZSCALER_INVOICE,
  type Invoice,
  type PurchaseOrder,
} from '../data/chapters/p2p'
import { RFP, RFP_REQUEST_ID, rfpDerived } from '../data/chapters/rfp'
import { personById } from '../data/people'
import { AS_OF, S1, S1_REQUEST_ID, s1Derived } from '../data/scenario'
import type { SavingsRecord } from '../data/savingsHistory'
import { vendorById } from '../data/vendors'
import { flowStep, reached } from './flows'
import type { DemoState, FutureTerm } from './types'

/* ---------- Savings ledger additions ---------- */

export const chapterSavings = (s: DemoState): SavingsRecord[] =>
  reached(s, 'ana', 'completed')
    ? [
        {
          id: 'sav-gong-2026',
          vendorId: ANA.vendorId,
          completedOn: ANA.completedOn,
          baselineAnnual: anaDerived().currentAnnualCost,
          annualReduction: anaDerived().annualReduction,
          source: 'ana',
        },
      ]
    : []

export const chapterFutureTerms = (s: DemoState): FutureTerm[] =>
  reached(s, 'ana', 'completed')
    ? [
        {
          id: 'term-gong-2026',
          vendorId: ANA.vendorId,
          requestId: ANA_REQUEST_ID,
          start: ANA.nextTermStart,
          end: ANA.nextTermEnd,
          seats: ANA.targetSeats,
          annualCost: anaDerived().futureAnnualCost,
          pricePerSeat: ANA.negotiatedPricePerSeat,
        },
      ]
    : []

/** Benefits that are real but are not annual reductions on an existing contract. */
export interface OtherBenefit {
  id: string
  kind: 'Cost avoidance' | 'Invoice error prevented'
  vendorId: string
  amount: number
  note: string
  date: string
}

export const otherBenefits = (s: DemoState): OtherBenefit[] => {
  const out: OtherBenefit[] = []
  if (reached(s, 'i2p', 'completed'))
    out.push({ id: 'ca-teamviewer', kind: 'Cost avoidance', vendorId: I2P.chosenVendorId, amount: i2pDerived().costAvoidance, note: 'New purchase negotiated below the vendor quote', date: AS_OF })
  if (reached(s, 'rfp', 'completed'))
    out.push({ id: 'ca-lexora', kind: 'Cost avoidance', vendorId: RFP.winnerId, amount: rfpDerived().costAvoidance, note: 'RFP award below list price', date: AS_OF })
  if (reached(s, 'p2p-zscaler', 'disputed'))
    out.push({ id: 'inv-zscaler', kind: 'Invoice error prevented', vendorId: 'zscaler', amount: ZSCALER_INVOICE.amount - ZSCALER_CONTRACTED, note: 'Invoice billed the pre-renewal price', date: AS_OF })
  return out
}

/* ---------- Contracts created by chapters ("Not yet live") ---------- */

export interface NewContract {
  vendorId: string
  product: string
  annualCost: number
  start: string
  end: string
  department: string
  requestId: string
}

export const newContracts = (s: DemoState): NewContract[] => {
  const out: NewContract[] = []
  if (reached(s, 'i2p', 'completed'))
    out.push({ vendorId: I2P.chosenVendorId, product: 'Remote Business · 60 licenses', annualCost: i2pDerived().negotiated, start: I2P.start, end: I2P.end, department: I2P.department, requestId: I2P_REQUEST_ID })
  if (reached(s, 'rfp', 'completed'))
    out.push({ vendorId: RFP.winnerId, product: 'Contract Intelligence · 25 seats', annualCost: rfpDerived().winner.price, start: '2026-11-01', end: '2027-10-31', department: RFP.department, requestId: RFP_REQUEST_ID })
  return out
}

/* ---------- Procure-to-Pay ---------- */

export const purchaseOrders = (s: DemoState): PurchaseOrder[] => {
  const pos = [...SEEDED_POS]
  if (reached(s, 'i2p', 'completed'))
    pos.push({
      id: I2P_PO_ID,
      vendorId: I2P.chosenVendorId,
      description: 'TeamViewer Remote Business · 60 licenses · 12 months',
      department: I2P.department,
      amount: i2pDerived().negotiated,
      status: reached(s, 'p2p-teamviewer', 'paid') ? 'Paid' : 'Invoiced',
      created: AS_OF,
      glAccount: '6410 · Software subscriptions',
      source: 'Remote support software (I2P)',
    })
  if (reached(s, 'rfp', 'completed'))
    pos.push({
      id: 'PO-1043',
      vendorId: RFP.winnerId,
      description: 'Lexora Contract Intelligence · 25 seats · 12 months',
      department: RFP.department,
      amount: rfpDerived().winner.price,
      status: 'Draft',
      created: AS_OF,
      glAccount: '6410 · Software subscriptions',
      source: 'Contract review AI (RFP)',
    })
  return pos.sort((a, b) => b.id.localeCompare(a.id))
}

export const teamviewerInvoice = (): Invoice => ({
  id: TEAMVIEWER_INVOICE_ID,
  vendorId: I2P.chosenVendorId,
  poId: I2P_PO_ID,
  amount: i2pDerived().negotiated,
  received: AS_OF,
  due: '2026-11-12',
  terms: 'Net 30',
  lines: [{ description: 'TeamViewer Remote Business – 60 licenses, 12 months', qty: I2P.seats, unitPrice: I2P.negotiatedPricePerSeat, gl: '6410 · Software subscriptions', taxCode: 'EXEMPT-SaaS' }],
  flow: 'p2p-teamviewer',
})

export const invoices = (s: DemoState): Invoice[] => {
  const list: Invoice[] = [ZSCALER_INVOICE]
  if (reached(s, 'i2p', 'completed')) list.push(teamviewerInvoice())
  return [...list, ...SEEDED_INVOICES]
}

export type InvoiceStatus = 'Needs review' | 'Disputed' | 'Approved' | 'Paid' | 'Scheduled' | 'Matched'

export const invoiceStatus = (s: DemoState, inv: Invoice): InvoiceStatus => {
  if (inv.staticStatus) return inv.staticStatus
  if (inv.flow === 'p2p-zscaler') {
    const st = flowStep(s, 'p2p-zscaler')
    return st === 'needs-review' ? 'Needs review' : st === 'disputed' ? 'Disputed' : 'Matched'
  }
  const st = flowStep(s, 'p2p-teamviewer')
  return st === 'needs-review' ? 'Needs review' : st === 'approved' ? 'Approved' : 'Paid'
}

/** Two-way match result: invoice vs the agreed (contract / PO) amount. */
export const invoiceMatch = (s: DemoState, inv: Invoice) => {
  const agreed = inv.flow === 'p2p-zscaler' ? ZSCALER_CONTRACTED : (purchaseOrders(s).find((p) => p.id === inv.poId)?.amount ?? inv.amount)
  const billed = inv.flow === 'p2p-zscaler' && reached(s, 'p2p-zscaler', 'resolved') ? ZSCALER_CONTRACTED : inv.amount
  return { agreed, billed, variance: billed - agreed, matched: billed === agreed }
}

/* ---------- Requests list ---------- */

export interface RequestRow {
  id: string
  title: string
  type: string
  logoId: string
  cost: number
  costCaption: string
  activeTask: string
  assignee: string
  verticeLed?: boolean
  date: string
  dateCaption: string
  status: 'In progress' | 'Completed'
  to: string
}

const reqPath = (id: string, tab = 'overview') => `/intelligent-workflows/requests/${id}/${tab}`

const S1_TASK: Record<string, string> = {
  requirements: 'Requirements Gathering',
  negotiation: 'Vertice-Led Negotiation',
  approval: 'Approve Final Offer',
  contracting: 'Vertice - SaaS Contracting',
  completed: 'Completed',
}

const ANA_TASK: Record<string, string> = {
  briefing: 'Approve opening strategy',
  round1: 'Vertice AI - Negotiation (Ana)',
  round2: 'Vertice AI - Negotiation (Ana)',
  offer: 'Approve Final Offer',
  completed: 'Completed',
}

const I2P_TASK: Record<string, string> = {
  intake: 'Requirements Gathering',
  risk: 'Vendor Risk Assessment',
  reviews: 'SaaS - Security Review (+1)',
  commercial: 'Commercial Approval',
  signing: 'Sign Contract in DocuSign',
  completed: 'Completed',
}

const RFP_TASK: Record<string, string> = {
  builder: 'Questionnaire builder',
  sent: 'Evaluate responses',
  responses: 'Vendor selection',
  awarded: 'Create Vendor Portal Task From Template',
  onboarding: 'Supplier Information & Documents',
  completed: 'Completed',
}

/** Read-only history so the list looks alive; each opens a real destination. */
const SEEDED_REQUESTS: RequestRow[] = [
  { id: 'seed-laptops', title: '20 laptops for Support - Purchase', type: 'Custom - New Purchase', logoId: 'dell', cost: 38_400, costCaption: 'Required budget', activeTask: 'Manager approval', assignee: 'Sam Okafor', date: '2026-10-30', dateCaption: 'Target date', status: 'In progress', to: '/purchase-orders' },
  { id: 'seed-zoominfo', title: 'Renewal - ZoomInfo', type: 'SaaS - Contract Renewal', logoId: 'zoominfo', cost: 185_000, costCaption: 'Current annual cost', activeTask: 'Requirements Gathering', assignee: 'Alex Morgan', date: '2026-10-16', dateCaption: 'Notice deadline', status: 'In progress', to: '/contracts/zoominfo/overview' },
  { id: 'seed-workday', title: 'Renewal - Workday', type: 'SaaS - Contract Renewal', logoId: 'workday', cost: 620_000, costCaption: 'Negotiated cost', activeTask: 'Completed', assignee: 'Vertice', verticeLed: true, date: '2026-09-30', dateCaption: 'Signed', status: 'Completed', to: '/contracts/workday/outcomes' },
  { id: 'seed-zscaler', title: 'Renewal - Zscaler', type: 'SaaS - Contract Renewal', logoId: 'zscaler', cost: 240_000, costCaption: 'Negotiated cost', activeTask: 'Completed', assignee: 'Vertice', verticeLed: true, date: '2026-09-15', dateCaption: 'Signed', status: 'Completed', to: '/contracts/zscaler/outcomes' },
  { id: 'seed-servicenow', title: 'Renewal - ServiceNow', type: 'SaaS - Contract Renewal', logoId: 'servicenow', cost: 480_000, costCaption: 'Negotiated cost', activeTask: 'Completed', assignee: 'Vertice', verticeLed: true, date: '2026-08-31', dateCaption: 'Signed', status: 'Completed', to: '/contracts/servicenow/outcomes' },
]

export const requestRows = (s: DemoState): RequestRow[] => {
  const rows: RequestRow[] = []
  if (s.request) {
    const st = s.request.stage
    rows.push({
      id: S1_REQUEST_ID,
      title: 'Salesforce renewal',
      type: 'SaaS - Contract Renewal',
      logoId: 'salesforce',
      cost: st === 'completed' ? s1Derived().futureAnnualCost : S1.currentAnnualCost,
      costCaption: st === 'completed' ? 'Negotiated cost' : 'Current annual cost',
      activeTask: S1_TASK[st],
      assignee: st === 'negotiation' || st === 'contracting' ? 'Vertice' : 'Alex Morgan',
      verticeLed: st === 'negotiation' || st === 'contracting',
      date: S1.noticeDeadline,
      dateCaption: 'Notice deadline',
      status: st === 'completed' ? 'Completed' : 'In progress',
      to: reqPath(S1_REQUEST_ID),
    })
  }
  const ana = flowStep(s, 'ana')
  if (ana !== 'none')
    rows.push({
      id: ANA_REQUEST_ID,
      title: 'Gong renewal (Ana)',
      type: 'SaaS - Contract Renewal',
      logoId: 'gong',
      cost: ana === 'completed' ? anaDerived().futureAnnualCost : anaDerived().currentAnnualCost,
      costCaption: ana === 'completed' ? 'Negotiated cost' : 'Current annual cost',
      activeTask: ANA_TASK[ana],
      assignee: ana === 'round1' || ana === 'round2' ? 'Ana' : 'Alex Morgan',
      verticeLed: ana === 'round1' || ana === 'round2',
      date: ANA.noticeDeadline,
      dateCaption: 'Notice deadline',
      status: ana === 'completed' ? 'Completed' : 'In progress',
      to: reqPath(ANA_REQUEST_ID),
    })
  const i2p = flowStep(s, 'i2p')
  if (i2p !== 'none')
    rows.push({
      id: I2P_REQUEST_ID,
      title: `${I2P.title} - Purchase`,
      type: 'SaaS - New Purchase',
      logoId: reached(s, 'i2p', 'reviews') ? I2P.chosenVendorId : I2P.requestedVendorId,
      cost: reached(s, 'i2p', 'commercial') ? i2pDerived().negotiated : i2pDerived().quote,
      costCaption: reached(s, 'i2p', 'commercial') ? 'Negotiated cost' : 'Quoted cost',
      activeTask: I2P_TASK[i2p],
      assignee: i2p === 'commercial' ? 'Priya Shah' : i2p === 'reviews' ? 'Dana Kim, Leah Brooks' : i2p === 'signing' ? 'Vertice' : 'Alex Morgan',
      date: I2P.start,
      dateCaption: 'Target start date',
      status: i2p === 'completed' ? 'Completed' : 'In progress',
      to: reqPath(I2P_REQUEST_ID),
    })
  const rfp = flowStep(s, 'rfp')
  if (rfp !== 'none')
    rows.push({
      id: RFP_REQUEST_ID,
      title: `${RFP.title} [RFP]`,
      type: 'Request for Proposal [RFP]',
      logoId: reached(s, 'rfp', 'awarded') ? RFP.winnerId : 'legal',
      cost: reached(s, 'rfp', 'awarded') ? rfpDerived().winner.price : RFP.budget,
      costCaption: reached(s, 'rfp', 'awarded') ? 'Awarded cost' : 'Approved budget',
      activeTask: RFP_TASK[rfp],
      assignee: rfp === 'responses' ? 'Leah Brooks' : rfp === 'onboarding' ? 'Lexora (vendor)' : 'Alex Morgan',
      date: RFP.responseDeadline,
      dateCaption: 'Response deadline',
      status: rfp === 'completed' ? 'Completed' : 'In progress',
      to: rfp === 'builder' || rfp === 'sent' || rfp === 'responses' ? '/sourcing/rfp' : reqPath(RFP_REQUEST_ID),
    })
  if (reached(s, 'consolidation', 'requested')) {
    const d = consolidationDerived()
    rows.push({
      id: CONSOLIDATION.requestId,
      title: 'Consolidate monday.com into Asana',
      type: 'SaaS - Contract Renewal',
      logoId: 'monday',
      cost: d.annualSaving,
      costCaption: 'Spend to remove',
      activeTask: 'Requirements Gathering',
      assignee: 'Alex Morgan',
      date: vendorById('monday')!.noticeDeadline!,
      dateCaption: 'Notice deadline',
      status: 'In progress',
      to: reqPath(CONSOLIDATION.requestId),
    })
  }
  if (reached(s, 'ai-commit', 'requested'))
    rows.push({
      id: ANTHROPIC_REQUEST_ID,
      title: 'Renewal - Anthropic (commitment)',
      type: 'SaaS - Contract Renewal',
      logoId: 'anthropic',
      cost: vendorById('anthropic')!.annualCost,
      costCaption: 'Current commitment',
      activeTask: 'Vertice-Led Negotiation',
      assignee: 'Vertice',
      verticeLed: true,
      date: vendorById('anthropic')!.noticeDeadline!,
      dateCaption: 'Notice deadline',
      status: 'In progress',
      to: reqPath(ANTHROPIC_REQUEST_ID),
    })
  return [...rows, ...SEEDED_REQUESTS]
}

/* ---------- Tasks ---------- */

export interface ChapterTask {
  id: string
  title: string
  context: string
  logoId: string
  assignee: string
  due: string
  dueTone: 'danger' | 'warning' | 'info' | 'neutral'
  to: string
  mine: boolean
}

export const chapterTasks = (s: DemoState): ChapterTask[] => {
  const t: ChapterTask[] = []
  const ana = flowStep(s, 'ana')
  const anaTo = reqPath(ANA_REQUEST_ID)
  if (ana === 'briefing') t.push({ id: 'ana-plan', title: 'Approve Ana’s opening strategy', context: 'Gong renewal (Ana)', logoId: 'gong', assignee: 'Alex Morgan', due: 'Notice in 3 days', dueTone: 'danger', to: anaTo, mine: true })
  if (ana === 'offer') t.push({ id: 'ana-offer', title: 'Approve final offer', context: 'Gong renewal (Ana)', logoId: 'gong', assignee: 'Alex Morgan', due: 'Action needed', dueTone: 'warning', to: anaTo, mine: true })

  const i2p = flowStep(s, 'i2p')
  const i2pTo = reqPath(I2P_REQUEST_ID)
  if (i2p === 'risk') t.push({ id: 'i2p-risk', title: 'Review vendor risk: High', context: 'Remote support software', logoId: I2P.requestedVendorId, assignee: 'Alex Morgan', due: 'Action needed', dueTone: 'danger', to: i2pTo, mine: true })
  if (i2p === 'reviews') {
    if (flowStep(s, 'i2p-security') === 'pending') t.push({ id: 'i2p-sec', title: 'IT Security Approval', context: 'Remote support software', logoId: I2P.chosenVendorId, assignee: 'Dana Kim', due: 'Due in 1d', dueTone: 'info', to: i2pTo, mine: false })
    if (flowStep(s, 'i2p-legal') === 'pending') t.push({ id: 'i2p-legal', title: 'Legal Approval', context: 'Remote support software', logoId: I2P.chosenVendorId, assignee: 'Leah Brooks', due: 'Due in 2d', dueTone: 'info', to: i2pTo, mine: false })
  }
  if (i2p === 'commercial') t.push({ id: 'i2p-comm', title: 'Commercial Approval', context: 'Remote support software', logoId: I2P.chosenVendorId, assignee: 'Priya Shah', due: 'Due in 1d', dueTone: 'info', to: i2pTo, mine: false })

  const rfp = flowStep(s, 'rfp')
  if (rfp === 'builder') t.push({ id: 'rfp-build', title: 'Questionnaire builder', context: 'Contract review AI [RFP]', logoId: 'lexora', assignee: 'Alex Morgan', due: 'Due in 2d', dueTone: 'info', to: '/sourcing/rfp', mine: true })
  if (rfp === 'responses') t.push({ id: 'rfp-select', title: 'Vendor selection', context: 'Contract review AI [RFP]', logoId: 'lexora', assignee: 'Leah Brooks', due: 'Due in 3d', dueTone: 'info', to: '/sourcing/rfp', mine: false })

  if (flowStep(s, 'p2p-zscaler') === 'needs-review')
    t.push({ id: 'inv-zs', title: 'Review invoice INV-ZS-24118', context: 'Zscaler · exceeds contract', logoId: 'zscaler', assignee: 'Priya Shah', due: 'Due Nov 11', dueTone: 'warning', to: '/invoices/INV-ZS-24118', mine: false })
  if (reached(s, 'i2p', 'completed') && flowStep(s, 'p2p-teamviewer') === 'needs-review')
    t.push({ id: 'inv-tv', title: 'Approve invoice INV-TV-0091', context: 'TeamViewer · matched to PO-1042', logoId: 'teamviewer', assignee: 'Sam Okafor, Priya Shah', due: 'Due Nov 12', dueTone: 'info', to: '/invoices/INV-TV-0091', mine: false })
  return t
}

/** The Gong seeded task is superseded once Ana takes the renewal. */
export const gongTaskSuperseded = (s: DemoState) => flowStep(s, 'ana') !== 'none'

export const personName = (id: string) => personById(id).name
