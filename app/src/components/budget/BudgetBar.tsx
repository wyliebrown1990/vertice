import type { DeptBudget } from '../../data/chapters/budgets'
import { usd } from '../../lib/format'

const SEGMENTS = [
  { key: 'paid', label: 'Paid', color: '#6000F0' },
  { key: 'invoiced', label: 'Invoiced', color: '#8B4DF8' },
  { key: 'committed', label: 'Committed', color: '#B795FF' },
] as const

/** Paid · Invoiced · Committed · (This request) · Free, as on Vertice's budget screens. */
export function BudgetBar({ budget, request }: { budget: DeptBudget; request?: number }) {
  const parts = [
    ...SEGMENTS.map((s) => ({ label: s.label, value: budget[s.key], color: s.color })),
    ...(request ? [{ label: 'This request', value: request, color: '#F5A524' }] : []),
    { label: 'Free', value: budget.free - (request ?? 0), color: '#E1E7EF' },
  ]
  return (
    <div>
      <div className="flex h-3 overflow-hidden rounded-full bg-line-soft">
        {parts.map((p) => (
          <div key={p.label} style={{ width: `${(Math.max(0, p.value) / budget.budget) * 100}%`, backgroundColor: p.color }} title={`${p.label}: ${usd(p.value)}`} />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px]">
        {parts.map((p) => (
          <span key={p.label} className="inline-flex items-center gap-1.5 text-ink-3">
            <span className="size-2.5 rounded-sm" style={{ backgroundColor: p.color }} />
            {p.label} <span className="font-medium text-ink tabular-nums">{usd(p.value)}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
