/**
 * Insights › Usage (Usage Analytics, Chapter E). SSO-sourced utilization,
 * shadow-IT Stack Review and the Asana / monday.com consolidation that turns
 * into a request.
 */
import { ChevronDown, ChevronRight, MoreVertical, Search, Sparkles } from 'lucide-react'
import { Fragment, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { askVertice } from '../../ai/engine'
import { PageBody, PageHeader } from '../../components/layout/PageHeader'
import { Button } from '../../components/ui/Button'
import { Card, CardHeader } from '../../components/ui/Card'
import { Logo, Segmented, Table, Td, THead, Tr, UtilizationBar } from '../../components/ui/kit'
import { StatusPill } from '../../components/ui/StatusPill'
import { CONSOLIDATION, consolidationDerived, SHADOW_IT, usageRows } from '../../data/chapters/insights'
import { reached } from '../../domain/flows'
import { formatDate, num, pct, usd } from '../../lib/format'
import { useDemo } from '../../store/demo'
import { useUi } from '../../store/ui'

type View = 'default' | 'all' | 'attention'

export function Usage() {
  const rows = useMemo(() => usageRows(), [])
  const [view, setView] = useState<View>('default')
  const [q, setQ] = useState('')
  const [open, setOpen] = useState<Record<string, boolean>>({ atlassian: false })
  const requested = useDemo((s) => reached(s, 'consolidation', 'requested'))
  const advance = useDemo((s) => s.advance)
  const toast = useUi((s) => s.toast)
  const navigate = useNavigate()
  const c = consolidationDerived()
  const attention = rows.filter((r) => r.utilization < 0.5)
  const shown = (view === 'attention' ? attention : view === 'default' ? rows.slice(0, 15) : rows).filter((r) => r.application.toLowerCase().includes(q.trim().toLowerCase()))
  const reqPath = `/intelligent-workflows/requests/${CONSOLIDATION.requestId}/overview`

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Insights' }, { label: 'Usage' }]}
        title="Usage insights"
        meta={<span>Last updated 11 hours ago · sign-in data from Okta and Google Workspace</span>}
        actions={
          <>
            <Button variant="secondary" onClick={() => askVertice('Tell me about application usage across my SaaS stack')}>
              <Sparkles className="size-4 text-primary" /> Ask Vertice AI
            </Button>
            <Button variant="ghost" aria-label="More">
              <MoreVertical className="size-4" />
            </Button>
          </>
        }
      />
      <PageBody className="space-y-5">
        <div className="grid items-start gap-5 xl:grid-cols-[1fr_380px]">
          <Card className="overflow-hidden border-primary/30">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-primary-wash/60 px-5 py-3">
              <span className="flex items-center gap-2 text-[14px] font-semibold text-ink">
                <Sparkles className="size-4 text-primary" /> Stack Consolidation
              </span>
              <StatusPill tone="violet">{usd(c.annualSaving)} / year</StatusPill>
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              {[
                { r: c.keep, tag: 'Keep', tone: 'success' as const },
                { r: c.drop, tag: 'Eliminate', tone: 'danger' as const },
              ].map(({ r, tag, tone }) => (
                <div key={r.vendor.id} className="rounded-xl border border-line p-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2.5">
                      <Logo id={r.vendor.id} size="sm" />
                      <span>
                        <span className="block font-medium text-ink">{r.vendor.name}</span>
                        <span className="block text-[12px] text-ink-3">
                          {r.vendor.department} · {usd(r.vendor.annualCost)}
                        </span>
                      </span>
                    </span>
                    <StatusPill tone={tone}>{tag}</StatusPill>
                  </div>
                  <div className="mt-3">
                    <UtilizationBar value={r.utilization} active={r.active} licensed={r.licensed} />
                  </div>
                  <div className="mt-2 text-[12px] text-ink-3">
                    Renews {formatDate(r.vendor.renewalDate)} · notice {formatDate(r.vendor.noticeDeadline!)}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 border-t border-line px-5 py-3.5">
              <p className="flex-1 text-[13px] text-ink-2">
                {num(c.combinedActive)} combined active users fit in Asana’s {num(c.keep.licensed)} licenses. Give monday.com notice by {formatDate(c.drop.vendor.noticeDeadline!)}.
              </p>
              {requested ? (
                <Button variant="secondary" onClick={() => navigate(reqPath)}>
                  View request
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    advance('consolidation', 'none', 'requested')
                    toast('Consolidation request created')
                    navigate(reqPath)
                  }}
                >
                  Create consolidation request
                </Button>
              )}
            </div>
          </Card>
          <Card>
            <CardHeader title="Stack Review" subtitle="Apps used without a contract or approval" />
            <Table>
              <THead cols={['Vendor', 'Users', 'Status']} />
              <tbody>
                {SHADOW_IT.map((a) => (
                  <Tr key={a.name}>
                    <Td>
                      <span className="flex items-center gap-2">
                        <span className="flex size-6 items-center justify-center rounded-[6px] text-[10px] font-bold text-white" style={{ backgroundColor: a.color }}>
                          {a.mono}
                        </span>
                        <span>
                          <span className="block font-medium text-ink">{a.name}</span>
                          <span className="block text-[11.5px] text-ink-3">
                            {a.foundVia} · ~{usd(a.spend)}/yr
                          </span>
                        </span>
                      </span>
                    </Td>
                    <Td>{a.users}</Td>
                    <Td>
                      <StatusPill tone="danger">Unapproved</StatusPill>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
            <div className="px-5 py-3">
              <Button size="sm" variant="secondary" onClick={() => toast('Owners asked to submit these through intake (simulated)', 'info')}>
                Route to intake
              </Button>
            </div>
          </Card>
        </div>

        <Card>
          <div className="flex flex-wrap items-center gap-3 border-b border-line px-4 py-3">
            <Segmented<View>
              value={view}
              onChange={setView}
              options={[
                { value: 'default', label: 'Default', count: Math.min(15, rows.length) },
                { value: 'all', label: 'All', count: rows.length },
                { value: 'attention', label: 'Needs attention', count: attention.length },
              ]}
            />
            <label className="ml-auto flex h-8 w-64 items-center gap-2 rounded-lg border border-line px-2.5 text-ink-3">
              <Search className="size-4" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search applications" className="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none" />
            </label>
          </div>
          <Table>
            <THead cols={['Application', 'Source', 'Utilization', 'Typically used', 'Last update']} />
            <tbody>
              {shown.map((r) => (
                <Fragment key={r.vendor.id}>
                  <Tr onClick={r.children ? () => setOpen((o) => ({ ...o, [r.vendor.id]: !o[r.vendor.id] })) : () => navigate(`/contracts/${r.vendor.id}/overview`)}>
                    <Td>
                      <span className="flex items-center gap-2.5">
                        {r.children ? open[r.vendor.id] ? <ChevronDown className="size-4 text-ink-3" /> : <ChevronRight className="size-4 text-ink-3" /> : <span className="w-4" />}
                        <Logo id={r.vendor.id} size="sm" />
                        <span>
                          <span className="block font-medium text-ink">{r.application}</span>
                          <span className="block text-[12px] text-ink-3">{r.vendor.product}</span>
                        </span>
                      </span>
                    </Td>
                    <Td className="text-ink-2">{r.source}</Td>
                    <Td>
                      <UtilizationBar value={r.utilization} active={r.active} licensed={r.licensed} />
                    </Td>
                    <Td className="text-ink-2">{r.typically}</Td>
                    <Td className="text-ink-3">{r.lastUpdate}</Td>
                  </Tr>
                  {r.children &&
                    open[r.vendor.id] &&
                    r.children.map((ch) => (
                      <Tr key={ch.application} className="bg-canvas/60">
                        <Td className="pl-16 text-ink-2">{ch.application}</Td>
                        <Td className="text-ink-2">{r.source}</Td>
                        <Td>
                          <UtilizationBar value={ch.utilization} active={ch.active} licensed={ch.licensed} />
                        </Td>
                        <Td className="text-ink-2">{ch.typically}</Td>
                        <Td className="text-ink-3">{r.lastUpdate}</Td>
                      </Tr>
                    ))}
                </Fragment>
              ))}
            </tbody>
          </Table>
          <p className="px-5 py-3 text-[12px] text-ink-3">
            Low usage is a prompt for the owner, not proof a tool can be cut. {pct(attention.length / rows.length)} of tracked apps are below 50% utilization.
          </p>
        </Card>
      </PageBody>
    </>
  )
}
