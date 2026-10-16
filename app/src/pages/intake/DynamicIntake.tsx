/**
 * Chapter B, step 2: Dynamic Intake. One front door; the form asks only what is
 * relevant, Vertice AI pre-fills from the order form, suggests preferred
 * vendors, shows the benchmark and checks the budget before anything is submitted.
 */
import clsx from 'clsx'
import { CheckCircle2, FileText, Info, Loader2, Sparkles, Upload } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BudgetBar } from '../../components/budget/BudgetBar'
import { PageBody, PageHeader } from '../../components/layout/PageHeader'
import { Button } from '../../components/ui/Button'
import { Card, CardHeader } from '../../components/ui/Card'
import { AgentChip, Logo } from '../../components/ui/kit'
import { StatusPill } from '../../components/ui/StatusPill'
import { budgetImpact } from '../../data/chapters/budgets'
import { I2P, I2P_PREFILL, I2P_REQUEST_ID, i2pDerived } from '../../data/chapters/i2p'
import { vendorName } from '../../data/directory'
import { flowStep } from '../../domain/flows'
import { formatDate, pct, usd } from '../../lib/format'
import { useDemo } from '../../store/demo'
import { useUi } from '../../store/ui'

const SUGGESTIONS = [
  { id: 'teamviewer', tag: 'Preferred vendor', note: 'Security-approved; already used by IT' },
  { id: 'zohoassist', tag: 'Compliance already checked', note: 'Attended support only' },
  { id: 'splashtop', tag: 'Similar use case', note: 'Used by peers for support teams' },
]

export function DynamicIntake() {
  const [params] = useSearchParams()
  const fromSlack = params.get('from') === 'slack'
  const navigate = useNavigate()
  const toast = useUi((s) => s.toast)
  const step = useDemo((s) => flowStep(s, 'i2p'))
  const advance = useDemo((s) => s.advance)
  const [filled, setFilled] = useState(fromSlack ? I2P_PREFILL.length : 0)
  const [started, setStarted] = useState(false)
  const [hasBudget, setHasBudget] = useState<boolean | null>(fromSlack ? true : null)
  const d = i2pDerived()
  const impact = budgetImpact(I2P.department, d.requestedQuote)
  const ready = filled >= I2P_PREFILL.length && hasBudget !== null

  const filling = started && filled < I2P_PREFILL.length

  useEffect(() => {
    if (!filling) return
    const t = window.setInterval(() => setFilled((n) => Math.min(n + 1, I2P_PREFILL.length)), 320)
    return () => window.clearInterval(t)
  }, [filling])

  if (step !== 'none')
    return (
      <div className="flex min-h-full items-center justify-center p-10">
        <Card className="max-w-[480px] p-8 text-center">
          <h1 className="text-[18px] font-semibold text-ink">This request was already submitted</h1>
          <div className="mt-5 flex justify-center">
            <Button onClick={() => navigate(`/intelligent-workflows/requests/${I2P_REQUEST_ID}/overview`)}>View request</Button>
          </div>
        </Card>
      </div>
    )

  const submit = () => {
    advance('i2p', 'none', 'intake')
    // The vendor risk assessment runs automatically on submission.
    advance('i2p', 'intake', 'risk')
    toast('Request submitted: Vertice AI is assessing the vendor')
    navigate(`/intelligent-workflows/requests/${I2P_REQUEST_ID}/overview`)
  }

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Requests', to: '/intelligent-workflows/requests' }, { label: 'New request' }]}
        title="Purchase new software"
        meta={<span>Dynamic Intake · requested by Sam Okafor (Support){fromSlack && ' · started in Slack'}</span>}
      />
      <PageBody>
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
          <div className="min-w-0 space-y-5">
            <Card className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-[15px] font-semibold text-ink">What do you need?</div>
                <AgentChip name="Conversational Intake" />
              </div>
              <p className="mt-2 rounded-lg bg-canvas px-3 py-2.5 text-[13.5px] text-ink-2">{I2P.need}</p>
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-line px-4 py-3">
                <FileText className="size-5 text-ink-3" />
                <span className="flex-1 text-[13.5px] font-medium text-ink">{I2P.orderFormFile}</span>
                {filled >= I2P_PREFILL.length ? (
                  <StatusPill tone="success" icon={<CheckCircle2 className="size-3" />}>
                    {I2P_PREFILL.length} fields filled · Review and edit if needed
                  </StatusPill>
                ) : filling ? (
                  <span className="flex items-center gap-1.5 text-[12.5px] text-primary">
                    <Loader2 className="size-3.5 animate-spin" /> Reading order form…
                  </span>
                ) : (
                  <Button size="sm" onClick={() => setStarted(true)}>
                    <Upload className="size-3.5" /> Upload order form
                  </Button>
                )}
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {I2P_PREFILL.map((f, i) => (
                  <label key={f.field} className="block">
                    <span className="text-[12.5px] text-ink-3">{f.field}</span>
                    <div
                      className={clsx(
                        'mt-1 flex h-9 items-center rounded-lg border px-3 text-[13.5px] transition-colors',
                        i < filled ? 'border-primary/35 bg-primary-wash/40 text-ink' : 'border-line text-ink-4',
                      )}
                    >
                      {i < filled ? f.value : '—'}
                    </div>
                    {i < filled && (
                      <span className="mt-0.5 flex items-center gap-1 text-[11.5px] text-primary">
                        <Sparkles className="size-3" /> {f.source}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </Card>

            {filled >= I2P_PREFILL.length && (
              <Card className="p-5">
                <div className="text-[15px] font-semibold text-ink">Pricing</div>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-line p-3.5">
                    <div className="text-[12.5px] text-ink-3">Quoted</div>
                    <div className="mt-0.5 text-[18px] font-semibold text-ink">{usd(I2P.requestedQuotePerSeat)} / license / yr</div>
                    <div className="text-[12.5px] text-ink-3">{usd(d.requestedQuote)} a year</div>
                  </div>
                  <div className="rounded-xl border border-primary/30 bg-primary-wash/50 p-3.5 sm:col-span-2">
                    <div className="flex items-center gap-1 text-[12.5px] text-primary">
                      <Sparkles className="size-3" /> Benchmark range
                    </div>
                    <div className="mt-0.5 text-[18px] font-semibold text-ink">
                      {usd(I2P.benchmarkBandLow)}–{usd(I2P.benchmarkBandHigh)} / license / yr
                    </div>
                    <div className="text-[12.5px] text-ink-3">Typical price for 50–100 licenses in this category (illustrative). The quote is above the band.</div>
                  </div>
                </div>
              </Card>
            )}

            <Card className="p-5">
              <div className="text-[15px] font-semibold text-ink">Do you have a budget for this?</div>
              <div className="mt-3 flex gap-2">
                {[
                  { v: true, l: 'Yes' },
                  { v: false, l: 'No' },
                ].map((o) => (
                  <button
                    key={o.l}
                    onClick={() => setHasBudget(o.v)}
                    className={clsx('h-9 rounded-lg border px-4 text-[13.5px] font-medium', hasBudget === o.v ? 'border-primary bg-primary-wash text-primary' : 'border-line text-ink-2 hover:bg-canvas')}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
              {hasBudget && (
                <div className="mt-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[13.5px]">
                    <span className="text-ink-2">
                      Support · FY2027 budget <b className="text-ink">{usd(impact.budget.budget)}</b>
                    </span>
                    <StatusPill tone={impact.inBudget ? 'success' : 'danger'}>{impact.inBudget ? 'In budget' : 'Over budget'}</StatusPill>
                  </div>
                  <BudgetBar budget={impact.budget} request={d.requestedQuote} />
                  <p className="text-[12.5px] text-ink-3">
                    This request uses {pct(impact.share)} of the Support budget. Remaining after it: {usd(impact.freeAfter)}.
                  </p>
                </div>
              )}
              {hasBudget === false && <p className="mt-3 text-[13px] text-ink-3">Finance will be asked to approve an unbudgeted purchase.</p>}
            </Card>

            <div className="flex items-center gap-3">
              <Button disabled={!ready} onClick={submit}>
                Submit request
              </Button>
              {!ready && <span className="text-[12.5px] text-ink-3">Upload the order form and answer the budget question to submit.</span>}
            </div>
          </div>

          <div className="space-y-5">
            <Card>
              <CardHeader
                title={
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="size-4 text-primary" /> Do you need any help?
                  </span>
                }
                subtitle="Vertice AI found approved vendors for remote support"
              />
              <ul className="space-y-2 px-4 pb-4">
                {SUGGESTIONS.map((sg) => (
                  <li key={sg.id} className="flex items-center gap-3 rounded-xl border border-line p-3">
                    <Logo id={sg.id} size="sm" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[13.5px] font-medium text-ink">{vendorName(sg.id)}</span>
                        <StatusPill tone={sg.id === 'teamviewer' ? 'violet' : 'neutral'}>{sg.tag}</StatusPill>
                      </div>
                      <div className="mt-0.5 text-[12px] text-ink-3">{sg.note}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="flex items-start gap-1.5 px-5 pb-4 text-[12px] text-ink-3">
                <Info className="mt-px size-3.5 shrink-0" /> Sam continued with LinkDesk, which the team trialled. Every vendor still goes through the risk assessment.
              </p>
            </Card>
            <Card className="p-5 text-[13px]">
              <div className="text-[14px] font-semibold text-ink">Request summary</div>
              <dl className="mt-3 space-y-2">
                {[
                  ['Type', 'SaaS - New Purchase'],
                  ['Licenses', String(I2P.seats)],
                  ['Target start', formatDate(I2P.start)],
                  ['Term', `${I2P.termMonths} months`],
                  ['Workflow', 'Purchase New Software (I2P)'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <dt className="text-ink-3">{k}</dt>
                    <dd className="font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>
        </div>
      </PageBody>
    </>
  )
}
