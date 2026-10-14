import type { ReactNode } from 'react'

/** Semi-donut gauge (Annualized spend). Pure SVG. */
export interface GaugeSlice {
  label: string
  value: number
  color: string
}

const CX = 110
const CY = 108
const R = 88
const STROKE = 20
const GAP = 0.018

const polar = (angle: number) => [CX + R * Math.cos(angle), CY - R * Math.sin(angle)]

/** Arc paths sweeping left (π) to right (0), with a small gap between slices. */
function arcPaths(slices: GaugeSlice[]) {
  const total = slices.reduce((s, x) => s + x.value, 0)
  let start = Math.PI
  return slices.map((s) => {
    const sweep = (s.value / total) * Math.PI
    const [x0, y0] = polar(start - GAP / 2)
    const [x1, y1] = polar(start - sweep + GAP / 2)
    start -= sweep
    return { d: `M ${x0} ${y0} A ${R} ${R} 0 0 1 ${x1} ${y1}`, color: s.color, label: s.label }
  })
}

export function SpendGauge({ slices, center }: { slices: GaugeSlice[]; center: ReactNode }) {
  const arcs = arcPaths(slices)
  return (
    <div className="relative mx-auto w-[220px]">
      <svg viewBox="0 0 220 118" className="w-full" role="img" aria-label="Annualized spend by department">
        <path d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`} stroke="#EEF2F6" strokeWidth={STROKE} fill="none" />
        {arcs.map((a) => (
          <path key={a.label} d={a.d} stroke={a.color} strokeWidth={STROKE} fill="none" />
        ))}
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">{center}</div>
    </div>
  )
}
