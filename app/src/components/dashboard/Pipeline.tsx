import clsx from 'clsx'
import { Check, ChevronDown } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Vendor } from '../../data/vendors'
import { noticeDays, pipeline, securedVendorIds } from '../../domain/selectors'
import type { DemoState } from '../../domain/types'
import { formatDate, monthLabel, relativeDays, usd, usdCompact } from '../../lib/format'
import { Card } from '../ui/Card'
import { Tip } from '../ui/Overlay'
import { VendorLogo } from '../ui/VendorLogo'

const VISIBLE = 3

function TileTip({ v, secured }: { v: Vendor; secured: boolean }) {
  const nd = noticeDays(v)
  return (
    <div className="space-y-1">
      <div className="font-semibold">
        {v.name} <span className="font-normal text-white/60">· {v.product}</span>
      </div>
      <div className="flex justify-between gap-6">
        <span className="text-white/60">Annual cost</span>
        <span className="tabular-nums">{usd(v.annualCost)}</span>
      </div>
      <div className="flex justify-between gap-6">
        <span className="text-white/60">Renewal date</span>
        <span>{formatDate(v.renewalDate)}</span>
      </div>
      <div className="flex justify-between gap-6">
        <span className="text-white/60">Notice deadline</span>
        <span className={clsx(nd !== null && nd < 0 && 'text-red-300', nd !== null && nd >= 0 && nd <= 14 && 'text-amber-300')}>
          {v.noticeDeadline ? `${formatDate(v.noticeDeadline)} (${relativeDays(nd!)})` : 'No auto-renewal'}
        </span>
      </div>
      {secured && <div className="pt-1 text-emerald-300">Renewal secured · new term signed</div>}
    </div>
  )
}

export function Pipeline({ state }: { state: DemoState }) {
  const hasActive = !!state.request && state.request.stage !== 'completed'
  const [view, setView] = useState<'upcoming' | 'in-progress'>('upcoming')
  const [expanded, setExpanded] = useState<string | null>(null)
  const navigate = useNavigate()
  const cols = useMemo(() => pipeline(state, view), [state, view])
  const secured = useMemo(() => securedVendorIds(state), [state])
  const empty = cols.every((c) => c.vendors.length === 0)
  const maxRows = Math.max(VISIBLE, ...cols.map((c) => (expanded === c.month ? c.vendors.length : Math.min(c.vendors.length, VISIBLE))))

  return (
    <Card>
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <div>
          <h3 className="text-[15px] font-semibold text-ink">Pipeline</h3>
          <p className="mt-0.5 text-[12.5px] text-ink-3">Strategic renewals by month · annual value of contracts pending renewal</p>
        </div>
        <div className="flex rounded-lg border border-line bg-canvas p-0.5 text-[12.5px] font-medium" role="tablist" aria-label="Pipeline view">
          {(['in-progress', 'upcoming'] as const).map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={clsx('rounded-md px-3 py-1', view === v ? 'bg-white text-ink shadow-sm' : 'text-ink-3 hover:text-ink')}
            >
              {v === 'in-progress' ? `In progress${hasActive ? ' · 1' : ''}` : 'Upcoming'}
            </button>
          ))}
        </div>
      </div>

      {empty ? (
        <div className="flex h-[230px] flex-col items-center justify-center gap-2 text-[13.5px] text-ink-3">
          No renewals are in progress yet.
          <button className="font-medium text-primary hover:underline" onClick={() => setView('upcoming')}>
            Show upcoming renewals
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto px-5 pb-4">
          <div className="grid min-w-[860px] grid-cols-12 gap-0">
            {cols.map((c) => {
              const isOpen = expanded === c.month
              const shown = isOpen ? c.vendors : c.vendors.slice(0, VISIBLE)
              const more = c.vendors.length - shown.length
              return (
                <div key={c.month} className="flex flex-col border-r border-dashed border-line-soft last:border-r-0">
                  <div className="flex flex-col-reverse items-center gap-1.5 px-1 pt-2" style={{ minHeight: 40 + maxRows * 42 }}>
                    {shown.map((v) => {
                      const isSecured = secured.has(v.id)
                      const flagship = v.id === 'salesforce'
                      return (
                        <Tip key={v.id} content={<TileTip v={v} secured={isSecured} />} side="top">
                          <button
                            onClick={() => navigate(`/contracts/${v.id}/overview`)}
                            aria-label={`${v.name}, ${usd(v.annualCost)}, renews ${formatDate(v.renewalDate)}`}
                            className={clsx(
                              'relative rounded-[10px] p-[3px] transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5',
                              flagship && !isSecured && 'ring-2 ring-primary/35 ring-offset-1',
                            )}
                          >
                            <VendorLogo vendor={v} size="sm" className={clsx(isSecured && 'opacity-45')} />
                            {isSecured && (
                              <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-success text-white ring-2 ring-white">
                                <Check className="size-2.5" strokeWidth={3} />
                              </span>
                            )}
                          </button>
                        </Tip>
                      )
                    })}
                  </div>
                  <div className="flex h-7 items-center justify-center">
                    {more > 0 && (
                      <button
                        onClick={() => setExpanded(c.month)}
                        className="rounded-full bg-line-soft px-1.5 text-[11px] font-semibold text-ink-2 hover:bg-primary-tint hover:text-primary"
                        aria-label={`Show ${more} more in ${monthLabel(c.month)}`}
                      >
                        +{more}
                      </button>
                    )}
                    {isOpen && c.vendors.length > VISIBLE && (
                      <button onClick={() => setExpanded(null)} className="text-ink-4 hover:text-ink" aria-label="Collapse">
                        <ChevronDown className="size-3.5 rotate-180" />
                      </button>
                    )}
                  </div>
                  <div className="border-t border-line pt-2 text-center">
                    <div className="text-[13px] font-semibold text-ink tabular-nums">{c.total ? usdCompact(c.total) : '–'}</div>
                    <div className="text-[11.5px] text-ink-3">{monthLabel(c.month)}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </Card>
  )
}
