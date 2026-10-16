import clsx from 'clsx'
import { ArrowDown, ArrowUp, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageBody, PageHeader } from '../components/layout/PageHeader'
import { Card } from '../components/ui/Card'
import { StatusPill } from '../components/ui/StatusPill'
import { VendorLogo } from '../components/ui/VendorLogo'
import { vendors, type Vendor } from '../data/vendors'
import { Logo } from '../components/ui/kit'
import { newContracts } from '../domain/chapters'
import { flowStep } from '../domain/flows'
import { noticeDays, noticeUrgency, portfolioTotal, securedVendorIds } from '../domain/selectors'
import { vendorName } from '../data/directory'
import { formatDate, relativeDays, usd } from '../lib/format'
import { useScenario } from '../store/demo'

type SortKey = 'name' | 'department' | 'annualCost' | 'notice' | 'renewalDate'
type Filter = 'all' | 'notice60' | 'autorenew' | 'activity'

export function NoticeCell({ v }: { v: Vendor }) {
  const d = noticeDays(v)
  if (d === null) return <span className="text-ink-4">No auto-renewal</span>
  const u = noticeUrgency(v)
  return (
    <div>
      <div className="text-ink">{formatDate(v.noticeDeadline!)}</div>
      <div
        className={clsx(
          'text-[12px]',
          u === 'passed' ? 'font-medium text-danger-ink' : u === 'critical' ? 'font-medium text-danger-ink' : u === 'soon' ? 'text-warning-ink' : 'text-ink-3',
        )}
      >
        {u === 'passed' ? `Passed ${relativeDays(d)}` : relativeDays(d)}
      </div>
    </div>
  )
}

export function Contracts() {
  const state = useScenario()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'renewalDate', dir: 1 })
  const secured = useMemo(() => securedVendorIds(state), [state])
  const activeId = state.request && state.request.stage !== 'completed' ? state.request.vendorId : null
  const ana = flowStep(state, 'ana')
  const inProgress = useMemo(() => new Set([activeId, ana !== 'none' && ana !== 'completed' ? 'gong' : null].filter(Boolean)), [activeId, ana])
  const notLive = useMemo(() => newContracts(state), [state])

  const counts = useMemo(
    () => ({
      all: vendors.length,
      notice60: vendors.filter((v) => {
        const d = noticeDays(v)
        return d !== null && d <= 60
      }).length,
      autorenew: vendors.filter((v) => v.autoRenew).length,
      activity: inProgress.size + secured.size,
    }),
    [inProgress.size, secured],
  )

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase()
    const list = vendors.filter((v) => {
      if (term && !`${v.name} ${v.product} ${v.category} ${v.department}`.toLowerCase().includes(term)) return false
      if (filter === 'notice60') {
        const d = noticeDays(v)
        return d !== null && d <= 60
      }
      if (filter === 'autorenew') return v.autoRenew
      if (filter === 'activity') return inProgress.has(v.id) || secured.has(v.id)
      return true
    })
    const val = (v: Vendor): string | number =>
      sort.key === 'notice' ? (noticeDays(v) ?? 9999) : sort.key === 'name' ? v.name : sort.key === 'department' ? v.department : v[sort.key]
    return [...list].sort((a, b) => (val(a) > val(b) ? 1 : val(a) < val(b) ? -1 : 0) * sort.dir)
  }, [q, filter, sort, inProgress, secured])

  const th = (key: SortKey, label: string, right = false) => (
    <th className={clsx('px-4 py-2.5 text-[12px] font-medium tracking-wide text-ink-3 uppercase', right && 'text-right')}>
      <button
        onClick={() => setSort((s) => ({ key, dir: s.key === key ? ((-s.dir) as 1 | -1) : 1 }))}
        className={clsx('inline-flex items-center gap-1 hover:text-ink', sort.key === key && 'text-ink')}
        aria-label={`Sort by ${label}`}
      >
        {label}
        {sort.key === key && (sort.dir === 1 ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />)}
      </button>
    </th>
  )

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'notice60', label: 'Notice ≤ 60 days' },
    { id: 'autorenew', label: 'Auto-renews' },
    { id: 'activity', label: 'Renewal activity' },
  ]

  return (
    <>
      <PageHeader title="Contracts" meta={<span>Strategic SaaS portfolio · {vendors.length} live contracts · {usd(portfolioTotal())} annualized</span>} />
      <PageBody>
        <Card>
          <div className="flex flex-wrap items-center gap-3 border-b border-line px-4 py-3">
            <label className="flex h-9 w-[280px] items-center gap-2 rounded-lg border border-line px-2.5 text-ink-3 focus-within:border-primary/50">
              <Search className="size-4" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search contracts"
                aria-label="Search contracts"
                className="min-w-0 flex-1 bg-transparent text-[13.5px] text-ink outline-none placeholder:text-ink-4"
              />
            </label>
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter contracts">
              {filters.map((f) => (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={clsx(
                    'inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-[13px] font-medium',
                    filter === f.id ? 'border-ink bg-ink text-white' : 'border-line text-ink-2 hover:bg-canvas',
                  )}
                >
                  {f.label}
                  <span className={clsx('rounded px-1 text-[11.5px]', filter === f.id ? 'bg-white/15' : 'bg-line-soft text-ink-3')}>{counts[f.id]}</span>
                </button>
              ))}
            </div>
          </div>
          {rows.length === 0 ? (
            <div className="px-4 py-12 text-center text-[13.5px] text-ink-3">
              No contracts match.{' '}
              <button
                className="font-medium text-primary hover:underline"
                onClick={() => {
                  setQ('')
                  setFilter('all')
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <table className="w-full text-[13.5px]">
              <thead className="border-b border-line bg-canvas/60 text-left">
                <tr>
                  {th('name', 'Vendor')}
                  {th('department', 'Owner')}
                  {th('annualCost', 'Annual cost', true)}
                  {th('notice', 'Notice deadline')}
                  {th('renewalDate', 'Renewal date')}
                  <th className="px-4 py-2.5 text-[12px] font-medium tracking-wide text-ink-3 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((v) => (
                  <tr
                    key={v.id}
                    onClick={() => navigate(`/contracts/${v.id}/overview`)}
                    className="cursor-pointer border-b border-line-soft last:border-0 hover:bg-primary-wash"
                  >
                    <td className="px-4 py-2.5">
                      <Link to={`/contracts/${v.id}/overview`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-3">
                        <VendorLogo vendor={v} size="sm" />
                        <span>
                          <span className="block font-medium text-ink">{v.name}</span>
                          <span className="block text-[12px] text-ink-3">{v.product}</span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-2.5 text-ink-2">{v.department}</td>
                    <td className="px-4 py-2.5 text-right font-medium text-ink tabular-nums">{usd(v.annualCost)}</td>
                    <td className="px-4 py-2.5">
                      <NoticeCell v={v} />
                    </td>
                    <td className="px-4 py-2.5 text-ink-2">{formatDate(v.renewalDate)}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex flex-wrap gap-1">
                        <StatusPill tone="success">Live</StatusPill>
                        {inProgress.has(v.id) && <StatusPill tone="info">Renewal in progress</StatusPill>}
                        {secured.has(v.id) && <StatusPill tone="violet">Renewal secured</StatusPill>}
                      </div>
                    </td>
                  </tr>
                ))}
                {filter === 'all' &&
                  !q &&
                  notLive.map((c) => (
                    <tr key={c.vendorId} onClick={() => navigate(`/vendors/${c.vendorId}`)} className="cursor-pointer border-b border-line-soft bg-primary-wash/40 last:border-0 hover:bg-primary-wash">
                      <td className="px-4 py-2.5">
                        <span className="flex items-center gap-3">
                          <Logo id={c.vendorId} size="sm" />
                          <span>
                            <span className="block font-medium text-ink">{vendorName(c.vendorId)}</span>
                            <span className="block text-[12px] text-ink-3">{c.product}</span>
                          </span>
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-ink-2">{c.department}</td>
                      <td className="px-4 py-2.5 text-right font-medium text-ink tabular-nums">{usd(c.annualCost)}</td>
                      <td className="px-4 py-2.5 text-ink-4">Starts {formatDate(c.start)}</td>
                      <td className="px-4 py-2.5 text-ink-2">{formatDate(c.end)}</td>
                      <td className="px-4 py-2.5">
                        <StatusPill tone="warning">Not yet live</StatusPill>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </Card>
      </PageBody>
    </>
  )
}
