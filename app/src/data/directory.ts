/**
 * Vendor directory: the 42 portfolio vendors plus vendors that only appear in
 * full-demo chapters (prospects, RFP bidders, cloud). Risk ratings are
 * illustrative. Negative findings are only ever attached to fictional vendors.
 */
import { vendors, type Vendor } from './vendors'

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical'

export interface RiskProfile {
  overall: RiskLevel
  categories: { name: 'Security & Privacy' | 'Financial Stability' | 'Legal & Compliance' | 'Reputation, ESG & Ethical Standing'; level: RiskLevel; note: string }[]
  narrative: string
  certifications: string[]
}

/** Logo + identity for vendors outside the 42-contract portfolio. */
export interface ProspectVendor {
  id: string
  name: string
  product: string
  category: string
  color: string
  mono: string
  icon?: string
  website: string
  fictional: boolean
}

export const prospects: ProspectVendor[] = [
  { id: 'linkdesk', name: 'LinkDesk Remote', product: 'LinkDesk Business', category: 'Remote Support', color: '#2F3B52', mono: 'LD', website: 'linkdesk.example', fictional: true },
  { id: 'teamviewer', name: 'TeamViewer', product: 'Remote Business', category: 'Remote Support', color: '#0E8EE9', mono: 'TV', website: 'teamviewer.com', fictional: false },
  { id: 'splashtop', name: 'Splashtop', product: 'SOS', category: 'Remote Support', color: '#3C8D2F', mono: 'Sp', website: 'splashtop.com', fictional: false },
  { id: 'zohoassist', name: 'Zoho Assist', product: 'Professional', category: 'Remote Support', color: '#E42527', mono: 'ZA', website: 'zoho.com/assist', fictional: false },
  { id: 'lexora', name: 'Lexora', product: 'Contract Intelligence', category: 'Legal Tech', color: '#3D2DB5', mono: 'Lx', website: 'lexora.example', fictional: true },
  { id: 'clausewise', name: 'Clausewise', product: 'Review Suite', category: 'Legal Tech', color: '#0F766E', mono: 'Cw', website: 'clausewise.example', fictional: true },
  { id: 'draftly', name: 'Draftly', product: 'Draftly for Legal', category: 'Legal Tech', color: '#B45309', mono: 'Dr', website: 'draftly.example', fictional: true },
  { id: 'pactly', name: 'Pactly', product: 'Pactly AI', category: 'Legal Tech', color: '#9D174D', mono: 'Pa', website: 'pactly.example', fictional: true },
  { id: 'aws', name: 'Amazon Web Services', product: 'Enterprise Discount Program', category: 'Cloud Infrastructure', color: '#232F3E', mono: 'aws', website: 'aws.amazon.com', fictional: false },
  { id: 'amazonbusiness', name: 'Amazon Business', product: 'Punchout catalog', category: 'Office & IT supplies', color: '#FF9900', mono: 'a', website: 'business.amazon.com', fictional: false },
  { id: 'staples', name: 'Staples Advantage', product: 'Punchout catalog', category: 'Office supplies', color: '#CC0000', mono: 'St', website: 'staplesadvantage.com', fictional: false },
  { id: 'cdw', name: 'CDW', product: 'Punchout catalog', category: 'IT hardware', color: '#C8102E', mono: 'CDW', website: 'cdw.com', fictional: false },
  { id: 'dell', name: 'Dell Technologies', product: 'Latitude laptops', category: 'IT hardware', color: '#007DB8', mono: 'D', website: 'dell.com', fictional: false },
]

export type LogoVendor = Pick<Vendor, 'name' | 'color' | 'icon' | 'mono'>

export const logoVendor = (id: string): LogoVendor | undefined => vendors.find((v) => v.id === id) ?? prospects.find((p) => p.id === id)

export const vendorName = (id: string) => logoVendor(id)?.name ?? id

const low = (narrative: string, certifications: string[] = ['SOC 2 Type II', 'ISO 27001', 'GDPR']): RiskProfile => ({
  overall: 'Low',
  narrative,
  certifications,
  categories: [
    { name: 'Security & Privacy', level: 'Low', note: 'Current SOC 2 Type II report and ISO 27001 certificate on file; DPA signed.' },
    { name: 'Financial Stability', level: 'Low', note: 'Stable revenue and funding; no adverse credit events in monitored sources.' },
    { name: 'Legal & Compliance', level: 'Low', note: 'Standard MSA accepted; no open regulatory actions found.' },
    { name: 'Reputation, ESG & Ethical Standing', level: 'Low', note: 'No material adverse media in the last 12 months.' },
  ],
})

/** Explicit profiles; every other vendor falls back to a generic Low profile. */
const profiles: Record<string, RiskProfile> = {
  linkdesk: {
    overall: 'High',
    narrative:
      'LinkDesk Remote has no current SOC 2 report and its last penetration test is 26 months old. Unattended remote access to customer devices makes Security & Privacy the deciding factor. Ownership changed in 2025 and audited financials are not available.',
    certifications: ['GDPR (self-attested)'],
    categories: [
      { name: 'Security & Privacy', level: 'High', note: 'No SOC 2 report; penetration test older than 24 months; MFA optional for agent accounts.' },
      { name: 'Financial Stability', level: 'Medium', note: 'Private, recently acquired; audited financials not provided.' },
      { name: 'Legal & Compliance', level: 'Medium', note: 'DPA available on request only; sub-processor list incomplete.' },
      { name: 'Reputation, ESG & Ethical Standing', level: 'Low', note: 'No adverse media found.' },
    ],
  },
  teamviewer: low('TeamViewer provides SOC 2 Type II and ISO 27001 evidence, enforces MFA for all agent accounts and publishes a full sub-processor list. Recommended for unattended remote support.'),
  splashtop: low('Splashtop provides SOC 2 Type II evidence and supports SSO with enforced MFA. Suitable for attended and unattended support.'),
  zohoassist: low('Zoho Assist supports SSO and MFA and provides ISO 27001 evidence. Suitable for attended support.', ['ISO 27001', 'GDPR']),
  lexora: low('Lexora provided a current SOC 2 Type II report, a signed DPA and EU data residency. Model training on customer data is contractually excluded.'),
  clausewise: low('Clausewise provided SOC 2 Type II evidence and a DPA. EU data residency is on the roadmap.', ['SOC 2 Type II', 'GDPR']),
  draftly: {
    ...low('Draftly is early-stage; SOC 2 Type I only. Acceptable for a pilot, not yet for production contract data.', ['SOC 2 Type I', 'GDPR']),
    overall: 'Medium',
  },
  pactly: low('Pactly provided ISO 27001 evidence and a DPA. Security & Privacy rated Low.', ['ISO 27001', 'GDPR']),
}

export const riskProfile = (vendorId: string): RiskProfile =>
  profiles[vendorId] ?? low(`${vendorName(vendorId)} is a long-standing Northwind supplier with current security evidence on file and no open findings.`)

export const RISK_TONE: Record<RiskLevel, 'success' | 'warning' | 'danger'> = {
  Low: 'success',
  Medium: 'warning',
  High: 'danger',
  Critical: 'danger',
}
