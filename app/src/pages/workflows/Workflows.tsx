/**
 * Workflows › Configuration, Templates and the no-code Workflow Builder
 * (Chapter E2). The editor's scripted change: replace the manual IT Approval
 * with Jira steps, then Set as Live → Procurement insights improve.
 */
import clsx from 'clsx'
import { ArrowRight, CircleCheckBig, GripVertical, Search, Sparkles, TriangleAlert } from 'lucide-react'
import { useState, type DragEvent } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { PageBody, PageHeader } from '../../components/layout/PageHeader'
import { VerticeMark } from '../../components/ui/Avatar'
import { Button, ButtonLink } from '../../components/ui/Button'
import { Card, CardHeader } from '../../components/ui/Card'
import { FullProductCard, Table, Td, THead, Tr } from '../../components/ui/kit'
import { Modal } from '../../components/ui/Overlay'
import { StatusPill } from '../../components/ui/StatusPill'
import { WorkflowCanvas, type NodeState } from '../../components/workflow/WorkflowCanvas'
import { allWorkflows, fixedNewPurchaseWorkflow, NEW_PURCHASE_WORKFLOW, OTHER_WORKFLOWS, PALETTE, WORKFLOW_TEMPLATES, type Workflow } from '../../data/workflows'
import { reached } from '../../domain/flows'
import { formatDate } from '../../lib/format'
import { useDemo } from '../../store/demo'
import { useUi } from '../../store/ui'

const tabsFor = () => [
  { label: 'Configuration', to: '/workflows', end: true },
  { label: 'Templates', to: '/workflows/templates' },
]

export function WorkflowList() {
  const fixed = useDemo((s) => reached(s, 'bottleneck', 'fixed'))
  const navigate = useNavigate()
  const list = allWorkflows(fixed)
  return (
    <>
      <PageHeader title="Workflows" meta={<span>No-code workflows that route every request type</span>} tabs={tabsFor()} />
      <PageBody>
        <Card>
          <Table>
            <THead cols={['Workflow', 'Request type', 'Version', 'Status', { label: 'AI steps', right: true }, 'Last edited']} />
            <tbody>
              {list.map((w) => (
                <Tr key={w.id} onClick={() => navigate(`/workflows/edit/${w.id}`)}>
                  <Td className="font-medium text-ink">{w.name}</Td>
                  <Td className="text-ink-2">{w.requestType}</Td>
                  <Td className="text-ink-2">{w.version}</Td>
                  <Td>
                    <StatusPill tone={w.status === 'Live' ? 'success' : 'neutral'}>{w.status}</StatusPill>
                    {w.id === NEW_PURCHASE_WORKFLOW.id && !fixed && <StatusPill tone="warning" className="ml-1.5">1 warning</StatusPill>}
                  </Td>
                  <Td right>{w.nodes.filter((n) => n.kind === 'ai').length}</Td>
                  <Td className="text-ink-3">{formatDate(w.id === NEW_PURCHASE_WORKFLOW.id && fixed ? '2026-10-13' : w.edited)}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </PageBody>
    </>
  )
}

export function Templates() {
  const [preview, setPreview] = useState<(typeof WORKFLOW_TEMPLATES)[number] | null>(null)
  const toast = useUi((s) => s.toast)
  const graph: Record<string, Workflow> = {
    't-saas-renewal': OTHER_WORKFLOWS[0],
    't-it-hardware': OTHER_WORKFLOWS[2],
    't-vendor-onboarding': OTHER_WORKFLOWS[3],
    't-rfx': OTHER_WORKFLOWS[4],
    't-legal': OTHER_WORKFLOWS[5],
  }
  return (
    <>
      <PageHeader title="Workflows" meta={<span>Start from a Vertice template and adapt it to your policy</span>} tabs={tabsFor()} />
      <PageBody>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {WORKFLOW_TEMPLATES.map((t) => (
            <Card key={t.id} className="flex flex-col p-5">
              <VerticeMark className="size-6" />
              <div className="mt-3 text-[15px] font-semibold text-ink">{t.name}</div>
              <p className="mt-1 flex-1 text-[13px] text-ink-3">{t.when}</p>
              <div className="mt-3 text-[12px] text-ink-4">{t.steps} steps</div>
              <Button size="sm" variant="secondary" className="mt-3" onClick={() => setPreview(t)}>
                Preview template
              </Button>
            </Card>
          ))}
        </div>
      </PageBody>
      <Modal
        open={!!preview}
        onOpenChange={(o) => !o && setPreview(null)}
        title={preview?.name ?? ''}
        description={preview?.when}
        width="max-w-[980px]"
        footer={
          <Button
            onClick={() => {
              toast('Template copied to a new draft workflow (simulated)', 'info')
              setPreview(null)
            }}
          >
            Use this template
          </Button>
        }
      >
        {preview && graph[preview.id] ? (
          <WorkflowCanvas workflow={graph[preview.id]} height={300} />
        ) : (
          <p className="text-[13.5px] text-ink-3">Preview available in the full product. This template has {preview?.steps} steps.</p>
        )}
      </Modal>
    </>
  )
}

function Palette({ highlight, onPick }: { highlight: boolean; onPick: (item: string) => void }) {
  const [q, setQ] = useState('')
  return (
    <Card className="flex h-full flex-col">
      <div className="border-b border-line p-3">
        <label className="flex h-8 items-center gap-2 rounded-lg border border-line px-2.5 text-ink-3">
          <Search className="size-3.5" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search nodes" className="min-w-0 flex-1 bg-transparent text-[12.5px] text-ink outline-none" />
        </label>
      </div>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
        {PALETTE.map((g) => {
          const items = g.items.filter((i) => i.toLowerCase().includes(q.toLowerCase()))
          if (!items.length) return null
          return (
            <div key={g.group}>
              <div className="mb-1 text-[11px] font-semibold tracking-wide text-ink-3 uppercase">{g.group}</div>
              <div className="space-y-1">
                {items.map((i) => {
                  const jira = i === 'Create Jira Ticket'
                  return (
                    <button
                      key={i}
                      draggable
                      onDragStart={(e: DragEvent) => e.dataTransfer.setData('text/plain', i)}
                      onClick={() => onPick(i)}
                      className={clsx(
                        'flex w-full items-center gap-1.5 rounded-lg border px-2 py-1.5 text-left text-[12px]',
                        jira && highlight ? 'animate-pulse border-primary bg-primary-wash font-medium text-primary' : 'border-line bg-white text-ink-2 hover:border-primary/40',
                      )}
                    >
                      <GripVertical className="size-3 shrink-0 text-ink-4" />
                      {g.group === 'Vertice AI' && <Sparkles className="size-3 shrink-0 text-primary" />}
                      <span className="truncate">{i}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export function WorkflowEditor() {
  const { id = '' } = useParams()
  const [params] = useSearchParams()
  const focus = params.get('focus')
  const fixed = useDemo((s) => reached(s, 'bottleneck', 'fixed'))
  const advance = useDemo((s) => s.advance)
  const toast = useUi((s) => s.toast)
  const [draft, setDraft] = useState(false)
  const [tab, setTab] = useState<'workflow' | 'layout'>('workflow')
  const isBottleneck = id === NEW_PURCHASE_WORKFLOW.id
  const base = isBottleneck ? (fixed || draft ? fixedNewPurchaseWorkflow() : NEW_PURCHASE_WORKFLOW) : allWorkflows(fixed).find((w) => w.id === id)

  if (!base)
    return (
      <div className="p-8">
        <FullProductCard title="Workflow not found" body="Pick a workflow from Configuration." />
      </div>
    )

  const editable = isBottleneck && !fixed
  const applyJira = (item: string) => {
    if (!editable || draft) return
    if (!item.includes('Jira')) {
      toast('Try “Create Jira Ticket” for the IT approval step', 'info')
      return
    }
    setDraft(true)
    toast('Added IT Approval Request → IT Approval Resolution (Jira)')
  }
  const states: Record<string, NodeState> = {}
  if (isBottleneck && !fixed && !draft) states['it-approval'] = 'warning'
  if (isBottleneck && draft && !fixed) {
    states['jira-request'] = 'new'
    states['jira-resolution'] = 'new'
  }
  if (isBottleneck && fixed) {
    states['jira-request'] = 'done'
    states['jira-resolution'] = 'done'
  }
  const status = isBottleneck ? (fixed ? 'Live' : draft ? 'Draft' : 'Live') : base.status
  const warnings = isBottleneck && !fixed && !draft ? 1 : 0

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Workflows', to: '/workflows' }, { label: 'Configuration', to: '/workflows' }, { label: base.name }]}
        title={
          <span className="flex items-center gap-2.5">
            {base.name}
            <StatusPill tone={status === 'Live' ? 'success' : 'neutral'}>{status}</StatusPill>
          </span>
        }
        meta={
          <span className="flex items-center gap-1.5">
            {warnings ? <TriangleAlert className="size-3.5 text-warning" /> : <CircleCheckBig className="size-3.5 text-success" />}
            {warnings} warning{warnings === 1 ? '' : 's'} and 3 notes · {base.requestType} · {base.version}
          </span>
        }
        actions={
          editable ? (
            <>
              <Button variant="secondary" disabled={!draft} onClick={() => toast('Draft saved', 'info')}>
                Save
              </Button>
              <Button
                disabled={!draft}
                onClick={() => {
                  advance('bottleneck', 'before', 'fixed')
                  setDraft(false)
                  toast('Workflow set as live: IT approvals now sync with Jira')
                }}
              >
                Set as Live
              </Button>
            </>
          ) : fixed && isBottleneck ? (
            <ButtonLink to="/insights/procurement">
              See the impact <ArrowRight className="size-4" />
            </ButtonLink>
          ) : undefined
        }
      />
      <div className="border-b border-line bg-white px-8">
        <div className="-mb-px flex gap-6">
          {(['workflow', 'layout'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={clsx('border-b-2 py-2.5 text-[14px] font-medium', tab === t ? 'border-primary text-primary' : 'border-transparent text-ink-2')}>
              {t === 'workflow' ? 'Workflow' : 'Page layout (5)'}
            </button>
          ))}
        </div>
      </div>
      <PageBody>
        {tab === 'layout' ? (
          <FullProductCard title="Page layout" body="Configure which fields each step shows (intake form, approval cards). Available in the full product." />
        ) : (
          <div className="space-y-4">
            {isBottleneck && !fixed && focus === 'it-approval' && !draft && (
              <div className="flex items-start gap-3 rounded-xl border border-primary/30 bg-primary-wash/70 px-4 py-3">
                <VerticeMark className="mt-0.5 size-5 shrink-0" />
                <p className="text-[13.5px] text-ink">
                  <b>Vertice AI:</b> The task is the <b>IT Approval</b> (highlighted). I recommend replacing it with a Jira integration so your IT Security team doesn’t duplicate work.
                  Drag <b>Create Jira Ticket</b> from the palette onto the canvas.
                </p>
              </div>
            )}
            <div className="grid gap-4 xl:grid-cols-[230px_1fr_260px]">
              <div className="h-[480px]">
                <Palette highlight={editable && !draft} onPick={applyJira} />
              </div>
              <div
                onDragOver={(e) => editable && e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  applyJira(e.dataTransfer.getData('text/plain'))
                }}
              >
                <WorkflowCanvas
                  key={`${draft}-${fixed}`}
                  workflow={base}
                  states={states}
                  height={480}
                  focusNode={isBottleneck ? (fixed || draft ? 'jira-request' : 'it-approval') : undefined}
                  badges={warnings ? { 'it-approval': <StatusPill tone="warning">1 warning</StatusPill> } : {}}
                />
              </div>
              <Card className="h-fit">
                <CardHeader title="Workflow Health" subtitle={`Tasks (${base.nodes.filter((n) => n.kind === 'approval' || n.kind === 'form').length})`} />
                <ul className="space-y-2 px-4 pb-4 text-[12.5px]">
                  {warnings ? (
                    <li className="rounded-lg border border-warning/40 bg-warning-tint/40 p-2.5">
                      <div className="flex items-center gap-1.5 font-semibold text-warning-ink">
                        <TriangleAlert className="size-3.5" /> IT Approval
                      </div>
                      <p className="mt-0.5 text-ink-2">No assignee. Tasks wait up to 7 days for manual pick-up.</p>
                    </li>
                  ) : (
                    <li className="flex items-center gap-1.5 rounded-lg border border-success/40 bg-success-tint/40 p-2.5 font-medium text-success-ink">
                      <CircleCheckBig className="size-3.5" /> No warnings
                    </li>
                  )}
                  {['Triage / Pre-Approval: default route used for “Pre-approved”', 'Legal Approval: SLA 3 days', 'Executive Approval: only above $250,000'].map((n) => (
                    <li key={n} className="rounded-lg bg-canvas p-2.5 text-ink-3">
                      Note · {n}
                    </li>
                  ))}
                </ul>
                <p className="px-4 pb-4 text-[11.5px] text-ink-4">If you are unsure how to resolve any validation errors, contact your Customer Success Manager.</p>
              </Card>
            </div>
            {isBottleneck && fixed && (
              <p className="text-[13px] text-ink-2">
                Live since today. IT approval tasks are now created in Jira and synced back automatically.{' '}
                <Link to="/insights/procurement" className="font-medium text-primary hover:underline">
                  View the impact in Procurement insights
                </Link>
              </p>
            )}
          </div>
        )}
      </PageBody>
    </>
  )
}
