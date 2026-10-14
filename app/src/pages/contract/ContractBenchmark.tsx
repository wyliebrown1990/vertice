import { FlaskConical } from 'lucide-react'
import { Navigate, useOutletContext } from 'react-router-dom'
import { BenchmarkPlot, type PlotMarker } from '../../components/charts/BenchmarkPlot'
import { PageBody } from '../../components/layout/PageHeader'
import { RenewalAction } from '../../components/renewal/RenewalAction'
import { Card, CardHeader } from '../../components/ui/Card'
import { StatusPill } from '../../components/ui/StatusPill'
import { BENCHMARK_COHORT } from '../../data/benchmark'
import { S1 } from '../../data/scenario'
import type { Vendor } from '../../data/vendors'
import { offerVisible, s1Summary } from '../../domain/selectors'
import { num, pct, usd } from '../../lib/format'
import { useDemo } from '../../store/demo'

function Kpi({ label, value, sub, accent }: { label: string; value: string; sub: string; accent?: boolean }) {
  return (
    <Card className={accent ? 'border-primary/40 bg-primary-wash p-4' : 'p-4'}>
      <div className="text-[12.5px] text-ink-3">{label}</div>
      <div className={`mt-1.5 text-[22px] font-semibold tracking-[-0.02em] tabular-nums ${accent ? 'text-primary' : 'text-ink'}`}>{value}</div>
      <div className="mt-0.5 text-[12.5px] text-ink-3">{sub}</div>
    </Card>
  )
}

export function ContractBenchmark() {
  const vendor = useOutletContext<Vendor>()
  const stage = useDemo((s) => s.request?.stage ?? 'none')
  if (vendor.id !== 'salesforce') return <Navigate to={`/contracts/${vendor.id}/overview`} replace />

  const d = s1Summary()
  const showOffer = offerVisible(stage)
  const priceLow = S1.targetSeats * (d.currentPricePerSeat - S1.benchmarkBandHigh)
  const priceHigh = S1.targetSeats * (d.currentPricePerSeat - S1.benchmarkBandLow)

  const markers: PlotMarker[] = [
    { seats: S1.currentSeats, price: d.openingQuotePricePerSeat, label: `Vendor quote ${usd(d.openingQuotePricePerSeat)}`, color: '#DC2828', hollow: true },
    { seats: S1.currentSeats, price: d.currentPricePerSeat, label: `Your price ${usd(d.currentPricePerSeat)}`, color: '#E9590C' },
    ...(showOffer ? [{ seats: S1.targetSeats, price: S1.negotiatedPricePerSeat, label: `Negotiated ${usd(S1.negotiatedPricePerSeat)}`, color: '#16A239' }] : []),
  ]

  return (
    <PageBody className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[17px] font-semibold text-ink">Benchmark pricing</h2>
          <p className="mt-0.5 text-[13px] text-ink-3">Same product, tier and term · annual price per seat</p>
        </div>
        <StatusPill tone="warning" icon={<FlaskConical className="size-3" />}>
          {BENCHMARK_COHORT.label}
        </StatusPill>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Your current price" value={usd(d.currentPricePerSeat)} sub={`${num(S1.currentSeats)} seats · ${usd(S1.currentAnnualCost)}/yr`} />
        <Kpi label="Vendor renewal quote" value={usd(d.openingQuotePricePerSeat)} sub={`+${pct(S1.quoteUpliftPct)} on the same scope`} />
        <Kpi label="Target band" value={`${usd(S1.benchmarkBandLow)}–${usd(S1.benchmarkBandHigh)}`} sub="Illustrative cohort range" />
        {showOffer ? (
          <Kpi label="Negotiated price" value={usd(S1.negotiatedPricePerSeat)} sub={`${num(S1.targetSeats)} seats · inside the band`} accent />
        ) : (
          <Kpi label="Gap to band" value={`${usd(d.currentPricePerSeat - S1.benchmarkBandHigh)}+`} sub="per seat above the top of the band" accent />
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader title="Price vs. contract size" subtitle={BENCHMARK_COHORT.description} />
          <div className="px-4 pb-4">
            <BenchmarkPlot band={[S1.benchmarkBandLow, S1.benchmarkBandHigh]} markers={markers} />
          </div>
        </Card>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Two separate levers" subtitle="Scope and price are negotiated independently" />
            <div className="space-y-3 px-5 pb-5 text-[13.5px]">
              <div className="rounded-xl border border-line p-3.5">
                <div className="flex justify-between font-medium text-ink">
                  <span>Scope: right-size seats</span>
                  <span className="tabular-nums">{usd(d.scopeReduction)}</span>
                </div>
                <p className="mt-1 text-[12.5px] text-ink-3">
                  {num(S1.currentSeats)} → {num(S1.targetSeats)} seats at today’s {usd(d.currentPricePerSeat)}. {num(S1.activeUsers28d)} active plus {d.headroomSeats} headroom,
                  if the business owner agrees.
                </p>
              </div>
              <div className="rounded-xl border border-line p-3.5">
                <div className="flex justify-between gap-3 font-medium text-ink">
                  <span>Price: move into the band</span>
                  <span className="tabular-nums">
                    {showOffer ? usd(d.unitPriceReduction) : `${usd(priceLow)}–${usd(priceHigh)}`}
                  </span>
                </div>
                <p className="mt-1 text-[12.5px] text-ink-3">
                  {showOffer
                    ? `Negotiated ${usd(S1.negotiatedPricePerSeat)} per seat on ${num(S1.targetSeats)} seats.`
                    : `${num(S1.targetSeats)} seats priced between ${usd(S1.benchmarkBandHigh)} and ${usd(S1.benchmarkBandLow)} per seat.`}
                </p>
              </div>
              <div className="rounded-xl bg-canvas p-3.5 text-[12.5px] text-ink-3">
                Rejecting the {pct(S1.quoteUpliftPct)} uplift avoids a further <b className="text-ink">{usd(d.avoidedUplift)}</b>. That’s cost avoidance, tracked separately from
                the reduction against today’s spend.
              </div>
            </div>
          </Card>
          <Card className="flex items-center justify-between gap-3 p-5">
            <div className="text-[13.5px] text-ink-2">Ready to agree requirements and negotiate?</div>
            <RenewalAction size="sm" />
          </Card>
        </div>
      </div>
    </PageBody>
  )
}
