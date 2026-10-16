import { ArrowRight, CircleCheckBig, Info } from 'lucide-react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { PageBody } from '../../components/layout/PageHeader'
import { RenewalAction } from '../../components/renewal/RenewalAction'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { StatusPill } from '../../components/ui/StatusPill'
import { savingsHistory } from '../../data/savingsHistory'
import { S1 } from '../../data/scenario'
import type { Vendor } from '../../data/vendors'
import { s1Summary } from '../../domain/selectors'
import { formatDate, num, pct, usd } from '../../lib/format'
import { requestPath } from '../../lib/routes'
import { useDemo } from '../../store/demo'
import { ANA, anaDerived } from '../../data/chapters/ana'
import { reached } from '../../domain/flows'

function AnaOutcome() {
  const d = anaDerived()
  const navigate = useNavigate()
  return (
    <PageBody>
      <Card className="mx-auto max-w-[760px] overflow-hidden">
        <div className="border-b border-line bg-success-tint/50 px-6 py-5">
          <div className="flex items-center gap-2 text-[13px] font-medium text-success-ink">
            <CircleCheckBig className="size-4" /> Renewal secured by Ana · approved by Alex Morgan · effective {formatDate(ANA.nextTermStart)}
          </div>
          <div className="mt-2 flex flex-wrap items-baseline gap-3">
            <span className="text-[34px] font-semibold tracking-[-0.03em] text-ink tabular-nums">{usd(d.annualReduction)}</span>
            <StatusPill tone="success">{pct(d.annualReductionPct)} lower</StatusPill>
          </div>
          <div className="text-[14px] text-ink-2">Annual spend reduction vs today’s contract</div>
        </div>
        <div className="space-y-4 px-6 py-5">
          <div className="space-y-3.5">
            <Bar label={`Current annual cost (${num(ANA.currentSeats)} seats)`} value={d.currentAnnualCost} max={d.currentAnnualCost} tone="bg-ink-4" />
            <Bar label={`Next-term annual cost (${num(ANA.targetSeats)} seats)`} value={d.futureAnnualCost} max={d.currentAnnualCost} tone="bg-primary" />
          </div>
          <p className="text-[12.5px] text-ink-3">
            {usd(d.scopeReduction)} scope + {usd(d.unitPriceReduction)} price, locked for {ANA.termMonths} months. Avoided uplift {usd(d.avoidedUplift)} is tracked separately.
          </p>
          <Button onClick={() => navigate('/dashboard', { state: { savingsAdded: d.annualReduction } })}>
            Back to dashboard <ArrowRight className="size-4" />
          </Button>
        </div>
      </Card>
    </PageBody>
  )
}

function Bar({ label, value, max, tone }: { label: string; value: number; max: number; tone: string }) {
  return (
    <div>
      <div className="flex justify-between text-[13px]">
        <span className="text-ink-2">{label}</span>
        <span className="font-semibold text-ink tabular-nums">{usd(value)}</span>
      </div>
      <div className="mt-1.5 h-2.5 rounded-full bg-line-soft">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${(value / max) * 100}%` }} />
      </div>
    </div>
  )
}

export function S1Outcome() {
  const d = s1Summary()
  const navigate = useNavigate()
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_380px]">
      <Card className="overflow-hidden">
        <div className="border-b border-line bg-success-tint/50 px-6 py-5">
          <div className="flex items-center gap-2 text-[13px] font-medium text-success-ink">
            <CircleCheckBig className="size-4" /> Renewal secured · signed (simulated) · effective {formatDate(S1.nextTermStart)}
          </div>
          <div className="mt-2 flex flex-wrap items-baseline gap-3">
            <span className="text-[34px] font-semibold tracking-[-0.03em] text-ink tabular-nums">{usd(d.annualReduction)}</span>
            <StatusPill tone="success">{pct(d.annualReductionPct)} lower</StatusPill>
          </div>
          <div className="text-[14px] text-ink-2">Annual spend reduction vs today’s contract</div>
        </div>
        <div className="space-y-5 px-6 py-5">
          <div className="space-y-3.5">
            <Bar label="Current annual cost (500 seats)" value={S1.currentAnnualCost} max={S1.currentAnnualCost} tone="bg-ink-4" />
            <Bar label={`Next-term annual cost (${num(S1.targetSeats)} seats)`} value={d.futureAnnualCost} max={S1.currentAnnualCost} tone="bg-primary" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-line p-4">
              <div className="text-[12.5px] text-ink-3">Scope reduction</div>
              <div className="mt-1 text-[20px] font-semibold text-ink tabular-nums">{usd(d.scopeReduction)}</div>
              <div className="mt-0.5 text-[12.5px] text-ink-3">
                {num(S1.currentSeats - S1.targetSeats)} seats × {usd(d.currentPricePerSeat)}
              </div>
            </div>
            <div className="rounded-xl border border-line p-4">
              <div className="text-[12.5px] text-ink-3">Unit-price reduction</div>
              <div className="mt-1 text-[20px] font-semibold text-ink tabular-nums">{usd(d.unitPriceReduction)}</div>
              <div className="mt-0.5 text-[12.5px] text-ink-3">
                {num(S1.targetSeats)} seats × {usd(d.currentPricePerSeat - S1.negotiatedPricePerSeat)} per seat
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 rounded-xl bg-canvas p-4 text-[13px]">
            <div>
              <div className="text-ink-3">Seats retained</div>
              <div className="mt-0.5 font-semibold text-ink">{num(S1.targetSeats)}</div>
            </div>
            <div>
              <div className="text-ink-3">Price per seat</div>
              <div className="mt-0.5 font-semibold text-ink">{usd(S1.negotiatedPricePerSeat)}/yr</div>
            </div>
            <div>
              <div className="text-ink-3">Next term</div>
              <div className="mt-0.5 font-semibold text-ink">
                {formatDate(S1.nextTermStart)} – {formatDate(S1.nextTermEnd)}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => navigate('/dashboard', { state: { savingsAdded: d.annualReduction } })}>
              Back to dashboard <ArrowRight className="size-4" />
            </Button>
            <Link to={requestPath} className="inline-flex h-9 items-center px-3 text-[14px] font-medium text-primary hover:underline">
              View completed request
            </Link>
          </div>
        </div>
      </Card>

      <div className="space-y-5">
        <Card className="p-5">
          <div className="flex items-center gap-2 text-[14px] font-semibold text-ink">
            <Info className="size-4 text-ink-3" /> Against the vendor’s opening quote
          </div>
          <div className="mt-3 space-y-2 text-[13.5px]">
            <div className="flex justify-between">
              <span className="text-ink-3">Opening quote (500 seats, +12%)</span>
              <span className="tabular-nums">{usd(d.openingQuote)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-3">Avoided uplift</span>
              <span className="font-medium tabular-nums">{usd(d.avoidedUplift)}</span>
            </div>
            <div className="flex justify-between border-t border-line pt-2">
              <span className="text-ink-3">Total benefit vs quote</span>
              <span className="font-medium tabular-nums">
                {usd(d.totalBenefitVsQuote)} ({(d.totalBenefitVsQuotePct * 100).toFixed(1)}%)
              </span>
            </div>
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-ink-3">
            Different baseline. Only the {usd(d.annualReduction)} reduction against today’s contract counts toward Total savings. The avoided uplift is cost avoidance and
            isn’t added again.
          </p>
        </Card>
        <Card className="p-5 text-[12.5px] leading-relaxed text-ink-3">
          <div className="text-[13.5px] font-semibold text-ink">How to read this</div>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            <li>A contracted, annualized reduction, not cash already received.</li>
            <li>Current spend stays at {usd(S1.currentAnnualCost)} until {formatDate(S1.termEnd)}.</li>
            <li>A fictional Northwind example: not a prediction for any other renewal.</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}

export function ContractOutcomes() {
  const vendor = useOutletContext<Vendor>()
  const stage = useDemo((s) => s.request?.stage ?? 'none')
  const hist = savingsHistory.find((r) => r.vendorId === vendor.id)
  const anaDone = useDemo((s) => reached(s, 'ana', 'completed'))

  if (vendor.id === 'salesforce') {
    return (
      <PageBody>
        {stage === 'completed' ? (
          <S1Outcome />
        ) : (
          <Card className="mx-auto max-w-[560px] p-8 text-center">
            <h2 className="text-[17px] font-semibold text-ink">No outcome yet</h2>
            <p className="mt-2 text-[13.5px] text-ink-3">
              {stage === 'none'
                ? 'The Salesforce renewal hasn’t started. Outcomes appear here once the renewal is signed.'
                : 'The renewal is in progress. The outcome appears here once the renewal is signed.'}
            </p>
            <div className="mt-5 flex justify-center">
              <RenewalAction />
            </div>
          </Card>
        )}
      </PageBody>
    )
  }

  if (vendor.id === 'gong' && anaDone) return <AnaOutcome />

  return (
    <PageBody>
      <Card className="mx-auto max-w-[620px] p-6">
        {hist ? (
          <>
            <div className="text-[13px] text-ink-3">Last renewal · completed {formatDate(hist.completedOn)} through Vertice</div>
            <div className="mt-1.5 text-[26px] font-semibold text-ink tabular-nums">{usd(hist.annualReduction)}</div>
            <div className="text-[13.5px] text-ink-2">
              annual reduction ({pct(hist.annualReduction / hist.baselineAnnual)}) from {usd(hist.baselineAnnual)} to {usd(hist.baselineAnnual - hist.annualReduction)}
            </div>
          </>
        ) : (
          <p className="text-[13.5px] text-ink-3">No recorded renewal outcomes for {vendor.name} yet.</p>
        )}
      </Card>
    </PageBody>
  )
}
