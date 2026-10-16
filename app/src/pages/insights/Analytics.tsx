/**
 * Insights › Analytics (Insights Hub). The real app has 20 tabs; the ones that
 * carry the Chapter E story are built, the rest show an honest
 * "Available in the full product" card at their real location.
 */
import clsx from 'clsx'
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react'
import { useMemo } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { askVertice } from '../../ai/engine'
import { AreaChart, Bars, Bubbles, Donut } from '../../components/charts/charts'
import { SERIES } from '../../components/charts/palette'
import { PageBody, PageHeader } from '../../components/layout/PageHeader'
import { Button, ButtonLink } from '../../components/ui/Button'
import { Card, CardHeader } from '../../components/ui/Card'
import { FullProductCard, Kpi, Logo, Table, Td, THead, Tr } from '../../components/ui/kit'
import { StatusPill } from '../../components/ui/StatusPill'
import { aiMonthly, aiPotentialMonthly, AI_COMMITMENTS } from '../../data/chapters/aiSpend'
import { anaDerived } from '../../data/chapters/ana'
import { benchmarkRows, costForecast, FORECAST_INFLATION, FORECAST_SPLIT, savingsRoi, spendInsights } from '../../data/chapters/analytics'
import { recommendations, usageRows } from '../../data/chapters/insights'
import { RISK_TONE, prospects, riskProfile, vendorName } from '../../data/directory'
import { s1Derived } from '../../data/scenario'
import { vendors, type Department } from '../../data/vendors'
import { otherBenefits } from '../../domain/chapters'
import { reached } from '../../domain/flows'
import { noticeDays, upcomingNotices } from '../../domain/selectors'
import { formatDate, monthLabel, pct, usd, usdCompact } from '../../lib/format'
import { useScenario } from '../../store/demo'
import { useUi } from '../../store/ui'

const ANALYTICS_TABS = [
  'Recommendations',
  'Benchmarking',
  'Savings and ROI',
  'Renewals Timeline',
  'Spend Insights',
  'TPRM Analysis',
  'Benchmark Tracking',
  'Cost/Cash Forecast',
  'SaaS Stack Matrix',
  'SaaS Spend Evolution',
  'Vendor News',
  'Contract Health',
  'Exec Summary',
  'User Activity',
  'ERP Insights',
  'AWS Marketplace',
  'Supplier 360',
  'DORA Compliance',
  'AI Usage',
  'AI Cost Optimization',
] as const

const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')

const DEPT_COLORS: Partial<Record<Department, string>> = {
  IT: SERIES[0],
  Engineering: SERIES[1],
  Sales: SERIES[3],
  Security: SERIES[4],
  People: SERIES[5],
  Finance: SERIES[6],
  Data: '#0EA5E9',
  Marketing: '#F43F5E',
  Support: '#14B8A6',
  Product: '#A855F7',
  Operations: '#64748B',
  Legal: '#78716C',
}

function Recommendations() {
  const r = useMemo(() => recommendations(), [])
  return (
    <div className="space-y-5">
      <p className="max-w-[860px] text-[13.5px] text-ink-2">
        Savings recommendations across Northwind’s SaaS portfolio: vendor deduplication, term commitment opportunities and right-sizing candidates. Estimates are illustrative and need owner
        review.
      </p>
      <div className="grid gap-3 sm:grid-cols-4">
        <Kpi label="Total estimated savings" value={usd(r.totals.all)} tone="violet" />
        <Kpi label="Deduplication savings" value={usd(r.totals.dedupe)} />
        <Kpi label="Term commitment savings" value={usd(r.totals.term)} />
        <Kpi label="Right-sizing savings" value={usd(r.totals.rightsize)} />
      </div>
      <div className="grid gap-5 xl:grid-cols-3">
        <Card>
          <CardHeader title="Deduplication" subtitle="Overlapping tools: keep the one with more active users" />
          <Table>
            <THead cols={['Keep', 'Eliminate', { label: 'Saving', right: true }]} />
            <tbody>
              {r.dedupe.map((d) => (
                <Tr key={d.category}>
                  <Td>
                    <span className="flex items-center gap-2">
                      <Logo id={d.keep.id} size="xs" /> {d.keep.name}
                    </span>
                    <span className="text-[11.5px] text-ink-3">{d.category}</span>
                  </Td>
                  <Td>
                    <span className="flex items-center gap-2">
                      <Logo id={d.drop.id} size="xs" /> {d.drop.name}
                    </span>
                  </Td>
                  <Td right>{usd(d.saving)}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
          <div className="px-5 py-3">
            <Link to="/insights/usage" className="inline-flex items-center gap-1 text-[13px] font-medium text-primary hover:underline">
              Review Asana vs monday.com <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </Card>
        <Card>
          <CardHeader title="Term commitment" subtitle={`Highly used tools: commit 24 months for ~${pct(r.termRate)}`} />
          <Table>
            <THead cols={['Vendor', 'Utilization', { label: 'Saving', right: true }]} />
            <tbody>
              {r.term.map((t) => (
                <Tr key={t.vendor.id}>
                  <Td>
                    <span className="flex items-center gap-2">
                      <Logo id={t.vendor.id} size="xs" /> {t.vendor.name}
                    </span>
                  </Td>
                  <Td>{pct(t.vendor.utilization!)}</Td>
                  <Td right>{usd(t.saving)}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Card>
        <Card>
          <CardHeader title="Right-sizing" subtitle="Under 45% utilized: keep active seats + 10%" />
          <Table>
            <THead cols={['Vendor', 'Utilization', { label: 'Saving', right: true }]} />
            <tbody>
              {r.rightsize.map((t) => (
                <Tr key={t.vendor.id}>
                  <Td>
                    <span className="flex items-center gap-2">
                      <Logo id={t.vendor.id} size="xs" /> {t.vendor.name}
                    </span>
                  </Td>
                  <Td>{pct(t.vendor.utilization!)}</Td>
                  <Td right>{usd(t.saving)}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>
    </div>
  )
}

function Benchmarking() {
  const rows = useMemo(() => benchmarkRows(), [])
  return (
    <Card>
      <CardHeader title="Price vs benchmark" subtitle="Annual price per seat against an illustrative peer band for the same product, tier and term" />
      <Table>
        <THead cols={['Vendor', { label: 'Your price', right: true }, { label: 'Benchmark band', right: true }, 'Position', { label: 'Est. annual saving', right: true }]} />
        <tbody>
          {rows.map((r) => (
            <Tr key={r.vendor.id}>
              <Td>
                <span className="flex items-center gap-2.5">
                  <Logo id={r.vendor.id} size="sm" />
                  <span>
                    <span className="block font-medium text-ink">{r.vendor.name}</span>
                    <span className="block text-[12px] text-ink-3">{r.vendor.product}</span>
                  </span>
                </span>
              </Td>
              <Td right>{usd(r.price)}</Td>
              <Td right>
                {usd(r.low)}–{usd(r.high)}
              </Td>
              <Td>
                <StatusPill tone={r.position === 'Above' ? 'danger' : r.position === 'Within' ? 'success' : 'info'}>
                  {r.position === 'Above' ? `Above · ~${r.percentile}th pct` : r.position}
                </StatusPill>
              </Td>
              <Td right>{r.saving ? usd(r.saving) : '–'}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Card>
  )
}

function SavingsRoiTab() {
  const s = useScenario()
  const r = useMemo(() => savingsRoi(s), [s])
  const avoided = s1Derived().avoidedUplift * (s.request?.stage === 'completed' ? 1 : 0) + (reached(s, 'ana', 'completed') ? anaDerived().avoidedUplift : 0)
  const other = otherBenefits(s).reduce((sum, b) => sum + b.amount, 0)
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-4">
        <Kpi label="Total savings" value={usd(r.total)} sub={`${pct(r.total / r.baseline)} of pre-renewal cost`} tone="violet" />
        <Kpi label="Total negotiations" value={r.negotiations} />
        <Kpi label="Avoided uplift (separate)" value={usd(avoided)} sub="vs vendor opening quotes" />
        <Kpi label="Cost avoidance & invoice errors" value={usd(other)} sub="new purchases and P2P" />
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <Card className="p-5">
          <div className="text-[15px] font-semibold text-ink">Total savings by quarter</div>
          <div className="mt-4">
            <Bars data={r.byQuarter.map((q) => ({ label: `${q.label} · ${q.count}`, values: [q.value] }))} series={[{ name: 'Savings', color: SERIES[0] }]} format={usd} />
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-[15px] font-semibold text-ink">Cumulative savings over time</div>
          <div className="mt-4">
            <AreaChart points={r.cumulative} step format={usd} />
          </div>
        </Card>
      </div>
      <Card className="p-5">
        <div className="mb-4 text-[15px] font-semibold text-ink">Total savings by department</div>
        <Donut slices={r.byDepartment} format={usdCompact} />
      </Card>
    </div>
  )
}

function RenewalsTimeline() {
  const list = upcomingNotices(120)
  return (
    <Card>
      <CardHeader title="Renewals timeline" subtitle="Notice deadlines in the next 120 days" />
      <Table>
        <THead cols={['Vendor', 'Notice deadline', 'Renewal date', { label: 'Annual cost', right: true }, 'Auto-renews']} />
        <tbody>
          {list.map((v) => {
            const d = noticeDays(v)!
            return (
              <Tr key={v.id}>
                <Td>
                  <Link to={`/contracts/${v.id}/overview`} className="flex items-center gap-2.5 font-medium text-ink hover:text-primary">
                    <Logo id={v.id} size="xs" /> {v.name}
                  </Link>
                </Td>
                <Td>
                  {formatDate(v.noticeDeadline!)} <span className={clsx('text-[12px]', d < 0 ? 'text-danger-ink' : d <= 14 ? 'text-danger-ink' : 'text-ink-3')}>{d < 0 ? `passed` : `${d}d`}</span>
                </Td>
                <Td>{formatDate(v.renewalDate)}</Td>
                <Td right>{usd(v.annualCost)}</Td>
                <Td>{v.autoRenew ? 'Yes' : 'No'}</Td>
              </Tr>
            )
          })}
        </tbody>
      </Table>
    </Card>
  )
}

function SpendInsightsTab() {
  const d = useMemo(() => spendInsights(), [])
  const donut = (title: string, slices: { label: string; value: number }[]) => (
    <Card className="p-5">
      <div className="mb-4 text-[14px] font-semibold text-ink">{title}</div>
      <Donut slices={slices} format={usdCompact} size={116} />
    </Card>
  )
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-4">
        <Kpi label="Annualized spend" value={usd(d.total)} tone="violet" />
        <Kpi label="Live contracts" value={d.live} />
        <Kpi label="Average contract spend" value={usd(d.average)} />
        <Kpi label="Spend to be negotiated by Vertice" value={usd(d.toNegotiate)} sub="Renewals ≥ $200K not yet negotiated" />
      </div>
      <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
        {donut('Spend by department', d.byDepartment)}
        {donut('Spend by category (SaaS)', d.byCategory)}
        {donut('Spend by negotiation support', d.bySupport)}
        {donut('Spend by contract length', d.byLength)}
        {donut('Spend by billing frequency', d.byBilling)}
        {donut('Spend by payment terms', d.byTerms)}
      </div>
    </div>
  )
}

function ForecastTab() {
  const s = useScenario()
  const f = useMemo(() => costForecast(s), [s])
  const pts = (xs: { label: string; value: number }[]) => xs.map((p) => ({ label: monthLabel(p.label).replace(' 20', " '"), value: p.value }))
  return (
    <div className="space-y-5">
      <Card className="p-5">
        <div className="flex items-center gap-1.5 text-[13px] font-semibold text-primary">
          <Sparkles className="size-4" /> Summary
        </div>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">
          Annualized spend is predicted to move from {usd(f.first)} in January 2026 to {usd(f.last)} by December 2027 ({f.growth >= 0 ? '+' : ''}
          {pct(f.growth, 1)}). Renewals not yet negotiated assume a {pct(FORECAST_INFLATION)} uplift; signed renewals (Salesforce, Gong) use their negotiated price from the new term.
        </p>
      </Card>
      <div className="grid gap-5 xl:grid-cols-2">
        <Card className="p-5">
          <div className="text-[15px] font-semibold text-ink">Cost over time</div>
          <p className="text-[12px] text-ink-3">Monthly cost · historical grey, projected violet</p>
          <div className="mt-3">
            <AreaChart points={pts(f.cost)} splitAt={FORECAST_SPLIT} format={usd} />
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-[15px] font-semibold text-ink">Cash flow over time</div>
          <p className="text-[12px] text-ink-3">When invoices fall due, by billing frequency</p>
          <div className="mt-3">
            <AreaChart points={pts(f.cash)} splitAt={FORECAST_SPLIT} format={usd} />
          </div>
        </Card>
      </div>
    </div>
  )
}

function StackMatrix() {
  const items = useMemo(
    () =>
      usageRows().map((r) => ({
        id: r.vendor.id,
        label: r.vendor.name,
        x: r.vendor.annualCost,
        y: r.utilization,
        size: r.vendor.annualCost,
        color: DEPT_COLORS[r.vendor.department] ?? SERIES[2],
        tip: (
          <div className="space-y-0.5">
            <div className="font-semibold">{r.vendor.name}</div>
            <div>
              {usd(r.vendor.annualCost)} · {r.vendor.department}
            </div>
            <div>
              Utilization {pct(r.utilization)} · renews {formatDate(r.vendor.renewalDate)}
            </div>
            <div>Risk {riskProfile(r.vendor.id).overall}</div>
          </div>
        ),
      })),
    [],
  )
  const depts = [...new Set(usageRows().map((r) => r.vendor.department))]
  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-[15px] font-semibold text-ink">SaaS Stack Matrix</div>
          <p className="text-[12px] text-ink-3">Bottom right = expensive and under-used: the strongest negotiation leverage</p>
        </div>
        <Button size="sm" variant="secondary" onClick={() => askVertice('Show my highest cost vendors where I have most negotiation leverage')}>
          <Sparkles className="size-3.5 text-primary" /> Ask Vertice AI
        </Button>
      </div>
      <div className="mt-4">
        <Bubbles items={items} xLabel="Annual cost →" yLabel="Utilization →" height={340} />
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-[12px] text-ink-3">
        {depts.map((d) => (
          <span key={d} className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: DEPT_COLORS[d] ?? SERIES[2] }} /> {d}
          </span>
        ))}
      </div>
    </Card>
  )
}

function TprmAnalysis() {
  const all = [...vendors.map((v) => v.id), ...prospects.filter((p) => ['linkdesk', 'teamviewer', 'lexora', 'clausewise', 'draftly', 'pactly'].includes(p.id)).map((p) => p.id)]
  const counts = { Low: 0, Medium: 0, High: 0, Critical: 0 }
  for (const id of all) counts[riskProfile(id).overall] += 1
  const flagged = all.filter((id) => riskProfile(id).overall !== 'Low')
  return (
    <div className="grid gap-5 xl:grid-cols-[380px_1fr]">
      <Card className="p-5">
        <div className="mb-4 text-[15px] font-semibold text-ink">Vendors by overall risk</div>
        <Donut
          slices={[
            { label: 'Low', value: counts.Low, color: '#16A239' },
            { label: 'Medium', value: counts.Medium, color: '#F5A524' },
            { label: 'High', value: counts.High, color: '#DC2828' },
          ]}
        />
      </Card>
      <Card>
        <CardHeader title="Needs attention" subtitle="Assessed by Vertice AI - TPRM with Vanta ratings" />
        <Table>
          <THead cols={['Vendor', 'Overall', 'Summary']} />
          <tbody>
            {flagged.map((id) => (
              <Tr key={id}>
                <Td>
                  <Link to={`/vendors/${id}`} className="flex items-center gap-2 font-medium text-ink hover:text-primary">
                    <Logo id={id} size="xs" /> {vendorName(id)}
                  </Link>
                </Td>
                <Td>
                  <StatusPill tone={RISK_TONE[riskProfile(id).overall]}>{riskProfile(id).overall}</StatusPill>
                </Td>
                <Td className="text-[12.5px] text-ink-2">{riskProfile(id).narrative.split('. ')[0]}.</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  )
}

function AiCostTab() {
  const a = AI_COMMITMENTS[0]
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <Kpi label="Monthly AI spend" value={usd(aiMonthly())} />
        <Kpi label="Potential monthly AI savings" value={usd(aiPotentialMonthly())} sub={pct(aiPotentialMonthly() / aiMonthly())} tone="violet" />
        <Kpi label="Anthropic commitment used" value={pct(a.used / a.commitment)} sub="notice Dec 16" tone="danger" />
      </div>
      <ButtonLink to="/insights/ai-spend">
        Open AI spend <ArrowRight className="size-4" />
      </ButtonLink>
    </div>
  )
}

const BUILT: Record<string, () => React.ReactNode> = {
  recommendations: Recommendations,
  benchmarking: Benchmarking,
  'savings-and-roi': SavingsRoiTab,
  'renewals-timeline': RenewalsTimeline,
  'spend-insights': SpendInsightsTab,
  'tprm-analysis': TprmAnalysis,
  'cost-cash-forecast': ForecastTab,
  'saas-stack-matrix': StackMatrix,
  'ai-cost-optimization': AiCostTab,
}

export function Analytics() {
  const { tab = 'spend-insights' } = useParams()
  const toast = useUi((s) => s.toast)
  const Tab = BUILT[tab]
  const title = ANALYTICS_TABS.find((t) => slug(t) === tab) ?? 'Analytics'
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Insights' }, { label: 'Analytics' }]}
        title="Analytics"
        meta={<span>Strategic SaaS portfolio · Northwind Systems</span>}
        actions={
          <Button variant="secondary" onClick={() => toast('Thanks! Feedback is outside this demo', 'info')}>
            <MessageSquare className="size-4" /> Give feedback
          </Button>
        }
      />
      <div className="border-b border-line bg-white px-8">
        <nav className="-mb-px flex gap-5 overflow-x-auto" aria-label="Analytics tabs">
          {ANALYTICS_TABS.map((t) => (
            <NavLink
              key={t}
              to={`/analytics/${slug(t)}`}
              className={({ isActive }) =>
                clsx('shrink-0 border-b-2 py-2.5 text-[13.5px] font-medium whitespace-nowrap', isActive ? 'border-primary text-primary' : 'border-transparent text-ink-3 hover:text-ink')
              }
            >
              {t}
            </NavLink>
          ))}
        </nav>
      </div>
      <PageBody>{Tab ? <Tab /> : <FullProductCard title={title} body={`${title} is one of 20 Analytics dashboards in Vertice. This demo builds the ones used in the Insights story.`} />}</PageBody>
    </>
  )
}
