/**
 * Vendors › Directory, vendor record (Risk Management + Vendor Onboarding) and
 * Expert Engage. Vendor Portal tasks for Lexora follow the rfp flow (Chapter C).
 */
import clsx from 'clsx'
import { CalendarCheck, CheckCircle2, ChevronDown, Clock, FileText, Globe, Mail, MapPin, Search, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { RiskGauge } from '../../components/charts/charts'
import { PageBody, PageHeader } from '../../components/layout/PageHeader'
import { VerticeMark } from '../../components/ui/Avatar'
import { Button } from '../../components/ui/Button'
import { Card, CardHeader, Field } from '../../components/ui/Card'
import { AgentChip, DemoNote, Logo, Table, Td, THead, Tr } from '../../components/ui/kit'
import { Modal } from '../../components/ui/Overlay'
import { StatusPill } from '../../components/ui/StatusPill'
import { ONBOARDING_TASKS } from '../../data/chapters/rfp'
import { logoVendor, prospects, RISK_TONE, riskProfile } from '../../data/directory'
import { DOCUMENTS, EXPERT_SERVICES, EXPERT_SLOTS, expertById, type ExpertService } from '../../data/platform'
import { vendorById, vendors } from '../../data/vendors'
import { newContracts, requestRows } from '../../domain/chapters'
import { flowStep, reached } from '../../domain/flows'
import type { DemoState } from '../../domain/types'
import { formatDate, usd } from '../../lib/format'
import { useDemo, useScenario } from '../../store/demo'
import { useUi } from '../../store/ui'

type VendorStatus = 'Active' | 'Onboarding' | 'Prospect' | 'Bidder' | 'Rejected'

const SHOWN_PROSPECTS = ['teamviewer', 'linkdesk', 'lexora', 'clausewise', 'pactly', 'draftly', 'aws']

const vendorStatus = (s: DemoState, id: string): VendorStatus => {
  if (vendorById(id)) return 'Active'
  if (id === 'aws') return 'Active'
  if (id === 'teamviewer') return reached(s, 'i2p', 'completed') ? 'Active' : 'Prospect'
  if (id === 'linkdesk') return reached(s, 'i2p', 'reviews') ? 'Rejected' : 'Prospect'
  if (id === 'lexora') return reached(s, 'rfp', 'completed') ? 'Active' : reached(s, 'rfp', 'onboarding') ? 'Onboarding' : reached(s, 'rfp', 'sent') ? 'Bidder' : 'Prospect'
  return reached(s, 'rfp', 'sent') ? 'Bidder' : 'Prospect'
}

const STATUS_TONE: Record<VendorStatus, 'success' | 'info' | 'neutral' | 'violet' | 'danger'> = {
  Active: 'success',
  Onboarding: 'info',
  Prospect: 'neutral',
  Bidder: 'violet',
  Rejected: 'danger',
}

export function VendorDirectory() {
  const s = useScenario()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const rows = useMemo(
    () =>
      [
        ...vendors.map((v) => ({ id: v.id, name: v.name, category: v.category, owner: v.department, contracts: 1 })),
        ...prospects.filter((p) => SHOWN_PROSPECTS.includes(p.id)).map((p) => ({ id: p.id, name: p.name, category: p.category, owner: '–', contracts: newContracts(s).some((c) => c.vendorId === p.id) ? 1 : p.id === 'aws' ? 1 : 0 })),
      ].filter((r) => r.name.toLowerCase().includes(q.trim().toLowerCase())),
    [s, q],
  )
  return (
    <>
      <PageHeader crumbs={[{ label: 'Vendors' }, { label: 'Directory' }]} title="Vendor directory" meta={<span>{rows.length} vendors · risk assessed continuously by Vertice AI - TPRM</span>} />
      <PageBody>
        <Card>
          <div className="border-b border-line px-4 py-3">
            <label className="flex h-8 w-72 items-center gap-2 rounded-lg border border-line px-2.5 text-ink-3">
              <Search className="size-4" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search vendors" className="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none" />
            </label>
          </div>
          <Table>
            <THead cols={['Vendor', 'Category', 'Owner', { label: 'Contracts', right: true }, 'Overall risk', 'Status']} />
            <tbody>
              {rows.map((r) => {
                const st = vendorStatus(s, r.id)
                const risk = riskProfile(r.id).overall
                return (
                  <Tr key={r.id} onClick={() => navigate(`/vendors/${r.id}`)}>
                    <Td>
                      <span className="flex items-center gap-2.5 font-medium text-ink">
                        <Logo id={r.id} size="sm" /> {r.name}
                      </span>
                    </Td>
                    <Td className="text-ink-2">{r.category}</Td>
                    <Td className="text-ink-2">{r.owner}</Td>
                    <Td right>{r.contracts}</Td>
                    <Td>
                      <StatusPill tone={RISK_TONE[risk]}>{risk}</StatusPill>
                    </Td>
                    <Td>
                      <StatusPill tone={STATUS_TONE[st]}>{st}</StatusPill>
                    </Td>
                  </Tr>
                )
              })}
            </tbody>
          </Table>
        </Card>
      </PageBody>
    </>
  )
}

const TABS = ['overview', 'contracts', 'documents', 'portal', 'notes'] as const
const TAB_LABEL: Record<(typeof TABS)[number], string> = { overview: 'Overview', contracts: 'Contracts & Requests', documents: 'Documents', portal: 'Vendor Portal', notes: 'Notes' }

function RiskCard({ id }: { id: string }) {
  const r = riskProfile(id)
  const [open, setOpen] = useState<string | null>(null)
  return (
    <Card>
      <CardHeader title="Overall risk assessment" action={<AgentChip name="Vertice AI - TPRM" />} />
      <div className="px-5 pb-5">
        <RiskGauge level={r.overall} />
        <p className="mt-4 text-[13px] leading-relaxed text-ink-2">{r.narrative}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {r.certifications.map((c) => (
            <StatusPill key={c} tone="outline">
              {c}
            </StatusPill>
          ))}
        </div>
        <ul className="mt-4 divide-y divide-line-soft rounded-xl border border-line">
          {r.categories.map((c) => (
            <li key={c.name}>
              <button onClick={() => setOpen(open === c.name ? null : c.name)} className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-[13px]">
                <span className="font-medium text-ink">{c.name}</span>
                <span className="flex items-center gap-2">
                  <StatusPill tone={RISK_TONE[c.level]}>{c.level}</StatusPill>
                  <ChevronDown className={clsx('size-4 text-ink-4 transition-transform', open === c.name && 'rotate-180')} />
                </span>
              </button>
              {open === c.name && <p className="px-3 pb-3 text-[12.5px] text-ink-3">{c.note}</p>}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[11.5px] text-ink-4">Illustrative assessment. Ratings can include Vanta, OneTrust and Dun &amp; Bradstreet data.</p>
      </div>
    </Card>
  )
}

function Portal({ id }: { id: string }) {
  const step = useDemo((s) => flowStep(s, 'rfp'))
  const advance = useDemo((s) => s.advance)
  const toast = useUi((s) => s.toast)
  const lexora = id === 'lexora'
  const status = (taskIdx: number) => {
    if (!lexora) return 'Completed'
    if (step === 'completed') return 'Completed'
    if (step === 'onboarding') return taskIdx === 2 ? 'Completed' : 'Pending'
    return 'Not sent'
  }
  return (
    <div className="space-y-5">
      <Card>
        <CardHeader
          title="Vendor Portal tasks"
          subtitle={lexora ? 'Sent from the Vendor Onboarding workflow · Lexora completes them once' : 'Completed during onboarding'}
          action={<StatusPill tone="outline">Create Vendor Portal Task From Template</StatusPill>}
        />
        <Table>
          <THead cols={['Task', 'Type', 'Fields', 'Status']} />
          <tbody>
            {ONBOARDING_TASKS.map((t, i) => {
              const st = status(i)
              return (
                <Tr key={t.id}>
                  <Td className="font-medium text-ink">{t.title}</Td>
                  <Td className="text-ink-2">{t.type}</Td>
                  <Td className="text-[12.5px] text-ink-3">{t.fields.join(' · ')}</Td>
                  <Td>
                    <StatusPill tone={st === 'Completed' ? 'success' : st === 'Pending' ? 'warning' : 'neutral'} icon={st === 'Pending' ? <Clock className="size-3" /> : st === 'Completed' ? <CheckCircle2 className="size-3" /> : undefined}>
                      {st === 'Pending' ? 'Pending · Task sent to vendor' : st}
                    </StatusPill>
                  </Td>
                </Tr>
              )
            })}
          </tbody>
        </Table>
        {lexora && step === 'onboarding' && (
          <div className="p-5">
            <DemoNote>
              <Button
                size="sm"
                variant="secondary"
                className="border-primary/40 text-primary"
                onClick={() => {
                  advance('rfp', 'onboarding', 'completed')
                  toast('Lexora completed onboarding: vendor synced to NetSuite')
                }}
              >
                Show vendor completing tasks
              </Button>
            </DemoNote>
          </div>
        )}
        {lexora && step === 'completed' && <p className="px-5 py-3 text-[12.5px] text-success-ink">All tasks complete · vendor synced to NetSuite · AI Compliance check passed</p>}
      </Card>
      <Card>
        <CardHeader title="Questionnaire: Banking details" subtitle="Field types: File Upload · Checkbox · Long Text · Multiple Select · Short Text · Single Choice" />
        <div className="grid gap-3 px-5 pb-5 sm:grid-cols-3">
          {['Bank name', 'IBAN / account number', 'SWIFT / routing number'].map((f) => (
            <label key={f}>
              <span className="text-[12.5px] text-ink-3">{f} (Short Text)</span>
              <div className="mt-1 flex h-9 items-center rounded-lg border border-line bg-canvas px-3 text-[13px] text-ink-3">{lexora && step === 'completed' ? '•••• provided by vendor' : 'Vendor fills in'}</div>
            </label>
          ))}
        </div>
      </Card>
    </div>
  )
}

export function VendorRecord() {
  const { id = '' } = useParams()
  const [params, setParams] = useSearchParams()
  const tab = (TABS.includes(params.get('tab') as (typeof TABS)[number]) ? params.get('tab') : 'overview') as (typeof TABS)[number]
  const s = useScenario()
  const v = logoVendor(id)
  if (!v)
    return (
      <div className="p-8">
        <Card className="p-8 text-center text-ink-3">Vendor not found.</Card>
      </div>
    )
  const portfolio = vendorById(id)
  const prospect = prospects.find((p) => p.id === id)
  const st = vendorStatus(s, id)
  const reqs = requestRows(s).filter((r) => r.logoId === id)
  const created = newContracts(s).find((c) => c.vendorId === id)
  const docs = DOCUMENTS.filter((d) => d.vendorId === id)
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Vendors', to: '/vendors' }, { label: 'Directory', to: '/vendors' }, { label: v.name }]}
        icon={<Logo id={id} size="lg" />}
        title={
          <span className="flex items-center gap-2.5">
            {v.name}
            <StatusPill tone={STATUS_TONE[st]}>{st}</StatusPill>
          </span>
        }
        meta={<span>{portfolio ? `${portfolio.product} · ${portfolio.category}` : `${prospect?.product} · ${prospect?.category}`}</span>}
      />
      <div className="border-b border-line bg-white px-8">
        <div className="-mb-px flex gap-6">
          {TABS.map((t) => (
            <button key={t} onClick={() => setParams({ tab: t })} className={clsx('border-b-2 py-2.5 text-[14px] font-medium', tab === t ? 'border-primary text-primary' : 'border-transparent text-ink-2 hover:text-ink')}>
              {TAB_LABEL[t]}
            </button>
          ))}
        </div>
      </div>
      <PageBody>
        {tab === 'overview' && (
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_400px]">
            <div className="space-y-5">
              <Card>
                <CardHeader title="Overview" />
                <div className="grid grid-cols-1 gap-5 px-5 pb-5 sm:grid-cols-2">
                  <Field label={<span className="flex items-center gap-1"><Mail className="size-3.5" /> Representative email</span>} value={`accounts@${prospect?.website ?? `${id}.com`}`} />
                  <Field label={<span className="flex items-center gap-1"><Globe className="size-3.5" /> Website</span>} value={prospect?.website ?? `${id}.com`} />
                  <Field label={<span className="flex items-center gap-1"><MapPin className="size-3.5" /> Country</span>} value="United States" />
                  <Field label="Vendor owner" value={portfolio ? `${portfolio.department}` : id === 'lexora' ? 'Legal' : id === 'teamviewer' || id === 'linkdesk' ? 'Support' : 'Engineering'} />
                  <Field label="ERP sync" value={st === 'Active' ? 'Synced to NetSuite' : 'Not yet synced'} />
                  <Field label="Onboarding status" value={st === 'Onboarding' ? 'In progress' : st === 'Active' ? 'Complete' : 'Not started'} />
                </div>
              </Card>
              {id === 'linkdesk' && st === 'Rejected' && (
                <Card className="border-danger/30 p-5 text-[13.5px] text-ink-2">
                  Rejected at intake: High security & privacy risk. Replaced by{' '}
                  <Link to="/vendors/teamviewer" className="font-medium text-primary hover:underline">
                    TeamViewer
                  </Link>
                  .
                </Card>
              )}
            </div>
            <RiskCard id={id} />
          </div>
        )}
        {tab === 'contracts' && (
          <div className="grid gap-5 xl:grid-cols-2">
            <Card>
              <CardHeader title="Linked contracts" />
              <div className="px-5 pb-5">
                {portfolio ? (
                  <Link to={`/contracts/${id}/overview`} className="flex items-center justify-between rounded-xl border border-line p-3.5 hover:border-primary/40">
                    <span>
                      <span className="block font-medium text-ink">{portfolio.name} · {portfolio.product}</span>
                      <span className="text-[12.5px] text-ink-3">Until {formatDate(portfolio.renewalDate)} · {usd(portfolio.annualCost)}</span>
                    </span>
                    <StatusPill tone="success">Live</StatusPill>
                  </Link>
                ) : created ? (
                  <div className="flex items-center justify-between rounded-xl border border-line p-3.5">
                    <span>
                      <span className="block font-medium text-ink">{created.product}</span>
                      <span className="text-[12.5px] text-ink-3">
                        {formatDate(created.start)} – {formatDate(created.end)} · {usd(created.annualCost)}
                      </span>
                    </span>
                    <StatusPill tone="warning">Not yet live</StatusPill>
                  </div>
                ) : (
                  <p className="text-[13px] text-ink-3">No contracts yet.</p>
                )}
              </div>
            </Card>
            <Card>
              <CardHeader title="Requests" />
              <ul className="space-y-2 px-5 pb-5">
                {reqs.length ? (
                  reqs.map((r) => (
                    <li key={r.id}>
                      <Link to={r.to} className="flex items-center justify-between rounded-xl border border-line p-3 hover:border-primary/40">
                        <span className="text-[13.5px] font-medium text-ink">{r.title}</span>
                        <StatusPill tone={r.status === 'Completed' ? 'success' : 'info'}>{r.status}</StatusPill>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-[13px] text-ink-3">No active requests.</li>
                )}
              </ul>
            </Card>
          </div>
        )}
        {tab === 'documents' && (
          <Card>
            <CardHeader title="Documents" />
            <ul className="space-y-2 px-5 pb-5">
              {docs.length ? (
                docs.map((d) => (
                  <li key={d.id} className="flex items-center gap-2 text-[13.5px] text-ink">
                    <FileText className="size-4 text-ink-3" /> {d.name} <span className="text-ink-3">· {d.type}</span>
                  </li>
                ))
              ) : (
                <li className="text-[13px] text-ink-3">{id === 'lexora' && reached(s, 'rfp', 'completed') ? 'Lexora_SOC2-Type-II_2026.pdf · Lexora_DPA_signed.pdf' : 'No documents yet.'}</li>
              )}
            </ul>
          </Card>
        )}
        {tab === 'portal' && <Portal id={id} />}
        {tab === 'notes' && (
          <Card className="p-5 text-[13.5px] text-ink-2">
            <p>{portfolio ? `Strategic ${portfolio.category} supplier. Review renewal strategy 90 days before notice.` : 'Notes from the sourcing and onboarding process appear here.'}</p>
          </Card>
        )}
      </PageBody>
    </>
  )
}

function BookingModal({ service, onClose }: { service: ExpertService | null; onClose: () => void }) {
  const book = useDemo((s) => s.book)
  const toast = useUi((s) => s.toast)
  const [slot, setSlot] = useState<string>(EXPERT_SLOTS[0])
  if (!service) return null
  return (
    <Modal
      open={!!service}
      onOpenChange={(o) => !o && onClose()}
      title={service.title}
      description={`${service.group} · ${service.turnaround}`}
      footer={
        <Button
          onClick={() => {
            book(service.id)
            toast(`Booked: ${service.title} with Nina Patel (${slot})`)
            onClose()
          }}
        >
          <CalendarCheck className="size-4" /> Continue
        </Button>
      }
    >
      <p className="text-[13.5px] text-ink-2">{service.blurb}</p>
      <div className="mt-4 text-[13px] font-semibold text-ink">Deliverables</div>
      <ul className="mt-1.5 space-y-1 text-[13px] text-ink-2">
        {service.deliverables.map((d) => (
          <li key={d}>✓ {d}</li>
        ))}
      </ul>
      <div className="mt-5 text-[13px] font-semibold text-ink">Book your slot</div>
      <div className="mt-2 flex items-center gap-3">
        <VerticeMark className="size-6" />
        <span className="text-[13px] text-ink-2">Nina Patel · Procurement Expert, Vertice</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {EXPERT_SLOTS.map((x) => (
          <button key={x} onClick={() => setSlot(x)} className={clsx('rounded-lg border px-3 py-2 text-[13px]', slot === x ? 'border-primary bg-primary-wash font-medium text-primary' : 'border-line text-ink-2')}>
            {x}
          </button>
        ))}
      </div>
    </Modal>
  )
}

export function ExpertEngage() {
  const bookings = useDemo((s) => s.bookings)
  const [params] = useSearchParams()
  const [open, setOpen] = useState<ExpertService | null>(() => expertById(params.get('service') ?? '') ?? null)
  const groups = ['Save money', 'Source and evaluate vendors', 'Plan and optimize'] as const
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Vendors' }, { label: 'Expert Engage' }]}
        title="Expert engage"
        meta={<span>Request expert support across negotiation, sourcing and procurement strategy</span>}
        actions={
          <Button onClick={() => setOpen(expertById('negotiation')!)}>
            <Sparkles className="size-4" /> Book a Procurement Expert
          </Button>
        }
      />
      <PageBody className="space-y-6">
        {groups.map((g) => (
          <section key={g}>
            <h2 className="mb-2.5 text-[14px] font-semibold text-ink">{g}</h2>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {EXPERT_SERVICES.filter((x) => x.group === g).map((x) => {
                const booked = bookings.includes(x.id)
                return (
                  <Card key={x.id} className="flex flex-col p-5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[14.5px] font-semibold text-ink">{x.title}</span>
                      {booked && <StatusPill tone="success">Booked</StatusPill>}
                    </div>
                    <p className="mt-1.5 flex-1 text-[13px] text-ink-3">{x.blurb}</p>
                    <Button size="sm" variant={booked ? 'secondary' : 'primary'} className="mt-4 self-start" onClick={() => setOpen(x)}>
                      {booked ? 'View booking' : 'Request'}
                    </Button>
                  </Card>
                )
              })}
            </div>
          </section>
        ))}
      </PageBody>
      <BookingModal service={open} onClose={() => setOpen(null)} />
    </>
  )
}
