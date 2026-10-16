/**
 * Requests created from insights (Chapters E and F): the monday.com
 * consolidation and the Anthropic commitment renewal. Both stop at a believable
 * first step; nothing beyond it is simulated.
 */
import { ArrowRight } from 'lucide-react'
import { PageBody } from '../../components/layout/PageHeader'
import { Chain, DetailRows, PeopleCard, RequestHeader } from '../../components/request/RequestShell'
import { VerticeMark } from '../../components/ui/Avatar'
import { ButtonLink } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { AI_COMMITMENTS, ANTHROPIC_REQUEST_ID } from '../../data/chapters/aiSpend'
import { CONSOLIDATION, consolidationDerived } from '../../data/chapters/insights'
import { vendorById } from '../../data/vendors'
import { reached } from '../../domain/flows'
import { formatDate, num, pct, usd } from '../../lib/format'
import { useDemo } from '../../store/demo'
import { OutsideDemo } from '../OutsideDemo'

export function SimpleRequestPage({ id }: { id: string }) {
  const consolidation = useDemo((s) => reached(s, 'consolidation', 'requested'))
  const anthropic = useDemo((s) => reached(s, 'ai-commit', 'requested'))

  if (id === CONSOLIDATION.requestId) {
    if (!consolidation) return <OutsideDemo missing />
    const d = consolidationDerived()
    return (
      <>
        <RequestHeader
          id={id}
          title="Consolidate monday.com into Asana"
          logoId="monday"
          completed={false}
          meta={
            <>
              <span>SaaS - Contract Renewal · Downgrade (non-renewal)</span>
              <span className="text-ink-4">·</span>
              <span>{usd(d.annualSaving)} a year to remove</span>
              <span className="text-ink-4">·</span>
              <span className="font-medium text-warning-ink">Notice deadline {formatDate(d.drop.vendor.noticeDeadline!)}</span>
            </>
          }
        />
        <PageBody>
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
            <div className="min-w-0 space-y-5">
              <Card className="p-5">
                <div className="text-[15px] font-semibold text-ink">Requirements gathering</div>
                <p className="mt-1 text-[13.5px] text-ink-2">
                  Confirm with Operations (Grace Liu) and Marketing (Ella Fischer) that monday.com boards can move to Asana. {num(d.drop.active)} active monday.com users join {num(d.keep.active)} Asana
                  users, within Asana’s {num(d.keep.licensed)} licenses.
                </p>
                <ul className="mt-4 grid gap-2 text-[13px] sm:grid-cols-2">
                  {['Owners confirm the migration plan', 'Give monday.com notice before Apr 20, 2027', 'Migrate boards (Operations)', 'Asana renewal: hold 280 licenses'].map((t, i) => (
                    <li key={t} className="flex items-center gap-2 rounded-lg border border-line px-3 py-2">
                      <span className="flex size-5 items-center justify-center rounded-full border border-line text-[11px] text-ink-3">{i + 1}</span>
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[12.5px] text-ink-3">The saving counts in Total savings only once the monday.com contract ends.</p>
              </Card>
              <Chain
                steps={[
                  { label: 'Requirements', owner: 'Alex Morgan', state: 'active' },
                  { label: 'Owner approval', owner: 'Ops + Marketing', state: 'pending' },
                  { label: 'Give notice', owner: 'Vertice', state: 'pending' },
                  { label: 'Completed', owner: 'Vertice', state: 'pending' },
                ]}
              />
            </div>
            <div className="space-y-5">
              <DetailRows
                rows={[
                  ['Keep', `Asana · ${pct(d.keep.utilization)} used`],
                  ['Eliminate', `monday.com · ${pct(d.drop.utilization)} used`],
                  ['Annual saving', usd(d.annualSaving)],
                  ['monday.com renews', formatDate(d.drop.vendor.renewalDate)],
                  ['Source', 'Usage insights · Tech Consolidation agent'],
                ]}
              />
              <PeopleCard people={[{ id: 'alex-morgan', role: 'Requester' }, { name: 'Grace Liu', title: 'Operations', role: 'Owner' }, { name: 'Ella Fischer', title: 'Marketing', role: 'Owner' }]} />
            </div>
          </div>
        </PageBody>
      </>
    )
  }

  if (id === ANTHROPIC_REQUEST_ID) {
    if (!anthropic) return <OutsideDemo missing />
    const v = vendorById('anthropic')!
    const c = AI_COMMITMENTS[0]
    return (
      <>
        <RequestHeader
          id={id}
          title="Renewal - Anthropic (commitment)"
          logoId="anthropic"
          completed={false}
          meta={
            <>
              <span>SaaS - Contract Renewal · Upgrade</span>
              <span className="text-ink-4">·</span>
              <span>{usd(v.annualCost)} current commitment</span>
              <span className="text-ink-4">·</span>
              <span className="font-medium text-warning-ink">Notice deadline {formatDate(v.noticeDeadline!)}</span>
            </>
          }
        />
        <PageBody>
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
            <div className="min-w-0 space-y-5">
              <Card className="p-5">
                <div className="flex items-start gap-3">
                  <VerticeMark className="mt-0.5 size-8" />
                  <div>
                    <div className="text-[15px] font-semibold text-ink">Vertice-Led Negotiation</div>
                    <div className="text-[13px] text-ink-3">Our team is actively working on this request.</div>
                  </div>
                </div>
                <p className="mt-4 text-[13.5px] text-ink-2">
                  Northwind has used {pct(c.used / c.commitment)} of its {usd(c.commitment)} commitment with 3 months left, so overage pricing would apply from December. Vertice will negotiate a larger
                  commitment at a better unit rate, sized from AI Cost Optimization usage data, before the {formatDate(v.noticeDeadline!)} notice date.
                </p>
              </Card>
              <Chain
                steps={[
                  { label: 'Requirements', owner: 'Marcus Lee', state: 'done' },
                  { label: 'Negotiation', owner: 'Vertice', state: 'active', vertice: true },
                  { label: 'Approval', owner: 'Priya Shah', state: 'pending' },
                  { label: 'Completed', owner: 'Vertice', state: 'pending' },
                ]}
              />
            </div>
            <div className="space-y-5">
              <DetailRows
                rows={[
                  ['Vendor', 'Anthropic'],
                  ['Product', v.product],
                  ['Commitment', usd(c.commitment)],
                  ['Used to date', `${usd(c.used)} (${pct(c.used / c.commitment)})`],
                  ['Term end', formatDate(c.termEnd)],
                ]}
              />
              <PeopleCard people={[{ id: 'marcus-lee', role: 'Requester' }, { id: 'priya-shah', role: 'Approver' }, { id: 'nina-patel', role: 'Negotiator' }]} />
              <ButtonLink to="/insights/ai-spend" variant="secondary">
                Back to AI spend <ArrowRight className="size-4" />
              </ButtonLink>
            </div>
          </div>
        </PageBody>
      </>
    )
  }

  return <OutsideDemo missing />
}
