import { TriangleAlert } from 'lucide-react'
import { Card, CardHeader } from '../ui/Card'
import { AgentChip } from '../ui/kit'

export interface ComparisonRow {
  metric: string
  renewal: string
  current: string
  flag: string
}

/** "AI Comparison": renewal paperwork vs the current contract, with flagged changes. */
export function AiComparison({ title, rows }: { title: string; rows: readonly ComparisonRow[] }) {
  const flags = rows.filter((r) => r.flag)
  return (
    <Card>
      <CardHeader title="AI Comparison" subtitle={title} action={<AgentChip name="Document Analysis" />} />
      <div className="px-5 pb-5">
        <div className="overflow-hidden rounded-xl border border-line">
          <table className="w-full text-[13px]">
            <thead className="bg-canvas text-left text-[11.5px] tracking-wide text-ink-3 uppercase">
              <tr>
                <th className="px-3 py-2 font-medium">Metric</th>
                <th className="px-3 py-2 font-medium">Renewal</th>
                <th className="px-3 py-2 font-medium">Current</th>
                <th className="px-3 py-2 font-medium" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.metric} className={r.flag ? 'border-t border-line-soft bg-warning-tint/30' : 'border-t border-line-soft'}>
                  <td className="px-3 py-2 font-medium text-ink">{r.metric}</td>
                  <td className="px-3 py-2 text-ink tabular-nums">{r.renewal}</td>
                  <td className="px-3 py-2 text-ink-2 tabular-nums">{r.current}</td>
                  <td className="px-3 py-2 text-right">
                    {r.flag && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-warning-tint px-2 py-0.5 text-[11.5px] font-medium whitespace-nowrap text-warning-ink">
                        <TriangleAlert className="size-3" /> {r.flag}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {flags.length > 0 && (
          <p className="mt-3 text-[12.5px] text-ink-3">
            {flags.length} change{flags.length > 1 ? 's' : ''} to review before signing. Checked against your Legal preferences (Settings › Compliance).
          </p>
        )}
      </div>
    </Card>
  )
}
