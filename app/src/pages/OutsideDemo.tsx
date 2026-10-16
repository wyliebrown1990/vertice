import { ArrowRight, Compass } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { ButtonLink } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { outsideModuleBySlug } from '../data/modules'
import { S1_REQUEST_ID } from '../data/scenario'
import { useDemo } from '../store/demo'

/** One shared view for every deferred module (Sprints 4–6). */
export function OutsideDemo({ missing }: { missing?: boolean }) {
  const { slug = '' } = useParams()
  const mod = outsideModuleBySlug(slug)
  const request = useDemo((s) => s.request)
  const renewalTo = request ? `/intelligent-workflows/requests/${S1_REQUEST_ID}/overview` : '/contracts/salesforce/overview'

  const title = missing || !mod ? 'Page not found' : mod.label
  const body =
    missing || !mod
      ? 'This address isn’t part of the demo. Pick up the renewal story or head back to the dashboard.'
      : mod.value

  return (
    <div className="flex min-h-full items-center justify-center p-10">
      <Card className="w-full max-w-[560px] p-8 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary-tint text-primary">
          <Compass className="size-6" />
        </div>
        <p className="mt-5 text-[12px] font-semibold tracking-wide text-primary uppercase">{missing ? 'Not found' : 'Outside this demo'}</p>
        <h1 className="mt-1.5 text-[22px] font-semibold tracking-[-0.02em] text-ink">{title}</h1>
        <p className="mx-auto mt-3 max-w-[440px] text-[14.5px] leading-relaxed text-ink-2">{body}</p>
        {!missing && mod && (
          <p className="mx-auto mt-3 max-w-[440px] text-[13px] text-ink-3">
            It’s part of the Vertice platform but not built in this demo.
          </p>
        )}
        <div className="mt-7 flex justify-center gap-2">
          <ButtonLink to={renewalTo}>
            Return to renewal <ArrowRight className="size-4" />
          </ButtonLink>
          <ButtonLink to="/dashboard" variant="secondary">
            Back to dashboard
          </ButtonLink>
        </div>
      </Card>
    </div>
  )
}
