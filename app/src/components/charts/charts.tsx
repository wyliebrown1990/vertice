/**
 * Small pure-SVG charts for the full-demo screens: donut, vertical bars
 * (stacked), area/line, bubble matrix and the semicircle risk gauge.
 * Palette: Vertice violets first (charts/palette.ts).
 */
import clsx from 'clsx'
import type { ReactNode } from 'react'
import type { RiskLevel } from '../../data/directory'
import { Tip } from '../ui/Overlay'
import { SERIES } from './palette'

/* ---------- Donut ---------- */

export function Donut({
  slices,
  size = 132,
  center,
  format = (n: number) => n.toLocaleString('en-US'),
}: {
  slices: { label: string; value: number; color?: string }[]
  size?: number
  center?: ReactNode
  format?: (n: number) => string
}) {
  const total = slices.reduce((s, x) => s + x.value, 0) || 1
  const r = 42
  const c = 2 * Math.PI * r
  const lens = slices.map((s) => (s.value / total) * c)
  const offsets = lens.map((_, i) => lens.slice(0, i).reduce((a, b) => a + b, 0))
  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="size-full -rotate-90" role="img" aria-label="Donut chart">
          <circle cx="50" cy="50" r={r} fill="none" stroke="#EEF2F6" strokeWidth="13" />
          {slices.map((s, i) => (
              <circle
                key={s.label}
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke={s.color ?? SERIES[i % SERIES.length]}
                strokeWidth="13"
                strokeDasharray={`${Math.max(0, lens[i] - 0.8)} ${c}`}
                strokeDashoffset={-offsets[i]}
              />
          ))}
        </svg>
        {center && <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{center}</div>}
      </div>
      <ul className="min-w-0 flex-1 space-y-1 text-[12.5px]">
        {slices.map((s, i) => (
          <li key={s.label} className="flex items-center gap-2">
            <span className="size-2.5 shrink-0 rounded-sm" style={{ backgroundColor: s.color ?? SERIES[i % SERIES.length] }} />
            <span className="min-w-0 flex-1 truncate text-ink-2">{s.label}</span>
            <span className="text-ink-3 tabular-nums">{Math.round((s.value / total) * 100)}%</span>
            <span className="hidden w-16 text-right font-medium text-ink tabular-nums sm:block">{format(s.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- Vertical bars (optionally stacked) ---------- */

export function Bars({
  data,
  series,
  height = 160,
  format = (n: number) => n.toLocaleString('en-US'),
  highlight,
}: {
  data: { label: string; values: number[] }[]
  series: { name: string; color: string }[]
  height?: number
  format?: (n: number) => string
  highlight?: number
}) {
  const max = Math.max(1, ...data.map((d) => d.values.reduce((a, b) => a + b, 0)))
  return (
    <div>
      <div className="flex items-end gap-2" style={{ height }}>
        {data.map((d, i) => {
          const total = d.values.reduce((a, b) => a + b, 0)
          return (
            <Tip
              key={d.label}
              content={
                <div className="space-y-0.5">
                  <div className="font-semibold">{d.label}</div>
                  {series.map((s, si) => (
                    <div key={s.name} className="flex justify-between gap-4">
                      <span className="text-white/60">{s.name}</span>
                      <span className="tabular-nums">{format(d.values[si] ?? 0)}</span>
                    </div>
                  ))}
                </div>
              }
            >
              <div className={clsx('flex h-full flex-1 flex-col justify-end', highlight !== undefined && highlight !== i && 'opacity-50')}>
                <div className="flex w-full flex-col-reverse overflow-hidden rounded-t-md" style={{ height: `${(total / max) * 100}%` }}>
                  {d.values.map((v, si) => (
                    <div key={si} style={{ height: `${total ? (v / total) * 100 : 0}%`, backgroundColor: series[si].color }} />
                  ))}
                </div>
              </div>
            </Tip>
          )
        })}
      </div>
      <div className="mt-1.5 flex gap-2">
        {data.map((d) => (
          <div key={d.label} className="flex-1 truncate text-center text-[11px] text-ink-3">
            {d.label}
          </div>
        ))}
      </div>
      {series.length > 1 && (
        <div className="mt-2 flex flex-wrap gap-3 text-[12px] text-ink-3">
          {series.map((s) => (
            <span key={s.name} className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm" style={{ backgroundColor: s.color }} /> {s.name}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

/* ---------- Area / line over time ---------- */

export function AreaChart({
  points,
  splitAt,
  height = 170,
  format = (n: number) => n.toLocaleString('en-US'),
  step,
  color = '#6000F0',
}: {
  points: { label: string; value: number }[]
  /** Index from which values are projected (drawn violet); earlier points are grey. */
  splitAt?: number
  height?: number
  format?: (n: number) => string
  step?: boolean
  color?: string
}) {
  const W = 600
  const H = 160
  const max = Math.max(1, ...points.map((p) => p.value)) * 1.1
  const x = (i: number) => (points.length === 1 ? W / 2 : (i / (points.length - 1)) * W)
  const y = (v: number) => H - (v / max) * H
  const path = (pts: { value: number }[], start: number) =>
    pts
      .map((p, i) => {
        const xi = x(start + i)
        const yi = y(p.value)
        if (i === 0) return `M ${xi} ${yi}`
        return step ? `H ${xi} V ${yi}` : `L ${xi} ${yi}`
      })
      .join(' ')
  const segs =
    splitAt === undefined
      ? [{ pts: points, start: 0, color }]
      : [
          { pts: points.slice(0, splitAt + 1), start: 0, color: '#94A3B8' },
          { pts: points.slice(splitAt), start: splitAt, color },
        ]
  const labelEvery = Math.ceil(points.length / 8)
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }} preserveAspectRatio="none" role="img" aria-label="Trend chart">
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="#EEF2F6" />
        ))}
        {segs.map((sg, i) =>
          sg.pts.length ? (
            <g key={i}>
              <path d={`${path(sg.pts, sg.start)} V ${H} H ${x(sg.start)} Z`} fill={sg.color} opacity="0.12" />
              <path d={path(sg.pts, sg.start)} fill="none" stroke={sg.color} strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
            </g>
          ) : null,
        )}
      </svg>
      <div className="mt-1 flex justify-between text-[11px] text-ink-3">
        {points.map((p, i) => (i % labelEvery === 0 || i === points.length - 1 ? <span key={p.label}>{p.label}</span> : null))}
      </div>
      <div className="mt-1 text-right text-[11px] text-ink-4">Peak {format(Math.max(...points.map((p) => p.value)))}</div>
    </div>
  )
}

/* ---------- Bubble matrix (SaaS Stack Matrix) ---------- */

export function Bubbles({
  items,
  xLabel,
  yLabel,
  height = 280,
}: {
  items: { id: string; label: string; x: number; y: number; size: number; color: string; tip: ReactNode }[]
  xLabel: string
  yLabel: string
  height?: number
}) {
  const maxX = Math.max(...items.map((i) => i.x)) * 1.08
  const maxSize = Math.max(...items.map((i) => i.size))
  return (
    <div className="relative" style={{ height }}>
      <div className="absolute inset-y-0 left-0 flex w-5 items-center">
        <span className="-rotate-90 text-[11px] whitespace-nowrap text-ink-3">{yLabel}</span>
      </div>
      <div className="absolute top-0 right-0 bottom-6 left-7 rounded-lg border border-line bg-canvas/50">
        {[0.25, 0.5, 0.75].map((f) => (
          <div key={f} className="absolute inset-x-0 border-t border-dashed border-line" style={{ top: `${f * 100}%` }} />
        ))}
        {items.map((it) => {
          const d = 10 + Math.sqrt(it.size / maxSize) * 34
          return (
            <Tip key={it.id} content={it.tip}>
              <button
                aria-label={it.label}
                className="absolute flex -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-[9px] font-semibold text-white shadow-sm transition-transform hover:z-10 hover:scale-110"
                style={{ left: `${(it.x / maxX) * 100}%`, bottom: `${it.y * 100}%`, width: d, height: d, backgroundColor: it.color, opacity: 0.88 }}
              >
                {d > 26 ? it.label.slice(0, 2) : ''}
              </button>
            </Tip>
          )
        })}
      </div>
      <div className="absolute right-0 bottom-0 left-7 text-center text-[11px] text-ink-3">{xLabel}</div>
    </div>
  )
}

/* ---------- Risk gauge (semicircle, dot on the level) ---------- */

const LEVEL_POS: Record<RiskLevel, number> = { Low: 0.15, Medium: 0.45, High: 0.75, Critical: 0.92 }

export function RiskGauge({ level, label = 'Overall risk assessment' }: { level: RiskLevel; label?: string }) {
  const R = 70
  const cx = 90
  const cy = 86
  const arc = (from: number, to: number) => {
    const a0 = Math.PI * (1 - from)
    const a1 = Math.PI * (1 - to)
    return `M ${cx + R * Math.cos(a0)} ${cy - R * Math.sin(a0)} A ${R} ${R} 0 0 1 ${cx + R * Math.cos(a1)} ${cy - R * Math.sin(a1)}`
  }
  const p = LEVEL_POS[level]
  const a = Math.PI * (1 - p)
  const tone = level === 'Low' ? 'bg-success-tint text-success-ink' : level === 'Medium' ? 'bg-warning-tint text-warning-ink' : 'bg-danger-tint text-danger-ink'
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 180 96" className="w-[200px]" role="img" aria-label={`${label}: ${level}`}>
        <path d={arc(0, 0.33)} stroke="#16A239" strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d={arc(0.35, 0.63)} stroke="#F5A524" strokeWidth="12" fill="none" />
        <path d={arc(0.65, 1)} stroke="#DC2828" strokeWidth="12" fill="none" strokeLinecap="round" />
        <circle cx={cx + R * Math.cos(a)} cy={cy - R * Math.sin(a)} r="8" fill="white" stroke="#0F1729" strokeWidth="3" />
      </svg>
      <span className={clsx('-mt-6 rounded-full px-2.5 py-0.5 text-[13px] font-semibold', tone)}>{level}</span>
    </div>
  )
}
