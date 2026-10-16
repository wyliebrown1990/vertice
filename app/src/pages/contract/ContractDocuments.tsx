/**
 * Contract › Documents: AI-generated summary, attached documents and, where a
 * renewal quote exists, the AI Comparison against the current contract.
 */
import { FileText, RefreshCw, Sparkles } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'
import { AiComparison, type ComparisonRow } from '../../components/documents/AiComparison'
import { PageBody } from '../../components/layout/PageHeader'
import { Card, CardHeader } from '../../components/ui/Card'
import { Table, Td, THead, Tr } from '../../components/ui/kit'
import { ANA, anaDerived } from '../../data/chapters/ana'
import { DOCUMENTS, UPLOAD_DEMO } from '../../data/platform'
import { S1, s1Derived } from '../../data/scenario'
import type { Vendor } from '../../data/vendors'
import { reached } from '../../domain/flows'
import { formatDate, num, pct, usd } from '../../lib/format'
import { useDemo } from '../../store/demo'
import { useUi } from '../../store/ui'

const comparisonFor = (vendorId: string, uploaded: boolean): { title: string; rows: ComparisonRow[] } | null => {
  if (vendorId === 'salesforce') {
    const d = s1Derived()
    return {
      title: 'Salesforce_Renewal-Quote_2027.pdf vs current order form',
      rows: [
        { metric: 'Annual price', renewal: usd(d.openingQuote), current: usd(S1.currentAnnualCost), flag: `+${pct(S1.quoteUpliftPct)} uplift` },
        { metric: 'Licenses', renewal: num(S1.currentSeats), current: num(S1.currentSeats), flag: '' },
        { metric: 'Price per seat', renewal: usd(d.openingQuotePricePerSeat), current: usd(d.currentPricePerSeat), flag: 'Above benchmark band' },
        { metric: 'Term', renewal: '12 months', current: '12 months', flag: '' },
        { metric: 'Auto-renewal', renewal: 'Yes, 60-day notice', current: 'Yes, 60-day notice', flag: '' },
      ],
    }
  }
  if (vendorId === 'gong') {
    const d = anaDerived()
    return {
      title: 'Gong_Renewal-Quote_2026.pdf vs current order form',
      rows: [
        { metric: 'Annual price', renewal: usd(d.openingQuote), current: usd(d.currentAnnualCost), flag: `+${pct(ANA.quoteUpliftPct)} uplift` },
        { metric: 'Licenses', renewal: num(ANA.currentSeats), current: num(ANA.currentSeats), flag: `${num(ANA.activeUsers28d)} active` },
        { metric: 'Term', renewal: '12 months', current: '12 months', flag: '' },
        { metric: 'Auto-renewal', renewal: 'Yes, 60-day notice', current: 'Yes, 60-day notice', flag: '' },
      ],
    }
  }
  if (vendorId === UPLOAD_DEMO.vendorId && uploaded) return { title: `${UPLOAD_DEMO.file} vs current order form`, rows: [...UPLOAD_DEMO.comparison] }
  return null
}

function summary(v: Vendor) {
  const auto = v.autoRenew ? `auto-renews on ${formatDate(v.renewalDate)} unless notice is given by ${formatDate(v.noticeDeadline ?? v.renewalDate)}` : `ends on ${formatDate(v.renewalDate)} and does not auto-renew`
  const usage = v.utilization === null ? 'Pricing is usage-based.' : `${pct(v.utilization)} of seats were active in the last 28 days.`
  return `The ${v.name} contract is Live with an annual cost of ${usd(v.annualCost)} and Net 30 payment terms. It covers ${v.product} for ${v.department} and ${auto}. ${usage}`
}

export function ContractDocuments() {
  const vendor = useOutletContext<Vendor>()
  const uploaded = useDemo((s) => reached(s, 'contract-upload', 'created'))
  const toast = useUi((s) => s.toast)
  const docs = DOCUMENTS.filter((d) => d.vendorId === vendor.id)
  const extra = uploaded && vendor.id === UPLOAD_DEMO.vendorId ? [{ id: 'up', name: UPLOAD_DEMO.file, type: 'Renewal quote', uploaded: '2026-10-13', pages: 5 }] : []
  const comparison = comparisonFor(vendor.id, uploaded)
  const all = [...docs, ...extra]
  return (
    <PageBody>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-5">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-ai-gradient flex items-center gap-1.5 text-[14px] font-semibold">
                <Sparkles className="size-4 text-primary" /> AI-Generated summary
              </span>
              <button onClick={() => toast('Summary is up to date', 'info')} className="rounded-md p-1 text-ink-3 hover:bg-line-soft" aria-label="Refresh summary">
                <RefreshCw className="size-3.5" />
              </button>
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-2">
              {summary(vendor)} {all.length > 0 && `The contract includes ${all.length} attached document${all.length > 1 ? 's' : ''}: ${all.map((d) => d.name).join(', ')}.`}
            </p>
          </Card>
          {comparison && <AiComparison title={comparison.title} rows={comparison.rows} />}
        </div>
        <Card>
          <CardHeader title="Documents" subtitle={`${all.length} attached`} />
          {all.length ? (
            <Table>
              <THead cols={['Name']} />
              <tbody>
                {all.map((d) => (
                  <Tr key={d.id}>
                    <Td>
                      <span className="flex items-center gap-2 text-ink">
                        <FileText className="size-4 shrink-0 text-ink-3" />
                        <span className="min-w-0">
                          <span className="block truncate text-[13px] font-medium">{d.name}</span>
                          <span className="block text-[11.5px] text-ink-3">
                            {d.type} · {formatDate(d.uploaded)} · {d.pages} pages
                          </span>
                        </span>
                      </span>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="px-5 pb-5 text-[13px] text-ink-3">No documents attached yet. Upload one from Documents.</p>
          )}
        </Card>
      </div>
    </PageBody>
  )
}
