import * as Popover from '@radix-ui/react-popover'
import { Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { S1, S1_REQUEST_ID } from '../../data/scenario'
import { vendorById } from '../../data/vendors'
import { daysFromToday } from '../../lib/format'
import { useDemo } from '../../store/demo'
import { VendorLogo } from '../ui/VendorLogo'

export function NotificationBell() {
  const navigate = useNavigate()
  const request = useDemo((s) => s.request)
  const sfDays = daysFromToday(S1.noticeDeadline)

  const items = [
    {
      vendorId: 'zoominfo',
      title: 'ZoomInfo notice deadline in 3 days',
      body: 'Auto-renews Nov 15 unless notice is given by Oct 16.',
      to: '/contracts/zoominfo/overview',
    },
    {
      vendorId: 'gong',
      title: 'Gong notice deadline in 3 days',
      body: '52% of seats active in the last 28 days.',
      to: '/contracts/gong/overview',
    },
    {
      vendorId: 'salesforce',
      title: request ? 'Salesforce renewal in progress' : `Salesforce notice deadline in ${sfDays} days`,
      body: request ? 'Open the renewal request.' : 'Largest renewal this quarter: $980,000 a year, quote received.',
      to: request ? `/intelligent-workflows/requests/${S1_REQUEST_ID}/overview` : '/contracts/salesforce/overview',
    },
  ]

  return (
    <Popover.Root>
      <Popover.Trigger className="relative rounded-lg p-1.5 text-ink-3 hover:bg-line-soft hover:text-ink" aria-label="Notifications">
        <Bell className="size-[19px] stroke-[1.7]" />
        <span className="absolute top-1 right-1.5 size-2 rounded-full border-2 border-sidebar bg-danger" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content side="right" align="start" sideOffset={10} className="z-50 w-[340px] rounded-xl border border-line bg-white p-1.5 shadow-[var(--shadow-pop)]">
          <div className="px-2.5 pt-1.5 pb-2 text-[13px] font-semibold text-ink">Notifications</div>
          {items.map((n) => {
            const v = vendorById(n.vendorId)!
            return (
              <Popover.Close asChild key={n.vendorId}>
                <button onClick={() => navigate(n.to)} className="flex w-full items-start gap-3 rounded-lg px-2.5 py-2.5 text-left hover:bg-canvas">
                  <VendorLogo vendor={v} size="sm" />
                  <span>
                    <span className="block text-[13px] font-medium text-ink">{n.title}</span>
                    <span className="block text-[12.5px] text-ink-3">{n.body}</span>
                  </span>
                </button>
              </Popover.Close>
            )
          })}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
