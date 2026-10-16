/**
 * Read-only workflow canvas (request Workflow tab, Workflow Builder). Nodes sit
 * on a grid; edges are SVG curves with optional labels. Node state colours
 * follow the real app: completed green, active violet, pending grey, warning orange.
 * Hand-rolled instead of React Flow: the demo only needs fixed layouts.
 */
import clsx from 'clsx'
import { CircleCheckBig, Clock3, FileText, GitFork, Hourglass, Minus, Plus, Sparkles, TriangleAlert, Webhook } from 'lucide-react'
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import type { NodeKind, Workflow, WfNode } from '../../data/workflows'
import { VerticeMark } from '../ui/Avatar'

export type NodeState = 'done' | 'active' | 'pending' | 'warning' | 'new'

import { COL, NODE_H, NODE_W, PAD, ROW } from './layout'

const INTEGRATION_COLOR: Record<string, string> = { NetSuite: '#1F3A5F', DocuSign: '#4C00FF', Jira: '#0052CC', Slack: '#4A154B', Ironclad: '#1C1C1C' }

function KindIcon({ kind, integration }: { kind: NodeKind; integration?: string }) {
  if (kind === 'ai') return <Sparkles className="size-3.5 text-primary" />
  if (kind === 'vertice') return <VerticeMark className="size-3.5" />
  if (kind === 'integration')
    return (
      <span className="flex size-4 items-center justify-center rounded text-[8px] font-bold text-white" style={{ backgroundColor: INTEGRATION_COLOR[integration ?? ''] ?? '#64748b' }}>
        {integration ? integration[0] : <Webhook className="size-3" />}
      </span>
    )
  if (kind === 'gateway') return <GitFork className="size-3.5 text-ink-3" />
  if (kind === 'service') return <Webhook className="size-3.5 text-ink-3" />
  return <FileText className="size-3.5 text-ink-3" />
}

function StateIcon({ state }: { state: NodeState }) {
  if (state === 'done') return <CircleCheckBig className="size-4 text-success" />
  if (state === 'active') return <Clock3 className="size-4 text-primary" />
  if (state === 'warning') return <TriangleAlert className="size-4 text-warning" />
  if (state === 'new') return <Sparkles className="size-4 text-primary" />
  return <Hourglass className="size-4 text-ink-4" />
}

function Node({ n, state, onClick, badge }: { n: WfNode; state: NodeState; onClick?: () => void; badge?: ReactNode }) {
  const left = PAD + n.x * COL
  const top = PAD + n.y * ROW
  if (n.kind === 'start' || n.kind === 'end')
    return (
      <div
        className={clsx(
          'absolute flex items-center justify-center rounded-full border-2 text-[12px] font-semibold',
          state === 'done' ? 'border-success/60 bg-success-tint/50 text-success-ink' : 'border-line bg-white text-ink-3',
        )}
        style={{ left: left + NODE_W / 2 - 34, top: top + NODE_H / 2 - 18, width: 68, height: 36 }}
      >
        {n.label}
      </div>
    )
  if (n.kind === 'gateway')
    return (
      <div className="absolute flex flex-col items-center" style={{ left: left + NODE_W / 2 - 22, top: top + NODE_H / 2 - 22 }}>
        <div className={clsx('flex size-11 rotate-45 items-center justify-center rounded-md border-2 bg-white', state === 'done' ? 'border-success/60' : 'border-ink-4')}>
          <GitFork className="size-4 -rotate-45 text-ink-3" />
        </div>
        <span className="mt-1.5 rounded bg-white px-1 text-[11px] whitespace-nowrap text-ink-2">{n.label}</span>
      </div>
    )
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={clsx(
        'absolute flex flex-col justify-center rounded-xl border-2 bg-white px-3 text-left shadow-[var(--shadow-card)] transition-colors disabled:cursor-default',
        state === 'done' && 'border-success/55',
        state === 'active' && 'border-primary bg-primary-wash ring-4 ring-primary/10',
        state === 'pending' && 'border-line',
        state === 'warning' && 'border-warning bg-warning-tint/40 ring-4 ring-warning/15',
        state === 'new' && 'border-primary border-dashed bg-primary-wash',
        onClick && 'hover:border-primary/70',
      )}
      style={{ left, top, width: NODE_W, height: NODE_H }}
    >
      <div className="flex items-center gap-1.5">
        <KindIcon kind={n.kind} integration={n.integration} />
        <span className={clsx('line-clamp-2 min-w-0 flex-1 text-[12.5px] leading-tight font-semibold', state === 'pending' ? 'text-ink-2' : 'text-ink')}>{n.label}</span>
        <StateIcon state={state} />
      </div>
      <div className="mt-0.5 truncate pl-5 text-[11px] text-ink-3">{n.sub ?? n.owner ?? (n.kind === 'ai' ? 'Vertice AI' : n.integration ?? '')}</div>
      {badge && <div className="absolute -top-2.5 right-2">{badge}</div>}
    </button>
  )
}

export function WorkflowCanvas({
  workflow,
  states = {},
  onNodeClick,
  badges = {},
  height = 400,
  initialZoom,
  overlay,
  focusNode,
}: {
  workflow: Pick<Workflow, 'nodes' | 'edges'>
  states?: Record<string, NodeState>
  onNodeClick?: (id: string) => void
  badges?: Record<string, ReactNode>
  height?: number
  /** Omit to fit the width (clamped to 70–100%). */
  initialZoom?: number
  overlay?: ReactNode
  /** Scroll this node into the middle of the viewport on mount. */
  focusNode?: string
}) {
  const cols = Math.max(...workflow.nodes.map((n) => n.x)) + 1
  const rows = Math.max(...workflow.nodes.map((n) => n.y)) + 1
  const width = PAD * 2 + (cols - 1) * COL + NODE_W
  const h = PAD * 2 + (rows - 1) * ROW + NODE_H + 20
  const box = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(initialZoom ?? 0.8)
  useLayoutEffect(() => {
    if (initialZoom !== undefined || !box.current) return
    setZoom(Math.max(0.7, Math.min(1, +(box.current.clientWidth / width).toFixed(2))))
  }, [initialZoom, width])
  useLayoutEffect(() => {
    const n = workflow.nodes.find((x) => x.id === focusNode)
    if (!n || !scroller.current) return
    scroller.current.scrollLeft = Math.max(0, (PAD + n.x * COL + NODE_W / 2) * zoom - scroller.current.clientWidth / 2)
  }, [focusNode, zoom, workflow.nodes])
  const byId = new Map(workflow.nodes.map((n) => [n.id, n]))
  const anchor = (n: WfNode, side: 'out' | 'in') => {
    const small = n.kind === 'start' || n.kind === 'end' ? 34 : n.kind === 'gateway' ? 26 : NODE_W / 2
    const cx = PAD + n.x * COL + NODE_W / 2
    return { x: side === 'out' ? cx + small : cx - small, y: PAD + n.y * ROW + NODE_H / 2 }
  }
  const stateOf = (id: string) => states[id] ?? 'pending'

  return (
    <div ref={box} className="relative overflow-hidden rounded-xl border border-line bg-[radial-gradient(circle,#dfe5ee_1px,transparent_1px)] [background-size:18px_18px]" style={{ height }}>
      <div ref={scroller} className="absolute inset-0 overflow-auto">
        <div style={{ width: width * zoom, height: h * zoom }}>
          <div className="relative origin-top-left" style={{ width, height: h, transform: `scale(${zoom})` }}>
            <svg className="absolute inset-0" width={width} height={h} aria-hidden>
              <defs>
                <marker id="wf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94A3B8" />
                </marker>
                <marker id="wf-arrow-done" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#16A239" />
                </marker>
              </defs>
              {workflow.edges.map((e) => {
                const a = byId.get(e.from)
                const b = byId.get(e.to)
                if (!a || !b) return null
                const p0 = anchor(a, 'out')
                const p1 = anchor(b, 'in')
                const mx = (p0.x + p1.x) / 2
                const done = stateOf(e.from) === 'done' && stateOf(e.to) !== 'pending'
                return (
                  <g key={`${e.from}-${e.to}`}>
                    <path
                      d={`M ${p0.x} ${p0.y} C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x - 2} ${p1.y}`}
                      fill="none"
                      stroke={done ? '#16A239' : '#94A3B8'}
                      strokeWidth={done ? 2 : 1.5}
                      strokeDasharray={done ? undefined : '5 4'}
                      markerEnd={done ? 'url(#wf-arrow-done)' : 'url(#wf-arrow)'}
                    />
                  </g>
                )
              })}
            </svg>
            {workflow.edges.map((e) => {
              const a = byId.get(e.from)
              const b = byId.get(e.to)
              if (!a || !b || !e.label) return null
              const p0 = anchor(a, 'out')
              const p1 = anchor(b, 'in')
              return (
                <span
                  key={`l-${e.from}-${e.to}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-md border border-line bg-white px-1.5 py-0.5 text-[10.5px] whitespace-nowrap text-ink-2 shadow-sm"
                  style={{ left: (p0.x + p1.x) / 2, top: (p0.y + p1.y) / 2 }}
                >
                  {e.label}
                </span>
              )
            })}
            {workflow.nodes.map((n) => (
              <Node key={n.id} n={n} state={stateOf(n.id)} onClick={onNodeClick ? () => onNodeClick(n.id) : undefined} badge={badges[n.id]} />
            ))}
            {overlay}
          </div>
        </div>
      </div>
      <div className="absolute right-3 bottom-3 flex items-center gap-1 rounded-lg border border-line bg-white p-1 shadow-sm">
        <button className="rounded p-1 text-ink-3 hover:bg-line-soft" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.1).toFixed(2)))}>
          <Minus className="size-3.5" />
        </button>
        <span className="w-10 text-center text-[11.5px] text-ink-2 tabular-nums">{Math.round(zoom * 100)}%</span>
        <button className="rounded p-1 text-ink-3 hover:bg-line-soft" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(1.4, +(z + 0.1).toFixed(2)))}>
          <Plus className="size-3.5" />
        </button>
      </div>
    </div>
  )
}
