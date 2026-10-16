import { useLocation } from 'react-router-dom'
import { useDemo } from '../store/demo'
import { useUi } from '../store/ui'
import { flowStep } from '../domain/flows'
import type { ChapterBeat } from './chapterNotes'
import type { Beat } from './notes'

/** Which beat the presenter is on (S1 or a full-demo chapter), from route + state. */
export function useBeat(): Beat | ChapterBeat {
  const { pathname } = useLocation()
  const stage = useDemo((s) => s.request?.stage ?? 'none')
  const i2p = useDemo((s) => flowStep(s, 'i2p'))
  const aiOpen = useUi((s) => s.aiOpen)
  if (aiOpen) return 'ai'
  if (pathname.includes('req-gong-ana') || pathname.startsWith('/contracts/gong')) return 'ana'
  if (pathname.startsWith('/intake')) return 'intake'
  if (pathname.includes('req-remote-support'))
    return i2p === 'reviews' ? 'i2p-reviews' : i2p === 'commercial' || i2p === 'signing' ? 'i2p-commercial' : i2p === 'completed' ? 'i2p-done' : 'i2p-risk'
  if (pathname.startsWith('/sourcing') || pathname.includes('req-contract-ai-rfp')) return 'rfp'
  if (pathname.startsWith('/vendors')) return 'vendor'
  if (pathname.startsWith('/expert-engage')) return 'expert'
  if (pathname.startsWith('/invoices')) return 'invoice'
  if (['/purchase-orders', '/catalog', '/orders', '/offers'].some((p) => pathname.startsWith(p))) return 'p2p'
  if (pathname.startsWith('/insights/budgets')) return 'budgets'
  if (pathname.startsWith('/savings')) return 'savings'
  if (pathname.startsWith('/analytics')) return 'analytics'
  if (pathname.startsWith('/insights/usage') || pathname.includes('req-monday')) return 'usage'
  if (pathname.startsWith('/insights/procurement')) return 'procurement'
  if (pathname.startsWith('/workflows')) return 'workflow'
  if (pathname.startsWith('/insights/ai-spend') || pathname.includes('req-anthropic')) return 'ai-spend'
  if (pathname.startsWith('/cloud')) return 'cloud'
  if (pathname.startsWith('/documents') || pathname.endsWith('/documents')) return 'documents'
  if (pathname.startsWith('/settings')) return 'settings'
  if (pathname.startsWith('/dashboard')) return 'dashboard'
  if (pathname.endsWith('/benchmark')) return 'benchmark'
  if (pathname.endsWith('/outcomes')) return 'outcome'
  if (pathname.startsWith('/contracts/salesforce')) return stage === 'completed' ? 'outcome' : 'contract'
  if (pathname.startsWith('/intelligent-workflows/requests/')) {
    if (stage === 'requirements') return 'requirements'
    if (stage === 'negotiation') return 'negotiation'
    if (stage === 'approval') return 'approval'
    if (stage === 'contracting') return 'contracting'
    if (stage === 'completed') return 'outcome'
  }
  return 'other'
}
