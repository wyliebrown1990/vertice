import clsx from 'clsx'
import type { HTMLAttributes, ReactNode } from 'react'

export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx('rounded-[var(--radius-card)] border border-line bg-surface shadow-[var(--shadow-card)]', className)}
      {...rest}
    />
  )
}

export function CardHeader({
  title,
  subtitle,
  action,
  className,
}: {
  title: ReactNode
  subtitle?: ReactNode
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={clsx('flex items-start justify-between gap-3 px-5 pt-4 pb-3', className)}>
      <div className="min-w-0">
        <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
        {subtitle && <p className="mt-0.5 text-[12.5px] text-ink-3">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

/** Small uppercase-free label + value pair used across detail grids. */
export function Field({ label, value, sub, className }: { label: ReactNode; value: ReactNode; sub?: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <div className="text-[12.5px] text-ink-3">{label}</div>
      <div className="mt-1 text-[15px] font-medium text-ink">{value}</div>
      {sub && <div className="mt-0.5 text-[12.5px] text-ink-3">{sub}</div>}
    </div>
  )
}
