/**
 * Chapter D: Procure-to-Pay. FULL-DEMO-PLAN.md §4–5.
 * Two-way matching only (contract/PO ↔ invoice): Vertice's own FAQ lists
 * goods-receipt (three-way) matching as planned, so the demo never shows it.
 */
import { savingsHistory } from '../savingsHistory'
import { vendorById } from '../vendors'

export type PoStatus = 'Draft' | 'Pending approval' | 'Committed' | 'Invoiced' | 'Paid'

export interface PurchaseOrder {
  id: string
  vendorId: string
  description: string
  department: string
  amount: number
  status: PoStatus
  created: string
  glAccount: string
  /** Request or catalog source. */
  source: string
}

/** Seeded POs; chapter POs (TeamViewer, Lexora) are added by selectors from flow state. */
export const SEEDED_POS: PurchaseOrder[] = [
  { id: 'PO-1031', vendorId: 'figma', description: 'Figma Organization renewal', department: 'Product', amount: 110_000, status: 'Paid', created: '2026-05-01', glAccount: '6410 · Software subscriptions', source: 'Renewal - Figma' },
  { id: 'PO-1034', vendorId: 'okta', description: 'Okta Workforce Identity renewal', department: 'Security', amount: 260_000, status: 'Paid', created: '2026-04-01', glAccount: '6410 · Software subscriptions', source: 'Renewal - Okta' },
  { id: 'PO-1036', vendorId: 'zscaler', description: 'Zscaler Internet Access renewal', department: 'Security', amount: 240_000, status: 'Invoiced', created: '2026-09-15', glAccount: '6410 · Software subscriptions', source: 'Renewal - Zscaler' },
  { id: 'PO-1038', vendorId: 'workday', description: 'Workday HCM renewal', department: 'People', amount: 620_000, status: 'Committed', created: '2026-09-30', glAccount: '6410 · Software subscriptions', source: 'Renewal - Workday' },
  { id: 'PO-1039', vendorId: 'dell', description: '20 × Latitude 7450 laptops for Support', department: 'Support', amount: 38_400, status: 'Pending approval', created: '2026-10-09', glAccount: '1610 · IT equipment', source: '20 laptops for Support - Purchase' },
  { id: 'PO-1040', vendorId: 'amazonbusiness', description: 'Office supplies and peripherals', department: 'Operations', amount: 3_280, status: 'Paid', created: '2026-10-02', glAccount: '6520 · Office supplies', source: 'Catalog purchase' },
]

export type InvoiceFlow = 'p2p-zscaler' | 'p2p-teamviewer'

export interface Invoice {
  id: string
  vendorId: string
  poId: string
  amount: number
  received: string
  due: string
  terms: string
  lines: { description: string; qty: number; unitPrice: number; gl: string; taxCode: string }[]
  /** Interactive invoices have a flow; seeded ones are static. */
  flow?: InvoiceFlow
  staticStatus?: 'Paid' | 'Scheduled'
}

/** Zscaler renewed 2026-09-15: $330,000 → $240,000 (savingsHistory). The October invoice bills the old price. */
const zsHist = savingsHistory.find((r) => r.vendorId === 'zscaler')!

export const ZSCALER_INVOICE: Invoice = {
  id: 'INV-ZS-24118',
  vendorId: 'zscaler',
  poId: 'PO-1036',
  amount: zsHist.baselineAnnual,
  received: '2026-10-12',
  due: '2026-11-11',
  terms: 'Net 30',
  lines: [{ description: 'Zscaler Internet Access – annual subscription (1,500 users)', qty: 1_500, unitPrice: zsHist.baselineAnnual / 1_500, gl: '6410 · Software subscriptions', taxCode: 'EXEMPT-SaaS' }],
  flow: 'p2p-zscaler',
}

export const ZSCALER_CONTRACTED = vendorById('zscaler')!.annualCost // 240,000

export const TEAMVIEWER_INVOICE_ID = 'INV-TV-0091'

export const SEEDED_INVOICES: Invoice[] = [
  {
    id: 'INV-OK-5530',
    vendorId: 'okta',
    poId: 'PO-1034',
    amount: 260_000,
    received: '2026-04-03',
    due: '2026-05-03',
    terms: 'Net 30',
    lines: [{ description: 'Okta Workforce Identity – annual', qty: 1, unitPrice: 260_000, gl: '6410 · Software subscriptions', taxCode: 'EXEMPT-SaaS' }],
    staticStatus: 'Paid',
  },
  {
    id: 'INV-FG-2207',
    vendorId: 'figma',
    poId: 'PO-1031',
    amount: 110_000,
    received: '2026-05-02',
    due: '2026-06-01',
    terms: 'Net 30',
    lines: [{ description: 'Figma Organization – annual', qty: 1, unitPrice: 110_000, gl: '6410 · Software subscriptions', taxCode: 'EXEMPT-SaaS' }],
    staticStatus: 'Paid',
  },
  {
    id: 'INV-AMZ-8812',
    vendorId: 'amazonbusiness',
    poId: 'PO-1040',
    amount: 3_280,
    received: '2026-10-03',
    due: '2026-11-02',
    terms: 'Net 30',
    lines: [{ description: 'Office supplies and peripherals (14 lines)', qty: 1, unitPrice: 3_280, gl: '6520 · Office supplies', taxCode: 'STD' }],
    staticStatus: 'Paid',
  },
]

/** Controls & Permissions rule that routes invoice approval. */
export const INVOICE_RULE = { threshold: 5_000, approvers: ['Department owner', 'Finance'], notify: 'Vendor owner' } as const

export interface CatalogItem {
  id: string
  supplierId: 'amazonbusiness' | 'staples' | 'cdw'
  name: string
  price: number
}

export const CATALOG_ITEMS: CatalogItem[] = [
  { id: 'c1', supplierId: 'cdw', name: 'Logitech Zone Vibe 100 headset', price: 99 },
  { id: 'c2', supplierId: 'cdw', name: 'Dell 27" USB-C monitor (P2725HE)', price: 329 },
  { id: 'c3', supplierId: 'amazonbusiness', name: 'Anker USB-C docking station', price: 139 },
  { id: 'c4', supplierId: 'amazonbusiness', name: 'Ergonomic keyboard and mouse set', price: 89 },
  { id: 'c5', supplierId: 'staples', name: 'Printer paper, 10 reams', price: 54 },
  { id: 'c6', supplierId: 'staples', name: 'Whiteboard markers, 24 pack', price: 21 },
]

export const SEEDED_ORDERS = [
  { id: 'ORD-2291', supplierId: 'amazonbusiness', items: 14, amount: 3_280, status: 'Delivered', placed: '2026-10-02', requester: 'Operations' },
  { id: 'ORD-2304', supplierId: 'cdw', items: 6, amount: 2_394, status: 'Shipped', placed: '2026-10-08', requester: 'Support' },
  { id: 'ORD-2310', supplierId: 'staples', items: 4, amount: 186, status: 'Ordered', placed: '2026-10-12', requester: 'Finance' },
] as const
