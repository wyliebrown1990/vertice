import clsx from 'clsx'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import { personById } from '../../data/people'
import { S1 } from '../../data/scenario'
import { vendorById } from '../../data/vendors'
import { s1Summary } from '../../domain/selectors'
import { defaultRequirements, isSupportedSeatCount } from '../../domain/transitions'
import type { RenewalType, Requirements } from '../../domain/types'
import { formatDate, num, pct } from '../../lib/format'
import { useDemo } from '../../store/demo'
import { useUi } from '../../store/ui'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Overlay'
import { VendorLogo } from '../ui/VendorLogo'

const REASONS = [
  'Right-size seats to active usage plus headroom',
  'Cost-effectiveness / value for money',
  'Business change (team size or scope)',
  'Consolidating overlapping tools',
]

const TYPES: { id: RenewalType; icon: typeof ArrowRight }[] = [
  { id: 'Upgrade', icon: ArrowUpRight },
  { id: 'Flat', icon: ArrowRight },
  { id: 'Downgrade', icon: ArrowDownRight },
]

export function RequirementsModal({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const storedDraft = useDemo((s) => s.draft)
  const saveDraft = useDemo((s) => s.saveDraft)
  const submit = useDemo((s) => s.submitRequirements)
  const toast = useUi((s) => s.toast)
  const [draft, setDraft] = useState<Requirements>(() => storedDraft ?? defaultRequirements())
  const [step, setStep] = useState<'edit' | 'review'>('edit')
  const [seatInput, setSeatInput] = useState(String(draft.seats))
  const sf = vendorById(S1.vendorId)!
  const owner = personById(S1.owner)
  const d = s1Summary()

  const update = (patch: Partial<Requirements>) => {
    const next = { ...draft, ...patch }
    setDraft(next)
    saveDraft(next)
  }

  const seats = Number(seatInput)
  const seatsValid = Number.isInteger(seats) && seats > 0
  const supported = seatsValid && isSupportedSeatCount(seats)

  const close = (o: boolean) => {
    if (!o) setStep('edit')
    onOpenChange(o)
  }

  const applyScenario = () => {
    setSeatInput(String(S1.targetSeats))
    update({ seats: S1.targetSeats, renewalType: 'Downgrade' })
  }

  const onSubmit = () => {
    const res = submit({ ...draft, seats })
    if (res.ok) {
      toast('Requirements submitted: Vertice is now negotiating')
      close(false)
    } else if (res.reason === 'owner-not-confirmed') {
      setStep('edit')
    }
  }

  const steps = ['Vendor & products', 'Renewal requirements', 'Owner confirmation']

  return (
    <Modal
      open={open}
      onOpenChange={close}
      title="Requirements gathering"
      description="Salesforce renewal · assigned to you"
      width="max-w-[760px]"
      footer={
        step === 'edit' ? (
          <>
            <Button variant="secondary" onClick={() => close(false)}>
              Save and close
            </Button>
            <Button disabled={!supported || !draft.ownerConfirmed} onClick={() => setStep('review')}>
              Review
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={() => setStep('edit')}>
              Back
            </Button>
            <Button onClick={onSubmit}>Submit requirements</Button>
          </>
        )
      }
    >
      <div className="grid grid-cols-[170px_1fr] gap-6">
        <ol className="space-y-3 pt-1 text-[13px]">
          {steps.map((s, i) => {
            const done = step === 'review' || (i === 0) || (i === 1 && supported) || (i === 2 && draft.ownerConfirmed)
            return (
              <li key={s} className="flex items-center gap-2">
                <span className={clsx('flex size-4.5 items-center justify-center rounded-full border', done ? 'border-success bg-success text-white' : 'border-ink-4')}>
                  {done && <Check className="size-3" strokeWidth={3} />}
                </span>
                <span className={done ? 'text-ink' : 'text-ink-3'}>{s}</span>
              </li>
            )
          })}
        </ol>

        {step === 'edit' ? (
          <div className="space-y-5">
            <section className="rounded-xl border border-line">
              <div className="flex items-center gap-3 border-b border-line bg-canvas/60 px-4 py-3">
                <VendorLogo vendor={sf} size="sm" />
                <div className="flex-1 text-[13.5px] font-medium text-ink">Salesforce · {S1.product}</div>
                <span className="text-[12.5px] text-ink-3">{S1.tier} tier</span>
              </div>
              <div className="grid grid-cols-3 gap-3 px-4 py-3 text-[13px]">
                <div>
                  <div className="text-ink-3">Current seats</div>
                  <div className="mt-0.5 font-semibold text-ink">{num(S1.currentSeats)}</div>
                </div>
                <div>
                  <div className="text-ink-3">Active users (28d)</div>
                  <div className="mt-0.5 font-semibold text-ink">
                    {num(S1.activeUsers28d)} <span className="font-normal text-ink-3">({pct(d.utilizationPct)})</span>
                  </div>
                </div>
                <div>
                  <div className="text-ink-3">Notice deadline</div>
                  <div className="mt-0.5 font-semibold text-ink">{d.noticeDays} days</div>
                </div>
              </div>
            </section>

            <section>
              <div className="text-[13px] font-medium text-ink">Renewal type</div>
              <div className="mt-2 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Renewal type">
                {TYPES.map((t) => (
                  <button
                    key={t.id}
                    role="radio"
                    aria-checked={draft.renewalType === t.id}
                    onClick={() => {
                      update({ renewalType: t.id })
                      if (t.id !== 'Downgrade') setSeatInput(String(t.id === 'Flat' ? S1.currentSeats : S1.currentSeats + 50))
                      else setSeatInput(String(S1.targetSeats))
                    }}
                    className={clsx(
                      'flex h-14 flex-col items-center justify-center rounded-xl border text-[13.5px] font-medium',
                      draft.renewalType === t.id ? 'border-ink bg-white text-ink ring-1 ring-ink' : 'border-line text-ink-2 hover:bg-canvas',
                    )}
                  >
                    <t.icon className="size-4" />
                    {t.id}
                  </button>
                ))}
              </div>
              <p className="mt-1.5 text-[12px] text-ink-3">Downgrade here means fewer seats, not a lower product tier.</p>
            </section>

            <section className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-[13px] font-medium text-ink">Proposed seats</span>
                <input
                  type="number"
                  min={1}
                  value={seatInput}
                  onChange={(e) => {
                    setSeatInput(e.target.value)
                    const n = Number(e.target.value)
                    if (Number.isInteger(n) && n > 0) update({ seats: n })
                  }}
                  className="mt-1.5 h-9 w-full rounded-lg border border-line px-3 text-[14px] tabular-nums outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15"
                />
              </label>
              <label className="block">
                <span className="text-[13px] font-medium text-ink">Reason</span>
                <select
                  value={draft.reason}
                  onChange={(e) => update({ reason: e.target.value })}
                  className="mt-1.5 h-9 w-full rounded-lg border border-line bg-white px-2.5 text-[14px] outline-none focus:border-primary/60"
                >
                  {REASONS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </label>
            </section>

            {seatsValid && !supported && (
              <div className="flex items-start gap-3 rounded-xl border border-warning/40 bg-warning-tint px-4 py-3 text-[13px] text-warning-ink">
                <TriangleAlert className="mt-0.5 size-4 shrink-0" />
                <div className="flex-1">
                  This demo models the owner-approved {num(S1.targetSeats)}-seat scenario only. No offer exists for {num(seats)} seats.
                  <div className="mt-2">
                    <Button size="sm" variant="secondary" onClick={applyScenario}>
                      Use demo scenario ({num(S1.targetSeats)} seats)
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {supported && (
              <p className="text-[12.5px] text-ink-3">
                {num(S1.targetSeats)} seats = {num(S1.activeUsers28d)} active users + {d.headroomSeats} seats of headroom for hiring and seasonal peaks.
              </p>
            )}

            <label className="flex items-start gap-3 rounded-xl border border-line px-4 py-3">
              <input
                type="checkbox"
                checked={draft.ownerConfirmed}
                onChange={(e) => update({ ownerConfirmed: e.target.checked })}
                className="mt-0.5 size-4 accent-[#6000F0]"
              />
              <span className="text-[13px] text-ink-2">
                <b className="text-ink">{owner.name}</b> ({owner.title}, business owner) confirms {num(S1.targetSeats)} seats leaves enough headroom.
              </span>
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-[13.5px] text-ink-2">Check the requirements before Vertice starts negotiating.</p>
            <dl className="divide-y divide-line-soft rounded-xl border border-line text-[13.5px]">
              {[
                ['Vendor', `Salesforce · ${S1.product}`],
                ['Renewal type', `${draft.renewalType} (seat scope)`],
                ['Seats', `${num(S1.currentSeats)} → ${num(seats)}`],
                ['Reason', draft.reason],
                ['Term', `12 months from ${formatDate(S1.nextTermStart)}, billed annually`],
                ['Owner confirmation', `${owner.name} confirmed`],
                ['Negotiation', 'Vertice-led (Julian Hayes)'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-4 py-2.5">
                  <dt className="text-ink-3">{k}</dt>
                  <dd className="text-right font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </Modal>
  )
}
