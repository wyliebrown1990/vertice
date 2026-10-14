import clsx from 'clsx'
import { Search } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { vendors } from '../../data/vendors'
import { usd } from '../../lib/format'
import { VendorLogo } from '../ui/VendorLogo'

/** Sidebar search over vendors/contracts by name. ⌘K / Ctrl+K focuses it. */
export function SidebarSearch() {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return []
    return vendors
      .filter((v) => `${v.name} ${v.product} ${v.category}`.toLowerCase().includes(term))
      .slice(0, 7)
  }, [q])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (id: string) => {
    navigate(`/contracts/${id}/overview`)
    setQ('')
    setOpen(false)
    inputRef.current?.blur()
  }

  return (
    <div className="relative">
      <label className="flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-2.5 text-ink-3 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/15">
        <Search className="size-4 shrink-0" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setActive(0)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') setActive((a) => Math.min(a + 1, results.length - 1))
            else if (e.key === 'ArrowUp') setActive((a) => Math.max(a - 1, 0))
            else if (e.key === 'Enter' && results[active]) go(results[active].id)
            else if (e.key === 'Escape') {
              setQ('')
              inputRef.current?.blur()
            }
          }}
          placeholder="Search"
          aria-label="Search vendors and contracts"
          className="min-w-0 flex-1 bg-transparent text-[13.5px] text-ink outline-none placeholder:text-ink-4"
        />
        <kbd className="rounded border border-line px-1 text-[10.5px] text-ink-4">⌘K</kbd>
      </label>
      {open && q.trim() && (
        <div className="absolute top-11 right-0 left-0 z-30 overflow-hidden rounded-xl border border-line bg-white py-1 shadow-[var(--shadow-pop)]">
          {results.length === 0 ? (
            <div className="px-3 py-3 text-[13px] text-ink-3">
              No contracts match “{q.trim()}”.{' '}
              <button className="font-medium text-primary hover:underline" onMouseDown={(e) => e.preventDefault()} onClick={() => setQ('')}>
                Clear search
              </button>
            </div>
          ) : (
            results.map((v, i) => (
              <button
                key={v.id}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(v.id)}
                onMouseEnter={() => setActive(i)}
                className={clsx('flex w-full items-center gap-2.5 px-3 py-2 text-left', i === active && 'bg-primary-wash')}
              >
                <VendorLogo vendor={v} size="xs" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium text-ink">{v.name}</span>
                  <span className="block truncate text-[11.5px] text-ink-3">{v.product}</span>
                </span>
                <span className="text-[11.5px] text-ink-3 tabular-nums">{usd(v.annualCost)}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
