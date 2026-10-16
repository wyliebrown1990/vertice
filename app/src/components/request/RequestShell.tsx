/**
 * Shared pieces for full-demo request pages: header with tabs, the
 * "Progress overview" chain, detail rows and the people card. Visual language
 * matches the S1 request page.
 */
import clsx from 'clsx'
import { ArrowRight, CircleCheckBig, Clock3, Hourglass } from 'lucide-react'
import type { ReactNode } from 'react'
import { personById } from '../../data/people'
import { PageHeader } from '../layout/PageHeader'
import { Avatar, VerticeMark } from '../ui/Avatar'
import { Card, CardHeader } from '../ui/Card'
import { Logo } from '../ui/kit'
import { StatusPill } from '../ui/StatusPill'

export function RequestHeader({
  id,
  title,
  logoId,
  completed,
  meta,
  actions,
  tabs,
}: {
  id: string
  title: string
  logoId: string
  completed: boolean
  meta: ReactNode
  actions?: ReactNode
  tabs?: string[]
}) {
  const base = `/intelligent-workflows/requests/${id}`
  return (
    <PageHeader
      crumbs={[{ label: 'Requests', to: '/intelligent-workflows/requests' }, { label: title }]}
      icon={<Logo id={logoId} size="lg" />}
      title={
        <span className="flex items-center gap-2.5">
          {title}
          <StatusPill tone={completed ? 'success' : 'info'}>{completed ? 'Completed' : 'In progress'}</StatusPill>
        </span>
      }
      meta={meta}
      actions={actions}
      tabs={tabs?.map((t) => ({ label: t, to: `${base}/${t.toLowerCase()}` }))}
    />
  )
}

export type ChainState = 'done' | 'active' | 'pending'

export function Chain({ steps, title = 'Progress overview' }: { steps: { label: string; owner: string; state: ChainState; sub?: string; vertice?: boolean }[]; title?: string }) {
  return (
    <Card>
      <CardHeader title={title} />
      <ol className="flex items-stretch gap-2 overflow-x-auto px-5 pb-5" aria-label="Request progress">
        {steps.map((c, i) => (
          <li key={c.label} className="flex min-w-[118px] flex-1 items-center gap-2">
            <div
              className={clsx(
                'min-w-0 flex-1 rounded-xl border-2 px-2.5 py-3 text-center',
                c.state === 'done' ? 'border-success/60 bg-white' : c.state === 'active' ? 'border-primary bg-primary-wash' : 'border-line bg-white text-ink-3',
              )}
            >
              <div className="flex justify-center">
                {c.state === 'done' ? (
                  <CircleCheckBig className="size-5 text-success" />
                ) : c.state === 'active' ? (
                  c.vertice ? <VerticeMark className="size-5" /> : <Clock3 className="size-5 text-primary" />
                ) : (
                  <Hourglass className="size-5 text-ink-4" />
                )}
              </div>
              <div className={clsx('mt-1.5 text-[13px] leading-tight font-semibold', c.state === 'pending' ? 'text-ink-3' : 'text-ink')}>{c.label}</div>
              <div className="mt-0.5 text-[11.5px] text-ink-3">{c.sub ?? (c.state === 'done' ? 'Completed' : c.state === 'active' ? 'In progress' : 'Not started')}</div>
              <div className="mt-1 truncate text-[11px] text-ink-4">{c.owner}</div>
            </div>
            {i < steps.length - 1 && <ArrowRight className={clsx('size-4 shrink-0', c.state === 'done' ? 'text-success' : 'text-ink-4')} />}
          </li>
        ))}
      </ol>
    </Card>
  )
}

export function DetailRows({ title = 'Request details', rows }: { title?: string; rows: [string, ReactNode][] }) {
  return (
    <Card>
      <CardHeader title={title} />
      <div className="divide-y divide-line-soft px-5 pb-3">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 py-2 text-[13.5px]">
            <span className="text-ink-3">{k}</span>
            <span className="text-right font-medium text-ink">{v}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export function PeopleCard({ people }: { people: { id?: string; name?: string; title?: string; role: string; vertice?: boolean; ai?: boolean }[] }) {
  return (
    <Card>
      <CardHeader title="People" />
      <ul className="space-y-3 px-5 pb-5">
        {people.map((x) => {
          const p = x.id ? personById(x.id) : null
          const name = p?.name ?? x.name ?? ''
          const title = p?.title ?? x.title ?? ''
          const vertice = x.vertice ?? p?.org === 'Vertice'
          return (
            <li key={`${name}-${x.role}`} className="flex items-center gap-3">
              {x.ai ? (
                <span className="bg-ai-orb flex size-6 items-center justify-center rounded-full text-[10px] font-bold text-white">A</span>
              ) : vertice ? (
                <VerticeMark className="size-6" />
              ) : (
                <Avatar name={name} tone={x.id === 'alex-morgan' ? 'violet' : 'neutral'} />
              )}
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-medium text-ink">{name}</div>
                <div className="text-[12px] text-ink-3">{title}</div>
              </div>
              <span className="text-[12px] text-ink-3">{x.role}</span>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
