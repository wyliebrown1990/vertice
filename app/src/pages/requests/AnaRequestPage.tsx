/**
 * Chapter A2: Ana negotiates the Gong renewal. Ana plans, emails and counters
 * within guardrails Alex approves; Alex approves the plan and the final offer.
 * Vendor replies are a labelled demo transition. Nothing is sent anywhere.
 */
import clsx from 'clsx'
import { ArrowDownLeft, ArrowUpRight, Check, CheckCircle2, Clock, FileText, Mail, ShieldCheck, Sparkles, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { chainStates } from '../../components/request/chain'
import { Chain, DetailRows, PeopleCard, RequestHeader } from '../../components/request/RequestShell'
import { PageBody } from '../../components/layout/PageHeader'
import { Button, ButtonLink } from '../../components/ui/Button'
import { Card, CardHeader } from '../../components/ui/Card'
import { AgentChip, DemoNote } from '../../components/ui/kit'
import { StatusPill } from '../../components/ui/StatusPill'
import { ANA, ANA_REQUEST_ID, ANA_SCENARIOS, ANA_THREAD, anaDerived } from '../../data/chapters/ana'
import { flowStep, reached } from '../../domain/flows'
import { formatDate, num, pct, usd } from '../../lib/format'
import { useDemo } from '../../store/demo'
import { useUi } from '../../store/ui'

const STEP_ORDER = ['briefing', 'round1', 'round2', 'offer', 'completed'] as const

function ContractPane() {
  const d = anaDerived()
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 text-[12px] font-semibold tracking-wide text-ink-3 uppercase">
        <FileText className="size-3.5" /> Contract · read by Ana
      </div>
      <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3 text-[13.5px] sm:grid-cols-4">
        {[
          ['Annual cost', usd(d.currentAnnualCost)],
          ['Licenses', `${num(ANA.currentSeats)} · ${num(ANA.activeUsers28d)} active`],
          ['Notice deadline', formatDate(ANA.noticeDeadline)],
          ['Renewal quote', `${usd(d.openingQuote)} (+${pct(ANA.quoteUpliftPct)})`],
        ].map(([k, v]) => (
          <div key={k}>
            <div className="text-ink-3">{k}</div>
            <div className="mt-0.5 font-semibold text-ink">{v}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function Plan({ step }: { step: string }) {
  const advance = useDemo((s) => s.advance)
  const toast = useUi((s) => s.toast)
  const planned = step !== 'briefing'
  const checklist = [
    'Read the order form and renewal quote',
    `Benchmarked price: ${usd(ANA.benchmarkBandLow)}–${usd(ANA.benchmarkBandHigh)} per seat (illustrative)`,
    `Usage: ${num(ANA.activeUsers28d)} of ${num(ANA.currentSeats)} seats active in 28 days (${pct(anaDerived().utilizationPct)})`,
    'Built 3 negotiation scenarios',
    'Drafted the opening email',
  ]
  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="bg-ai-orb flex size-8 items-center justify-center rounded-full text-white">
            <Sparkles className="size-4" />
          </span>
          <div>
            <div className="text-[15px] font-semibold text-ink">Negotiation plan</div>
            <div className="text-[12.5px] text-ink-3">Ana · Vertice AI negotiation agent</div>
          </div>
        </div>
        <AgentChip name="Vertice AI - Negotiation" />
      </div>
      <ul className="mt-4 space-y-1.5">
        {checklist.map((c) => (
          <li key={c} className="flex items-center gap-2.5 text-[13.5px] text-ink">
            <span className="flex size-4.5 items-center justify-center rounded-full bg-success text-white">
              <Check className="size-3" strokeWidth={3} />
            </span>
            {c}
          </li>
        ))}
      </ul>
      <div className="mt-5 overflow-hidden rounded-xl border border-line">
        <table className="w-full text-[13px]">
          <thead className="bg-canvas text-left text-[11.5px] tracking-wide text-ink-3 uppercase">
            <tr>
              <th className="px-3 py-2 font-medium">Scenario</th>
              <th className="px-3 py-2 text-right font-medium">Seats</th>
              <th className="px-3 py-2 text-right font-medium">$/seat</th>
              <th className="px-3 py-2 text-right font-medium">Annual</th>
              <th className="px-3 py-2 font-medium">Likelihood</th>
            </tr>
          </thead>
          <tbody>
            {ANA_SCENARIOS.map((sc) => (
              <tr key={sc.id} className={clsx('border-t border-line-soft', 'recommended' in sc && sc.recommended && 'bg-primary-wash')}>
                <td className="px-3 py-2">
                  <span className="font-medium text-ink">{sc.label}</span>
                  {'recommended' in sc && sc.recommended && <StatusPill tone="violet" className="ml-2">Recommended</StatusPill>}
                  <div className="text-[11.5px] text-ink-3">{sc.note}</div>
                </td>
                <td className="px-3 py-2 text-right tabular-nums">{sc.seats}</td>
                <td className="px-3 py-2 text-right tabular-nums">{usd(sc.price)}</td>
                <td className="px-3 py-2 text-right font-medium tabular-nums">{usd(sc.seats * sc.price)}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 rounded-full bg-line-soft">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${sc.likelihood * 100}%` }} />
                    </div>
                    <span className="text-[12px] text-ink-3 tabular-nums">{pct(sc.likelihood)}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 rounded-xl border border-line bg-canvas p-4">
        <div className="flex items-center gap-2 text-[12.5px] font-semibold text-ink-2">
          <ShieldCheck className="size-4 text-primary" /> Guardrails Ana works within
        </div>
        <ul className="mt-2 grid gap-1.5 text-[13px] text-ink-2 sm:grid-cols-3">
          <li>Max price: {usd(ANA.currentPricePerSeat)} / seat (no uplift)</li>
          <li>Seats: 150–180</li>
          <li>Walk-away: give notice {formatDate(ANA.noticeDeadline)}</li>
        </ul>
      </div>
      {!planned ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button
            onClick={() => {
              advance('ana', 'briefing', 'round1')
              toast('Plan approved: Ana sent the opening email (simulated)')
            }}
          >
            <Check className="size-4" /> Approve plan and send opening email
          </Button>
          <span className="text-[12.5px] text-ink-3">Ana negotiates only inside these guardrails. You approve the final offer.</span>
        </div>
      ) : (
        <p className="mt-3 flex items-center gap-1.5 text-[12.5px] text-success-ink">
          <CheckCircle2 className="size-3.5" /> Plan approved by Alex Morgan
        </p>
      )}
    </Card>
  )
}

function Thread({ step }: { step: string }) {
  const advance = useDemo((s) => s.advance)
  const toast = useUi((s) => s.toast)
  const order = ['round1', 'round2', 'offer'] as const
  const visible = ANA_THREAD.filter((m) => order.indexOf(m.visibleFrom) <= order.indexOf(step as (typeof order)[number]) || step === 'completed')
  return (
    <Card>
      <CardHeader title="Negotiation thread" subtitle={`With ${ANA.vendorContact}`} action={<AgentChip name="Email agent" />} />
      <ol className="space-y-3 px-5 pb-5">
        {visible.map((m) => (
          <li key={m.id} className={clsx('rounded-xl border p-3.5', m.from === 'ana' ? 'border-primary/25 bg-primary-wash/50' : 'border-line bg-white')}>
            <div className="flex items-center justify-between gap-2 text-[12px]">
              <span className="flex items-center gap-1.5 font-semibold text-ink">
                <Mail className="size-3.5 text-ink-3" />
                {m.from === 'ana' ? 'Ana (on behalf of Northwind)' : 'Gong'}
              </span>
              <StatusPill tone={m.from === 'ana' ? 'violet' : 'neutral'} icon={m.from === 'ana' ? <ArrowUpRight className="size-3" /> : <ArrowDownLeft className="size-3" />}>
                {m.from === 'ana' ? 'Sent' : 'Received'}
              </StatusPill>
            </div>
            <div className="mt-1 text-[12px] text-ink-3">{m.subject}</div>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink">{m.body}</p>
            {m.id === 'e3' && <p className="mt-1.5 text-[11.5px] text-primary">Counter sent automatically: within the approved guardrails</p>}
          </li>
        ))}
      </ol>
      {(step === 'round1' || step === 'round2') && (
        <div className="px-5 pb-5">
          <div className="mb-3 flex items-center gap-2 text-[12.5px] text-ink-3">
            <Clock className="size-3.5" /> Waiting for Gong to reply
          </div>
          <DemoNote>
            <Button
              size="sm"
              variant="secondary"
              className="border-primary/40 text-primary"
              onClick={() => {
                if (step === 'round1') advance('ana', 'round1', 'round2')
                else advance('ana', 'round2', 'offer')
                toast('Gong replied', 'info')
              }}
            >
              Show vendor reply
            </Button>
          </DemoNote>
        </div>
      )}
    </Card>
  )
}

function Result({ step }: { step: string }) {
  const d = anaDerived()
  const advance = useDemo((s) => s.advance)
  const toast = useUi((s) => s.toast)
  const navigate = useNavigate()
  const done = step === 'completed'
  return (
    <Card className="overflow-hidden">
      <div className="bg-ink px-6 py-5 text-white">
        <div className="flex items-center gap-2 text-[12px] font-semibold tracking-wide text-violet-300 uppercase">
          <Trophy className="size-4" /> Negotiation complete
        </div>
        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            [usd(d.annualReduction), 'saved per year'],
            [pct(d.annualReductionPct), 'vs today'],
            [`${ANA.termMonths / 12}-year`, 'price lock'],
            [`~${ANA.hoursSaved} hours`, 'of team time saved'],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="text-[22px] font-semibold tracking-[-0.02em] tabular-nums">{v}</div>
              <div className="text-[12px] text-white/60">{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 rounded-xl bg-canvas p-4 text-[13.5px] sm:grid-cols-4">
          {[
            ['Seats', num(ANA.targetSeats)],
            ['Price / seat / yr', usd(ANA.negotiatedPricePerSeat)],
            ['Annual cost', usd(d.futureAnnualCost)],
            ['Term', `${ANA.termMonths} months from ${formatDate(ANA.nextTermStart)}`],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="text-ink-3">{k}</div>
              <div className="mt-0.5 font-semibold text-ink">{v}</div>
            </div>
          ))}
        </div>
        <p className="text-[12.5px] text-ink-3">
          {usd(d.scopeReduction)} from 40 fewer seats + {usd(d.unitPriceReduction)} from a lower unit price. The {pct(ANA.quoteUpliftPct)} uplift ({usd(d.avoidedUplift)}) was also avoided and is tracked
          separately.
        </p>
        {done ? (
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill tone="success">Approved · order form countersigned (simulated)</StatusPill>
            <Button onClick={() => navigate('/dashboard', { state: { savingsAdded: d.annualReduction } })}>Back to dashboard</Button>
            <ButtonLink to="/contracts/gong/outcomes" variant="secondary">
              View outcome
            </ButtonLink>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="success"
              onClick={() => {
                advance('ana', 'offer', 'completed')
                toast('Offer approved: Gong renewal secured')
              }}
            >
              <Check className="size-4" /> Approve offer
            </Button>
            <span className="text-[12.5px] text-ink-3">Signed before the {formatDate(ANA.noticeDeadline)} notice deadline.</span>
          </div>
        )}
      </div>
    </Card>
  )
}

export function AnaRequestPage() {
  const step = useDemo((s) => flowStep(s, 'ana'))
  const d = anaDerived()
  const advance = useDemo((s) => s.advance)
  const completed = step === 'completed'

  if (step === 'none')
    return (
      <div className="flex min-h-full items-center justify-center p-10">
        <Card className="max-w-[480px] p-8 text-center">
          <h1 className="text-[18px] font-semibold text-ink">Ana hasn’t started this renewal</h1>
          <p className="mt-2 text-[13.5px] text-ink-3">Hand the Gong renewal to Ana from the contract page, or start it here.</p>
          <div className="mt-5 flex justify-center gap-2">
            <Button onClick={() => advance('ana', 'none', 'briefing')}>
              <Sparkles className="size-4" /> Negotiate with Ana
            </Button>
            <ButtonLink to="/contracts/gong/overview" variant="secondary">
              Open contract
            </ButtonLink>
          </div>
        </Card>
      </div>
    )

  const idx = STEP_ORDER.indexOf(step as (typeof STEP_ORDER)[number])
  const states = chainStates(4, step === 'briefing' ? 0 : step === 'offer' ? 2 : step === 'completed' ? 4 : 1, completed)

  return (
    <>
      <RequestHeader
        id={ANA_REQUEST_ID}
        title="Gong renewal"
        logoId="gong"
        completed={completed}
        meta={
          <>
            <span>SaaS - Contract Renewal · negotiated by Ana</span>
            <span className="text-ink-4">·</span>
            <span>{usd(d.currentAnnualCost)} current annual cost</span>
            <span className="text-ink-4">·</span>
            <span className={completed ? '' : 'font-medium text-danger-ink'}>Notice deadline {formatDate(ANA.noticeDeadline)} (3 days)</span>
          </>
        }
        actions={
          <ButtonLink to="/contracts/gong/overview" variant="secondary">
            View contract
          </ButtonLink>
        }
      />
      <PageBody>
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
          <div className="min-w-0 space-y-5">
            <ContractPane />
            {idx >= 3 && <Result step={step} />}
            {idx >= 1 && <Thread step={step} />}
            <Plan step={step} />
            <Chain
              steps={[
                { label: 'Requirements', owner: 'Alex Morgan', state: 'done' },
                { label: 'Ana negotiation', owner: 'Ana', state: states[1], vertice: true },
                { label: 'Approval', owner: 'Alex Morgan', state: states[2] },
                { label: 'Completed', owner: 'Vertice', state: states[3] },
              ]}
            />
          </div>
          <div className="space-y-5">
            <DetailRows
              rows={[
                ['Vendor', 'Gong'],
                ['Product', ANA.product],
                ['Current', `${num(ANA.currentSeats)} seats · ${usd(d.currentAnnualCost)}`],
                ['Vendor quote', `${usd(d.openingQuote)} (+${pct(ANA.quoteUpliftPct)})`],
                ['Requirement', `Downgrade to ${num(ANA.targetSeats)} seats`],
                ['Term end', formatDate(ANA.termEnd)],
                ['Stage', reached({ flows: { ana: step } }, 'ana', 'offer') ? (completed ? 'Renewal secured' : 'Final offer: approval needed') : 'Ana negotiating'],
              ]}
            />
            <PeopleCard
              people={[
                { id: 'alex-morgan', role: 'Requester' },
                { id: ANA.owner, role: 'Business owner' },
                { name: 'Ana', title: 'Vertice AI negotiation agent', role: 'Negotiator', ai: true },
              ]}
            />
            <Card className="p-4 text-[12.5px] leading-relaxed text-ink-3">
              <div className="mb-1 text-[13px] font-semibold text-ink">Why Ana, not an expert buyer?</div>
              Gong is a mid-size renewal with a deadline in 3 days. Ana runs the long tail in parallel; Vertice’s experts focus on strategic deals like Salesforce.
            </Card>
          </div>
        </div>
      </PageBody>
    </>
  )
}
