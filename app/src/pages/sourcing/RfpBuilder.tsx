/**
 * Chapter C: RFP Builder (Sourcing). Seven steps as on vertice.one: suggested
 * vendors → requirements & weighting → AI-drafted questions → progress →
 * comparison → recommendation → onboard the winner. All bidders are fictional.
 */
import clsx from 'clsx'
import { ArrowRight, Check, CheckCircle2, Clock, Send, Sparkles, Star } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageBody, PageHeader } from '../../components/layout/PageHeader'
import { Button, ButtonLink } from '../../components/ui/Button'
import { Card, CardHeader } from '../../components/ui/Card'
import { AgentChip, DemoNote, Logo, Stepper, Table, Td, THead, Tr } from '../../components/ui/kit'
import { StatusPill } from '../../components/ui/StatusPill'
import { BIDDERS, RFP, RFP_INTEGRATIONS, RFP_QUESTIONS, RFP_REQUEST_ID, RFP_WEIGHTS, rfpDerived, weightedScore } from '../../data/chapters/rfp'
import { vendorName } from '../../data/directory'
import { flowStep } from '../../domain/flows'
import { formatDate, pct, usd } from '../../lib/format'
import { useDemo } from '../../store/demo'
import { useUi } from '../../store/ui'

const STEPS = ['Suggested vendors', 'Requirements', 'Questions', 'RFP progress', 'Comparison', 'Recommendation', 'Onboard vendor']

function SuggestedVendors({ picked, toggle }: { picked: Set<string>; toggle: (id: string) => void }) {
  return (
    <Card>
      <CardHeader title="Suggested vendors" subtitle="Based on Legal’s requirements, peer adoption and Vertice pricing data" action={<AgentChip name="Vertice AI - Sourcing Vendor Suggestion" />} />
      <div className="grid gap-3 px-5 pb-5 sm:grid-cols-2">
        {BIDDERS.map((b) => (
          <button
            key={b.vendorId}
            onClick={() => toggle(b.vendorId)}
            className={clsx('flex items-start gap-3 rounded-xl border p-4 text-left', picked.has(b.vendorId) ? 'border-primary bg-primary-wash/60' : 'border-line hover:border-primary/40')}
          >
            <Logo id={b.vendorId} size="md" />
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between gap-2">
                <span className="text-[14px] font-semibold text-ink">{vendorName(b.vendorId)}</span>
                <span className={clsx('flex size-5 items-center justify-center rounded border', picked.has(b.vendorId) ? 'border-primary bg-primary text-white' : 'border-line')}>
                  {picked.has(b.vendorId) && <Check className="size-3.5" strokeWidth={3} />}
                </span>
              </span>
              {b.badge && <StatusPill tone="violet" className="mt-1.5">{b.badge}</StatusPill>}
              <span className="mt-1.5 block text-[12.5px] text-ink-3">List price ~{usd(b.listPrice)} / yr for 25 seats</span>
            </span>
          </button>
        ))}
      </div>
    </Card>
  )
}

function Requirements({ weights, setWeights }: { weights: Record<string, number>; setWeights: (w: Record<string, number>) => void }) {
  const [must, setMust] = useState<Set<string>>(new Set(RFP_INTEGRATIONS.filter((i) => i.mustHave).map((i) => i.id)))
  return (
    <Card>
      <CardHeader title="Requirements" subtitle="Must-have integrations and how responses are scored" />
      <div className="space-y-5 px-5 pb-5">
        <div>
          <div className="mb-2 text-[13px] font-medium text-ink-2">Must-have integrations</div>
          <div className="flex flex-wrap gap-2">
            {RFP_INTEGRATIONS.map((i) => (
              <button
                key={i.id}
                onClick={() => setMust((m) => (m.has(i.id) ? new Set([...m].filter((x) => x !== i.id)) : new Set([...m, i.id])))}
                className={clsx('rounded-full border px-3 py-1.5 text-[13px] font-medium', must.has(i.id) ? 'border-primary bg-primary-tint text-primary' : 'border-line text-ink-2')}
              >
                {must.has(i.id) && '✓ '}
                {i.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-2 text-[13px] font-medium text-ink-2">Evaluation weighting</div>
          <div className="space-y-3">
            {RFP_WEIGHTS.map((w) => (
              <label key={w.id} className="grid grid-cols-[180px_1fr_44px] items-center gap-3 text-[13px]">
                <span className="text-ink">{w.label}</span>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={5}
                  value={weights[w.id]}
                  onChange={(e) => setWeights({ ...weights, [w.id]: Number(e.target.value) })}
                  className="accent-[var(--color-primary)]"
                />
                <span className="text-right font-medium text-ink tabular-nums">{weights[w.id]}%</span>
              </label>
            ))}
          </div>
          <p className="mt-2 text-[12px] text-ink-3">Scoring uses Legal’s agreed weights (30 / 30 / 25 / 15). Adjusting the sliders is illustrative.</p>
        </div>
      </div>
    </Card>
  )
}

function Questions({ onSend }: { onSend: () => void }) {
  return (
    <Card>
      <CardHeader title="Vertice drafted 12 questions" subtitle="From Legal’s requirements and Northwind’s security policy" action={<AgentChip name="Vertice AI - Sourcing Questionnaire Generation" />} />
      <ol className="space-y-1.5 px-5 pb-4">
        {RFP_QUESTIONS.map((q, i) => (
          <li key={q} className="flex gap-2.5 rounded-lg bg-canvas px-3 py-2 text-[13px] text-ink-2">
            <span className="w-5 shrink-0 text-right text-ink-4 tabular-nums">{i + 1}.</span>
            {q}
          </li>
        ))}
      </ol>
      <div className="flex items-center gap-3 border-t border-line px-5 py-3.5">
        <Button onClick={onSend}>
          <Send className="size-4" /> Approve &amp; Send
        </Button>
        <span className="text-[12.5px] text-ink-3">Sent through the Vendor Portal · responses due {formatDate(RFP.responseDeadline)}</span>
      </div>
    </Card>
  )
}

function Progress({ allIn }: { allIn: boolean }) {
  const advance = useDemo((s) => s.advance)
  const toast = useUi((s) => s.toast)
  return (
    <Card>
      <CardHeader title="RFP progress" subtitle={`Responses due ${formatDate(RFP.responseDeadline)}`} />
      <Table>
        <THead cols={['Vendor', 'Status', 'Last activity']} />
        <tbody>
          {BIDDERS.map((b, i) => {
            const received = allIn ? b.response === 'received' : i < 2
            return (
              <Tr key={b.vendorId}>
                <Td>
                  <span className="flex items-center gap-2.5 font-medium text-ink">
                    <Logo id={b.vendorId} size="xs" /> {vendorName(b.vendorId)}
                  </span>
                </Td>
                <Td>
                  {received ? (
                    <StatusPill tone="success" icon={<CheckCircle2 className="size-3" />}>
                      Response Received
                    </StatusPill>
                  ) : (
                    <StatusPill tone="warning" icon={<Clock className="size-3" />}>
                      Pending — Reminder Sent
                    </StatusPill>
                  )}
                </Td>
                <Td className="text-ink-3">{received ? '12 of 12 questions answered' : 'Reminder sent by Vertice'}</Td>
              </Tr>
            )
          })}
        </tbody>
      </Table>
      {!allIn && (
        <div className="p-5">
          <DemoNote>
            <Button
              size="sm"
              variant="secondary"
              className="border-primary/40 text-primary"
              onClick={() => {
                advance('rfp', 'sent', 'responses')
                toast('3 of 4 responses received; Vertice AI scored them', 'info')
              }}
            >
              Show responses
            </Button>
          </DemoNote>
        </div>
      )}
    </Card>
  )
}

function Comparison() {
  const ranked = [...BIDDERS].sort((a, b) => weightedScore(b) - weightedScore(a))
  return (
    <Card>
      <CardHeader title="Comparison" subtitle="Scored against your weightings (0–10)" action={<AgentChip name="Vertice AI - Sourcing Response Evaluation" />} />
      <Table>
        <THead cols={['Vendor', ...RFP_WEIGHTS.map((w) => ({ label: `${w.label.split(' ')[0].slice(0, 5)} ${w.weight}%`, right: true })), { label: 'Price', right: true }, { label: 'Score', right: true }]} />
        <tbody>
          {ranked.map((b, i) => (
            <Tr key={b.vendorId} className={i === 0 ? 'bg-primary-wash/60' : ''}>
              <Td className="min-w-[260px]">
                <span className="flex items-center gap-2.5">
                  <Logo id={b.vendorId} size="xs" />
                  <span className="min-w-0">
                    <span className="block font-medium text-ink">{vendorName(b.vendorId)}</span>
                    <span className="line-clamp-2 block text-[11.5px] text-ink-3">{b.highlights}</span>
                  </span>
                </span>
              </Td>
              {RFP_WEIGHTS.map((w) => (
                <Td key={w.id} right>
                  {b.scores[w.id]}
                </Td>
              ))}
              <Td right>{usd(b.price)}</Td>
              <Td right>
                <span className={clsx('font-semibold', i === 0 ? 'text-primary' : 'text-ink')}>{weightedScore(b).toFixed(1)}</span>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <p className="px-5 py-3 text-[12px] text-ink-3">Draftly’s response is incomplete (SOC 2 Type I only); scored on what was received.</p>
    </Card>
  )
}

function Recommendation({ awarded }: { awarded: boolean }) {
  const advance = useDemo((s) => s.advance)
  const toast = useUi((s) => s.toast)
  const d = rfpDerived()
  return (
    <Card className="overflow-hidden border-primary/40">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-primary-wash/70 px-5 py-3">
        <span className="text-[14px] font-semibold text-ink">Vertice Recommendation</span>
        <StatusPill tone="violet" icon={<Star className="size-3" />}>
          {weightedScore(d.winner).toFixed(1)}/10
        </StatusPill>
      </div>
      <div className="flex items-start gap-4 p-5">
        <Logo id="lexora" size="lg" />
        <div className="min-w-0 flex-1">
          <div className="text-[17px] font-semibold text-ink">Lexora</div>
          <div className="text-[13px] text-ink-3">Highest score against your weightings</div>
          <ul className="mt-3 space-y-1 text-[13px] text-ink-2">
            <li>✓ Strongest security response: SOC 2 Type II, EU residency, no training on customer data</li>
            <li>✓ Native DocuSign and Google Drive integrations (both must-haves)</li>
            <li>
              ✓ {usd(d.winner.price)} / yr: {pct(d.costAvoidance / d.winner.listPrice)} below list, {usd(d.underBudget)} under Legal’s budget
            </li>
          </ul>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {awarded ? (
              <StatusPill tone="success">Selected by Leah Brooks</StatusPill>
            ) : (
              <Button
                onClick={() => {
                  advance('rfp', 'responses', 'awarded')
                  toast('Leah Brooks selected Lexora')
                }}
              >
                Select Lexora as Leah (simulated)
              </Button>
            )}
            <span className="text-[12.5px] text-ink-3">Final decision stays with the requester.</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

function Onboard() {
  const advance = useDemo((s) => s.advance)
  const toast = useUi((s) => s.toast)
  const navigate = useNavigate()
  return (
    <Card className="p-5">
      <div className="text-[15px] font-semibold text-ink">Onboard Lexora</div>
      <p className="mt-1 text-[13.5px] text-ink-2">
        Vertice sends the Vendor Onboarding tasks through the Vendor Portal: banking details, W-9, security evidence and DPA. Lexora fills them in once; the vendor record and NetSuite update
        automatically.
      </p>
      <Button
        className="mt-4"
        onClick={() => {
          advance('rfp', 'awarded', 'onboarding')
          toast('Onboarding tasks sent to Lexora via the Vendor Portal')
          navigate('/vendors/lexora?tab=portal')
        }}
      >
        Onboard Lexora <ArrowRight className="size-4" />
      </Button>
    </Card>
  )
}

export function RfpBuilder() {
  const step = useDemo((s) => flowStep(s, 'rfp'))
  const advance = useDemo((s) => s.advance)
  const toast = useUi((s) => s.toast)
  const [local, setLocal] = useState(0)
  const [picked, setPicked] = useState<Set<string>>(new Set(BIDDERS.map((b) => b.vendorId)))
  const [weights, setWeights] = useState<Record<string, number>>(Object.fromEntries(RFP_WEIGHTS.map((w) => [w.id, w.weight])))

  if (step === 'none')
    return (
      <div className="flex min-h-full items-center justify-center p-10">
        <Card className="max-w-[520px] p-8 text-center">
          <h1 className="text-[18px] font-semibold text-ink">Select a vendor (request for proposal)</h1>
          <p className="mt-2 text-[13.5px] text-ink-3">Legal needs a contract review AI tool. Run a competitive RFP with Vertice’s RFP Builder.</p>
          <div className="mt-5 flex justify-center gap-2">
            <Button onClick={() => advance('rfp', 'none', 'builder')}>Start RFP</Button>
            <ButtonLink to="/expert-engage" variant="secondary">
              Have Vertice run it
            </ButtonLink>
          </div>
        </Card>
      </div>
    )

  const current = step === 'builder' ? local : step === 'sent' ? 3 : step === 'responses' ? 5 : step === 'awarded' ? 6 : 7
  const done = step === 'onboarding' || step === 'completed'

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Requests', to: '/intelligent-workflows/requests' }, { label: 'RFP Builder' }]}
        title={`${RFP.title} [RFP]`}
        meta={
          <>
            <span>Request for Proposal · requested by Leah Brooks (Legal)</span>
            <span className="text-ink-4">·</span>
            <span>Budget {usd(RFP.budget)}</span>
          </>
        }
        actions={
          done ? (
            <ButtonLink to={`/intelligent-workflows/requests/${RFP_REQUEST_ID}/overview`} variant="secondary">
              View request
            </ButtonLink>
          ) : undefined
        }
      />
      <PageBody>
        <div className="grid gap-5 xl:grid-cols-[220px_1fr_300px]">
          <Card className="h-fit p-3">
            <div className="px-2.5 pb-2 text-[12px] font-semibold text-ink-3">Step {Math.min(current + 1, 7)} of 7</div>
            <Stepper steps={STEPS} current={current} onSelect={step === 'builder' ? (i) => setLocal(i) : undefined} />
          </Card>
          <div className="min-w-0 space-y-5">
            {step === 'builder' && local === 0 && <SuggestedVendors picked={picked} toggle={(id) => setPicked((p) => (p.has(id) ? new Set([...p].filter((x) => x !== id)) : new Set([...p, id])))} />}
            {step === 'builder' && local === 1 && <Requirements weights={weights} setWeights={setWeights} />}
            {step === 'builder' && local === 2 && (
              <Questions
                onSend={() => {
                  advance('rfp', 'builder', 'sent')
                  toast(`RFP sent to ${picked.size} vendors`)
                }}
              />
            )}
            {step === 'builder' && local < 2 && (
              <div className="flex justify-end">
                <Button onClick={() => setLocal(local + 1)} disabled={local === 0 && picked.size < 2}>
                  Next <ArrowRight className="size-4" />
                </Button>
              </div>
            )}
            {step === 'sent' && <Progress allIn={false} />}
            {(step === 'responses' || step === 'awarded') && (
              <>
                <Recommendation awarded={step === 'awarded'} />
                <Comparison />
              </>
            )}
            {step === 'awarded' && <Onboard />}
            {done && (
              <Card className="p-6 text-center">
                <CheckCircle2 className="mx-auto size-8 text-success" />
                <div className="mt-2 text-[16px] font-semibold text-ink">RFP complete: Lexora selected</div>
                <p className="mt-1 text-[13px] text-ink-3">{step === 'completed' ? 'Lexora is onboarded and active.' : 'Onboarding tasks are with Lexora in the Vendor Portal.'}</p>
                <div className="mt-4 flex justify-center gap-2">
                  <ButtonLink to="/vendors/lexora?tab=portal">Open vendor record</ButtonLink>
                </div>
              </Card>
            )}
          </div>
          <div className="space-y-5">
            <Card className="p-5 text-[13px]">
              <div className="text-[14px] font-semibold text-ink">Brief</div>
              <p className="mt-2 text-ink-2">{RFP.need}</p>
              <dl className="mt-3 space-y-1.5">
                {[
                  ['Seats', String(RFP.seats)],
                  ['Budget', usd(RFP.budget)],
                  ['Department', 'Legal'],
                  ['Workflow', 'Request for Proposal [RFP]'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <dt className="text-ink-3">{k}</dt>
                    <dd className="font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-1.5 text-[14px] font-semibold text-ink">
                <Sparkles className="size-4 text-primary" /> Prefer Vertice to run it?
              </div>
              <p className="mt-1 text-[12.5px] text-ink-3">Vertice’s experts can run the whole RFP: vendor outreach, scoring and a recommendation.</p>
              <Link to="/expert-engage" className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-primary hover:underline">
                Book RFP service <ArrowRight className="size-3.5" />
              </Link>
            </Card>
          </div>
        </div>
      </PageBody>
    </>
  )
}
