/**
 * Small shared primitives for the full-demo screens: tables, segmented filters,
 * KPI tiles, logos for any directory vendor, AI agent chips and scope cards.
 */
import clsx from 'clsx'
import { Check, Compass, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import { logoVendor } from '../../data/directory'
import { Card } from './Card'
import { Tip } from './Overlay'
import { VendorLogo } from './VendorLogo'

/* ---------- Tables ---------- */

export function Table({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx('overflow-x-auto', className)}>
      <table className="w-full text-[13.5px]">{children}</table>
    </div>
  )
}

export function THead({ cols }: { cols: (string | { label: ReactNode; right?: boolean; className?: string })[] }) {
  return (
    <thead className="border-b border-line bg-canvas/60 text-left text-[12px] tracking-wide text-ink-3 uppercase">
      <tr>
        {cols.map((c, i) => {
          const col = typeof c === 'string' ? { label: c } : c
          return (
            <th key={i} className={clsx('px-4 py-2.5 font-medium whitespace-nowrap', 'right' in col && col.right && 'text-right', 'className' in col && col.className)}>
              {col.label}
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

export const Td = ({ children, right, className, colSpan }: { children?: ReactNode; right?: boolean; className?: string; colSpan?: number }) => (
  <td colSpan={colSpan} className={clsx('px-4 py-3 align-middle', right && 'text-right tabular-nums', className)}>
    {children}
  </td>
)

export const Tr = ({ children, onClick, className }: { children: ReactNode; onClick?: () => void; className?: string }) => (
  <tr onClick={onClick} className={clsx('border-b border-line-soft last:border-0', onClick && 'cursor-pointer hover:bg-primary-wash', className)}>
    {children}
  </tr>
)

/* ---------- Segmented filter (All · In progress 3 · Completed) ---------- */

export function Segmented<T extends string>({
  value,
  onChange,
  options,
  className,
}: {
  value: T
  onChange: (v: T) => void
  options: { value: T; label: ReactNode; count?: number }[]
  className?: string
}) {
  return (
    <div role="tablist" className={clsx('inline-flex rounded-lg border border-line bg-white p-0.5', className)}>
      {options.map((o) => (
        <button
          key={o.value}
          role="tab"
          aria-selected={value === o.value}
          onClick={() => onChange(o.value)}
          className={clsx(
            'inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[13px] font-medium whitespace-nowrap',
            value === o.value ? 'bg-primary-tint text-primary' : 'text-ink-2 hover:text-ink',
          )}
        >
          {o.label}
          {o.count !== undefined && <span className={clsx('text-[12px]', value === o.value ? 'text-primary/70' : 'text-ink-4')}>{o.count}</span>}
        </button>
      ))}
    </div>
  )
}

/* ---------- KPI tiles ---------- */

export function Kpi({ label, value, sub, tone, info, className }: { label: ReactNode; value: ReactNode; sub?: ReactNode; tone?: 'success' | 'danger' | 'violet'; info?: ReactNode; className?: string }) {
  return (
    <Card className={clsx('p-4', className)}>
      <div className="flex items-center gap-1 text-[12.5px] text-ink-3">
        {label}
        {info && (
          <Tip content={info}>
            <button className="text-ink-4 hover:text-ink" aria-label="More info">
              ⓘ
            </button>
          </Tip>
        )}
      </div>
      <div
        className={clsx(
          'mt-1 text-[22px] font-semibold tracking-[-0.02em] tabular-nums',
          tone === 'success' ? 'text-success-ink' : tone === 'danger' ? 'text-danger-ink' : tone === 'violet' ? 'text-primary' : 'text-ink',
        )}
      >
        {value}
      </div>
      {sub && <div className="mt-0.5 text-[12px] text-ink-3">{sub}</div>}
    </Card>
  )
}

/* ---------- Logos for any vendor id (portfolio, prospects, unknown) ---------- */

export function Logo({ id, size = 'sm', className }: { id: string; size?: 'xs' | 'sm' | 'md' | 'lg'; className?: string }) {
  const v = logoVendor(id)
  if (!v)
    return (
      <span className={clsx('inline-flex shrink-0 items-center justify-center rounded-[7px] bg-primary-tint text-primary', size === 'xs' ? 'size-6' : size === 'sm' ? 'size-7' : size === 'md' ? 'size-9' : 'size-12', className)}>
        <Sparkles className="size-[55%]" />
      </span>
    )
  return <VendorLogo vendor={v} size={size} className={className} />
}

/* ---------- AI agent chip ---------- */

export function AgentChip({ name, className }: { name: string; className?: string }) {
  return (
    <span className={clsx('inline-flex h-[22px] items-center gap-1 rounded-full bg-primary-tint px-2 text-[11.5px] font-semibold text-primary', className)}>
      <Sparkles className="size-3" /> {name}
    </span>
  )
}

/* ---------- Vertical stepper ---------- */

export function Stepper({ steps, current, onSelect }: { steps: string[]; current: number; onSelect?: (i: number) => void }) {
  return (
    <ol className="space-y-1">
      {steps.map((s, i) => {
        const done = i < current
        const active = i === current
        return (
          <li key={s}>
            <button
              disabled={!onSelect || i > current}
              onClick={() => onSelect?.(i)}
              className={clsx(
                'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px]',
                active ? 'bg-primary-wash font-medium text-primary' : done ? 'text-ink hover:bg-line-soft' : 'text-ink-3',
              )}
            >
              <span
                className={clsx(
                  'flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold',
                  done ? 'bg-success text-white' : active ? 'bg-primary text-white' : 'border border-line bg-white text-ink-3',
                )}
              >
                {done ? <Check className="size-3" strokeWidth={3} /> : i + 1}
              </span>
              {s}
            </button>
          </li>
        )
      })}
    </ol>
  )
}

/* ---------- "Available in the full product" card ---------- */

export function FullProductCard({ title, body, className }: { title: string; body: ReactNode; className?: string }) {
  return (
    <Card className={clsx('flex flex-col items-center px-8 py-12 text-center', className)}>
      <span className="flex size-11 items-center justify-center rounded-2xl bg-primary-tint text-primary">
        <Compass className="size-5" />
      </span>
      <p className="mt-4 text-[12px] font-semibold tracking-wide text-primary uppercase">Available in the full product</p>
      <h3 className="mt-1 text-[17px] font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-[460px] text-[13.5px] leading-relaxed text-ink-2">{body}</p>
    </Card>
  )
}

/* ---------- Demo transition (presenter time-compression, same look as S1) ---------- */

export function DemoNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx('flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-primary/40 bg-primary-wash/60 px-4 py-3', className)}>
      {children}
      <span className="text-[12px] text-ink-3">Demo transition: compresses time that would normally pass. Nothing is sent to a vendor.</span>
    </div>
  )
}

/* ---------- Simple progress bar ---------- */

export function Meter({ value, tone = 'violet', className }: { value: number; tone?: 'violet' | 'success' | 'warning' | 'danger' | 'info'; className?: string }) {
  const color = { violet: 'bg-primary', success: 'bg-success', warning: 'bg-warning', danger: 'bg-danger', info: 'bg-secondary' }[tone]
  return (
    <div className={clsx('h-2 overflow-hidden rounded-full bg-line-soft', className)}>
      <div className={clsx('h-full rounded-full', color)} style={{ width: `${Math.max(2, Math.min(100, value * 100))}%` }} />
    </div>
  )
}

/** Utilization bar with % chip and "active / licensed", colored like the real Usage page. */
export function UtilizationBar({ value, active, licensed }: { value: number; active: number; licensed: number }) {
  const tone = value > 1 ? 'info' : value >= 0.8 ? 'success' : value >= 0.5 ? 'warning' : 'danger'
  const chip = { info: 'bg-secondary-tint text-secondary', success: 'bg-success-tint text-success-ink', warning: 'bg-warning-tint text-warning-ink', danger: 'bg-danger-tint text-danger-ink' }[tone]
  return (
    <div className="flex min-w-[220px] items-center gap-2.5">
      <Meter value={value} tone={tone} className="w-24" />
      <span className={clsx('rounded-md px-1.5 py-0.5 text-[11.5px] font-semibold tabular-nums', chip)}>{Math.round(value * 100)}%</span>
      <span className="text-[12px] text-ink-3 tabular-nums">
        {active.toLocaleString('en-US')}/{licensed.toLocaleString('en-US')}
      </span>
    </div>
  )
}

/** Section heading used inside page bodies. */
export const SectionTitle = ({ children, action }: { children: ReactNode; action?: ReactNode }) => (
  <div className="mb-2.5 flex items-center justify-between gap-3">
    <h2 className="text-[14px] font-semibold text-ink">{children}</h2>
    {action}
  </div>
)
