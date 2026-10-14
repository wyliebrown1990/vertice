import { AS_OF } from '../data/scenario'

const DAY_MS = 86_400_000
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Parse an ISO date (YYYY-MM-DD) as UTC midnight so labels never drift by timezone. */
export const parseDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return Date.UTC(y, m - 1, d)
}

/** Whole days from the frozen demo date to `iso` (negative when in the past). */
export const daysFromToday = (iso: string, today: string = AS_OF) =>
  Math.round((parseDate(iso) - parseDate(today)) / DAY_MS)

export const formatDate = (iso: string) => {
  const d = new Date(parseDate(iso))
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

export const formatShortDate = (iso: string) => {
  const d = new Date(parseDate(iso))
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`
}

/** `YYYY-MM` month key for grouping. */
export const monthKey = (iso: string) => iso.slice(0, 7)

export const monthLabel = (key: string) => {
  const [y, m] = key.split('-').map(Number)
  return `${MONTHS[m - 1]} ${y}`
}

export const relativeDays = (days: number) => {
  if (days === 0) return 'today'
  if (days === 1) return 'tomorrow'
  if (days === -1) return 'yesterday'
  return days > 0 ? `in ${days} days` : `${-days} days ago`
}

const usd0 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export const usd = (n: number) => usd0.format(n)

/** Compact currency for chart labels: $980K, $1.48M. */
export const usdCompact = (n: number) => {
  const abs = Math.abs(n)
  if (abs >= 1_000_000) return `$${(n / 1_000_000).toFixed(abs >= 10_000_000 ? 1 : 2).replace(/\.?0+$/, '')}M`
  if (abs >= 1_000) return `$${Math.round(n / 1_000)}K`
  return usd(n)
}

export const pct = (n: number, digits = 0) => `${(n * 100).toFixed(digits)}%`

export const num = (n: number) => n.toLocaleString('en-US')
