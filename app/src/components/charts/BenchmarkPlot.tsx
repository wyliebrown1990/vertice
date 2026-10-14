import { benchmarkPoints } from '../../data/benchmark'
import { usd } from '../../lib/format'

const W = 640
const H = 300
const PAD = { l: 64, r: 20, t: 16, b: 40 }
const X0 = 200
const X1 = 1_000
const Y0 = 1_500
const Y1 = 2_300

const x = (seats: number) => PAD.l + ((seats - X0) / (X1 - X0)) * (W - PAD.l - PAD.r)
const y = (price: number) => PAD.t + (1 - (price - Y0) / (Y1 - Y0)) * (H - PAD.t - PAD.b)

export interface PlotMarker {
  seats: number
  price: number
  label: string
  color: string
  hollow?: boolean
}

/** Price per seat per year vs contract size, with the target band shaded. */
export function BenchmarkPlot({ band, markers }: { band: [number, number]; markers: PlotMarker[] }) {
  const yTicks = [1_500, 1_700, 1_900, 2_100, 2_300]
  const xTicks = [200, 400, 600, 800, 1_000]
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Illustrative price per seat versus contract size">
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} stroke="#EEF2F6" />
          <text x={PAD.l - 10} y={y(t) + 4} textAnchor="end" className="fill-ink-3 text-[11px]">
            {usd(t)}
          </text>
        </g>
      ))}
      {xTicks.map((t) => (
        <text key={t} x={x(t)} y={H - 16} textAnchor="middle" className="fill-ink-3 text-[11px]">
          {t}
        </text>
      ))}
      <text x={(PAD.l + W - PAD.r) / 2} y={H - 1} textAnchor="middle" className="fill-ink-4 text-[10.5px]">
        Seats in contract
      </text>
      <rect x={PAD.l} width={W - PAD.l - PAD.r} y={y(band[1])} height={y(band[0]) - y(band[1])} fill="#6000F0" opacity={0.08} />
      <line x1={PAD.l} x2={W - PAD.r} y1={y(band[1])} y2={y(band[1])} stroke="#9B5CFB" strokeDasharray="4 4" />
      <line x1={PAD.l} x2={W - PAD.r} y1={y(band[0])} y2={y(band[0])} stroke="#9B5CFB" strokeDasharray="4 4" />
      <text x={W - PAD.r - 6} y={y(band[1]) - 6} textAnchor="end" className="fill-primary text-[11px] font-medium">
        Target band {usd(band[0])}–{usd(band[1])}
      </text>
      {benchmarkPoints.map(([s, p]) => (
        <circle key={`${s}-${p}`} cx={x(s)} cy={y(p)} r={4} fill="#9B5CFB" opacity={0.55} />
      ))}
      {markers.map((m) => (
        <g key={m.label}>
          <circle cx={x(m.seats)} cy={y(m.price)} r={7} fill={m.hollow ? 'white' : m.color} stroke={m.color} strokeWidth={2.5} />
          <text x={x(m.seats) + 12} y={y(m.price) + 4} className="text-[11.5px] font-semibold" fill={m.color}>
            {m.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
