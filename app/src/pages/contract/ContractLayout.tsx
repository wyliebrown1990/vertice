import { ArrowRight, BarChart3, Sparkles } from 'lucide-react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '../../components/layout/PageHeader'
import { RenewalAction } from '../../components/renewal/RenewalAction'
import { Button, ButtonLink } from '../../components/ui/Button'
import { StatusPill } from '../../components/ui/StatusPill'
import { VendorLogo } from '../../components/ui/VendorLogo'
import { vendorById, type Vendor } from '../../data/vendors'
import { ANA_REQUEST_ID } from '../../data/chapters/ana'
import { flowStep } from '../../domain/flows'
import { securedVendorIds } from '../../domain/selectors'
import { useDemo } from '../../store/demo'
import { OutsideDemo } from '../OutsideDemo'

const CONTEXT_ACTION: Record<string, { label: string; to: string }> = {
  asana: { label: 'Review consolidation', to: '/insights/usage' },
  monday: { label: 'Review consolidation', to: '/insights/usage' },
  anthropic: { label: 'View AI spend', to: '/insights/ai-spend' },
  openai: { label: 'View AI spend', to: '/insights/ai-spend' },
  cursor: { label: 'View AI spend', to: '/insights/ai-spend' },
  zscaler: { label: 'Review open invoice', to: '/invoices/INV-ZS-24118' },
}

/** Gong: hand the renewal to Ana (Chapter A2). */
function AnaAction() {
  const step = useDemo((s) => flowStep(s, 'ana'))
  const advance = useDemo((s) => s.advance)
  const navigate = useNavigate()
  const to = `/intelligent-workflows/requests/${ANA_REQUEST_ID}/overview`
  if (step !== 'none')
    return (
      <ButtonLink to={to} variant={step === 'completed' ? 'secondary' : 'primary'}>
        <Sparkles className="size-4" /> {step === 'completed' ? 'View Ana renewal' : 'View Ana negotiation'}
      </ButtonLink>
    )
  return (
    <Button
      onClick={() => {
        advance('ana', 'none', 'briefing')
        navigate(to)
      }}
    >
      <Sparkles className="size-4" /> Negotiate with Ana
    </Button>
  )
}

export function ContractLayout() {
  const { id = '' } = useParams()
  const vendor = vendorById(id)
  const secured = useDemo((s) => securedVendorIds(s).has(id))
  const onBenchmark = useLocation().pathname.endsWith('/benchmark')
  if (!vendor) return <OutsideDemo missing />
  const isS1 = vendor.id === 'salesforce'
  const base = `/contracts/${vendor.id}`

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Contracts', to: '/contracts' }, { label: vendor.name }]}
        icon={<VendorLogo vendor={vendor} size="lg" />}
        title={
          <span className="flex items-center gap-2.5">
            {vendor.name}
            <StatusPill tone="success">Live</StatusPill>
            {secured && <StatusPill tone="violet">Renewal secured</StatusPill>}
            <StatusPill tone="outline">Software</StatusPill>
          </span>
        }
        meta={<span>{vendor.product} · {vendor.category}</span>}
        actions={
          isS1 ? (
            <>
              {!onBenchmark && (
                <ButtonLink to={`${base}/benchmark`} variant="secondary">
                  <BarChart3 className="size-4" /> View benchmark
                </ButtonLink>
              )}
              <RenewalAction />
            </>
          ) : vendor.id === 'gong' ? (
            <AnaAction />
          ) : (
            <ButtonLink to={CONTEXT_ACTION[vendor.id]?.to ?? '/expert-engage'} variant="secondary">
              {CONTEXT_ACTION[vendor.id]?.label ?? 'Get expert support'} <ArrowRight className="size-4" />
            </ButtonLink>
          )
        }
        tabs={[
          { label: 'Overview', to: `${base}/overview` },
          ...(isS1 ? [{ label: 'Benchmark', to: `${base}/benchmark` }] : []),
          { label: 'Documents', to: `${base}/documents` },
          { label: 'Outcomes', to: `${base}/outcomes` },
        ]}
      />
      <Outlet context={vendor satisfies Vendor} />
    </>
  )
}
