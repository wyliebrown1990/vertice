import * as Dialog from '@radix-ui/react-dialog'
import * as RTooltip from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'

/** Centered modal. Radix handles Escape, focus trap and focus return. */
export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  width = 'max-w-[640px]',
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  footer?: ReactNode
  width?: string
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/35 backdrop-blur-[1px]" />
        <Dialog.Content
          className={clsx(
            'fixed top-1/2 left-1/2 z-50 flex max-h-[88vh] w-[calc(100vw-48px)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl border border-line bg-white shadow-[var(--shadow-pop)]',
            width,
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-4">
            <div>
              <Dialog.Title className="text-[17px] font-semibold text-ink">{title}</Dialog.Title>
              {description ? (
                <Dialog.Description className="mt-0.5 text-[13px] text-ink-3">{description}</Dialog.Description>
              ) : (
                <Dialog.Description className="sr-only">{typeof title === 'string' ? title : 'Dialog'}</Dialog.Description>
              )}
            </div>
            <Dialog.Close className="rounded-md p-1 text-ink-3 hover:bg-line-soft hover:text-ink" aria-label="Close">
              <X className="size-4.5" />
            </Dialog.Close>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">{children}</div>
          {footer && <div className="flex items-center justify-end gap-2 border-t border-line px-6 py-3.5">{footer}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

/** Right-hand side panel (non-modal so the page stays readable beside it). */
export function SidePanel({
  open,
  onOpenChange,
  title,
  children,
  widthClass,
  headerActions,
  side = 'right',
  dark,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  title: ReactNode
  children: ReactNode
  widthClass: string
  headerActions?: ReactNode
  side?: 'left' | 'right'
  dark?: boolean
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal={false}>
      <Dialog.Portal>
        <Dialog.Content
          onInteractOutside={(e) => e.preventDefault()}
          className={clsx(
            'fixed top-0 bottom-0 z-40 flex flex-col shadow-[var(--shadow-pop)] transition-[width] duration-200',
            side === 'right' ? 'right-0 border-l' : 'left-0 border-r',
            dark ? 'border-ink-2 bg-ink text-white' : 'border-line bg-white',
            widthClass,
          )}
        >
          <div className={clsx('flex items-center justify-between gap-2 border-b px-4 py-3', dark ? 'border-white/10' : 'border-line')}>
            <Dialog.Title className="flex items-center gap-2 text-[15px] font-semibold">{title}</Dialog.Title>
            <Dialog.Description className="sr-only">Side panel</Dialog.Description>
            <div className="flex items-center gap-1">
              {headerActions}
              <Dialog.Close
                className={clsx('rounded-md p-1.5', dark ? 'text-white/60 hover:bg-white/10 hover:text-white' : 'text-ink-3 hover:bg-line-soft hover:text-ink')}
                aria-label="Close panel"
              >
                <X className="size-4" />
              </Dialog.Close>
            </div>
          </div>
          <div className="min-h-0 flex-1">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export function Tip({ content, children, side = 'top' }: { content: ReactNode; children: ReactNode; side?: 'top' | 'bottom' | 'left' | 'right' }) {
  return (
    <RTooltip.Root delayDuration={150}>
      <RTooltip.Trigger asChild>{children}</RTooltip.Trigger>
      <RTooltip.Portal>
        <RTooltip.Content
          side={side}
          sideOffset={6}
          className="z-50 max-w-[280px] rounded-lg bg-ink px-3 py-2 text-[12.5px] leading-snug text-white shadow-[var(--shadow-pop)]"
        >
          {content}
          <RTooltip.Arrow className="fill-ink" />
        </RTooltip.Content>
      </RTooltip.Portal>
    </RTooltip.Root>
  )
}
