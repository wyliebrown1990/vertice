import clsx from 'clsx'
import {
  ArrowDownUp,
  ChevronDown,
  Cloud,
  CircleCheck,
  CircleHelp,
  FileText,
  Folder,
  Lightbulb,
  LayoutGrid,
  Monitor,
  Package,
  Percent,
  ReceiptText,
  Settings,
  ShoppingCart,
  Store,
  Tag,
  Workflow,
} from 'lucide-react'
import { useState, type ComponentType } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { personById, CURRENT_USER_ID } from '../../data/people'
import { myOpenTasks } from '../../domain/tasks'
import { useDemo } from '../../store/demo'
import { Avatar, VerticeMark } from '../ui/Avatar'
import { NotificationBell } from './NotificationBell'
import { SidebarSearch } from './SidebarSearch'

interface Item {
  label: string
  to: string
  icon: ComponentType<{ className?: string }>
  badge?: React.ReactNode
  /** Extra path prefixes that keep this item active. */
  match?: string[]
}

function NavItem({ item }: { item: Item }) {
  const { pathname } = useLocation()
  const extra = item.match?.some((m) => pathname.startsWith(m))
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        clsx(
          'group flex h-9 items-center gap-3 rounded-lg px-3 text-[14px] font-medium transition-colors',
          isActive || extra ? 'bg-primary-tint text-primary' : 'text-ink-2 hover:bg-line-soft hover:text-ink',
        )
      }
    >
      <item.icon className="size-[18px] shrink-0 stroke-[1.7]" />
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge}
    </NavLink>
  )
}

interface SubItem {
  label: string
  to: string
  /** Extra path prefixes that keep this entry active (e.g. other Analytics tabs). */
  match?: string[]
}

const subActive = (pathname: string, i: SubItem) => pathname.startsWith(i.to) || !!i.match?.some((m) => pathname.startsWith(m))

function Group({ label, icon: Icon, items }: { label: string; icon: Item['icon']; items: SubItem[] }) {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(() => items.some((i) => subActive(pathname, i)))
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex h-9 w-full items-center gap-3 rounded-lg px-3 text-[14px] font-medium text-ink-2 hover:bg-line-soft hover:text-ink"
      >
        <Icon className="size-[18px] stroke-[1.7]" />
        <span className="flex-1 text-left">{label}</span>
        <ChevronDown className={clsx('size-4 text-ink-4 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="mt-0.5 ml-[21px] space-y-0.5 border-l border-line pl-3">
          {items.map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              end
              className={({ isActive }) =>
                clsx(
                  'flex h-8 items-center rounded-md px-2.5 text-[13.5px]',
                  isActive || subActive(pathname, i) ? 'bg-primary-tint font-medium text-primary' : 'text-ink-3 hover:bg-line-soft hover:text-ink',
                )
              }
            >
              {i.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

const CountBadge = ({ n }: { n: number }) => (
  <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-white">
    {n}
  </span>
)

export function Sidebar() {
  const openTasks = useDemo((s) => myOpenTasks(s).length)
  const me = personById(CURRENT_USER_ID)

  const primary: Item[] = [
    { label: 'Dashboard', to: '/dashboard', icon: LayoutGrid },
    { label: 'Tasks', to: '/tasks', icon: CircleCheck, badge: <CountBadge n={openTasks} /> },
    { label: 'Requests', to: '/intelligent-workflows/requests', icon: ArrowDownUp },
    { label: 'Contracts', to: '/contracts', icon: FileText },
    {
      label: 'Documents',
      to: '/documents',
      icon: Folder,
      badge: <span className="rounded-full bg-primary-tint px-1.5 py-px text-[10.5px] font-semibold text-primary">New</span>,
    },
  ]
  const buying: Item[] = [
    { label: 'Offers', to: '/offers', icon: Tag },
    { label: 'Catalog purchases', to: '/catalog', icon: ShoppingCart },
    { label: 'Purchase orders', to: '/purchase-orders', icon: Monitor },
    { label: 'Orders', to: '/orders', icon: Package },
    { label: 'Invoices', to: '/invoices', icon: ReceiptText },
    { label: 'Savings', to: '/savings', icon: Percent },
  ]

  return (
    <aside className="flex h-full w-[248px] shrink-0 flex-col border-r border-line bg-sidebar">
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <NavLink to="/dashboard" className="flex items-center gap-1.5" aria-label="Vertice dashboard">
          <VerticeMark className="size-[26px]" />
          <span className="text-[21px] font-bold tracking-[-0.04em] text-ink">vertice</span>
        </NavLink>
        <NotificationBell />
      </div>
      <div className="px-3">
        <SidebarSearch />
      </div>
      <nav className="mt-3 flex-1 space-y-0.5 overflow-y-auto px-3 pb-3" aria-label="Main">
        {primary.map((i) => (
          <NavItem key={i.to} item={i} />
        ))}
        <div className="mx-2 my-3 border-t border-line" />
        {buying.map((i) => (
          <NavItem key={i.to} item={i} />
        ))}
        <div className="mx-2 my-3 border-t border-line" />
        <Group
          label="Insights"
          icon={Lightbulb}
          items={[
            { label: 'Analytics', to: '/analytics/spend-insights', match: ['/analytics/'] },
            { label: 'Procurement', to: '/insights/procurement' },
            { label: 'Usage', to: '/insights/usage' },
            { label: 'Budgets', to: '/insights/budgets' },
            { label: 'AI spend', to: '/insights/ai-spend' },
          ]}
        />
        <Group
          label="Vendors"
          icon={Store}
          items={[
            { label: 'Directory', to: '/vendors', match: ['/vendors/'] },
            { label: 'Expert Engage', to: '/expert-engage' },
          ]}
        />
        <Group
          label="Workflows"
          icon={Workflow}
          items={[
            { label: 'Configuration', to: '/workflows', match: ['/workflows/edit/'] },
            { label: 'Templates', to: '/workflows/templates' },
          ]}
        />
        <Group
          label="Cloud Optimizer"
          icon={Cloud}
          items={[
            { label: 'Overview', to: '/cloud/overview' },
            { label: 'Optimization', to: '/cloud/optimization' },
            { label: 'RI Optimizer', to: '/cloud/ri-optimizer' },
            { label: 'PPA/EDP', to: '/cloud/edp' },
          ]}
        />
      </nav>
      <div className="space-y-0.5 border-t border-line px-3 py-3">
        <NavItem item={{ label: 'Help', to: '/outside/help', icon: CircleHelp }} />
        <NavItem item={{ label: 'Settings', to: '/settings/integrations', icon: Settings, match: ['/settings/'] }} />
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <Avatar name={me.name} tone="violet" />
          <div className="min-w-0 leading-tight">
            <div className="truncate text-[13.5px] font-medium text-ink">{me.name}</div>
            <div className="truncate text-[12px] text-ink-3">Northwind Systems</div>
          </div>
        </div>
        <p className="px-3 pt-1 text-[10.5px] leading-snug text-ink-4">
          Demo concept by Wylie Brown · fictional data · scripted AI · not affiliated with Vertice
        </p>
      </div>
    </aside>
  )
}
