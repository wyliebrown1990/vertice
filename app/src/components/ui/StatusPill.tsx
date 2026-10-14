import clsx from 'clsx'
import type { ReactNode } from 'react'

export type PillTone = 'success' | 'warning' | 'danger' | 'info' | 'violet' | 'neutral' | 'outline'

const tones: Record<PillTone, string> = {
  success: 'bg-success-tint text-success-ink',
  warning: 'bg-warning-tint text-warning-ink',
  danger: 'bg-danger-tint text-danger-ink',
  info: 'bg-secondary-tint text-secondary',
  violet: 'bg-primary-tint text-primary',
  neutral: 'bg-line-soft text-ink-2',
  outline: 'border border-line text-ink-2 bg-white',
}

export function StatusPill({
  tone = 'neutral',
  children,
  icon,
  className,
}: {
  tone?: PillTone
  children: ReactNode
  icon?: ReactNode
  className?: string
}) {
  return (
    <span
      className={clsx(
        'inline-flex h-[22px] items-center gap-1 rounded-full px-2 text-[12px] font-medium leading-none whitespace-nowrap',
        tones[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
