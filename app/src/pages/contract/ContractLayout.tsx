import { ArrowRight, BarChart3 } from 'lucide-react'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import { PageHeader } from '../../components/layout/PageHeader'
import { RenewalAction } from '../../components/renewal/RenewalAction'
import { ButtonLink } from '../../components/ui/Button'
import { StatusPill } from '../../components/ui/StatusPill'
import { VendorLogo } from '../../components/ui/VendorLogo'
import { vendorById, type Vendor } from '../../data/vendors'
import { useDemo } from '../../store/demo'
import { OutsideDemo } from '../OutsideDemo'

export function ContractLayout() {
  const { id = '' } = useParams()
  const vendor = vendorById(id)
  const secured = useDemo((s) => s.futureTerms.some((t) => t.vendorId === id))
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
          ) : (
            <ButtonLink to="/contracts/salesforce/overview" variant="secondary">
              Open the Salesforce renewal <ArrowRight className="size-4" />
            </ButtonLink>
          )
        }
        tabs={[
          { label: 'Overview', to: `${base}/overview` },
          ...(isS1 ? [{ label: 'Benchmark', to: `${base}/benchmark` }] : []),
          { label: 'Outcomes', to: `${base}/outcomes` },
        ]}
      />
      <Outlet context={vendor satisfies Vendor} />
    </>
  )
}
