/**
 * Chapter B: the new-purchase request after intake. Vendor risk → parallel
 * Security / AI Compliance / AI Legal reviews → commercial approval with budget
 * impact → signature → contract + purchase order. Approvals by other personas are
 * clearly labelled simulations (in reality they happen in Slack or Teams).
 */
import clsx from 'clsx'
import { ArrowRight, Check, CheckCircle2, FileSignature, PartyPopper, ShieldAlert, Sparkles, TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BudgetBar } from '../../components/budget/BudgetBar'
import { RiskGauge } from '../../components/charts/charts'
import { PageBody } from '../../components/layout/PageHeader'
import { Chain, DetailRows, PeopleCard, RequestHeader } from '../../components/request/RequestShell'
import { chainStates } from '../../components/request/chain'
import { VerticeMark } from '../../components/ui/Avatar'
import { Button, ButtonLink } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { AgentChip, DemoNote, Logo } from '../../components/ui/kit'
import { Modal, Tip } from '../../components/ui/Overlay'
import { StatusPill } from '../../components/ui/StatusPill'
import { WorkflowCanvas, type NodeState } from '../../components/workflow/WorkflowCanvas'
import { budgetImpact } from '../../data/chapters/budgets'
import { I2P, I2P_AI_CHECKS, I2P_PO_ID, I2P_REQUEST_ID, i2pDerived } from '../../data/chapters/i2p'
import { RISK_TONE, riskProfile, vendorName } from '../../data/directory'
import { I2P_WORKFLOW } from '../../data/workflows'
import { flowStep, reached } from '../../domain/flows'
import type { DemoState } from '../../domain/types'
import { formatDate, pct, usd } from '../../lib/format'
import { useDemo, useScenario } from '../../store/demo'
import { useUi } from '../../store/ui'

const ALTERNATIVES = ['teamviewer', 'splashtop', 'zohoassist']
const ALT_PRICE: Record<string, number> = { teamviewer: 900, splashtop: 920, zohoassist: 780 }

function RiskTask() {
  const advance = useDemo((s) => s.advance)
  const toast = useUi((s) => s.toast)
  const r = riskProfile(I2P.requestedVendorId)
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-danger/20 bg-danger-tint/50 px-5 py-3">
        <span className="flex items-center gap-2 text-[14px] font-semibold text-danger-ink">
          <ShieldAlert className="size-4.5" /> LinkDesk Remote flagged for high security and privacy risk
        </span>
        <AgentChip name="Vertice AI - TPRM" />
      </div>
      <div className="grid gap-5 p-5 md:grid-cols-[220px_1fr]">
        <div className="flex flex-col items-center gap-2">
          <RiskGauge level={r.overall} />
          <span className="text-[12px] text-ink-3">Overall risk assessment</span>
        </div>
        <div className="space-y-2.5">
          <p className="text-[13.5px] leading-relaxed text-ink-2">{r.narrative}</p>
          <ul className="space-y-1.5">
            {r.categories.map((c) => (
              <li key={c.name} className="flex items-start justify-between gap-3 rounded-lg bg-canvas px-3 py-2 text-[13px]">
                <span>
                  <span className="font-medium text-ink">{c.name}</span>
                  <span className="block text-[12px] text-ink-3">{c.note}</span>
                </span>
                <StatusPill tone={RISK_TONE[c.level]}>{c.level}</StatusPill>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-5 py-4">
        <div className="mb-2.5 text-[14px] font-semibold text-ink">Recommended alternative vendors</div>
        <div className="grid gap-2.5 md:grid-cols-3">
          {ALTERNATIVES.map((id) => (
            <div key={id} className={clsx('rounded-xl border p-3.5', id === I2P.chosenVendorId ? 'border-primary/40 bg-primary-wash/50' : 'border-line')}>
              <div className="flex items-center gap-2.5">
                <Logo id={id} size="sm" />
                <span className="text-[14px] font-medium text-ink">{vendorName(id)}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <StatusPill tone="success">{riskProfile(id).overall} risk</StatusPill>
                {id === 'teamviewer' && <StatusPill tone="violet">Preferred vendor</StatusPill>}
              </div>
              <div className="mt-2 text-[12.5px] text-ink-3">
                Quote {usd(ALT_PRICE[id])} / license · {id === 'zohoassist' ? 'attended support only' : 'attended + unattended'}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button
            onClick={() => {
              advance('i2p', 'risk', 'reviews')
              toast('Switched to TeamViewer: Sam notified in Slack')
            }}
          >
            Switch to TeamViewer <ArrowRight className="size-4" />
          </Button>
          <Tip content="Policy: High-risk vendors need a CISO exception. Outside this demo.">
            <span>
              <Button variant="secondary" disabled>
                Request exception
              </Button>
            </span>
          </Tip>
        </div>
      </div>
    </Card>
  )
}

function SlackApproval({ open, onOpenChange, onApprove }: { open: boolean; onOpenChange: (o: boolean) => void; onApprove: () => void }) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Slack · #it-security (simulated)" description="Dana approves from Slack without opening Vertice" width="max-w-[520px]">
      <div className="space-y-3 text-[14px] text-[#1d1c1d]">
        <div className="flex gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg ring-1 ring-black/10">
            <VerticeMark className="size-6" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <b>Vertice</b>
              <span className="rounded bg-[#e8e8e8] px-1 text-[10px] font-semibold text-[#616061]">APP</span>
              <span className="text-[12px] text-[#616061]">10:05 AM</span>
            </div>
            <p>A request needs your IT Security approval:</p>
            <div className="mt-2 rounded-lg border-l-4 border-primary bg-[#f8f8f8] p-3 text-[13px]">
              <div className="font-semibold">📄 Remote support software · TeamViewer</div>
              <div className="mt-1 grid grid-cols-2 gap-1 text-[#616061]">
                <span>Contract type: Purchase</span>
                <span>Cost: {usd(i2pDerived().quote)}</span>
                <span>Start date: {formatDate(I2P.start)}</span>
                <span>Contract length: 12 months</span>
              </div>
              <div className="mt-1 text-[#616061]">Security: SOC 2 Type II ✓ · ISO 27001 ✓ · MFA enforced ✓</div>
            </div>
            <div className="mt-2 flex gap-2">
              <button onClick={onApprove} className="rounded-md bg-[#007a5a] px-3 py-1 text-[13px] font-bold text-white hover:bg-[#148567]">
                Approve
              </button>
              <button disabled className="rounded-md border border-black/20 px-3 py-1 text-[13px] font-bold text-[#616061]">
                Reject
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-black/10 pt-3 text-[13px]">
          <p>
            <b>Dana Kim</b> <span className="text-[#616061]">· SOC 2 report checked, all good from an infosec perspective.</span>
          </p>
        </div>
      </div>
    </Modal>
  )
}

function ReviewsTask({ s }: { s: DemoState }) {
  const approveReview = useDemo((x) => x.approveReview)
  const toast = useUi((x) => x.toast)
  const [slack, setSlack] = useState(false)
  const sec = flowStep(s, 'i2p-security') === 'approved'
  const legal = flowStep(s, 'i2p-legal') === 'approved'
  const Row = ({ ok, label, value, result }: { ok: boolean; label: string; value: string; result: string }) => (
    <li className="flex items-center justify-between gap-2 py-1.5 text-[13px]">
      <span className="text-ink-2">
        {label} <span className="text-ink-3">· {value}</span>
      </span>
      <StatusPill tone={ok ? 'success' : 'warning'}>{result}</StatusPill>
    </li>
  )
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className={clsx('p-4', sec ? 'border-success/40' : 'border-primary/40')}>
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-semibold text-ink">IT Security Approval</span>
          {sec ? <CheckCircle2 className="size-5 text-success" /> : <StatusPill tone="info">Due in 1d</StatusPill>}
        </div>
        <p className="mt-1 text-[12.5px] text-ink-3">Dana Kim · SaaS - Security Review</p>
        <ul className="mt-3 space-y-1 text-[13px] text-ink-2">
          <li>✓ SOC 2 Type II report on file</li>
          <li>✓ MFA enforced for agent accounts</li>
          <li>✓ DPA and sub-processor list</li>
        </ul>
        {sec ? (
          <p className="mt-3 text-[12.5px] text-success-ink">Approved by Dana Kim in Slack</p>
        ) : (
          <Button size="sm" className="mt-3" onClick={() => setSlack(true)}>
            Open Slack approval
          </Button>
        )}
      </Card>
      <Card className="border-success/40 p-4">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-semibold text-ink">Vertice AI - Compliance</span>
          <CheckCircle2 className="size-5 text-success" />
        </div>
        <p className="mt-1 text-[12.5px] text-ink-3">Checked against Compliance preferences</p>
        <ul className="mt-2">
          {I2P_AI_CHECKS.compliance.map((c) => (
            <Row key={c.item} ok label={c.item} value={c.value} result={c.result} />
          ))}
        </ul>
      </Card>
      <Card className={clsx('p-4', legal ? 'border-success/40' : 'border-warning/50')}>
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-semibold text-ink">Vertice AI - Legal</span>
          {legal ? <CheckCircle2 className="size-5 text-success" /> : <TriangleAlert className="size-5 text-warning" />}
        </div>
        <p className="mt-1 text-[12.5px] text-ink-3">1 clause requires review → Legal Approval (Leah Brooks)</p>
        <ul className="mt-2">
          {I2P_AI_CHECKS.legal.map((c) => (
            <Row key={c.item} ok={c.result === 'Accepted' || legal} label={c.item} value={c.value} result={legal && c.result !== 'Accepted' ? 'Redlined to 30 days' : c.result} />
          ))}
        </ul>
        {!legal && (
          <Button
            size="sm"
            variant="secondary"
            className="mt-3"
            onClick={() => {
              approveReview('i2p-legal')
              toast('Leah Brooks approved with a redline: 30-day notice')
            }}
          >
            Approve as Leah (with redline)
          </Button>
        )}
      </Card>
      <SlackApproval
        open={slack}
        onOpenChange={setSlack}
        onApprove={() => {
          approveReview('i2p-security')
          setSlack(false)
          toast('Dana Kim approved IT Security in Slack')
        }}
      />
    </div>
  )
}

function CommercialTask() {
  const advance = useDemo((s) => s.advance)
  const toast = useUi((s) => s.toast)
  const d = i2pDerived()
  const impact = budgetImpact(I2P.department, d.negotiated)
  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <StatusPill tone="warning">Commercial Approval · Priya Shah (FP&A)</StatusPill>
          <div className="mt-2 text-[16px] font-semibold text-ink">Final offer: TeamViewer Remote Business</div>
          <div className="text-[13px] text-ink-3">Negotiated by Alex Morgan with Vertice benchmark data · below the $100K threshold for Vertice-led negotiation</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ['Baseline (quote)', usd(d.quote)],
          ['Negotiated', usd(d.negotiated)],
          ['Price / license', usd(I2P.negotiatedPricePerSeat)],
          ['Cost avoidance', `${usd(d.costAvoidance)} (${pct(d.costAvoidance / d.quote)})`],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-canvas p-3">
            <div className="text-[12px] text-ink-3">{k}</div>
            <div className="mt-0.5 text-[15px] font-semibold text-ink tabular-nums">{v}</div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl border border-line p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[14px] font-semibold text-ink">This will take up {pct(impact.share)} of the Support budget</span>
          <StatusPill tone="success">In budget</StatusPill>
        </div>
        <div className="mt-3">
          <BudgetBar budget={impact.budget} request={d.negotiated} />
        </div>
        <p className="mt-3 text-[12.5px] text-ink-3">
          You will end the financial year at <b className="text-ink">{pct(impact.yearEndPct)}</b> of the Support budget.{' '}
          <Link to="/insights/budgets" className="font-medium text-primary hover:underline">
            View budgets
          </Link>
        </p>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button
          variant="success"
          onClick={() => {
            advance('i2p', 'commercial', 'signing')
            toast('Priya Shah approved: contract sent for signature')
          }}
        >
          <Check className="size-4" /> Approve as Priya (simulated)
        </Button>
        <span className="text-[12.5px] text-ink-3">In reality Priya approves in Vertice, Slack or Teams.</span>
      </div>
    </Card>
  )
}

function SigningTask() {
  const advance = useDemo((s) => s.advance)
  const toast = useUi((s) => s.toast)
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-[#4C00FF] text-[13px] font-bold text-white">D</span>
        <div>
          <div className="text-[15px] font-semibold text-ink">Sign Contract in DocuSign</div>
          <div className="text-[13px] text-ink-3">Envelope sent to TeamViewer and Alex Morgan · contract terms include Legal’s 30-day notice redline</div>
        </div>
      </div>
      <DemoNote className="mt-4">
        <Button
          size="sm"
          variant="secondary"
          className="border-primary/40 text-primary"
          onClick={() => {
            advance('i2p', 'signing', 'completed')
            toast('Signed: contract created and PO-1042 synced to NetSuite')
          }}
        >
          <FileSignature className="size-3.5" /> Show signed contract
        </Button>
      </DemoNote>
    </Card>
  )
}

function Completed() {
  const d = i2pDerived()
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-3 bg-success-tint/60 px-5 py-4">
        <PartyPopper className="size-6 text-success-ink" />
        <div>
          <div className="text-[16px] font-semibold text-ink">Request complete: Sam has remote support software</div>
          <div className="text-[13px] text-ink-2">Completed in {I2P.cycleDays} days (simulated) vs Northwind’s 14.6-day average for new purchases</div>
        </div>
      </div>
      <div className="grid gap-3 p-5 sm:grid-cols-3">
        <Link to="/vendors/teamviewer" className="rounded-xl border border-line p-3.5 hover:border-primary/40 hover:bg-primary-wash">
          <div className="text-[12px] text-ink-3">Contract</div>
          <div className="mt-0.5 font-semibold text-ink">TeamViewer · Not yet live</div>
          <div className="text-[12.5px] text-ink-3">Starts {formatDate(I2P.start)}</div>
        </Link>
        <Link to="/purchase-orders" className="rounded-xl border border-line p-3.5 hover:border-primary/40 hover:bg-primary-wash">
          <div className="text-[12px] text-ink-3">Purchase order</div>
          <div className="mt-0.5 font-semibold text-ink">
            {I2P_PO_ID} · {usd(d.negotiated)}
          </div>
          <div className="text-[12.5px] text-success-ink">Synced to NetSuite</div>
        </Link>
        <Link to="/savings" className="rounded-xl border border-line p-3.5 hover:border-primary/40 hover:bg-primary-wash">
          <div className="text-[12px] text-ink-3">Cost avoidance</div>
          <div className="mt-0.5 font-semibold text-ink">{usd(d.costAvoidance)}</div>
          <div className="text-[12.5px] text-ink-3">Tracked separately from renewal savings</div>
        </Link>
      </div>
      <div className="flex flex-wrap gap-2 px-5 pb-5">
        <ButtonLink to="/invoices">
          Next: the invoice arrives <ArrowRight className="size-4" />
        </ButtonLink>
        <ButtonLink to="/dashboard" variant="secondary">
          Back to dashboard
        </ButtonLink>
      </div>
    </Card>
  )
}

const NODE_ORDER = ['intake', 'risk', 'reviews', 'commercial', 'signing', 'completed'] as const

function nodeStates(s: DemoState): Record<string, NodeState> {
  const i = NODE_ORDER.indexOf(flowStep(s, 'i2p') as (typeof NODE_ORDER)[number])
  const at = (step: (typeof NODE_ORDER)[number]) => i >= NODE_ORDER.indexOf(step)
  const sec = flowStep(s, 'i2p-security') === 'approved'
  const legal = flowStep(s, 'i2p-legal') === 'approved'
  return {
    start: 'done',
    intake: 'done',
    requirements: 'done',
    tprm: at('reviews') ? 'done' : 'warning',
    security: sec ? 'done' : at('reviews') ? 'active' : 'pending',
    compliance: at('reviews') ? 'done' : 'pending',
    'legal-ai': at('reviews') ? 'done' : 'pending',
    legal: legal ? 'done' : at('reviews') ? 'active' : 'pending',
    commercial: at('signing') ? 'done' : at('commercial') ? 'active' : 'pending',
    sign: at('completed') ? 'done' : at('signing') ? 'active' : 'pending',
    contract: at('completed') ? 'done' : 'pending',
    po: at('completed') ? 'done' : 'pending',
    end: at('completed') ? 'done' : 'pending',
  }
}

export function I2pRequestPage() {
  const { tab = 'overview' } = useParams()
  const s = useScenario()
  const step = flowStep(s, 'i2p')
  const d = i2pDerived()

  if (step === 'none')
    return (
      <div className="flex min-h-full items-center justify-center p-10">
        <Card className="max-w-[480px] p-8 text-center">
          <h1 className="text-[18px] font-semibold text-ink">This request hasn’t been submitted</h1>
          <p className="mt-2 text-[13.5px] text-ink-3">Sam starts it from Slack, or anyone can use the intake form.</p>
          <div className="mt-5 flex justify-center gap-2">
            <ButtonLink to="/intake/slack">Start in Slack</ButtonLink>
            <ButtonLink to="/intake/new" variant="secondary">
              Intake form
            </ButtonLink>
          </div>
        </Card>
      </div>
    )

  const vendorId = reached(s, 'i2p', 'reviews') ? I2P.chosenVendorId : I2P.requestedVendorId
  const completed = step === 'completed'
  const active = ['intake', 'risk'].includes(step) ? 1 : step === 'reviews' ? 2 : step === 'commercial' ? 3 : step === 'signing' ? 4 : 5
  const st = chainStates(6, active, completed)

  return (
    <>
      <RequestHeader
        id={I2P_REQUEST_ID}
        title={`${I2P.title} - Purchase`}
        logoId={vendorId}
        completed={completed}
        meta={
          <>
            <span>SaaS - New Purchase · {vendorName(vendorId)}</span>
            <span className="text-ink-4">·</span>
            <span>{usd(reached(s, 'i2p', 'commercial') ? d.negotiated : d.quote)}</span>
            <span className="text-ink-4">·</span>
            <span>Requested by Sam Okafor (Support)</span>
          </>
        }
        tabs={['Overview', 'Workflow']}
      />
      <PageBody>
        {tab === 'workflow' ? (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-[13px] text-ink-3">
                Workflow <b className="text-ink">{I2P_WORKFLOW.name}</b> · {I2P_WORKFLOW.version} · Live
              </div>
              <div className="flex items-center gap-3 text-[12px] text-ink-3">
                <span className="flex items-center gap-1">
                  <span className="size-2.5 rounded-full bg-success" /> Completed
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-2.5 rounded-full bg-primary" /> Active
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-2.5 rounded-full bg-warning" /> Needs attention
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="size-3 text-primary" /> Vertice AI step
                </span>
              </div>
            </div>
            <WorkflowCanvas
              workflow={I2P_WORKFLOW}
              states={nodeStates(s)}
              height={460}
              badges={step === 'risk' ? { tprm: <StatusPill tone="danger">High risk</StatusPill> } : {}}
            />
            <p className="text-[12.5px] text-ink-3">
              Security Review, AI Compliance and AI Legal run in parallel; Legal Approval is added automatically above $50,000. Built in the no-code{' '}
              <Link to="/workflows" className="font-medium text-primary hover:underline">
                Workflow Builder
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
            <div className="min-w-0 space-y-5">
              <div>
                <h2 className="mb-2.5 text-[14px] font-semibold text-ink">{completed ? 'Outcome' : step === 'reviews' ? 'Active tasks (3 in parallel)' : 'Active task'}</h2>
                {step === 'risk' || step === 'intake' ? (
                  <RiskTask />
                ) : step === 'reviews' ? (
                  <ReviewsTask s={s} />
                ) : step === 'commercial' ? (
                  <CommercialTask />
                ) : step === 'signing' ? (
                  <SigningTask />
                ) : (
                  <Completed />
                )}
              </div>
              <Chain
                steps={[
                  { label: 'Intake Form', owner: 'Sam Okafor', state: 'done' },
                  { label: 'Vendor Risk', owner: 'Vertice AI', state: st[1], sub: step === 'risk' ? 'High risk flagged' : undefined },
                  { label: 'Security & Legal', owner: 'Dana · Leah · AI', state: st[2] },
                  { label: 'Commercial Approval', owner: 'Priya Shah', state: st[3] },
                  { label: 'Sign in DocuSign', owner: 'Alex Morgan', state: st[4] },
                  { label: 'Create PO', owner: 'Vertice · NetSuite', state: st[5], vertice: true },
                ]}
              />
            </div>
            <div className="space-y-5">
              <DetailRows
                rows={[
                  ['Vendor', vendorName(vendorId)],
                  ['Licenses', String(I2P.seats)],
                  ['Quote', `${usd(d.quote)} (${usd(I2P.chosenQuotePerSeat)} / license)`],
                  ['Negotiated', reached(s, 'i2p', 'commercial') ? usd(d.negotiated) : 'Pending'],
                  ['Department', 'Support · SUP-410'],
                  ['Target start', formatDate(I2P.start)],
                  ['Workflow', 'Purchase New Software (I2P)'],
                ]}
              />
              <PeopleCard
                people={[
                  { id: 'sam-okafor', role: 'Requester' },
                  { id: 'alex-morgan', role: 'Procurement' },
                  { id: 'dana-kim', role: 'IT Security' },
                  { id: 'leah-brooks', role: 'Legal' },
                  { id: 'priya-shah', role: 'Finance' },
                ]}
              />
              <Card className="p-4">
                <div className="mb-2 text-[14px] font-semibold text-ink">Activity</div>
                <ol className="space-y-2 text-[12.5px] text-ink-2">
                  <li>Sam Okafor started the request in Slack</li>
                  <li>Vertice AI pre-filled 6 fields from the order form</li>
                  <li>Vertice AI - TPRM rated LinkDesk Remote High risk</li>
                  {reached(s, 'i2p', 'reviews') && <li>Alex Morgan switched the vendor to TeamViewer</li>}
                  {flowStep(s, 'i2p-security') === 'approved' && <li>Dana Kim approved IT Security in Slack</li>}
                  {flowStep(s, 'i2p-legal') === 'approved' && <li>Leah Brooks approved with a redline</li>}
                  {reached(s, 'i2p', 'signing') && <li>Priya Shah approved the commercial terms</li>}
                  {completed && <li>Contract signed in DocuSign · {I2P_PO_ID} created in NetSuite</li>}
                </ol>
              </Card>
            </div>
          </div>
        )}
      </PageBody>
    </>
  )
}
