/**
 * Chapter B, step 1: Conversational Intake in Slack (simulated). Sam asks for
 * software in Slack; the Vertice app reads the order form and hands off to
 * Dynamic Intake with the fields pre-filled.
 */
import clsx from 'clsx'
import { ArrowRight, FileText, Hash, Paperclip, SendHorizontal, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { VerticeMark } from '../../components/ui/Avatar'
import { I2P, i2pDerived } from '../../data/chapters/i2p'
import { flowStep } from '../../domain/flows'
import { usd } from '../../lib/format'
import { useDemo } from '../../store/demo'

const SAM_TEXT = 'Hi! The support team needs remote desktop software so agents can fix issues on customer machines. 60 agents. We trialled LinkDesk and have their quote.'

function Msg({ who, time, children, app }: { who: string; time: string; children: React.ReactNode; app?: boolean }) {
  return (
    <div className="flex gap-3 px-5 py-2 hover:bg-[#f8f8f8]">
      {app ? (
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-black/10">
          <VerticeMark className="size-6" />
        </span>
      ) : (
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#2BAC76] text-[13px] font-bold text-white">SO</span>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-[15px] font-bold text-[#1d1c1d]">{who}</span>
          {app && <span className="rounded bg-[#e8e8e8] px-1 text-[10px] font-semibold text-[#616061]">APP</span>}
          <span className="text-[12px] text-[#616061]">{time}</span>
        </div>
        <div className="text-[15px] leading-snug text-[#1d1c1d]">{children}</div>
      </div>
    </div>
  )
}

export function SlackIntake() {
  const navigate = useNavigate()
  const i2p = useDemo((s) => flowStep(s, 'i2p'))
  const [sent, setSent] = useState(false)
  const [replied, setReplied] = useState(0)
  const d = i2pDerived()

  useEffect(() => {
    if (!sent) return
    const t1 = window.setTimeout(() => setReplied(1), 900)
    const t2 = window.setTimeout(() => setReplied(2), 2000)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [sent])

  return (
    <div className="flex h-full flex-col bg-[#f4ede4] p-6">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[12.5px] text-ink-3">
          <b className="text-ink">Northwind Slack</b> · simulated. Requests can start in Slack, Teams, email or the Vertice app.
        </p>
        {i2p !== 'none' && (
          <button onClick={() => navigate('/intelligent-workflows/requests/req-remote-support-purchase/overview')} className="text-[13px] font-medium text-primary hover:underline">
            Request already submitted: view it
          </button>
        )}
      </div>
      <div className="flex min-h-0 flex-1 overflow-hidden rounded-xl bg-white shadow-[var(--shadow-pop)] ring-1 ring-black/10">
        <aside className="hidden w-[220px] shrink-0 flex-col bg-[#3f0e40] py-3 text-[14px] text-[#cfc3cf] md:flex">
          <div className="px-4 pb-3 text-[17px] font-bold text-white">Northwind</div>
          {['general', 'support-team', 'it-help', 'procurement'].map((c) => (
            <div key={c} className="flex items-center gap-1.5 px-4 py-1">
              <Hash className="size-3.5" /> {c}
            </div>
          ))}
          <div className="mt-4 px-4 pb-1 text-[13px]">Apps</div>
          <div className="mx-2 flex items-center gap-2 rounded-md bg-[#1164a3] px-2 py-1 text-white">
            <VerticeMark className="size-4" /> Vertice
          </div>
        </aside>
        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-2 border-b border-black/10 px-5 py-3">
            <VerticeMark className="size-5" />
            <span className="text-[16px] font-bold text-[#1d1c1d]">Vertice</span>
            <span className="ml-3 flex gap-4 text-[13px] text-[#616061]">
              <span className="border-b-2 border-[#1d1c1d] pb-0.5 font-semibold text-[#1d1c1d]">Chat</span>
              <span>History</span>
              <span>About</span>
            </span>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto py-3">
            <Msg who="Vertice" time="9:41 AM" app>
              Hi Sam! What would you like to do today?
              <div className="mt-2 flex flex-wrap gap-2">
                {['Buy new software', 'What vendors can I purchase?', 'Show my existing contracts'].map((c) => (
                  <span key={c} className="rounded-md border border-black/15 px-2.5 py-1 text-[13px] font-medium text-[#1d1c1d]">
                    {c}
                  </span>
                ))}
              </div>
            </Msg>
            {sent && (
              <Msg who="Sam Okafor" time="9:42 AM">
                {SAM_TEXT}
                <div className="mt-2 flex w-fit items-center gap-2.5 rounded-lg border border-black/15 px-3 py-2">
                  <span className="flex size-8 items-center justify-center rounded bg-[#e01e5a] text-white">
                    <FileText className="size-4" />
                  </span>
                  <span className="text-[13px]">
                    <span className="block font-semibold">{I2P.orderFormFile}</span>
                    <span className="text-[#616061]">PDF</span>
                  </span>
                </div>
              </Msg>
            )}
            {replied >= 1 && (
              <Msg who="Vertice" time="9:42 AM" app>
                <span className="inline-flex items-center gap-1.5 text-[#616061] italic">
                  <Sparkles className="size-3.5 text-primary" /> Reading the order form…
                </span>
              </Msg>
            )}
            {replied >= 2 && (
              <Msg who="Vertice" time="9:42 AM" app>
                Thanks Sam. I read the order form: <b>LinkDesk Remote</b>, {I2P.seats} licenses, {usd(d.requestedQuote)} a year. I’ve filled in your request: Support budget, cost center and
                start date. Northwind also has a <b>preferred vendor</b> in this category (TeamViewer).
                <div className="mt-2">
                  <button
                    onClick={() => navigate('/intake/new?from=slack')}
                    className="inline-flex items-center gap-1.5 rounded-md bg-[#007a5a] px-3 py-1.5 text-[14px] font-bold text-white hover:bg-[#148567]"
                  >
                    Review purchase details <ArrowRight className="size-4" />
                  </button>
                </div>
              </Msg>
            )}
          </div>
          <div className="p-4">
            <div className={clsx('rounded-lg border border-black/30 px-3 py-2', sent && 'opacity-60')}>
              {!sent && (
                <div className="mb-2 flex w-fit items-center gap-2 rounded-md bg-[#f8f8f8] px-2 py-1 text-[12.5px] text-[#1d1c1d]">
                  <Paperclip className="size-3.5" /> {I2P.orderFormFile}
                </div>
              )}
              <div className="flex items-end gap-2">
                <p className="min-h-[22px] flex-1 text-[15px] text-[#1d1c1d]">{sent ? <span className="text-[#868686]">Message Vertice</span> : SAM_TEXT}</p>
                <button
                  disabled={sent}
                  onClick={() => setSent(true)}
                  aria-label="Send message"
                  className="flex size-8 items-center justify-center rounded bg-[#007a5a] text-white disabled:bg-[#ddd]"
                >
                  <SendHorizontal className="size-4" />
                </button>
              </div>
            </div>
            <p className="mt-1.5 text-[11.5px] text-ink-4">Signed in as Sam Okafor (Customer Support Lead) · simulated Slack, nothing is posted</p>
          </div>
        </section>
      </div>
    </div>
  )
}
