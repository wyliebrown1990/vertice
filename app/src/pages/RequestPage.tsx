import clsx from 'clsx'
import { ArrowRight, Check, CircleCheckBig, Clock3, FileSignature, Hourglass, ListChecks, Workflow } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PageBody, PageHeader } from '../components/layout/PageHeader'
import { RequirementsModal } from '../components/renewal/RequirementsModal'
import { Avatar, VerticeMark } from '../components/ui/Avatar'
import { Button, ButtonLink } from '../components/ui/Button'
import { Card, CardHeader } from '../components/ui/Card'
import { Tip } from '../components/ui/Overlay'
import { StatusPill } from '../components/ui/StatusPill'
import { VendorLogo } from '../components/ui/VendorLogo'
import { personById } from '../data/people'
import { S1, S1_REQUEST_ID } from '../data/scenario'
import { vendorById } from '../data/vendors'
import { s1Summary, STAGE_LABEL } from '../domain/selectors'
import type { RequestStage } from '../domain/types'
import { formatDate, num, pct, usd } from '../lib/format'
import { contractPath } from '../lib/routes'
import { useDemo } from '../store/demo'
import { useUi } from '../store/ui'
import { OutsideDemo } from './OutsideDemo'

const CHAIN: { id: 'requirements' | 'negotiation' | 'approval' | 'completed'; label: string; owner: string }[] = [
  { id: 'requirements', label: 'Requirements', owner: 'Alex Morgan' },
  { id: 'negotiation', label: 'Negotiation', owner: 'Vertice' },
  { id: 'approval', label: 'Approval', owner: 'Alex Morgan' },
  { id: 'completed', label: 'Completed', owner: 'Vertice' },
]

const ORDER: RequestStage[] = ['requirements', 'negotiation', 'approval', 'contracting', 'completed']

function chainState(step: (typeof CHAIN)[number]['id'], stage: RequestStage): 'done' | 'active' | 'pending' {
  const idx = ORDER.indexOf(stage)
  const stepIdx = step === 'completed' ? 4 : ORDER.indexOf(step)
  if (stage === 'completed') return 'done'
  if (step === 'approval' && stage === 'contracting') return 'done'
  if (step === 'completed' && stage === 'contracting') return 'active'
  if (stepIdx < idx) return 'done'
  if (stepIdx === idx) return 'active'
  return 'pending'
}

function ProgressChain({ stage }: { stage: RequestStage }) {
  return (
    <Card>
      <CardHeader title="Progress overview" />
      <ol className="flex items-center gap-2 px-5 pb-5" aria-label="Request progress">
        {CHAIN.map((c, i) => {
          const st = chainState(c.id, stage)
          const sub =
            c.id === 'completed' && stage === 'contracting'
              ? 'Contracting pending'
              : st === 'done'
                ? 'Completed'
                : st === 'active'
                  ? 'In progress'
                  : 'Not started'
          return (
            <li key={c.id} className={clsx('flex min-w-0 items-center gap-2', i < CHAIN.length - 1 ? 'flex-[1_1_0%]' : 'flex-[0.86_1_0%]')}>
              <div
                className={clsx(
                  'min-w-0 flex-1 rounded-xl border-2 px-3 py-3 text-center',
                  st === 'done' ? 'border-success/60 bg-white' : st === 'active' ? 'border-primary bg-primary-wash' : 'border-line bg-white text-ink-3',
                )}
              >
                <div className="flex justify-center">
                  {st === 'done' ? (
                    <CircleCheckBig className="size-5 text-success" />
                  ) : st === 'active' ? (
                    c.owner === 'Vertice' ? <VerticeMark className="size-5" /> : <Clock3 className="size-5 text-primary" />
                  ) : (
                    <Hourglass className="size-5 text-ink-4" />
                  )}
                </div>
                <div className={clsx('mt-1.5 text-[13.5px] font-semibold', st === 'pending' ? 'text-ink-3' : 'text-ink')}>{c.label}</div>
                <div className="mt-0.5 text-[12px] text-ink-3">{sub}</div>
                <div className="mt-1 text-[11.5px] text-ink-4">{c.owner}</div>
              </div>
              {i < CHAIN.length - 1 && <ArrowRight className={clsx('size-4 shrink-0', st === 'done' ? 'text-success' : 'text-ink-4')} />}
            </li>
          )
        })}
      </ol>
    </Card>
  )
}

function DemoTransition({ label, onClick, hint }: { label: string; onClick: () => void; hint: string }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-primary/40 bg-primary-wash/60 px-4 py-3">
      <Tip content={hint}>
        <Button size="sm" variant="secondary" onClick={onClick} className="border-primary/40 text-primary">
          <FileSignature className="size-3.5" /> {label}
        </Button>
      </Tip>
      <span className="text-[12px] text-ink-3">Demo transition: compresses time that would normally pass. Nothing is sent to a vendor.</span>
    </div>
  )
}

function ActiveTask({ stage, onOpenRequirements }: { stage: RequestStage; onOpenRequirements: () => void }) {
  const d = s1Summary()
  const revealFinalOffer = useDemo((s) => s.revealFinalOffer)
  const approveOffer = useDemo((s) => s.approveOffer)
  const completeRenewal = useDemo((s) => s.completeRenewal)
  const toast = useUi((s) => s.toast)
  const navigate = useNavigate()
  const buyer = personById(S1.buyer)

  if (stage === 'requirements')
    return (
      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary-tint text-primary">
              <ListChecks className="size-5" />
            </span>
            <div>
              <div className="text-[15px] font-semibold text-ink">Requirements gathering</div>
              <div className="text-[13px] text-ink-3">Assigned to you · confirm seats and scope with the business owner</div>
            </div>
          </div>
          <Button onClick={onOpenRequirements}>Open task</Button>
        </div>
      </Card>
    )

  if (stage === 'negotiation')
    return (
      <Card className="p-5">
        <div className="flex items-start gap-3">
          <VerticeMark className="mt-0.5 size-8" />
          <div className="flex-1">
            <div className="text-[15px] font-semibold text-ink">Vertice-led negotiation</div>
            <div className="text-[13px] text-ink-3">Our team is actively working on this request.</div>
          </div>
          <div className="flex items-center gap-2">
            <VerticeMark className="size-5" />
            <div className="text-right leading-tight">
              <div className="text-[13px] font-medium text-ink">{buyer.name}</div>
              <div className="text-[12px] text-ink-3">{buyer.title}</div>
            </div>
          </div>
        </div>
        <ol className="mt-4 grid gap-2 sm:grid-cols-2">
          {[
            { t: 'Validate requirements (400 seats, 12 months)', done: true },
            { t: 'Benchmark terms and pricing', done: true },
            { t: 'Negotiate with Salesforce, reject the 12% uplift', done: false, active: true },
            { t: 'Return the final offer for your approval', done: false },
          ].map((s) => (
            <li key={s.t} className={clsx('flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-[13px]', s.active ? 'border-primary/40 bg-primary-wash' : 'border-line')}>
              {s.done ? (
                <span className="flex size-4.5 items-center justify-center rounded-full bg-success text-white">
                  <Check className="size-3" strokeWidth={3} />
                </span>
              ) : (
                <span className={clsx('size-4.5 rounded-full border-2', s.active ? 'border-primary border-t-transparent' : 'border-ink-4')} />
              )}
              <span className={s.done || s.active ? 'text-ink' : 'text-ink-3'}>{s.t}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[12.5px] text-ink-3">Expert-led work supported by Vertice AI. You approve the outcome; nothing is committed without you.</p>
        <DemoTransition
          label="Show final offer"
          hint="In reality negotiation takes days to weeks. Presenter shortcut: Shift+N."
          onClick={() => {
            revealFinalOffer()
            toast('Final offer received from Salesforce', 'info')
          }}
        />
      </Card>
    )

  const offerRows = (
    <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 rounded-xl bg-canvas p-4 text-[13.5px] sm:grid-cols-4">
      <div>
        <div className="text-ink-3">Seats</div>
        <div className="mt-0.5 font-semibold text-ink">{num(S1.targetSeats)}</div>
      </div>
      <div>
        <div className="text-ink-3">Price / seat / yr</div>
        <div className="mt-0.5 font-semibold text-ink">{usd(S1.negotiatedPricePerSeat)}</div>
      </div>
      <div>
        <div className="text-ink-3">Annual cost · TCV</div>
        <div className="mt-0.5 font-semibold text-ink">{usd(d.futureAnnualCost)}</div>
      </div>
      <div>
        <div className="text-ink-3">Term</div>
        <div className="mt-0.5 font-semibold text-ink">12 months from {formatDate(S1.nextTermStart)}</div>
      </div>
    </div>
  )

  const savingsRows = (
    <div className="mt-4 grid gap-3 sm:grid-cols-3">
      <div className="rounded-xl border border-success/40 bg-success-tint/40 p-3.5">
        <div className="text-[12.5px] text-success-ink">Annual reduction vs today</div>
        <div className="mt-0.5 text-[20px] font-semibold text-ink tabular-nums">{usd(d.annualReduction)}</div>
        <div className="text-[12.5px] text-ink-3">
          {usd(S1.currentAnnualCost)} → {usd(d.futureAnnualCost)} ({pct(d.annualReductionPct)})
        </div>
      </div>
      <div className="rounded-xl border border-line p-3.5">
        <div className="text-[12.5px] text-ink-3">Scope reduction</div>
        <div className="mt-0.5 text-[17px] font-semibold text-ink tabular-nums">{usd(d.scopeReduction)}</div>
        <div className="text-[12.5px] text-ink-3">100 seats × {usd(d.currentPricePerSeat)}</div>
      </div>
      <div className="rounded-xl border border-line p-3.5">
        <div className="text-[12.5px] text-ink-3">Unit-price reduction</div>
        <div className="mt-0.5 text-[17px] font-semibold text-ink tabular-nums">{usd(d.unitPriceReduction)}</div>
        <div className="text-[12.5px] text-ink-3">400 seats × {usd(d.currentPricePerSeat - S1.negotiatedPricePerSeat)}</div>
      </div>
    </div>
  )

  if (stage === 'approval')
    return (
      <Card className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <StatusPill tone="warning">Approval needed</StatusPill>
            <div className="mt-2 text-[16px] font-semibold text-ink">Final offer: Salesforce Sales Cloud + Einstein</div>
            <div className="text-[13px] text-ink-3">Negotiated by {buyer.name} (Vertice) · within the illustrative benchmark band</div>
          </div>
          <Link to={contractPath('salesforce', 'benchmark')} className="text-[13px] font-medium text-primary hover:underline">
            Compare to benchmark
          </Link>
        </div>
        {offerRows}
        {savingsRows}
        <p className="mt-3 text-[12.5px] text-ink-3">
          Against the vendor’s opening quote ({usd(d.openingQuote)}), a further {usd(d.avoidedUplift)} uplift was avoided. That’s tracked separately, not added to savings.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button
            variant="success"
            onClick={() => {
              approveOffer()
              toast('Offer approved: contracting has started')
            }}
          >
            <Check className="size-4" /> Approve offer
          </Button>
          <Tip content="Counter-proposals are outside this demo.">
            <span>
              <Button variant="secondary" disabled>
                Request changes
              </Button>
            </span>
          </Tip>
        </div>
      </Card>
    )

  if (stage === 'contracting')
    return (
      <Card className="p-5">
        <StatusPill tone="info">Approved · contracting pending</StatusPill>
        <div className="mt-2 text-[16px] font-semibold text-ink">Offer approved by Alex Morgan</div>
        <div className="text-[13px] text-ink-3">Vertice is preparing the order form for signature. Not yet a signed contract.</div>
        {offerRows}
        <DemoTransition
          label="Show signed outcome"
          hint="Simulates completed contracting and signature. No e-signature service is involved."
          onClick={() => {
            completeRenewal()
            toast('Renewal signed: savings recorded')
            navigate(contractPath('salesforce', 'outcomes'))
          }}
        />
      </Card>
    )

  return (
    <Card className="p-5">
      <StatusPill tone="success">Completed</StatusPill>
      <div className="mt-2 text-[16px] font-semibold text-ink">Renewal secured: {usd(d.annualReduction)} annual reduction</div>
      <div className="text-[13px] text-ink-3">
        Signed (simulated). The new term starts {formatDate(S1.nextTermStart)}; the current term stays live until then.
      </div>
      <div className="mt-4 flex gap-2">
        <ButtonLink to={contractPath('salesforce', 'outcomes')}>View outcome</ButtonLink>
        <ButtonLink to="/dashboard" variant="secondary">
          Back to dashboard
        </ButtonLink>
      </div>
    </Card>
  )
}

function Row({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="flex justify-between gap-4 py-2 text-[13.5px]">
      <span className="text-ink-3">{k}</span>
      <span className="text-right font-medium text-ink">{v}</span>
    </div>
  )
}

export function RequestPage() {
  const { id } = useParams()
  const request = useDemo((s) => s.request)
  const startRenewal = useDemo((s) => s.startRenewal)
  const [reqOpen, setReqOpen] = useState(false)
  const d = s1Summary()
  const sf = vendorById(S1.vendorId)!

  if (id !== S1_REQUEST_ID) return <OutsideDemo missing />

  if (!request)
    return (
      <div className="flex min-h-full items-center justify-center p-10">
        <Card className="max-w-[480px] p-8 text-center">
          <h1 className="text-[18px] font-semibold text-ink">This renewal hasn’t been started</h1>
          <p className="mt-2 text-[13.5px] text-ink-3">Start the Salesforce renewal to capture requirements and hand negotiation to Vertice.</p>
          <div className="mt-5 flex justify-center gap-2">
            <Button onClick={startRenewal}>Start renewal</Button>
            <ButtonLink to={contractPath('salesforce')} variant="secondary">
              Open contract
            </ButtonLink>
          </div>
        </Card>
      </div>
    )

  const stage = request.stage
  const alex = personById('alex-morgan')
  const owner = personById(S1.owner)
  const buyer = personById(S1.buyer)

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Requests', to: '/intelligent-workflows/requests' }, { label: 'Salesforce renewal' }]}
        icon={
          <span className="flex size-12 items-center justify-center rounded-xl border border-line bg-white text-secondary">
            <Workflow className="size-6" />
          </span>
        }
        title={
          <span className="flex items-center gap-2.5">
            Salesforce renewal
            <StatusPill tone={stage === 'completed' ? 'success' : 'info'}>{stage === 'completed' ? 'Completed' : 'In progress'}</StatusPill>
          </span>
        }
        meta={
          <>
            <span>SaaS · Contract renewal</span>
            <span className="text-ink-4">·</span>
            <span>{usd(S1.currentAnnualCost)} current annual cost</span>
            <span className="text-ink-4">·</span>
            <span className={stage === 'completed' ? '' : 'font-medium text-warning-ink'}>
              Notice deadline {formatDate(S1.noticeDeadline)} ({d.noticeDays} days)
            </span>
          </>
        }
        actions={
          <ButtonLink to={contractPath('salesforce')} variant="secondary">
            <VendorLogo vendor={sf} size="xs" /> View contract
          </ButtonLink>
        }
      />
      <PageBody>
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
          <div className="min-w-0 space-y-5">
            <div>
              <h2 className="mb-2.5 text-[14px] font-semibold text-ink">Active task</h2>
              <ActiveTask stage={stage} onOpenRequirements={() => setReqOpen(true)} />
            </div>
            <ProgressChain stage={stage} />
          </div>
          <div className="space-y-5">
            <Card>
              <CardHeader title="Request details" />
              <div className="divide-y divide-line-soft px-5 pb-3">
                <Row k="Vendor" v="Salesforce" />
                <Row k="Product" v={S1.product} />
                <Row k="Current" v={`${num(S1.currentSeats)} seats · ${usd(S1.currentAnnualCost)}`} />
                <Row k="Vendor quote" v={`${usd(d.openingQuote)} (+${pct(S1.quoteUpliftPct)})`} />
                <Row k="Requirement" v={request.requirements ? `${request.requirements.renewalType} to ${num(request.requirements.seats)} seats` : 'Not yet submitted'} />
                <Row k="Term end" v={formatDate(S1.termEnd)} />
                <Row k="Stage" v={STAGE_LABEL[stage]} />
              </div>
            </Card>
            <Card>
              <CardHeader title="People" />
              <ul className="space-y-3 px-5 pb-5">
                {[
                  { p: alex, role: 'Requester' },
                  { p: owner, role: 'Business owner' },
                  { p: buyer, role: 'Negotiator' },
                ].map(({ p, role }) => (
                  <li key={p.id} className="flex items-center gap-3">
                    {p.org === 'Vertice' ? <VerticeMark className="size-6" /> : <Avatar name={p.name} tone={p.id === 'alex-morgan' ? 'violet' : 'neutral'} />}
                    <div className="min-w-0 flex-1">
                      <div className="text-[13.5px] font-medium text-ink">{p.name}</div>
                      <div className="text-[12px] text-ink-3">{p.title}</div>
                    </div>
                    <span className="text-[12px] text-ink-3">{role}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </PageBody>
      {reqOpen && <RequirementsModal open={reqOpen} onOpenChange={setReqOpen} />}
    </>
  )
}
