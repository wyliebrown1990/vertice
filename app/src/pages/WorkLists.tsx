import { ArrowRight, Info } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PageBody, PageHeader } from '../components/layout/PageHeader'
import { RenewalAction } from '../components/renewal/RenewalAction'
import { Card } from '../components/ui/Card'
import { StatusPill } from '../components/ui/StatusPill'
import { VendorLogo } from '../components/ui/VendorLogo'
import { S1 } from '../data/scenario'
import { vendorById } from '../data/vendors'
import { STAGE_LABEL } from '../domain/selectors'
import { allTasks, taskVendor } from '../domain/tasks'
import { formatDate, usd } from '../lib/format'
import { requestPath } from '../lib/routes'
import { useDemo, useScenario } from '../store/demo'

const ScopeNote = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 flex items-start gap-2 text-[12.5px] text-ink-3">
    <Info className="mt-px size-3.5 shrink-0" />
    <span>{children}</span>
  </div>
)

/** Requests: this demo has exactly one request, the Salesforce renewal. */
export function RequestsList() {
  const request = useDemo((s) => s.request)
  const sf = vendorById(S1.vendorId)!
  return (
    <>
      <PageHeader title="Requests" meta={<span>Intake-to-procure requests for Northwind Systems</span>} />
      <PageBody>
        <Card>
          {request ? (
            <table className="w-full text-[13.5px]">
              <thead className="border-b border-line bg-canvas/60 text-left text-[12px] tracking-wide text-ink-3 uppercase">
                <tr>
                  <th className="px-4 py-2.5 font-medium">Request</th>
                  <th className="px-4 py-2.5 text-right font-medium">Cost</th>
                  <th className="px-4 py-2.5 font-medium">Active task</th>
                  <th className="px-4 py-2.5 font-medium">Created</th>
                  <th className="px-4 py-2.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-primary-wash">
                  <td className="px-4 py-3">
                    <Link to={requestPath} className="flex items-center gap-3">
                      <VendorLogo vendor={sf} size="sm" />
                      <span>
                        <span className="block font-medium text-ink">Salesforce renewal</span>
                        <span className="block text-[12px] text-ink-3">SaaS · Contract renewal</span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{usd(S1.currentAnnualCost)}</td>
                  <td className="px-4 py-3 text-ink-2">{STAGE_LABEL[request.stage]}</td>
                  <td className="px-4 py-3 text-ink-2">{formatDate(request.createdOn)}</td>
                  <td className="px-4 py-3">
                    <StatusPill tone={request.stage === 'completed' ? 'success' : 'info'}>{request.stage === 'completed' ? 'Completed' : 'In progress'}</StatusPill>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
              <p className="text-[14px] text-ink-2">No requests in progress.</p>
              <p className="text-[13px] text-ink-3">Salesforce is the largest upcoming renewal: notice deadline {formatDate(S1.noticeDeadline)}.</p>
              <RenewalAction size="sm" />
            </div>
          )}
        </Card>
        <ScopeNote>This demo covers one request, the Salesforce renewal. New purchases and sourcing are part of the full platform.</ScopeNote>
      </PageBody>
    </>
  )
}

export function TasksList() {
  const state = useScenario()
  const tasks = useMemo(() => allTasks(state), [state])
  return (
    <>
      <PageHeader title="Tasks" meta={<span>Open work across renewals and requests</span>} />
      <PageBody>
        <Card>
          <table className="w-full text-[13.5px]">
            <thead className="border-b border-line bg-canvas/60 text-left text-[12px] tracking-wide text-ink-3 uppercase">
              <tr>
                <th className="px-4 py-2.5 font-medium">Task</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
                <th className="px-4 py-2.5 font-medium">Assignee</th>
                <th className="px-4 py-2.5 font-medium">Context</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t.id} className="border-b border-line-soft last:border-0 hover:bg-primary-wash">
                  <td className="px-4 py-3 font-medium text-ink">{t.title}</td>
                  <td className="px-4 py-3">
                    <StatusPill tone={t.dueTone === 'danger' ? 'danger' : t.dueTone === 'warning' ? 'warning' : 'info'}>{t.due}</StatusPill>
                  </td>
                  <td className="px-4 py-3 text-ink-2">{t.assignee}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2 text-ink-2">
                      <VendorLogo vendor={taskVendor(t)} size="xs" /> {t.context}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link to={t.to} className="inline-flex items-center gap-1 text-[13px] font-medium text-primary hover:underline">
                      Open <ArrowRight className="size-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <ScopeNote>ZoomInfo and Gong open read-only contracts. The interactive workflow in this demo is the Salesforce renewal.</ScopeNote>
      </PageBody>
    </>
  )
}
