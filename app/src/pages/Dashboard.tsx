import clsx from 'clsx'
import { ChevronRight, Info, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GAUGE_COLORS } from '../components/charts/palette'
import { SpendGauge } from '../components/charts/SpendGauge'
import { NewRequestChooser } from '../components/dashboard/NewRequestChooser'
import { Pipeline } from '../components/dashboard/Pipeline'
import { PageBody } from '../components/layout/PageHeader'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Tip } from '../components/ui/Overlay'
import { StatusPill } from '../components/ui/StatusPill'
import { VendorLogo } from '../components/ui/VendorLogo'
import { SAVINGS_PERIOD_LABEL } from '../data/savingsHistory'
import { Logo } from '../components/ui/kit'
import { recommendations } from '../data/chapters/insights'
import { newContracts, requestRows } from '../domain/chapters'
import { allFutureTerms, liveContractCount, portfolioTotal, savingsSummary, spendByDepartment } from '../domain/selectors'
import { myOpenTasks, taskVendor } from '../domain/tasks'
import { formatDate, pct, usd } from '../lib/format'
import { useScenario } from '../store/demo'

function SavingsHero({ justAdded }: { justAdded: number | null }) {
  const state = useScenario()
  const s = useMemo(() => savingsSummary(state), [state])
  return (
    <div className={clsx('bg-vertice-hero relative overflow-hidden rounded-[var(--radius-card)] p-5 text-white', justAdded && 'animate-savings-flash')}>
      <div className="flex items-center gap-1.5 text-[13.5px] text-white/85">
        Total savings
        <Tip
          content={
            <>
              Contracted annualized reductions from {s.count} completed renewals, weighted against their pre-renewal costs (
              {usd(s.baseline)}). Not cash already received.
            </>
          }
        >
          <button aria-label="About total savings" className="text-white/70 hover:text-white">
            <Info className="size-3.5" />
          </button>
        </Tip>
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-[32px] font-semibold tracking-[-0.03em] tabular-nums">{usd(s.reduction)}</span>
        {justAdded ? <span className="rounded-full bg-white/20 px-2 py-0.5 text-[12px] font-semibold">+{usd(justAdded)}</span> : null}
      </div>
      <div className="text-[12px] text-white/75">{SAVINGS_PERIOD_LABEL}</div>
      <div className="mt-7 flex items-center justify-between text-[13px] text-white/90">
        <span>Average savings</span>
        <span className="rounded-md bg-white/15 px-1.5 py-0.5 font-semibold tabular-nums">{pct(s.weightedPct)}</span>
      </div>
    </div>
  )
}

function SpendCard() {
  const slices = useMemo(() => spendByDepartment(5), [])
  const total = portfolioTotal()
  return (
    <Card className="flex h-full flex-col">
      <div className="px-5 pt-4">
        <h3 className="text-[15px] font-semibold text-ink">Annualized spend</h3>
        <p className="mt-0.5 text-[12.5px] text-ink-3">Strategic SaaS portfolio · current terms</p>
      </div>
      <div className="mt-3">
        <SpendGauge
          slices={slices.map((s, i) => ({ label: s.department, value: s.amount, color: GAUGE_COLORS[i] }))}
          center={
            <>
              <div className="text-[12px] text-ink-3">Total</div>
              <div className="text-[22px] font-semibold tracking-[-0.02em] text-ink tabular-nums">{usd(total)}</div>
            </>
          }
        />
      </div>
      <p className="mt-2 text-center text-[12px] text-ink-3">Annual spend by department</p>
      <ul className="mt-3 space-y-1.5 px-5 pb-4 text-[13px]">
        {slices.map((s, i) => (
          <li key={s.department} className="flex items-center gap-2">
            <span className="h-3 w-1 rounded-full" style={{ backgroundColor: GAUGE_COLORS[i] }} />
            <span className="flex-1 text-ink-2">{s.department}</span>
            <span className="font-medium text-ink tabular-nums">{usd(s.amount)}</span>
            <span className="w-9 text-right text-ink-3 tabular-nums">{pct(s.share)}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

function TasksCard() {
  const state = useScenario()
  const tasks = useMemo(() => myOpenTasks(state), [state])
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-5 pt-4">
        <h3 className="text-[15px] font-semibold text-ink">My active tasks</h3>
        <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-white">{tasks.length}</span>
      </div>
      <ul className="mt-3 flex-1 space-y-2 px-4">
        {tasks.map((t) => {
          const v = taskVendor(t)
          return (
            <li key={t.id}>
              <Link to={t.to} className="block rounded-xl border border-line p-3 hover:border-primary/40 hover:bg-primary-wash">
                <div className="flex items-center justify-between">
                  <StatusPill tone={t.dueTone === 'danger' ? 'danger' : t.dueTone === 'warning' ? 'warning' : 'info'}>{t.due}</StatusPill>
                </div>
                <div className="mt-2 flex items-center gap-2.5">
                  <VendorLogo vendor={v} size="sm" />
                  <div className="min-w-0">
                    <div className="truncate text-[13.5px] font-medium text-ink">{t.title}</div>
                    <div className="truncate text-[12px] text-ink-3">{t.context}</div>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to="/tasks" className="flex items-center gap-1 px-5 py-3.5 text-[13px] font-medium text-ink-2 hover:text-primary">
        All tasks <ChevronRight className="size-3.5" />
      </Link>
    </Card>
  )
}

function RequestsCard() {
  const state = useScenario()
  const rows = useMemo(() => requestRows(state).filter((r) => r.status === 'In progress').slice(0, 5), [state])
  return (
    <Card>
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <h3 className="text-[15px] font-semibold text-ink">Requests</h3>
        <Link to="/intelligent-workflows/requests" className="flex items-center gap-1 text-[13px] font-medium text-ink-2 hover:text-primary">
          All requests <ChevronRight className="size-3.5" />
        </Link>
      </div>
      <table className="w-full text-[13px]">
        <thead className="text-left text-[11.5px] tracking-wide text-ink-3 uppercase">
          <tr className="border-b border-line">
            <th className="px-5 py-2 font-medium">Request</th>
            <th className="px-3 py-2 text-right font-medium">Cost</th>
            <th className="px-3 py-2 font-medium">Active task</th>
            <th className="px-5 py-2 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-line-soft last:border-0 hover:bg-primary-wash">
              <td className="px-5 py-2.5">
                <Link to={r.to} className="flex items-center gap-2.5">
                  <Logo id={r.logoId} size="xs" />
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-ink">{r.title}</span>
                    <span className="block text-[11.5px] text-ink-3">{r.type}</span>
                  </span>
                </Link>
              </td>
              <td className="px-3 py-2.5 text-right text-ink tabular-nums">{usd(r.cost)}</td>
              <td className="px-3 py-2.5 text-ink-2">{r.activeTask}</td>
              <td className="px-5 py-2.5 text-ink-3">
                {formatDate(r.date)}
                <span className="block text-[11px]">{r.dateCaption}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}

function OpportunityCard() {
  const rec = useMemo(() => recommendations(), [])
  return (
    <Card className="flex flex-col p-5">
      <div className="text-[13.5px] text-ink-3">Savings opportunity</div>
      <div className="mt-1 text-[28px] font-semibold tracking-[-0.02em] text-ink tabular-nums">{usd(rec.totals.all)}</div>
      <p className="text-[12px] text-ink-3">Estimated annual savings across the portfolio</p>
      <ul className="mt-4 space-y-2 text-[13px]">
        {[
          ['Deduplication', rec.totals.dedupe],
          ['Term commitment', rec.totals.term],
          ['Right-sizing', rec.totals.rightsize],
        ].map(([k, v]) => (
          <li key={k} className="flex justify-between">
            <span className="text-ink-2">{k}</span>
            <span className="font-medium text-ink tabular-nums">{usd(v as number)}</span>
          </li>
        ))}
      </ul>
      <Link to="/analytics/recommendations" className="mt-auto flex items-center gap-1 pt-4 text-[13px] font-medium text-primary hover:underline">
        View recommendations <ChevronRight className="size-3.5" />
      </Link>
    </Card>
  )
}

export function Dashboard() {
  const state = useScenario()
  const [chooser, setChooser] = useState(false)
  const location = useLocation()
  const justAdded = (location.state as { savingsAdded?: number } | null)?.savingsAdded ?? null
  const signedLater = allFutureTerms(state).length
  const notLive = newContracts(state).length

  return (
    <>
      <div className="flex items-center justify-between border-b border-line bg-white px-8 py-4">
        <h1 className="text-[20px] font-semibold tracking-[-0.02em] text-ink">Welcome, Alex!</h1>
        <Button onClick={() => setChooser(true)}>
          <Plus className="size-4" /> New request
        </Button>
      </div>
      <PageBody className="space-y-5">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <SavingsHero justAdded={justAdded} />
            <Card className="flex flex-1 flex-col justify-between p-5">
              <div>
                <div className="text-[13.5px] text-ink-3">Live contracts</div>
                <div className="mt-1 text-[28px] font-semibold tracking-[-0.02em] text-ink tabular-nums">{liveContractCount()}</div>
              </div>
              <div className="mt-4 space-y-1.5 text-[13px]">
                <div className={clsx('flex justify-between', notLive ? 'font-medium text-ink' : 'text-ink-3')}>
                  <span>Not yet live</span>
                  <span className="tabular-nums">{notLive}</span>
                </div>
                <div className={clsx('flex justify-between', signedLater ? 'font-medium text-success-ink' : 'text-ink-3')}>
                  <span>Signed renewals starting later</span>
                  <span className="tabular-nums">{signedLater}</span>
                </div>
              </div>
            </Card>
          </div>
          <SpendCard />
          <TasksCard />
        </div>
        <Pipeline state={state} />
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
          <RequestsCard />
          <OpportunityCard />
        </div>
      </PageBody>
      <NewRequestChooser open={chooser} onOpenChange={setChooser} />
    </>
  )
}
