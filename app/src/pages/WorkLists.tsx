import { ArrowRight, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NewRequestChooser } from '../components/dashboard/NewRequestChooser'
import { PageBody, PageHeader } from '../components/layout/PageHeader'
import { VerticeMark } from '../components/ui/Avatar'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Logo, Segmented, Table, Td, THead, Tr } from '../components/ui/kit'
import { StatusPill } from '../components/ui/StatusPill'
import { requestRows } from '../domain/chapters'
import { allTasks } from '../domain/tasks'
import { formatDate, usd } from '../lib/format'
import { useScenario } from '../store/demo'

type ReqFilter = 'all' | 'progress' | 'completed'

/** Requests: every chapter request in flight plus read-only history. */
export function RequestsList() {
  const state = useScenario()
  const rows = useMemo(() => requestRows(state), [state])
  const [filter, setFilter] = useState<ReqFilter>('all')
  const [mine, setMine] = useState(false)
  const [chooser, setChooser] = useState(false)
  const navigate = useNavigate()
  const shown = rows.filter(
    (r) =>
      (filter === 'all' || (filter === 'progress' ? r.status === 'In progress' : r.status === 'Completed')) &&
      (!mine || r.assignee.includes('Alex Morgan')),
  )
  return (
    <>
      <PageHeader
        title="Requests"
        meta={<span>Intake-to-procure requests for Northwind Systems</span>}
        actions={
          <Button onClick={() => setChooser(true)}>
            <Plus className="size-4" /> New request
          </Button>
        }
      />
      <PageBody>
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <Segmented<ReqFilter>
            value={filter}
            onChange={setFilter}
            options={[
              { value: 'all', label: 'All', count: rows.length },
              { value: 'progress', label: 'In progress', count: rows.filter((r) => r.status === 'In progress').length },
              { value: 'completed', label: 'Completed', count: rows.filter((r) => r.status === 'Completed').length },
            ]}
          />
          <label className="ml-auto flex items-center gap-2 text-[13px] text-ink-2">
            <input type="checkbox" checked={mine} onChange={(e) => setMine(e.target.checked)} className="size-4 accent-[var(--color-primary)]" />
            My requests only
          </label>
        </div>
        <Card>
          <Table>
            <THead cols={['Request', { label: 'Cost', right: true }, 'Active task', 'Assignees', 'Date', 'Status']} />
            <tbody>
              {shown.map((r) => (
                <Tr key={r.id} onClick={() => navigate(r.to)}>
                  <Td>
                    <Link to={r.to} className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      <Logo id={r.logoId} size="sm" />
                      <span className="min-w-0">
                        <span className="block font-medium text-ink">{r.title}</span>
                        <span className="block text-[12px] text-ink-3">{r.type}</span>
                      </span>
                    </Link>
                  </Td>
                  <Td right>
                    <span className="block text-ink">{usd(r.cost)}</span>
                    <span className="block text-[11.5px] text-ink-3">{r.costCaption}</span>
                  </Td>
                  <Td>
                    <span className="flex items-center gap-1.5 text-ink-2">
                      {r.verticeLed && <VerticeMark className="size-4" />}
                      {r.activeTask}
                    </span>
                  </Td>
                  <Td className="text-ink-2">{r.assignee}</Td>
                  <Td>
                    <span className="block text-ink-2">{formatDate(r.date)}</span>
                    <span className="block text-[11.5px] text-ink-3">{r.dateCaption}</span>
                  </Td>
                  <Td>
                    <StatusPill tone={r.status === 'Completed' ? 'success' : 'info'}>{r.status}</StatusPill>
                  </Td>
                </Tr>
              ))}
              {shown.length === 0 && (
                <tr>
                  <Td colSpan={6} className="py-10 text-center text-ink-3">
                    No requests match this filter.
                  </Td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      </PageBody>
      <NewRequestChooser open={chooser} onOpenChange={setChooser} />
    </>
  )
}

type TaskFilter = 'all' | 'mine'

export function TasksList() {
  const state = useScenario()
  const tasks = useMemo(() => allTasks(state), [state])
  const [filter, setFilter] = useState<TaskFilter>('all')
  const shown = filter === 'mine' ? tasks.filter((t) => t.mine) : tasks
  return (
    <>
      <PageHeader title="Tasks" meta={<span>Open work across renewals and requests</span>} />
      <PageBody>
        <Segmented<TaskFilter>
          className="mb-3"
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'all', label: 'All', count: tasks.length },
            { value: 'mine', label: 'My tasks', count: tasks.filter((t) => t.mine).length },
          ]}
        />
        <Card>
          <Table>
            <THead cols={['Task', 'Status', 'Assignees', 'Request', '']} />
            <tbody>
              {shown.map((t) => (
                <Tr key={t.id}>
                  <Td className="font-medium text-ink">{t.title}</Td>
                  <Td>
                    <StatusPill tone={t.dueTone === 'danger' ? 'danger' : t.dueTone === 'warning' ? 'warning' : 'info'}>{t.due}</StatusPill>
                  </Td>
                  <Td className="text-ink-2">{t.assignee}</Td>
                  <Td>
                    <span className="flex items-center gap-2 text-ink-2">
                      <Logo id={t.vendorId} size="xs" /> {t.context}
                    </span>
                  </Td>
                  <Td right>
                    <Link to={t.to} className="inline-flex items-center gap-1 text-[13px] font-medium text-primary hover:underline">
                      Open <ArrowRight className="size-3.5" />
                    </Link>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </PageBody>
    </>
  )
}
