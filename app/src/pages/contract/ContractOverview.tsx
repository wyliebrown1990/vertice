import clsx from 'clsx'
import { BarChart3, CalendarClock, Info, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { PageBody } from '../../components/layout/PageHeader'
import { Avatar, VerticeMark } from '../../components/ui/Avatar'
import { Card, CardHeader, Field } from '../../components/ui/Card'
import { Tip } from '../../components/ui/Overlay'
import { StatusPill } from '../../components/ui/StatusPill'
import { personById } from '../../data/people'
import { savingsHistory } from '../../data/savingsHistory'
import { S1 } from '../../data/scenario'
import type { Vendor } from '../../data/vendors'
import { noticeDays, noticeUrgency, s1Summary } from '../../domain/selectors'
import { daysFromToday, formatDate, num, pct, relativeDays, usd } from '../../lib/format'
import { useDemo } from '../../store/demo'
import { useUi } from '../../store/ui'
import { RenewalAction } from '../../components/renewal/RenewalAction'
import { requestPath } from '../../lib/routes'

const addDays = (iso: string, days: number) => {
  const d = new Date(`${iso}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}
const minusYear = (iso: string) => `${Number(iso.slice(0, 4)) - 1}${iso.slice(4)}`

function LifecycleRow({ title, date, sub, tone, done, badge }: { title: string; date: string | null; sub: string; tone?: 'danger' | 'warning'; done?: boolean; badge?: ReactNode }) {
  return (
    <li className="relative flex gap-3 pb-5 last:pb-0">
      <span className={clsx('relative z-10 mt-1 size-3 shrink-0 rounded-full border-2', done ? 'border-success bg-success' : tone === 'danger' ? 'border-danger bg-white' : tone === 'warning' ? 'border-warning bg-white' : 'border-ink-4 bg-white')} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[14px] font-medium text-ink">{title}</span>
          <span className="text-[13.5px] text-ink-2 tabular-nums">{date ? formatDate(date) : '–'}</span>
        </div>
        {badge && <div className="mt-1">{badge}</div>}
        <div className="mt-0.5 text-[12.5px] text-ink-3">{sub}</div>
      </div>
    </li>
  )
}

function Lifecycle({ vendor }: { vendor: Vendor }) {
  const isS1 = vendor.id === 'salesforce'
  const start = isS1 ? S1.termStart : addDays(minusYear(vendor.renewalDate), 1)
  const sign = isS1 ? S1.signDate : addDays(start, -12)
  const nd = noticeDays(vendor)
  const urgency = noticeUrgency(vendor)
  const termDays = daysFromToday(vendor.renewalDate)
  const future = useDemo((s) => s.futureTerms.find((t) => t.vendorId === vendor.id))
  return (
    <Card>
      <CardHeader title="Lifecycle" />
      <ol className="relative px-5 pb-5 before:absolute before:top-2 before:bottom-8 before:left-[25.5px] before:w-px before:bg-line">
        <LifecycleRow title="Sign date" date={sign} sub="When the current contract was signed" done />
        <LifecycleRow title="Start date" date={start} sub="Current contract period began" done />
        <LifecycleRow
          title="Notice deadline"
          date={vendor.noticeDeadline}
          tone={urgency === 'passed' || urgency === 'critical' ? 'danger' : urgency === 'soon' ? 'warning' : undefined}
          badge={
            nd === null ? (
              <StatusPill tone="neutral">No auto-renewal</StatusPill>
            ) : (
              <StatusPill tone={urgency === 'passed' || urgency === 'critical' ? 'danger' : urgency === 'soon' ? 'warning' : 'neutral'} icon={<CalendarClock className="size-3" />}>
                {nd < 0 ? `Passed ${relativeDays(nd)}` : `${nd} days left`}
              </StatusPill>
            )
          }
          sub={vendor.autoRenew ? 'Last day to give notice before the contract auto-renews' : 'Notice period before the term ends'}
        />
        <LifecycleRow
          title="Term end"
          date={vendor.renewalDate}
          badge={<StatusPill tone="neutral">{termDays} days</StatusPill>}
          sub={vendor.autoRenew ? 'Renews automatically unless notice is given' : 'Current term ends; a new agreement is needed'}
        />
      </ol>
      <div className="mx-5 mb-5 grid grid-cols-2 rounded-xl border border-line px-4 py-3">
        <Field label="Contract length" value="12 months" />
        <Field label="Billing frequency" value="Annually" />
      </div>
      {future && (
        <div className="mx-5 mb-5 rounded-xl border border-primary/30 bg-primary-wash px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-[13.5px] font-medium text-ink">Next term · signed</span>
            <StatusPill tone="violet">Starts {formatDate(future.start)}</StatusPill>
          </div>
          <div className="mt-1 text-[12.5px] text-ink-3">
            {formatDate(future.start)} – {formatDate(future.end)} · {num(future.seats)} seats · {usd(future.annualCost)}/yr
          </div>
          <Link to={`/contracts/${vendor.id}/outcomes`} className="mt-1.5 inline-block text-[12.5px] font-medium text-primary hover:underline">
            View outcome
          </Link>
        </div>
      )}
    </Card>
  )
}

function SalesforceSummary() {
  const d = s1Summary()
  const stage = useDemo((s) => s.request?.stage)
  const setAiOpen = useUi((s) => s.setAiOpen)
  const completed = stage === 'completed'
  return (
    <div className="rounded-[var(--radius-card)] border border-primary/45 bg-white p-5 shadow-[0_0_0_4px_rgb(96_0_240/0.05)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[14px] font-semibold text-ink">
          <Sparkles className="size-4 text-primary" /> AI summary
        </div>
        <StatusPill tone="violet">Scripted demo summary</StatusPill>
      </div>
      {completed ? (
        <p className="mt-2.5 text-[14px] leading-relaxed text-ink-2">
          The current Salesforce term stays live at <b className="text-ink">{usd(S1.currentAnnualCost)}</b> until {formatDate(S1.termEnd)}. A renewal is
          signed for {num(S1.targetSeats)} seats at <b className="text-ink">{usd(d.futureAnnualCost)}</b> a year from {formatDate(S1.nextTermStart)}, an annual
          reduction of <b className="text-success-ink">{usd(d.annualReduction)}</b> ({pct(d.annualReductionPct)}).
        </p>
      ) : (
        <p className="mt-2.5 text-[14px] leading-relaxed text-ink-2">
          Salesforce costs <b className="text-ink">{usd(S1.currentAnnualCost)}</b> a year for {num(S1.currentSeats)} seats, but only{' '}
          <b className="text-ink">{num(S1.activeUsers28d)}</b> users ({pct(d.utilizationPct)}) were active in the last 28 days. The vendor has quoted a{' '}
          <b className="text-warning-ink">{pct(S1.quoteUpliftPct)} uplift</b> on the same scope ({usd(d.openingQuote)}). The notice deadline is{' '}
          <b className="text-ink">{formatDate(S1.noticeDeadline)}, in {d.noticeDays} days</b>, ahead of the term end on {formatDate(S1.termEnd)}.
        </p>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Link to="/contracts/salesforce/benchmark" className="inline-flex h-8 items-center gap-1.5 rounded-[7px] border border-line px-3 text-[13px] font-medium text-ink hover:bg-canvas">
          <BarChart3 className="size-4" /> View benchmark
        </Link>
        <button
          onClick={() => setAiOpen(true)}
          className="inline-flex h-8 items-center gap-1.5 rounded-[7px] border border-primary/30 bg-primary-wash px-3 text-[13px] font-medium text-primary hover:border-primary/60"
        >
          <Sparkles className="size-4" /> Ask Vertice AI
        </button>
        {!completed && <RenewalAction size="sm" />}
      </div>
    </div>
  )
}

function GenericSummary({ vendor }: { vendor: Vendor }) {
  const nd = noticeDays(vendor)
  const hist = savingsHistory.find((r) => r.vendorId === vendor.id)
  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-white p-5">
      <div className="text-[14px] font-semibold text-ink">Contract summary</div>
      <p className="mt-2 text-[14px] leading-relaxed text-ink-2">
        {vendor.name} {vendor.product} costs <b className="text-ink">{usd(vendor.annualCost)}</b> a year and is owned by {vendor.department}.{' '}
        {vendor.utilization !== null ? `Seat utilization was ${pct(vendor.utilization)} in the last 28 days. ` : 'Pricing is usage-based. '}
        {nd === null
          ? `It does not auto-renew; the term ends ${formatDate(vendor.renewalDate)}.`
          : nd < 0
            ? `The notice deadline passed ${relativeDays(nd)}, so it will auto-renew on ${formatDate(vendor.renewalDate)}.`
            : `The notice deadline is ${formatDate(vendor.noticeDeadline!)} (${relativeDays(nd)}).`}
        {hist && ` Last renewed through Vertice on ${formatDate(hist.completedOn)} with a ${usd(hist.annualReduction)} annual reduction.`}
      </p>
      <div className="mt-4 flex items-start gap-2 rounded-lg bg-canvas px-3 py-2.5 text-[12.5px] text-ink-3">
        <Info className="mt-px size-3.5 shrink-0" />
        <span>
          Read-only contract. This demo’s interactive renewal is{' '}
          <Link to="/contracts/salesforce/overview" className="font-medium text-primary hover:underline">
            Salesforce
          </Link>
          .
        </span>
      </div>
    </div>
  )
}

export function ContractOverview() {
  const vendor = useOutletContext<Vendor>()
  const isS1 = vendor.id === 'salesforce'
  const d = s1Summary()
  const request = useDemo((s) => s.request)
  const owner = personById(S1.owner)
  const buyer = personById(S1.buyer)
  const alex = personById('alex-morgan')

  return (
    <PageBody>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-5">
          {isS1 ? <SalesforceSummary /> : <GenericSummary vendor={vendor} />}

          <Card>
            <CardHeader title="Contract details" />
            <div className="grid grid-cols-1 gap-x-8 gap-y-5 border-b border-line-soft px-5 pb-5 sm:grid-cols-2">
              <Field
                label={
                  <span className="inline-flex items-center gap-1">
                    Annualized contract value
                    <Tip content="Current term’s annual cost (12-month term, so ACV equals TCV).">
                      <button aria-label="About annualized contract value" className="text-ink-4 hover:text-ink">
                        <Info className="size-3.5" />
                      </button>
                    </Tip>
                  </span>
                }
                value={<span className="text-[18px] font-semibold">{usd(vendor.annualCost)}</span>}
                sub={`${usd(vendor.annualCost)} TCV`}
              />
              {isS1 && (
                <Field
                  label="Vendor renewal quote"
                  value={<span className="text-[18px] font-semibold">{usd(d.openingQuote)}</span>}
                  sub={<span className="text-warning-ink">+{pct(S1.quoteUpliftPct)} on the same {num(S1.currentSeats)} seats</span>}
                />
              )}
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 px-5 py-5 sm:grid-cols-3">
              <Field label="Department" value={vendor.department} />
              <Field label="To be renewed by" value={isS1 ? 'Vertice' : 'Northwind'} />
              <Field label="Purchased from reseller" value="No" />
              <Field label="Payment terms" value={isS1 ? S1.paymentTerms : 'Net 30'} />
              <Field label="Contract currency" value="USD" />
              <Field label="Auto-renewal" value={vendor.autoRenew ? 'Yes' : 'No'} />
            </div>
          </Card>

          {isS1 && (
            <Card>
              <CardHeader title="Products" subtitle="Seat usage from the sample 28-day SSO snapshot" />
              <table className="w-full text-[13.5px]">
                <thead className="border-y border-line bg-canvas/60 text-left text-[12px] tracking-wide text-ink-3 uppercase">
                  <tr>
                    <th className="px-5 py-2 font-medium">Product</th>
                    <th className="px-5 py-2 font-medium">Tier</th>
                    <th className="px-5 py-2 text-right font-medium">Licences</th>
                    <th className="px-5 py-2 text-right font-medium">Active (28d)</th>
                    <th className="px-5 py-2 text-right font-medium">Price / seat / yr</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-5 py-3 font-medium text-ink">{S1.product}</td>
                    <td className="px-5 py-3 text-ink-2">{S1.tier}</td>
                    <td className="px-5 py-3 text-right tabular-nums">{num(S1.currentSeats)}</td>
                    <td className="px-5 py-3 text-right tabular-nums">
                      {num(S1.activeUsers28d)} <span className="text-ink-3">({pct(d.utilizationPct)})</span>
                    </td>
                    <td className="px-5 py-3 text-right tabular-nums">{usd(d.currentPricePerSeat)}</td>
                  </tr>
                </tbody>
              </table>
              <p className="px-5 py-3 text-[12.5px] text-ink-3">Blended synthetic price for the demo, not actual Salesforce pricing. Usage is evidence for review, not consent to remove licences.</p>
            </Card>
          )}
        </div>

        <div className="space-y-5">
          <Lifecycle vendor={vendor} />
          {isS1 && (
            <Card>
              <CardHeader title="Contacts" />
              <ul className="space-y-3 px-5 pb-5">
                {[
                  { p: owner, role: 'Business owner' },
                  { p: alex, role: 'Procurement' },
                  { p: buyer, role: 'Vertice buyer' },
                ].map(({ p, role }) => (
                  <li key={p.id} className="flex items-center gap-3">
                    {p.org === 'Vertice' ? <VerticeMark className="size-6" /> : <Avatar name={p.name} />}
                    <div className="min-w-0 flex-1">
                      <div className="text-[13.5px] font-medium text-ink">{p.name}</div>
                      <div className="text-[12px] text-ink-3">{p.title}</div>
                    </div>
                    <StatusPill tone="outline">{role}</StatusPill>
                  </li>
                ))}
              </ul>
            </Card>
          )}
          {isS1 && request && (
            <Card className="p-5">
              <div className="text-[14px] font-semibold text-ink">Related requests</div>
              <Link to={requestPath} className="mt-3 flex items-center justify-between rounded-lg border border-line px-3 py-2.5 hover:border-primary/40">
                <span className="text-[13.5px] font-medium text-ink">Salesforce renewal</span>
                <StatusPill tone={request.stage === 'completed' ? 'success' : 'info'}>{request.stage === 'completed' ? 'Completed' : 'In progress'}</StatusPill>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </PageBody>
  )
}
