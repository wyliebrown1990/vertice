import clsx from 'clsx'
import { Fragment, type ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'

export interface Crumb {
  label: string
  to?: string
}

export function PageHeader({
  crumbs,
  title,
  icon,
  meta,
  actions,
  tabs,
}: {
  crumbs?: Crumb[]
  title: ReactNode
  icon?: ReactNode
  meta?: ReactNode
  actions?: ReactNode
  tabs?: { label: string; to: string; end?: boolean }[]
}) {
  return (
    <header className="border-b border-line bg-white px-8 pt-5">
      {crumbs && (
        <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-2 text-[13.5px] text-ink-3">
          {crumbs.map((c, i) => (
            <Fragment key={c.label}>
              {i > 0 && <span className="text-ink-4">/</span>}
              {c.to ? (
                <Link to={c.to} className="hover:text-ink">
                  {c.label}
                </Link>
              ) : (
                <span className="text-ink-2">{c.label}</span>
              )}
            </Fragment>
          ))}
        </nav>
      )}
      <div className={clsx('flex flex-wrap items-center justify-between gap-4', tabs ? 'pb-4' : 'pb-5')}>
        <div className="flex min-w-0 items-center gap-3.5">
          {icon}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-[22px] font-semibold tracking-[-0.02em] text-ink">{title}</h1>
            </div>
            {meta && <div className="mt-1 flex flex-wrap items-center gap-2 text-[13px] text-ink-3">{meta}</div>}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {tabs && (
        <div className="-mb-px flex gap-6" role="tablist">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              role="tab"
              className={({ isActive }) =>
                clsx(
                  'border-b-2 pb-2.5 text-[14px] font-medium transition-colors',
                  isActive ? 'border-primary text-primary' : 'border-transparent text-ink-2 hover:text-ink',
                )
              }
            >
              {t.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}

export function PageBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx('px-8 pt-6 pb-16', className)}>{children}</div>
}
