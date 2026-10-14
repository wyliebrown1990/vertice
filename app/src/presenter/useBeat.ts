import { useLocation } from 'react-router-dom'
import { useDemo } from '../store/demo'
import { useUi } from '../store/ui'
import type { Beat } from './notes'

/** Which S1 beat the presenter is on, from route + scenario stage. */
export function useBeat(): Beat {
  const { pathname } = useLocation()
  const stage = useDemo((s) => s.request?.stage ?? 'none')
  const aiOpen = useUi((s) => s.aiOpen)
  if (aiOpen) return 'ai'
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
