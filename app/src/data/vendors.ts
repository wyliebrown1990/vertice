/**
 * Northwind's 42 strategic SaaS contracts (fictional), converted from
 * research/PROOF_AND_DATA.md §3.3. One primary owner department per contract.
 * Totals, counts and month groupings are derived in domain/selectors.ts.
 */

export type Department =
  | 'Sales'
  | 'Engineering'
  | 'IT'
  | 'Security'
  | 'Marketing'
  | 'Finance'
  | 'People'
  | 'Data'
  | 'Product'
  | 'Support'
  | 'Operations'
  | 'Legal'

export interface Vendor {
  id: string
  name: string
  product: string
  category: string
  department: Department
  annualCost: number
  /** Current term end. The renewal is due the following day. */
  renewalDate: string
  autoRenew: boolean
  /** Last day to give notice before auto-renewal, or null when not applicable. */
  noticeDeadline: string | null
  /** Seat utilization in the sample 28-day snapshot, or null when usage-based. */
  utilization: number | null
  /** Brand colour for the logo tile. */
  color: string
  /** simple-icons glyph key, when one exists. */
  icon?: string
  /** Short text shown on the logo tile when there is no glyph. */
  mono?: string
}

export const vendors: Vendor[] = [
  { id: 'zoominfo', name: 'ZoomInfo', product: 'SalesOS', category: 'Sales Tools', department: 'Sales', annualCost: 185_000, renewalDate: '2026-11-15', autoRenew: true, noticeDeadline: '2026-10-16', utilization: 0.44, color: '#E8461F', mono: 'Z' },
  { id: 'linkedin', name: 'LinkedIn', product: 'Sales Navigator + Recruiter', category: 'Sales Tools', department: 'Sales', annualCost: 290_000, renewalDate: '2026-11-30', autoRenew: true, noticeDeadline: '2026-10-01', utilization: 0.47, color: '#0A66C2', mono: 'in' },
  { id: 'zoom', name: 'Zoom', product: 'Workplace', category: 'Collaboration', department: 'IT', annualCost: 140_000, renewalDate: '2026-11-30', autoRenew: true, noticeDeadline: '2026-10-31', utilization: 0.38, color: '#0B5CFF', icon: 'siZoom' },
  { id: 'cursor', name: 'Cursor', product: 'Business', category: 'Artificial Intelligence', department: 'Engineering', annualCost: 95_000, renewalDate: '2026-12-01', autoRenew: false, noticeDeadline: null, utilization: 0.81, color: '#111111', icon: 'siCursor' },
  { id: 'gong', name: 'Gong', product: 'Revenue Intelligence', category: 'Sales Tools', department: 'Sales', annualCost: 210_000, renewalDate: '2026-12-15', autoRenew: true, noticeDeadline: '2026-10-16', utilization: 0.52, color: '#8039DF', mono: 'G' },
  { id: 'salesloft', name: 'Salesloft', product: 'Cadence', category: 'Sales Tools', department: 'Sales', annualCost: 70_000, renewalDate: '2026-12-20', autoRenew: true, noticeDeadline: '2026-11-20', utilization: 0.35, color: '#1A3F5B', mono: 'S' },
  { id: 'atlassian', name: 'Atlassian', product: 'Jira + Confluence Cloud', category: 'Development', department: 'Engineering', annualCost: 420_000, renewalDate: '2026-12-31', autoRenew: true, noticeDeadline: '2026-12-01', utilization: 0.76, color: '#0052CC', icon: 'siAtlassian' },
  { id: 'hubspot', name: 'HubSpot', product: 'Marketing Hub Enterprise', category: 'Marketing', department: 'Marketing', annualCost: 240_000, renewalDate: '2027-01-10', autoRenew: true, noticeDeadline: '2026-12-11', utilization: 0.62, color: '#FF7A59', icon: 'siHubspot' },
  { id: 'anthropic', name: 'Anthropic', product: 'Claude Team + API', category: 'Artificial Intelligence', department: 'Engineering', annualCost: 380_000, renewalDate: '2027-01-15', autoRenew: false, noticeDeadline: '2026-12-16', utilization: 0.64, color: '#D97757', icon: 'siClaude' },
  { id: 'salesforce', name: 'Salesforce', product: 'Sales Cloud + Einstein', category: 'CRM', department: 'Sales', annualCost: 980_000, renewalDate: '2027-01-31', autoRenew: true, noticeDeadline: '2026-12-02', utilization: 0.71, color: '#00A1E0', mono: 'sf' },
  { id: 'asana', name: 'Asana', product: 'Enterprise', category: 'Project Management', department: 'Marketing', annualCost: 85_000, renewalDate: '2027-01-31', autoRenew: true, noticeDeadline: '2027-01-01', utilization: 0.41, color: '#F06A6A', icon: 'siAsana' },
  { id: 'github', name: 'GitHub', product: 'Enterprise + Copilot', category: 'Development', department: 'Engineering', annualCost: 310_000, renewalDate: '2027-02-01', autoRenew: true, noticeDeadline: '2027-01-02', utilization: 0.84, color: '#181717', icon: 'siGithub' },
  { id: 'outreach', name: 'Outreach', product: 'Sales Engagement', category: 'Sales Tools', department: 'Sales', annualCost: 150_000, renewalDate: '2027-02-15', autoRenew: true, noticeDeadline: '2026-12-17', utilization: 0.48, color: '#5951FF', mono: 'O' },
  { id: 'intercom', name: 'Intercom', product: 'Suite', category: 'Customer Service', department: 'Support', annualCost: 120_000, renewalDate: '2027-02-20', autoRenew: true, noticeDeadline: '2027-01-21', utilization: 0.55, color: '#1F8DED', icon: 'siIntercom' },
  { id: 'openai', name: 'OpenAI', product: 'ChatGPT Enterprise + API', category: 'Artificial Intelligence', department: 'IT', annualCost: 540_000, renewalDate: '2027-02-28', autoRenew: false, noticeDeadline: '2027-01-29', utilization: 0.58, color: '#10A37F', mono: 'AI' },
  { id: 'google', name: 'Google Workspace', product: 'Business Plus', category: 'Productivity Suite', department: 'Engineering', annualCost: 180_000, renewalDate: '2027-03-01', autoRenew: true, noticeDeadline: '2027-01-30', utilization: 0.61, color: '#4285F4', icon: 'siGoogle' },
  { id: 'slack', name: 'Slack', product: 'Enterprise Grid', category: 'Collaboration', department: 'IT', annualCost: 360_000, renewalDate: '2027-03-15', autoRenew: true, noticeDeadline: '2027-01-14', utilization: 0.91, color: '#4A154B', mono: 'S' },
  { id: 'snowflake', name: 'Snowflake', product: 'Enterprise (credits)', category: 'Analytics', department: 'Data', annualCost: 620_000, renewalDate: '2027-03-31', autoRenew: false, noticeDeadline: '2027-03-01', utilization: null, color: '#29B5E8', icon: 'siSnowflake' },
  { id: 'docusign', name: 'DocuSign', product: 'eSignature Business Pro', category: 'Collaboration', department: 'Legal', annualCost: 95_000, renewalDate: '2027-03-31', autoRenew: true, noticeDeadline: '2027-01-30', utilization: 0.66, color: '#4C00FF', mono: 'D' },
  { id: 'okta', name: 'Okta', product: 'Workforce Identity', category: 'Security', department: 'Security', annualCost: 260_000, renewalDate: '2027-04-01', autoRenew: true, noticeDeadline: '2027-01-31', utilization: 0.96, color: '#007DC1', icon: 'siOkta' },
  { id: 'looker', name: 'Looker', product: 'Enterprise', category: 'Analytics', department: 'Data', annualCost: 140_000, renewalDate: '2027-04-15', autoRenew: true, noticeDeadline: '2027-03-16', utilization: 0.72, color: '#4285F4', icon: 'siLooker' },
  { id: 'datadog', name: 'Datadog', product: 'Infrastructure + Logs', category: 'Monitoring', department: 'Engineering', annualCost: 450_000, renewalDate: '2027-04-30', autoRenew: true, noticeDeadline: '2027-03-01', utilization: null, color: '#632CA6', icon: 'siDatadog' },
  { id: 'figma', name: 'Figma', product: 'Organization', category: 'Design', department: 'Product', annualCost: 110_000, renewalDate: '2027-05-01', autoRenew: true, noticeDeadline: '2027-04-01', utilization: 0.88, color: '#F24E1E', icon: 'siFigma' },
  { id: 'zendesk', name: 'Zendesk', product: 'Suite Professional', category: 'Customer Service', department: 'Support', annualCost: 230_000, renewalDate: '2027-05-15', autoRenew: true, noticeDeadline: '2027-04-15', utilization: 0.79, color: '#03363D', icon: 'siZendesk' },
  { id: 'monday', name: 'monday.com', product: 'Work Management', category: 'Project Management', department: 'Operations', annualCost: 60_000, renewalDate: '2027-05-20', autoRenew: true, noticeDeadline: '2027-04-20', utilization: 0.39, color: '#FF3D57', mono: 'm' },
  { id: 'crowdstrike', name: 'CrowdStrike', product: 'Falcon Enterprise', category: 'Security', department: 'Security', annualCost: 390_000, renewalDate: '2027-05-31', autoRenew: true, noticeDeadline: '2027-03-02', utilization: 0.97, color: '#E01F26', mono: 'CS' },
  { id: 'mongodb', name: 'MongoDB', product: 'Atlas', category: 'IT Infrastructure', department: 'Engineering', annualCost: 280_000, renewalDate: '2027-06-01', autoRenew: false, noticeDeadline: '2027-05-02', utilization: null, color: '#47A248', icon: 'siMongodb' },
  { id: 'navan', name: 'Navan', product: 'Travel & Expense', category: 'Finance', department: 'Finance', annualCost: 130_000, renewalDate: '2027-06-15', autoRenew: false, noticeDeadline: '2027-05-16', utilization: 0.9, color: '#1C1C3A', mono: 'N' },
  { id: 'canva', name: 'Canva', product: 'Enterprise', category: 'Design', department: 'Marketing', annualCost: 45_000, renewalDate: '2027-06-20', autoRenew: true, noticeDeadline: '2027-05-21', utilization: 0.63, color: '#00C4CC', mono: 'C' },
  { id: 'microsoft', name: 'Microsoft 365', product: 'E3 + Copilot', category: 'Productivity Suite', department: 'IT', annualCost: 1_150_000, renewalDate: '2027-06-30', autoRenew: false, noticeDeadline: '2027-04-01', utilization: 0.82, color: '#D83B01', mono: 'M' },
  { id: 'miro', name: 'Miro', product: 'Business', category: 'Collaboration', department: 'Product', annualCost: 70_000, renewalDate: '2027-07-01', autoRenew: true, noticeDeadline: '2027-06-01', utilization: 0.57, color: '#050038', icon: 'siMiro' },
  { id: 'tableau', name: 'Tableau', product: 'Cloud', category: 'Analytics', department: 'Finance', annualCost: 160_000, renewalDate: '2027-07-15', autoRenew: true, noticeDeadline: '2027-05-16', utilization: 0.49, color: '#E97627', mono: 'T' },
  { id: 'netsuite', name: 'NetSuite', product: 'ERP', category: 'ERP', department: 'Finance', annualCost: 410_000, renewalDate: '2027-07-31', autoRenew: false, noticeDeadline: '2027-06-01', utilization: 0.95, color: '#1F3A5F', mono: 'NS' },
  { id: 'greenhouse', name: 'Greenhouse', product: 'Recruiting', category: 'HR', department: 'People', annualCost: 120_000, renewalDate: '2027-08-01', autoRenew: true, noticeDeadline: '2027-06-02', utilization: 0.85, color: '#24A47F', icon: 'siGreenhouse' },
  { id: 'wiz', name: 'Wiz', product: 'Cloud Security', category: 'Security', department: 'Security', annualCost: 210_000, renewalDate: '2027-08-15', autoRenew: true, noticeDeadline: '2027-06-16', utilization: null, color: '#0254EC', mono: 'W' },
  { id: 'jamf', name: 'Jamf', product: 'Pro', category: 'IT Management', department: 'IT', annualCost: 70_000, renewalDate: '2027-08-20', autoRenew: false, noticeDeadline: '2027-06-21', utilization: 0.98, color: '#4B4F54', mono: 'J' },
  { id: 'servicenow', name: 'ServiceNow', product: 'ITSM', category: 'IT Management', department: 'IT', annualCost: 480_000, renewalDate: '2027-08-31', autoRenew: true, noticeDeadline: '2027-06-02', utilization: 0.88, color: '#62D84E', mono: 'now' },
  { id: 'avalara', name: 'Avalara', product: 'AvaTax', category: 'Finance', department: 'Finance', annualCost: 85_000, renewalDate: '2027-09-01', autoRenew: true, noticeDeadline: '2027-07-03', utilization: null, color: '#FF6600', mono: 'A' },
  { id: 'zscaler', name: 'Zscaler', product: 'Internet Access', category: 'Security', department: 'Security', annualCost: 240_000, renewalDate: '2027-09-15', autoRenew: false, noticeDeadline: '2027-06-17', utilization: 0.93, color: '#0090D1', mono: 'Z' },
  { id: 'workday', name: 'Workday', product: 'HCM', category: 'HR', department: 'People', annualCost: 620_000, renewalDate: '2027-09-30', autoRenew: false, noticeDeadline: '2027-06-02', utilization: 0.93, color: '#F38B00', mono: 'W' },
  { id: 'cloudflare', name: 'Cloudflare', product: 'Enterprise', category: 'IT Infrastructure', department: 'Engineering', annualCost: 160_000, renewalDate: '2027-10-01', autoRenew: true, noticeDeadline: '2027-08-02', utilization: null, color: '#F38020', icon: 'siCloudflare' },
  { id: 'cultureamp', name: 'Culture Amp', product: 'Engage + Perform', category: 'HR', department: 'People', annualCost: 75_000, renewalDate: '2027-10-15', autoRenew: true, noticeDeadline: '2027-08-16', utilization: 0.7, color: '#F04C5D', mono: 'CA' },
]

export const vendorById = (id: string) => vendors.find((v) => v.id === id)
