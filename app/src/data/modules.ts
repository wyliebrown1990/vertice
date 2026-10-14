/**
 * Deferred modules (Sprints 4–6). Their sidebar entries share one
 * "Outside this demo" view with a concise capability statement.
 * Statements paraphrase research/PRODUCT_FEATURES.md (captured 2026-10-13).
 */
export interface OutsideModule {
  slug: string
  label: string
  value: string
}

export const outsideModules: OutsideModule[] = [
  { slug: 'documents', label: 'Documents', value: 'Every order form, MSA and DPA in one place, with AI extraction of key terms like notice periods, liabilities and SLAs.' },
  { slug: 'offers', label: 'Offers', value: 'Compare vendor offers side by side against benchmark pricing before you commit.' },
  { slug: 'catalog', label: 'Catalog purchases', value: 'Guided buying from punchout catalogs such as Amazon Business, Staples and CDW, at negotiated prices and with approvals.' },
  { slug: 'purchase-orders', label: 'Purchase orders', value: 'Create purchase orders automatically when a request is approved, and sync them to ERPs like NetSuite.' },
  { slug: 'orders', label: 'Orders', value: 'Track catalog orders from cart to delivery in one list.' },
  { slug: 'invoices', label: 'Invoices', value: 'Capture invoices and check them against agreed contract terms before paying.' },
  { slug: 'savings', label: 'Savings', value: 'A ledger of negotiated savings, split into scope reduction, price improvement and cost avoidance.' },
  { slug: 'analytics', label: 'Analytics', value: 'Spend by department and category, cost and cash forecasts, and savings and ROI over time.' },
  { slug: 'procurement-insights', label: 'Procurement insights', value: 'Tasks, requests, in-flight spend and cycle times, so you can see where approvals stall.' },
  { slug: 'usage', label: 'Usage', value: 'SSO-sourced licence utilization that shows under-used apps and overlapping tools.' },
  { slug: 'vendors', label: 'Vendor directory', value: 'One record per supplier, with linked contracts, contacts and a continuously refreshed third-party risk assessment.' },
  { slug: 'expert-engage', label: 'Expert Engage', value: 'Request Vertice experts for price benchmarking, negotiation support, software consolidation and RFx sourcing.' },
  { slug: 'workflows', label: 'Workflows', value: 'A no-code workflow builder: intake forms, approval routing, Vertice AI review steps and integrations such as Jira, Ironclad and DocuSign.' },
  { slug: 'help', label: 'Help', value: 'Product guides and your Vertice customer success team.' },
  { slug: 'settings', label: 'Settings', value: 'Users, permissions, integrations (SSO, ERP, Slack, Teams) and workspace configuration.' },
]

export const outsideModuleBySlug = (slug: string) => outsideModules.find((m) => m.slug === slug)
