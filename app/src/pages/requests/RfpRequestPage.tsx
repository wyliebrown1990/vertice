import { ArrowRight } from 'lucide-react'
import { PageBody } from '../../components/layout/PageHeader'
import { chainStates } from '../../components/request/chain'
import { Chain, DetailRows, PeopleCard, RequestHeader } from '../../components/request/RequestShell'
import { ButtonLink } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { RFP, RFP_REQUEST_ID, rfpDerived, weightedScore } from '../../data/chapters/rfp'
import { flowStep } from '../../domain/flows'
import { formatDate, usd } from '../../lib/format'
import { useDemo } from '../../store/demo'

/** Chapter C request overview: the RFP as a request with its progress chain. */
export function RfpRequestPage() {
  const step = useDemo((s) => flowStep(s, 'rfp'))
  const d = rfpDerived()
  const completed = step === 'completed'
  const idx = { none: 0, builder: 0, sent: 1, responses: 2, awarded: 3, onboarding: 3, completed: 4 }[step]
  const st = chainStates(4, idx, completed)
  return (
    <>
      <RequestHeader
        id={RFP_REQUEST_ID}
        title={`${RFP.title} [RFP]`}
        logoId={idx >= 3 ? RFP.winnerId : 'rfp'}
        completed={completed}
        meta={
          <>
            <span>Request for Proposal · Legal</span>
            <span className="text-ink-4">·</span>
            <span>{idx >= 3 ? `Awarded ${usd(d.winner.price)}` : `Budget ${usd(RFP.budget)}`}</span>
          </>
        }
        actions={
          <ButtonLink to="/sourcing/rfp" variant="secondary">
            Open RFP Builder
          </ButtonLink>
        }
      />
      <PageBody>
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
          <div className="min-w-0 space-y-5">
            <Card className="p-5">
              <div className="text-[15px] font-semibold text-ink">
                {completed ? 'Lexora onboarded and active' : step === 'onboarding' ? 'Supplier Information & Documents' : step === 'none' ? 'Not started' : 'RFP in progress'}
              </div>
              <p className="mt-1 text-[13.5px] text-ink-2">
                {completed
                  ? `Lexora completed the Vendor Portal tasks. The contract (${usd(d.winner.price)} / yr, starts Nov 1) is not yet live and PO-1043 is in draft.`
                  : step === 'onboarding'
                    ? 'Lexora is completing banking, tax, security and DPA tasks in the Vendor Portal.'
                    : 'Responses are being collected and scored in the RFP Builder.'}
              </p>
              {idx >= 3 && (
                <ButtonLink to="/vendors/lexora?tab=portal" className="mt-4">
                  Vendor Portal <ArrowRight className="size-4" />
                </ButtonLink>
              )}
            </Card>
            <Chain
              steps={[
                { label: 'Questionnaire', owner: 'Alex Morgan', state: st[0] },
                { label: 'Evaluate responses', owner: 'Vertice AI', state: st[1] },
                { label: 'Vendor selection', owner: 'Leah Brooks', state: st[2] },
                { label: 'Vendor Onboarding', owner: 'Lexora', state: st[3] },
              ]}
            />
          </div>
          <div className="space-y-5">
            <DetailRows
              rows={[
                ['Winner', idx >= 3 ? `Lexora · ${weightedScore(d.winner).toFixed(1)}/10` : 'Pending'],
                ['Price', idx >= 3 ? `${usd(d.winner.price)} / yr` : '–'],
                ['Cost avoidance', idx >= 3 ? `${usd(d.costAvoidance)} vs list` : '–'],
                ['Bidders', '4 invited · 3 responded'],
                ['Responses due', formatDate(RFP.responseDeadline)],
              ]}
            />
            <PeopleCard people={[{ id: 'leah-brooks', role: 'Requester' }, { id: 'alex-morgan', role: 'Procurement' }, { id: 'nina-patel', role: 'Vertice expert' }]} />
          </div>
        </div>
      </PageBody>
    </>
  )
}
