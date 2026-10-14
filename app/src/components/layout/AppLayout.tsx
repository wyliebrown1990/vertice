import * as RTooltip from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import { CheckCircle2, Info, TriangleAlert } from 'lucide-react'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AiLauncher } from '../../ai/AiPanel'
import { PresenterControls } from '../../presenter/PresenterControls'
import { isStorageAvailable, wasRestoredFromIncompatible } from '../../store/demo'
import { useUi } from '../../store/ui'
import { Sidebar } from './Sidebar'

function Toasts() {
  const toasts = useUi((s) => s.toasts)
  return (
    <div className="pointer-events-none fixed right-6 bottom-24 z-50 flex flex-col items-end gap-2" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="animate-toast-in pointer-events-auto flex items-center gap-2 rounded-lg bg-ink px-3.5 py-2.5 text-[13px] text-white shadow-[var(--shadow-pop)]"
        >
          {t.tone === 'warning' ? (
            <TriangleAlert className="size-4 text-amber-300" />
          ) : t.tone === 'info' ? (
            <Info className="size-4 text-violet-300" />
          ) : (
            <CheckCircle2 className="size-4 text-emerald-300" />
          )}
          {t.text}
        </div>
      ))}
    </div>
  )
}

export function AppLayout() {
  const { pathname } = useLocation()
  const toast = useUi((s) => s.toast)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.getElementById('main')?.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    if (wasRestoredFromIncompatible()) toast('Saved demo was from an older version, so the clean scenario was restored', 'info')
    if (!isStorageAvailable()) toast('Browser storage is unavailable: changes last for this session only', 'warning')
  }, [toast])

  return (
    <RTooltip.Provider>
      <div className="flex h-full">
        <Sidebar />
        <main id="main" className={clsx('relative min-w-0 flex-1 overflow-y-auto bg-canvas')}>
          <Outlet />
        </main>
      </div>
      <AiLauncher />
      <PresenterControls />
      <Toasts />
    </RTooltip.Provider>
  )
}
