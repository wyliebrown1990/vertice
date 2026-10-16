/**
 * Chapter F: AI Cost Optimization. Monthly AI spend across the providers that are
 * already in Northwind's portfolio, recommendations, commitments and alerts.
 * The Anthropic commitment hands off to a Vertice-led renewal request.
 */
import clsx from 'clsx'
import { ArrowRight, BellRing, CheckCircle2, Plug } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AreaChart, Donut } from '../../components/charts/charts'
import { PageBody, PageHeader } from '../../components/layout/PageHeader'
import { Button } from '../../components/ui/Button'
import { Card, CardHeader } from '../../components/ui/Card'
import { Kpi, Logo, Meter, Segmented, Table, Td, THead, Tr } from '../../components/ui/kit'
import { StatusPill } from '../../components/ui/StatusPill'
import { aiAnnual, aiMonthly, aiPotentialMonthly, aiTrend, AI_ALERTS, AI_BY_DEPARTMENT, AI_COMMITMENTS, AI_PROVIDERS, AI_RECOMMENDATIONS, ANTHROPIC_REQUEST_ID, MODEL_MIX } from '../../data/chapters/aiSpend'
import { vendorName } from '../../data/directory'
import { vendorById } from '../../data/vendors'
import { reached } from '../../domain/flows'
import { formatDate, pct, usd } from '../../lib/format'
import { useDemo } from '../../store/demo'
import { useUi } from '../../store/ui'

const TABS = ['spend', 'usage', 'commitments', 'alerts', 'setup'] as const
type Tab = (typeof TABS)[number]

const monthlyOf = (p: string) => Math.round(vendorById(p)!.annualCost / 12)

function SpendTab() {
  const [by, setBy] = useState<'provider' | 'department'>('provider')
  const total = aiMonthly()
  const models = MODEL_MIX.map((m) => ({ ...m, monthly: Math.round(monthlyOf(m.provider) * m.share) })).sort((a, b) => b.monthly - a.monthly)
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <Kpi label="Potential monthly AI savings" value={usd(aiPotentialMonthly())} sub={`${pct(aiPotentialMonthly() / total)} of monthly spend`} tone="violet" />
        <Kpi label="Monthly AI spend" value={usd(total)} sub="Anthropic · OpenAI · Cursor" />
        <Kpi label="Annualized" value={usd(aiAnnual())} sub="Matches the three AI contracts" />
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        {AI_RECOMMENDATIONS.map((r) => (
          <Card key={r.id} className="flex flex-col p-5">
            <div className="flex items-start justify-between gap-2">
              <span className="text-[14px] font-semibold text-ink">{r.title}</span>
              <StatusPill tone={r.potential === 'High' ? 'violet' : 'neutral'}>{r.potential}</StatusPill>
            </div>
            <p className="mt-1.5 flex-1 text-[13px] text-ink-3">{r.detail}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[15px] font-semibold text-success-ink">Save {usd(r.monthlySaving)}/mo</span>
              {r.action && (
                <Link to={r.action.to} className="inline-flex items-center gap-1 text-[13px] font-medium text-primary hover:underline">
                  {r.action.label} <ArrowRight className="size-3.5" />
                </Link>
              )}
            </div>
          </Card>
        ))}
      </div>
      <div className="grid items-start gap-5 xl:grid-cols-2">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-semibold text-ink">Spend breakdown</span>
            <Segmented
              value={by}
              onChange={setBy}
              options={[
                { value: 'provider', label: 'By provider' },
                { value: 'department', label: 'By department' },
              ]}
            />
          </div>
          <div className="mt-4">
            <Donut
              slices={by === 'provider' ? AI_PROVIDERS.map((p) => ({ label: vendorName(p), value: monthlyOf(p) })) : AI_BY_DEPARTMENT.map((d) => ({ label: d.department, value: Math.round(total * d.share) }))}
              format={usd}
            />
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-[15px] font-semibold text-ink">By model</div>
          <ul className="mt-4 space-y-2.5">
            {models.map((m) => (
              <li key={m.model}>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="flex items-center gap-2 text-ink">
                    <Logo id={m.provider} size="xs" /> {m.model}
                  </span>
                  <span className="font-medium text-ink tabular-nums">{usd(m.monthly)}</span>
                </div>
                <Meter value={m.monthly / models[0].monthly} className="mt-1" />
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <Card className="p-5">
        <div className="text-[15px] font-semibold text-ink">Monthly AI spend</div>
        <p className="text-[12px] text-ink-3">Last 9 months · up {pct(1 / 0.62 - 1)} since February</p>
        <div className="mt-3">
          <AreaChart points={aiTrend()} format={usd} />
        </div>
      </Card>
    </div>
  )
}

function UsageTab() {
  const rows = [
    { model: 'Claude Opus (API)', provider: 'anthropic', requests: 412_000, retry: 0.07, use: 'Support ticket triage, summarisation' },
    { model: 'Claude Sonnet (API)', provider: 'anthropic', requests: 1_180_000, retry: 0.02, use: 'Product features, internal tools' },
    { model: 'GPT frontier (API)', provider: 'openai', requests: 268_000, retry: 0.03, use: 'Data extraction pipelines' },
    { model: 'GPT mini (API)', provider: 'openai', requests: 2_410_000, retry: 0.01, use: 'Classification, routing' },
  ]
  return (
    <div className="space-y-5">
      <Card>
        <CardHeader title="API usage by model" subtitle="Last 30 days · from the Anthropic Console and OpenAI Platform integrations" />
        <Table>
          <THead cols={['Model', 'Main use', { label: 'Requests', right: true }, { label: 'Retry rate', right: true }]} />
          <tbody>
            {rows.map((r) => (
              <Tr key={r.model}>
                <Td>
                  <span className="flex items-center gap-2 font-medium text-ink">
                    <Logo id={r.provider} size="xs" /> {r.model}
                  </span>
                </Td>
                <Td className="text-ink-2">{r.use}</Td>
                <Td right>{r.requests.toLocaleString('en-US')}</Td>
                <Td right>
                  <span className={r.retry > 0.05 ? 'font-medium text-danger-ink' : ''}>{pct(r.retry)}</span>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Card>
      <Card className="p-5">
        <div className="text-[15px] font-semibold text-ink">Seat-based AI tools</div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            { name: 'ChatGPT Enterprise', id: 'openai', active: 522, seats: 900 },
            { name: 'Claude Team', id: 'anthropic', active: 256, seats: 400 },
            { name: 'Cursor Business', id: 'cursor', active: 146, seats: 180 },
          ].map((t) => (
            <div key={t.name} className="rounded-xl border border-line p-4">
              <div className="flex items-center gap-2 text-[13.5px] font-medium text-ink">
                <Logo id={t.id} size="xs" /> {t.name}
              </div>
              <div className="mt-2 text-[20px] font-semibold text-ink tabular-nums">{pct(t.active / t.seats)}</div>
              <div className="text-[12px] text-ink-3">
                {t.active} of {t.seats} seats active (28 days)
              </div>
              <Meter value={t.active / t.seats} tone={t.active / t.seats < 0.6 ? 'warning' : 'success'} className="mt-2" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function CommitmentsTab() {
  const requested = useDemo((s) => reached(s, 'ai-commit', 'requested'))
  const advance = useDemo((s) => s.advance)
  const toast = useUi((s) => s.toast)
  const navigate = useNavigate()
  const reqPath = `/intelligent-workflows/requests/${ANTHROPIC_REQUEST_ID}/overview`
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {AI_COMMITMENTS.map((c) => {
        const share = c.used / c.commitment
        const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
        const pts = months.map((m, i) => ({ label: m, value: Math.round((c.used / 45) * ((i + 1) * (i + 2)) / 2) }))
        return (
          <Card key={c.provider} className={clsx('p-5', c.provider === 'anthropic' && 'border-danger/30')}>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                <Logo id={c.provider} size="sm" /> {vendorName(c.provider)}
              </span>
              <StatusPill tone={share > 0.8 ? 'danger' : 'warning'}>{pct(share)} used</StatusPill>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-[13px]">
              <div>
                <div className="text-ink-3">Annual commitment</div>
                <div className="font-semibold text-ink">{usd(c.commitment)}</div>
              </div>
              <div>
                <div className="text-ink-3">Used to date</div>
                <div className="font-semibold text-ink">{usd(c.used)}</div>
              </div>
              <div>
                <div className="text-ink-3">Term ends</div>
                <div className="font-semibold text-ink">{formatDate(c.termEnd)}</div>
              </div>
            </div>
            <div className="mt-4 text-[12px] text-ink-3">Cumulative spend vs commitment</div>
            <AreaChart points={pts} height={120} format={usd} color={c.provider === 'anthropic' ? '#DC2828' : '#6000F0'} />
            <Meter value={share} tone={share > 0.8 ? 'danger' : 'warning'} className="mt-2" />
            <p className="mt-3 text-[13px] text-ink-2">{c.note}.</p>
            {c.provider === 'anthropic' ? (
              requested ? (
                <Button className="mt-3" variant="secondary" onClick={() => navigate(reqPath)}>
                  View renewal request <ArrowRight className="size-4" />
                </Button>
              ) : (
                <Button
                  className="mt-3"
                  onClick={() => {
                    advance('ai-commit', 'none', 'requested')
                    toast('Anthropic renewal handed to Vertice experts')
                    navigate(reqPath)
                  }}
                >
                  Start Anthropic renewal <ArrowRight className="size-4" />
                </Button>
              )
            ) : (
              <Link to="/contracts/openai/overview" className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-primary hover:underline">
                View OpenAI contract <ArrowRight className="size-3.5" />
              </Link>
            )}
          </Card>
        )
      })}
    </div>
  )
}

function AlertsTab() {
  return (
    <Card>
      <CardHeader title="Alerts" subtitle="Sent to owners in Slack when thresholds are crossed" />
      <ul className="divide-y divide-line-soft">
        {AI_ALERTS.map((a) => (
          <li key={a.text} className="flex items-center gap-3 px-5 py-3.5">
            <BellRing className={clsx('size-4.5', a.level === 'High' ? 'text-danger' : 'text-warning')} />
            <span className="flex-1 text-[13.5px] text-ink">{a.text}</span>
            <StatusPill tone={a.level === 'High' ? 'danger' : 'warning'}>{a.level}</StatusPill>
            <Link to={a.to} className="text-[13px] font-medium text-primary hover:underline">
              View
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  )
}

function SetupTab() {
  const sources = [
    { name: 'Anthropic Console', status: 'Connected', note: 'Usage and cost by model and workspace' },
    { name: 'OpenAI Platform', status: 'Connected', note: 'Usage and cost by model and project' },
    { name: 'Cursor admin', status: 'Connected', note: 'Seat activity' },
    { name: 'NetSuite', status: 'Connected', note: 'Invoices for AI tools bought outside contracts' },
    { name: 'Google Vertex AI', status: 'Available', note: 'Not used by Northwind' },
  ]
  return (
    <Card>
      <CardHeader title="Data sources" />
      <ul className="divide-y divide-line-soft">
        {sources.map((x) => (
          <li key={x.name} className="flex items-center gap-3 px-5 py-3">
            {x.status === 'Connected' ? <CheckCircle2 className="size-4.5 text-success" /> : <Plug className="size-4.5 text-ink-4" />}
            <span className="flex-1">
              <span className="block text-[13.5px] font-medium text-ink">{x.name}</span>
              <span className="text-[12px] text-ink-3">{x.note}</span>
            </span>
            <StatusPill tone={x.status === 'Connected' ? 'success' : 'neutral'}>{x.status}</StatusPill>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export function AiSpend() {
  const [params, setParams] = useSearchParams()
  const tab = (TABS.includes(params.get('tab') as Tab) ? params.get('tab') : 'spend') as Tab
  return (
    <>
      <PageHeader crumbs={[{ label: 'Insights' }, { label: 'AI spend' }]} title="AI Spend" meta={<span>AI Cost Optimization · model, seat and commitment spend across providers</span>} />
      <div className="border-b border-line bg-white px-8">
        <div className="-mb-px flex gap-6">
          {TABS.map((t) => (
            <button key={t} onClick={() => setParams({ tab: t })} className={clsx('border-b-2 py-2.5 text-[14px] font-medium capitalize', tab === t ? 'border-primary text-primary' : 'border-transparent text-ink-2 hover:text-ink')}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <PageBody>
        {tab === 'spend' && <SpendTab />}
        {tab === 'usage' && <UsageTab />}
        {tab === 'commitments' && <CommitmentsTab />}
        {tab === 'alerts' && <AlertsTab />}
        {tab === 'setup' && <SetupTab />}
      </PageBody>
    </>
  )
}
