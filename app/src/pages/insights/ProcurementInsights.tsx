/**
 * Insights › Procurement (Chapter E2). Tasks, requests, spend and cycle times;
 * Vertice AI finds the Security Review bottleneck and jumps into the workflow.
 * Numbers switch to the "after" set once the Jira fix is live.
 */
import clsx from 'clsx'
import { ArrowRight, Download, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { askVertice } from '../../ai/engine'
import { Bars } from '../../components/charts/charts'
import { PageBody, PageHeader } from '../../components/layout/PageHeader'
import { Button } from '../../components/ui/Button'
import { Card, CardHeader } from '../../components/ui/Card'
import { Logo, Segmented } from '../../components/ui/kit'
import { StatusPill } from '../../components/ui/StatusPill'
import { ACTIVE_TASKS, PROCUREMENT_KPIS, SPEND_6M, TASK_HISTOGRAM } from '../../data/chapters/insights'
import { reached } from '../../domain/flows'
import { usd, usdCompact } from '../../lib/format'
import { useDemo } from '../../store/demo'

const Tile = ({ label, active, overdue, fixed }: { label: string; active: number; overdue: number; fixed: boolean }) => (
  <Card className="p-4">
    <div className="text-[13px] text-ink-3">{label}</div>
    <div className="mt-2 flex items-end gap-6">
      <div>
        <div className="text-[24px] font-semibold text-ink tabular-nums">{active}</div>
        <div className="text-[12px] text-ink-3">Active</div>
      </div>
      <div>
        <div className={clsx('text-[24px] font-semibold tabular-nums', overdue ? 'text-danger-ink' : fixed ? 'text-success-ink' : 'text-ink')}>{overdue}</div>
        <div className="text-[12px] text-ink-3">Overdue</div>
      </div>
    </div>
  </Card>
)

export function ProcurementInsights() {
  const fixed = useDemo((s) => reached(s, 'bottleneck', 'fixed'))
  const k = fixed ? PROCUREMENT_KPIS.after : PROCUREMENT_KPIS.before
  const [taskTab, setTaskTab] = useState<'all' | 'unassigned'>('all')
  const tasks = ACTIVE_TASKS.filter((t) => !fixed || !t.overdue)
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Insights' }, { label: 'Procurement' }]}
        title="Procurement insights"
        meta={<span>Requests, tasks, spend and cycle times across Northwind’s workflows</span>}
        actions={
          <>
            <Button variant="secondary" onClick={() => askVertice('What is the main bottleneck in my SaaS - New Purchase request workflow?')}>
              <Sparkles className="size-4 text-primary" /> Find bottlenecks
            </Button>
            <Button variant="ghost" aria-label="Download">
              <Download className="size-4" />
            </Button>
          </>
        }
      />
      <PageBody className="space-y-5">
        {fixed && (
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-success/40 bg-success-tint/50 px-4 py-3 text-[13.5px] text-success-ink">
            <StatusPill tone="success">Jira steps live</StatusPill>
            IT approvals now sync with Jira: Security Review {PROCUREMENT_KPIS.before.securityReviewDays} → {k.securityReviewDays} days, no overdue tasks.
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Tile label="Tasks" active={k.activeTasks} overdue={k.overdueTasks} fixed={fixed} />
          <Tile label="Requests" active={k.activeRequests} overdue={k.overdueRequests} fixed={fixed} />
          <Card className="p-4">
            <div className="text-[13px] text-ink-3">In-flight spend</div>
            <div className="mt-2 text-[24px] font-semibold text-ink tabular-nums">{usd(PROCUREMENT_KPIS.inFlightSpend)}</div>
            <div className="text-[12px] text-ink-3">Across active requests</div>
          </Card>
          <Card className="p-4">
            <div className="text-[13px] text-ink-3">Total spend</div>
            <div className="mt-2 text-[24px] font-semibold text-ink tabular-nums">{usd(PROCUREMENT_KPIS.totalSpend30d)}</div>
            <div className="text-[12px] text-ink-3">Last 30 days</div>
          </Card>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.2fr_1fr]">
          <Card>
            <CardHeader
              title="Active tasks"
              action={
                <Segmented
                  value={taskTab}
                  onChange={setTaskTab}
                  options={[
                    { value: 'all', label: 'All' },
                    { value: 'unassigned', label: 'Unassigned' },
                  ]}
                />
              }
            />
            <ul className="divide-y divide-line-soft px-5 pb-3">
              {tasks
                .filter((t) => taskTab === 'all' || t.task.includes('Security') || t.task.includes('IT'))
                .map((t) => (
                  <li key={t.task + t.vendor} className="flex items-center gap-3 py-2.5">
                    <Logo id={t.vendor} size="xs" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[13.5px] font-medium text-ink">{t.task}</div>
                      <div className="text-[12px] text-ink-3">{t.type}</div>
                    </div>
                    <StatusPill tone={t.overdue ? 'danger' : 'info'}>{t.overdue ? `Overdue · ${t.days}d` : `Active ${t.days}d`}</StatusPill>
                  </li>
                ))}
            </ul>
          </Card>
          <Card className="p-5">
            <div className="text-[15px] font-semibold text-ink">Request cycle time</div>
            <p className="text-[12px] text-ink-3">Last 6 months · average days to complete</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-line p-3.5">
                <div className="text-[12px] text-ink-3">SaaS - New Purchase</div>
                <div className={clsx('mt-0.5 text-[22px] font-semibold tabular-nums', fixed ? 'text-success-ink' : 'text-ink')}>{k.newPurchaseCycleDays} days</div>
              </div>
              <div className="rounded-xl border border-line p-3.5">
                <div className="text-[12px] text-ink-3">SaaS - Contract Renewal</div>
                <div className="mt-0.5 text-[22px] font-semibold text-ink tabular-nums">{PROCUREMENT_KPIS.renewalCycleDays} days</div>
              </div>
            </div>
            <div className={clsx('mt-4 rounded-xl border p-3.5', fixed ? 'border-success/40 bg-success-tint/40' : 'border-warning/40 bg-warning-tint/40')}>
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-medium text-ink">Slowest step: SaaS - Security Review</span>
                <span className={clsx('font-semibold tabular-nums', fixed ? 'text-success-ink' : 'text-warning-ink')}>{k.securityReviewDays} days</span>
              </div>
              {!fixed && (
                <Link to="/workflows/edit/new-purchase-advanced?focus=it-approval" className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-primary hover:underline">
                  Take me to the flow <ArrowRight className="size-3.5" />
                </Link>
              )}
            </div>
          </Card>
        </div>

        <div className="grid gap-5 xl:grid-cols-3">
          <Card className="p-5">
            <div className="text-[15px] font-semibold text-ink">Task completion time</div>
            <p className="text-[12px] text-ink-3">Last 30 days · number of tasks by days to complete</p>
            <div className="mt-4">
              <Bars data={TASK_HISTOGRAM.buckets.map((b, i) => ({ label: b, values: [(fixed ? TASK_HISTOGRAM.after : TASK_HISTOGRAM.before)[i]] }))} series={[{ name: 'Tasks', color: '#6000F0' }]} />
            </div>
          </Card>
          <Card className="p-5">
            <div className="text-[15px] font-semibold text-ink">Total spend</div>
            <p className="text-[12px] text-ink-3">Last 6 months · new vs renewed</p>
            <div className="mt-4">
              <Bars
                data={SPEND_6M.map((m) => ({ label: m.month, values: [m.newSpend, m.renewed] }))}
                series={[
                  { name: 'New spend', color: '#8B4DF8' },
                  { name: 'Renewed spend', color: '#6000F0' },
                ]}
                format={usdCompact}
              />
            </div>
          </Card>
          <Card className="p-5">
            <div className="text-[15px] font-semibold text-ink">Requests</div>
            <p className="text-[12px] text-ink-3">
              Last 6 months · completed on time vs late · {PROCUREMENT_KPIS.requests90d.succeeded} succeeded, {PROCUREMENT_KPIS.requests90d.rejected} rejected (90 days)
            </p>
            <div className="mt-4">
              <Bars
                data={SPEND_6M.map((m) => ({ label: m.month, values: [m.onTime, m.late] }))}
                series={[
                  { name: 'On time', color: '#16A239' },
                  { name: 'Late', color: '#DC2828' },
                ]}
              />
            </div>
          </Card>
        </div>
      </PageBody>
    </>
  )
}
