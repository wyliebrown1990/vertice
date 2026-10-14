import clsx from 'clsx'
import { initials } from '../../data/people'

export function Avatar({ name, tone = 'neutral', size = 'sm' }: { name: string; tone?: 'neutral' | 'violet'; size?: 'sm' | 'md' }) {
  return (
    <span
      aria-hidden
      className={clsx(
        'inline-flex shrink-0 items-center justify-center rounded-full font-semibold',
        size === 'sm' ? 'size-6 text-[10px]' : 'size-8 text-[12px]',
        tone === 'violet' ? 'bg-primary text-white' : 'bg-line-soft text-ink-2',
      )}
    >
      {initials(name)}
    </span>
  )
}

/** The Vertice "V-check" mark used for Vertice-owned actors (buyer, AI). */
export function VerticeMark({ className = 'size-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <linearGradient id="vm-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b2bff" />
          <stop offset="1" stopColor="#7a2cf6" />
        </linearGradient>
      </defs>
      <path d="M5 9.5 13 26c.6 1.2 2.3 1.2 2.9 0L27.6 4.4c.3-.6-.4-1.2-.9-.8L14.6 18.2 9.4 8.3C8.4 6.6 4.2 7.7 5 9.5Z" fill="url(#vm-g)" />
    </svg>
  )
}
