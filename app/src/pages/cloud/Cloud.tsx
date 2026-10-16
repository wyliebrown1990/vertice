/**
 * Chapter F: Cloud Optimizer (Cloud Cost Optimization, Cloud Engineers persona).
 * A separate AWS dataset that never enters the SaaS portfolio totals. The EDP
 * renewal hands off to Vertice's experts. Uses Vertice's magenta cloud accent.
 */
import clsx from 'clsx'
import { ArrowRight, CheckCircle2, Cloud as CloudIcon, Zap } from 'lucide-react'
import { NavLink, useParams } from 'react-router-dom'
import { AreaChart, Bars, Donut } from '../../components/charts/charts'
import { PageBody, PageHeader } from '../../components/layout/PageHeader'
import { VerticeMark } from '../../components/ui/Avatar'
import { Button, ButtonLink } from '../../components/ui/Button'
import { Card, CardHeader } from '../../components/ui/Card'
import { Kpi, Meter, Table, Td, THead, Tr } from '../../components/ui/kit'
import { StatusPill } from '../../components/ui/StatusPill'
import { CLOUD, CLOUD_SERVICES, cloudTotals, EDP_TREND, OPTIMIZATION_TESTS, RIO, SPEND_BY_ACCOUNT } from '../../data/chapters/cloud'
import { reached } from '../../domain/flows'
import { formatDate, pct, usd, usdCompact } from '../../lib/format'
import { useDemo } from '../../store/demo'
import { useUi } from '../../store/ui'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'optimization', label: 'Optimization' },
  { id: 'ri-optimizer', label: 'RI Optimizer' },
  { id: 'edp', label: 'PPA/EDP' },
]

const MAGENTA = '#E52EC7'

function Overview() {
  const t = cloudTotals()
  const max = Math.max(...CLOUD_SERVICES.map((x) => x.spend))
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-4">
        <Kpi label="AWS spend (annualized)" value={usd(t.spend)} />
        <Kpi label="Estimated savings" value={usd(t.savings)} sub={`${pct(t.savingsPct, 1)} of spend`} tone="violet" />
        <Kpi label="Optimization tests" value={`${OPTIMIZATION_TESTS.run - OPTIMIZATION_TESTS.found}/${OPTIMIZATION_TESTS.run}`} sub="passing" />
        <Kpi label="12-month forecast" value={usd(CLOUD.forecastNext12m)} sub={`+${pct(CLOUD.forecastNext12m / t.spend - 1)} at current growth`} />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.3fr_1fr]">
        <Card className="p-5">
          <div className="text-[15px] font-semibold text-ink">Savings tree</div>
          <p className="text-[12px] text-ink-3">Spend and savings by service · {usd(t.savings)} identified</p>
          <ul className="mt-4 space-y-3">
            {CLOUD_SERVICES.map((x) => (
              <li key={x.name}>
                <div className="flex items-center justify-between text-[13px]">
                  <span>
                    <span className="font-medium text-ink">{x.name}</span> <span className="text-ink-3">· {x.category}</span>
                  </span>
                  <span className="tabular-nums">
                    <span className="text-ink">{usdCompact(x.spend)}</span> <span className="font-medium" style={{ color: MAGENTA }}>−{usdCompact(x.savings)}</span>
                  </span>
                </div>
                <div className="mt-1 flex h-2 overflow-hidden rounded-full bg-line-soft" style={{ width: `${(x.spend / max) * 100}%` }}>
                  <div className="h-full bg-[#2B1B4F]" style={{ width: `${(1 - x.savings / x.spend) * 100}%` }} />
                  <div className="h-full" style={{ width: `${(x.savings / x.spend) * 100}%`, backgroundColor: MAGENTA }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-5">
          <div className="mb-4 text-[15px] font-semibold text-ink">Spend by account</div>
          <Donut slices={SPEND_BY_ACCOUNT.map((a, i) => ({ label: a.account, value: a.spend, color: ['#2B1B4F', MAGENTA, '#8B4DF8', '#F5A3E7'][i] }))} format={usdCompact} />
          <p className="mt-4 text-[12.5px] text-ink-3">Owner: Marcus Lee (Cloud Platform). Dashboards are shared with Finance (Priya Shah).</p>
        </Card>
      </div>
    </div>
  )
}

function Optimization() {
  const toast = useUi((s) => s.toast)
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <Kpi label="Tests run" value={OPTIMIZATION_TESTS.run} />
        <Kpi label="Findings" value={OPTIMIZATION_TESTS.found} />
        <Kpi label="Estimated savings" value={usd(cloudTotals().savings)} tone="violet" />
      </div>
      <Card>
        <CardHeader title="Optimization Tests" subtitle={`Top findings of ${OPTIMIZATION_TESTS.found}`} />
        <Table>
          <THead cols={['Test', 'Category', 'Effort', { label: 'Savings / yr', right: true }, 'Status', '']} />
          <tbody>
            {OPTIMIZATION_TESTS.rows.map((r) => (
              <Tr key={r.test}>
                <Td className="font-medium text-ink">{r.test}</Td>
                <Td className="text-ink-2">{r.category}</Td>
                <Td>
                  <StatusPill tone={r.effort === 'Low' ? 'success' : 'warning'}>{r.effort}</StatusPill>
                </Td>
                <Td right>{usd(r.savings)}</Td>
                <Td>
                  <StatusPill tone={r.status === 'Ready' ? 'violet' : 'info'}>{r.status}</StatusPill>
                </Td>
                <Td right>
                  <button onClick={() => toast(`Ticket created in Jira for “${r.test}” (simulated)`, 'info')} className="text-[13px] font-medium text-primary hover:underline">
                    Create ticket
                  </button>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  )
}

function RiOptimizer() {
  const discount = 1 - RIO.effectiveRate / RIO.onDemandRate
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-4">
        <Kpi label="RI coverage" value={pct(RIO.coverageNow)} sub={`Target ${pct(RIO.coverageTarget)}`} />
        <Kpi label="Effective rate" value={`$${RIO.effectiveRate.toFixed(3)}`} sub={`vs $${RIO.onDemandRate.toFixed(3)} on-demand`} />
        <Kpi label="Discount" value={pct(discount)} tone="violet" />
        <Kpi label="Automated savings YTD" value={usd(RIO.automatedSavingsYtd)} />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <Card className="p-5">
          <div className="text-[15px] font-semibold text-ink">RI coverage</div>
          <p className="text-[12px] text-ink-3">Last 8 months</p>
          <div className="mt-3">
            <AreaChart points={RIO.coverageTrend.map((v, i) => ({ label: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][i], value: Math.round(v * 100) }))} format={(n) => `${n}%`} color={MAGENTA} />
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-[15px] font-semibold text-ink">
            <Zap className="size-4" style={{ color: MAGENTA }} /> Automated buying &amp; selling
          </div>
          <p className="mt-2 text-[13px] text-ink-2">Vertice buys and sells reserved instances on the RI marketplace to keep coverage near target as usage changes.</p>
          <div className="mt-4 flex items-center justify-between rounded-xl border border-line px-4 py-3">
            <span className="text-[13.5px] font-medium text-ink">RI Optimizer automation</span>
            <StatusPill tone="success" icon={<CheckCircle2 className="size-3" />}>
              Enabled
            </StatusPill>
          </div>
          <Meter value={RIO.coverageNow / RIO.coverageTarget} className="mt-4" />
          <p className="mt-1.5 text-[12px] text-ink-3">{pct(RIO.coverageNow / RIO.coverageTarget)} of the way to target coverage</p>
        </Card>
      </div>
    </div>
  )
}

function Edp() {
  const engaged = useDemo((s) => reached(s, 'cloud-edp', 'engaged'))
  const advance = useDemo((s) => s.advance)
  const book = useDemo((s) => s.book)
  const toast = useUi((s) => s.toast)
  const quarterly = CLOUD.edpCommitment / 4
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-4">
        <Kpi label="EDP commitment" value={usd(CLOUD.edpCommitment)} sub="per year" />
        <Kpi label="Discount" value={pct(CLOUD.edpDiscountPct)} />
        <Kpi label="Actual run-rate" value={usd(CLOUD.annualSpend)} sub={`${pct(CLOUD.annualSpend / CLOUD.edpCommitment - 1)} above commitment`} tone="violet" />
        <Kpi label="Term ends" value={formatDate(CLOUD.edpTermEnd)} sub="Renewal window open" />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <Card className="p-5">
          <div className="text-[15px] font-semibold text-ink">EDP spend trend</div>
          <p className="text-[12px] text-ink-3">Actual spend per quarter vs the {usd(quarterly)} quarterly commitment</p>
          <div className="mt-4">
            <Bars
              data={EDP_TREND.map((q) => ({ label: q.q, values: [Math.min(q.actual, quarterly), Math.max(0, q.actual - quarterly)] }))}
              series={[
                { name: 'Within commitment', color: '#2B1B4F' },
                { name: 'Above commitment', color: MAGENTA },
              ]}
              format={usd}
            />
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-[15px] font-semibold text-ink">
            <VerticeMark className="size-5" /> Renew the EDP with Vertice
          </div>
          <p className="mt-2 text-[13px] text-ink-2">
            Northwind consistently spends above its commitment. Vertice’s experts size a larger commitment and negotiate a better discount using benchmarks from other AWS customers.
          </p>
          {engaged ? (
            <div className="mt-4 space-y-2">
              <StatusPill tone="success">Engaged · Nina Patel, Procurement Expert</StatusPill>
              <ButtonLink to="/expert-engage" variant="secondary" size="sm">
                View in Expert Engage
              </ButtonLink>
            </div>
          ) : (
            <Button
              className="mt-4"
              onClick={() => {
                advance('cloud-edp', 'none', 'engaged')
                book('edp')
                toast('EDP renewal handed to Vertice experts')
              }}
            >
              Engage Vertice experts <ArrowRight className="size-4" />
            </Button>
          )}
        </Card>
      </div>
    </div>
  )
}

export function Cloud() {
  const { tab = 'overview' } = useParams()
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Cloud Optimizer' }]}
        icon={
          <span className="flex size-12 items-center justify-center rounded-xl text-white" style={{ background: `linear-gradient(135deg, #2B1B4F, ${MAGENTA})` }}>
            <CloudIcon className="size-6" />
          </span>
        }
        title={
          <span className="flex items-center gap-2.5">
            Cloud Optimizer <StatusPill tone="outline">AWS</StatusPill>
          </span>
        }
        meta={<span>Separate from the SaaS portfolio · cost and usage reports connected</span>}
      />
      <div className="border-b border-line bg-white px-8">
        <div className="-mb-px flex gap-6">
          {TABS.map((t) => (
            <NavLink
              key={t.id}
              to={`/cloud/${t.id}`}
              className={({ isActive }) => clsx('border-b-2 py-2.5 text-[14px] font-medium', isActive ? 'border-[#E52EC7] text-[#B5179C]' : 'border-transparent text-ink-2 hover:text-ink')}
            >
              {t.label}
            </NavLink>
          ))}
        </div>
      </div>
      <PageBody>
        {tab === 'overview' && <Overview />}
        {tab === 'optimization' && <Optimization />}
        {tab === 'ri-optimizer' && <RiOptimizer />}
        {tab === 'edp' && <Edp />}
      </PageBody>
    </>
  )
}
