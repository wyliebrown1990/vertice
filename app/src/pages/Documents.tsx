/**
 * Documents (Contract Center): every attached document, "Create contract from
 * file" with AI extraction, and document Q&A (Legal persona, chapter L).
 */
import clsx from 'clsx'
import { Check, FileText, FileUp, Loader2, Sparkles, Upload } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { askVertice } from '../ai/engine'
import { AiComparison } from '../components/documents/AiComparison'
import { PageBody, PageHeader } from '../components/layout/PageHeader'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { AgentChip, Logo, Table, Td, THead, Tr } from '../components/ui/kit'
import { Modal } from '../components/ui/Overlay'
import { StatusPill } from '../components/ui/StatusPill'
import { vendorName } from '../data/directory'
import { DOCUMENTS, UPLOAD_DEMO } from '../data/platform'
import { flowStep } from '../domain/flows'
import { formatDate } from '../lib/format'
import { useDemo } from '../store/demo'
import { useUi } from '../store/ui'

const QUESTIONS = ['Do any contracts mention uncapped liability?', 'Find contracts expiring in 90 days', 'Show all data processing clauses']

function CreateFromFile({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const step = useDemo((s) => flowStep(s, 'contract-upload'))
  const advance = useDemo((s) => s.advance)
  const toast = useUi((s) => s.toast)
  const navigate = useNavigate()
  const [started, setStarted] = useState(false)
  const [shown, setShown] = useState(0)
  const total = UPLOAD_DEMO.extracted.length
  const extracting = started && shown < total

  useEffect(() => {
    if (!extracting) return
    const t = window.setInterval(() => setShown((n) => Math.min(n + 1, total)), 380)
    return () => window.clearInterval(t)
  }, [extracting, total])

  // Extraction finished: record it in the demo store (guarded, so it runs once).
  useEffect(() => {
    if (started && shown >= total) advance('contract-upload', 'none', 'extracted')
  }, [started, shown, total, advance])

  const fields = step === 'none' ? shown : UPLOAD_DEMO.extracted.length

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Create contract from file"
      description="Vertice AI extracts vendor, dates, pricing and terms."
      width="max-w-[760px]"
      footer={
        step === 'extracted' ? (
          <Button
            onClick={() => {
              advance('contract-upload', 'extracted', 'created')
              toast('Renewal order form attached to the Asana contract')
              onOpenChange(false)
              navigate('/contracts/asana/documents')
            }}
          >
            <Check className="size-4" /> Save to Asana contract
          </Button>
        ) : step === 'created' ? (
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        ) : undefined
      }
    >
      {step === 'none' && !extracting && shown === 0 ? (
        <div className="flex flex-col items-center rounded-xl border-2 border-dashed border-line px-6 py-10 text-center">
          <FileUp className="size-8 text-ink-4" />
          <p className="mt-3 text-[14px] font-medium text-ink">Drop a contract or order form here</p>
          <p className="mt-1 text-[12.5px] text-ink-3">PDF or DOCX. This demo uses a sample file.</p>
          <Button className="mt-4" onClick={() => setStarted(true)}>
            <Upload className="size-4" /> Use sample: {UPLOAD_DEMO.file}
          </Button>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex items-center gap-3 rounded-xl border border-line px-4 py-3">
            <FileText className="size-5 text-ink-3" />
            <span className="flex-1 text-[13.5px] font-medium text-ink">{UPLOAD_DEMO.file}</span>
            {step === 'none' ? (
              <span className="flex items-center gap-1.5 text-[12.5px] text-primary">
                <Loader2 className="size-3.5 animate-spin" /> Extracting…
              </span>
            ) : (
              <StatusPill tone="success">{UPLOAD_DEMO.extracted.length} fields extracted</StatusPill>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {UPLOAD_DEMO.extracted.map((f, i) => (
              <div key={f.field} className={clsx('rounded-lg border px-3 py-2 transition-opacity', i < fields ? 'border-primary/30 bg-primary-wash/50 opacity-100' : 'border-line opacity-40')}>
                <div className="flex items-center gap-1 text-[11.5px] text-ink-3">
                  {i < fields && <Sparkles className="size-3 text-primary" />} {f.field}
                </div>
                <div className="mt-0.5 text-[13.5px] font-medium text-ink">{i < fields ? f.value : '—'}</div>
              </div>
            ))}
          </div>
          {step !== 'none' && <AiComparison title="Renewal order form vs current Asana contract" rows={UPLOAD_DEMO.comparison} />}
        </div>
      )}
    </Modal>
  )
}

export function Documents() {
  const [open, setOpen] = useState(false)
  const uploaded = useDemo((s) => flowStep(s, 'contract-upload') === 'created')
  const docs = [...(uploaded ? [{ id: 'up', name: UPLOAD_DEMO.file, vendorId: UPLOAD_DEMO.vendorId, type: 'Renewal quote' as const, uploaded: '2026-10-13', pages: 5 }] : []), ...DOCUMENTS]
  return (
    <>
      <PageHeader
        title="Documents"
        meta={<span>Order forms, MSAs and DPAs across Northwind’s contracts · indexed by Vertice AI</span>}
        actions={
          <Button onClick={() => setOpen(true)}>
            <Upload className="size-4" /> Create contract from file
          </Button>
        }
      />
      <PageBody className="space-y-5">
        <Card className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-[14px] font-semibold text-ink">Ask about your documents</div>
            <AgentChip name="Document Analysis" />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {QUESTIONS.map((q, i) => (
              <button
                key={q}
                onClick={() => (i === 0 ? askVertice(q) : useUi.getState().toast('This question isn’t scripted in the demo: try the first one', 'info'))}
                className={clsx('rounded-full border px-3 py-1.5 text-[13px]', i === 0 ? 'border-primary/40 bg-primary-wash text-primary hover:border-primary' : 'border-line text-ink-2 hover:border-primary/40')}
              >
                {q}
              </button>
            ))}
          </div>
        </Card>
        <Card>
          <Table>
            <THead cols={['Document', 'Vendor', 'Type', 'Uploaded', { label: 'Pages', right: true }]} />
            <tbody>
              {docs.map((d) => (
                <Tr key={d.id}>
                  <Td>
                    <span className="flex items-center gap-2 font-medium text-ink">
                      <FileText className="size-4 text-ink-3" /> {d.name}
                      {d.id === 'up' && <StatusPill tone="violet">New</StatusPill>}
                    </span>
                  </Td>
                  <Td>
                    <span className="flex items-center gap-2 text-ink-2">
                      <Logo id={d.vendorId} size="xs" /> {vendorName(d.vendorId)}
                    </span>
                  </Td>
                  <Td>
                    <StatusPill tone="neutral">{d.type}</StatusPill>
                  </Td>
                  <Td className="text-ink-2">{formatDate(d.uploaded)}</Td>
                  <Td right>{d.pages}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </PageBody>
      <CreateFromFile open={open} onOpenChange={setOpen} />
    </>
  )
}
