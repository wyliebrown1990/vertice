import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { requestPath } from '../../lib/routes'
import { useDemo } from '../../store/demo'
import { Button, ButtonLink } from '../ui/Button'

/** Primary action for Salesforce: start the one renewal, or reopen it. */
export function RenewalAction({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const request = useDemo((s) => s.request)
  const startRenewal = useDemo((s) => s.startRenewal)
  const navigate = useNavigate()
  if (request)
    return (
      <ButtonLink to={requestPath} size={size} variant={request.stage === 'completed' ? 'secondary' : 'primary'}>
        View renewal <ArrowRight className="size-4" />
      </ButtonLink>
    )
  return (
    <Button
      size={size}
      onClick={() => {
        startRenewal()
        navigate(requestPath)
      }}
    >
      Start renewal <ArrowRight className="size-4" />
    </Button>
  )
}
