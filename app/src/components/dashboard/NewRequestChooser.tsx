import clsx from 'clsx'
import { ArrowRight, FilePlus2, MessageSquare, RefreshCw, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { S1_REQUEST_ID } from '../../data/scenario'
import { vendorById } from '../../data/vendors'
import { flowStep } from '../../domain/flows'
import { useDemo } from '../../store/demo'
import { Modal } from '../ui/Overlay'
import { VendorLogo } from '../ui/VendorLogo'

/** "What would you like to do today?" — the three request types of the real app. */
export function NewRequestChooser({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const navigate = useNavigate()
  const request = useDemo((s) => s.request)
  const startRenewal = useDemo((s) => s.startRenewal)
  const i2p = useDemo((s) => flowStep(s, 'i2p'))
  const rfp = useDemo((s) => flowStep(s, 'rfp'))
  const advance = useDemo((s) => s.advance)
  const sf = vendorById('salesforce')!

  const go = (to: string) => {
    onOpenChange(false)
    navigate(to)
  }
  const renew = () => {
    startRenewal()
    go(`/intelligent-workflows/requests/${S1_REQUEST_ID}/overview`)
  }
  const rfpStart = () => {
    advance('rfp', 'none', 'builder')
    go('/sourcing/rfp')
  }

  const option = 'flex w-full items-center gap-3.5 rounded-xl border px-4 py-3.5 text-left border-line hover:border-primary/50 hover:bg-primary-wash'
  const icon = 'flex size-9 items-center justify-center rounded-lg bg-primary-tint text-primary'

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="New request" description="What would you like to do today?" width="max-w-[580px]">
      <div className="space-y-2.5">
        <div className={clsx(option, 'cursor-default')}>
          <span className={icon}>
            <FilePlus2 className="size-4.5" />
          </span>
          <span className="flex-1">
            <span className="block text-[14px] font-medium text-ink">Purchase new software</span>
            <span className="mt-0.5 block text-[12.5px] text-ink-3">{i2p === 'none' ? 'Dynamic intake: AI pre-fills from an order form' : 'Remote support software request already open'}</span>
          </span>
          <span className="flex gap-1.5">
            {i2p === 'none' ? (
              <>
                <button onClick={() => go('/intake/slack')} className="inline-flex h-8 items-center gap-1.5 rounded-[7px] border border-line bg-white px-2.5 text-[12.5px] font-medium text-ink hover:border-primary/50">
                  <MessageSquare className="size-3.5" /> From Slack
                </button>
                <button onClick={() => go('/intake/new')} className="inline-flex h-8 items-center rounded-[7px] bg-primary px-2.5 text-[12.5px] font-medium text-white hover:bg-primary-hover">
                  Intake form
                </button>
              </>
            ) : (
              <button onClick={() => go('/intelligent-workflows/requests/req-remote-support-purchase/overview')} className="inline-flex h-8 items-center gap-1 rounded-[7px] bg-primary px-2.5 text-[12.5px] font-medium text-white">
                View <ArrowRight className="size-3.5" />
              </button>
            )}
          </span>
        </div>
        <button onClick={renew} className={option}>
          <span className={icon}>
            <RefreshCw className="size-4.5" />
          </span>
          <span className="flex-1">
            <span className="block text-[14px] font-medium text-ink">Renew existing software</span>
            <span className="mt-0.5 flex items-center gap-1.5 text-[12.5px] text-ink-3">
              <VendorLogo vendor={sf} size="xs" /> Salesforce · {request ? 'renewal already open: view it' : 'notice deadline Dec 2'}
            </span>
          </span>
          <ArrowRight className="size-4 text-primary" />
        </button>
        <button onClick={rfp === 'none' ? rfpStart : () => go('/sourcing/rfp')} className={option}>
          <span className={icon}>
            <Search className="size-4.5" />
          </span>
          <span className="flex-1">
            <span className="block text-[14px] font-medium text-ink">Select a vendor (request for proposal)</span>
            <span className="mt-0.5 block text-[12.5px] text-ink-3">{rfp === 'none' ? 'Legal: contract review AI · RFP Builder' : 'RFP already open: view it'}</span>
          </span>
          <ArrowRight className="size-4 text-primary" />
        </button>
      </div>
    </Modal>
  )
}
