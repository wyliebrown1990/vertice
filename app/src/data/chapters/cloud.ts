/**
 * Chapter F: Cloud Cost Optimization. A separate dataset: Northwind's AWS estate
 * is NOT part of the 42-contract SaaS portfolio and never enters its totals.
 * Illustrative figures.
 */
export const CLOUD = {
  provider: 'AWS',
  annualSpend: 3_480_000,
  edpCommitment: 3_000_000,
  edpTermEnd: '2027-03-31',
  edpDiscountPct: 0.08,
  owner: 'marcus-lee',
  forecastNext12m: 3_910_000,
} as const

export interface CloudService {
  name: string
  category: string
  spend: number
  savings: number
}

export const CLOUD_SERVICES: CloudService[] = [
  { name: 'Compute', category: 'EC2, Fargate', spend: 1_420_000, savings: 312_000 },
  { name: 'Database', category: 'RDS, DynamoDB', spend: 760_000, savings: 148_000 },
  { name: 'Storage', category: 'S3, EBS', spend: 410_000, savings: 61_000 },
  { name: 'Analytics', category: 'Redshift, Athena', spend: 380_000, savings: 96_000 },
  { name: 'Networking', category: 'Data transfer, NAT', spend: 290_000, savings: 22_000 },
  { name: 'Other', category: 'Lambda, CloudWatch, misc.', spend: 220_000, savings: 11_000 },
]

export const cloudTotals = () => {
  const spend = CLOUD_SERVICES.reduce((s, x) => s + x.spend, 0)
  const savings = CLOUD_SERVICES.reduce((s, x) => s + x.savings, 0)
  return { spend, savings, savingsPct: savings / spend }
}

export const OPTIMIZATION_TESTS = {
  run: 104,
  found: 41,
  rows: [
    { test: 'EC2 rightsizing (m5 → m7g)', category: 'Compute', savings: 118_400, effort: 'Medium', status: 'Ready' },
    { test: 'Savings Plan coverage gap', category: 'Compute', savings: 96_200, effort: 'Low', status: 'Ready' },
    { test: 'Redshift RI coverage', category: 'Analytics', savings: 48_900, effort: 'Low', status: 'Ready' },
    { test: 'RDS idle replicas (staging)', category: 'Database', savings: 41_300, effort: 'Low', status: 'Ready' },
    { test: 'gp2 → gp3 EBS volumes', category: 'Storage', savings: 26_800, effort: 'Low', status: 'In progress' },
    { test: 'S3 Intelligent-Tiering on logs', category: 'Storage', savings: 21_700, effort: 'Low', status: 'Ready' },
    { test: 'NAT gateway consolidation', category: 'Networking', savings: 14_100, effort: 'Medium', status: 'Ready' },
  ],
} as const

export const RIO = {
  coverageNow: 0.58,
  coverageTarget: 0.8,
  effectiveRate: 0.052,
  onDemandRate: 0.085,
  automatedSavingsYtd: 182_400,
  /** RI coverage by month, newest last. */
  coverageTrend: [0.41, 0.44, 0.47, 0.5, 0.52, 0.55, 0.56, 0.58],
} as const

export const SPEND_BY_ACCOUNT = [
  { account: 'Production', spend: 2_190_000 },
  { account: 'Data platform', spend: 640_000 },
  { account: 'Staging', spend: 410_000 },
  { account: 'Research', spend: 240_000 },
]

/** EDP: committed vs actual spend by quarter, newest last. */
export const EDP_TREND = [
  { q: 'Q2 25', actual: 690_000 },
  { q: 'Q3 25', actual: 760_000 },
  { q: 'Q4 25', actual: 820_000 },
  { q: 'Q1 26', actual: 810_000 },
  { q: 'Q2 26', actual: 860_000 },
  { q: 'Q3 26', actual: 940_000 },
]
