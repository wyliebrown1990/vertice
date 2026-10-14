import clsx from 'clsx'
import { ArrowRight, FilePlus2, RefreshCw, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { S1_REQUEST_ID } from '../../data/scenario'
import { vendorById } from '../../data/vendors'
import { useDemo } from '../../store/demo'
import { Modal } from '../ui/Overlay'
import { VendorLogo } from '../ui/VendorLogo'

/** "What would you like to do today?" Only the Salesforce renewal is supported. */
export function NewRequestChooser({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const navigate = useNavigate()
  const request = useDemo((s) => s.request)
  const startRenewal = useDemo((s) => s.startRenewal)
  const sf = vendorById('salesforce')!

  const renew = () => {
    startRenewal()
    onOpenChange(false)
    navigate(`/intelligent-workflows/requests/${S1_REQUEST_ID}/overview`)
  }

  const option = 'flex w-full items-center gap-3.5 rounded-xl border px-4 py-3.5 text-left'

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="New request" description="What would you like to do today?" width="max-w-[560px]">
      <div className="space-y-2.5">
        <button onClick={renew} className={clsx(option, 'border-primary/40 bg-primary-wash hover:border-primary')}>
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-white">
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
        {[
          { icon: FilePlus2, label: 'Purchase new software' },
          { icon: Search, label: 'Select a vendor (request for proposal)' },
        ].map((o) => (
          <div key={o.label} className={clsx(option, 'cursor-not-allowed border-line bg-canvas text-ink-3')} aria-disabled>
            <span className="flex size-9 items-center justify-center rounded-lg bg-line-soft">
              <o.icon className="size-4.5" />
            </span>
            <span className="flex-1">
              <span className="block text-[14px] font-medium text-ink-2">{o.label}</span>
              <span className="block text-[12.5px]">Outside this demo: intake-to-procure is part of the full platform</span>
            </span>
          </div>
        ))}
      </div>
    </Modal>
  )
}
