import clsx from 'clsx'
import { CheckCircle2, Plug, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageBody, PageHeader } from '../../components/layout/PageHeader'
import { Avatar, VerticeMark } from '../../components/ui/Avatar'
import { Card, CardHeader, Field } from '../../components/ui/Card'
import { Table, Td, THead, Tr } from '../../components/ui/kit'
import { StatusPill } from '../../components/ui/StatusPill'
import { people } from '../../data/people'
import { COMPLIANCE_PREFS, INTEGRATIONS, LEGAL_PREFS, type PrefResult, type Preference } from '../../data/platform'
import { COMPANY } from '../../data/scenario'
import { useUi } from '../../store/ui'

const TABS = [
  { id: 'company', label: 'Company profile' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'users', label: 'Manage users' },
] as const

const RESULT_TONE: Record<PrefResult, 'success' | 'warning' | 'danger'> = { Accepted: 'success', 'Requires Review': 'warning', 'Not Accepted': 'danger' }

/** Editable for the session only: shows that the agents follow company policy. */
function PreferenceGrid({ title, agent, prefs }: { title: string; agent: string; prefs: Preference[] }) {
  const [values, setValues] = useState(() => Object.fromEntries(prefs.flatMap((p) => p.options.map((o) => [`${p.id}:${o.value}`, o.result]))))
  const results: PrefResult[] = ['Accepted', 'Requires Review', 'Not Accepted']
  return (
    <Card>
      <CardHeader
        title={title}
        subtitle={
          <span className="inline-flex items-center gap-1">
            <Sparkles className="size-3 text-primary" /> Used by {agent} on every request
          </span>
        }
      />
      <div className="divide-y divide-line-soft border-t border-line">
        {prefs.map((p) => (
          <div key={p.id} className="grid grid-cols-[180px_1fr] gap-4 px-5 py-3">
            <div className="pt-1.5 text-[13.5px] font-medium text-ink">{p.label}</div>
            <div className="space-y-1.5">
              {p.options.map((o) => {
                const key = `${p.id}:${o.value}`
                return (
                  <div key={o.value} className="flex items-center justify-between gap-3 rounded-lg bg-canvas px-3 py-1.5 text-[13px]">
                    <span className="text-ink-2">{o.value}</span>
                    <div className="flex gap-1" role="radiogroup" aria-label={`${p.label}: ${o.value}`}>
                      {results.map((r) => (
                        <button
                          key={r}
                          role="radio"
                          aria-checked={values[key] === r}
                          onClick={() => setValues((v) => ({ ...v, [key]: r }))}
                          className={clsx(
                            'rounded-full px-2 py-0.5 text-[11.5px] font-medium',
                            values[key] === r
                              ? RESULT_TONE[r] === 'success'
                                ? 'bg-success-tint text-success-ink'
                                : RESULT_TONE[r] === 'warning'
                                  ? 'bg-warning-tint text-warning-ink'
                                  : 'bg-danger-tint text-danger-ink'
                              : 'text-ink-4 hover:text-ink-2',
                          )}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function Integrations() {
  const toast = useUi((s) => s.toast)
  const categories = [...new Set(INTEGRATIONS.map((i) => i.category))]
  return (
    <div className="space-y-6">
      {categories.map((c) => (
        <section key={c}>
          <h3 className="mb-2 text-[13px] font-semibold text-ink-2">{c}</h3>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {INTEGRATIONS.filter((i) => i.category === c).map((i) => (
              <Card key={i.name} className="flex items-start gap-3 p-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold text-white" style={{ backgroundColor: i.color }}>
                  {i.mono}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[14px] font-medium text-ink">{i.name}</span>
                    {i.status === 'Connected' ? (
                      <StatusPill tone="success" icon={<CheckCircle2 className="size-3" />}>
                        Connected
                      </StatusPill>
                    ) : (
                      <button onClick={() => toast(`Connecting ${i.name} is outside this demo`, 'info')} className="inline-flex items-center gap-1 text-[12.5px] font-medium text-primary hover:underline">
                        <Plug className="size-3.5" /> Connect
                      </button>
                    )}
                  </div>
                  <p className="mt-1 text-[12.5px] text-ink-3">{i.note}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export function Settings() {
  const { tab = 'integrations' } = useParams()
  return (
    <>
      <PageHeader title="Settings" meta={<span>{COMPANY.legalName} workspace</span>} tabs={TABS.map((t) => ({ label: t.label, to: `/settings/${t.id}` }))} />
      <PageBody>
        {tab === 'integrations' && <Integrations />}
        {tab === 'compliance' && (
          <div className="grid gap-5 xl:grid-cols-2">
            <PreferenceGrid title="Compliance preferences" agent="Vertice AI - Compliance" prefs={COMPLIANCE_PREFS} />
            <PreferenceGrid title="Legal preferences" agent="Vertice AI - Legal" prefs={LEGAL_PREFS} />
          </div>
        )}
        {tab === 'company' && (
          <Card className="max-w-[760px]">
            <CardHeader title="Company profile" />
            <div className="grid grid-cols-2 gap-5 px-5 pb-5">
              <Field label="Legal name" value={COMPANY.legalName} />
              <Field label="Employees" value={COMPANY.employees.toLocaleString('en-US')} />
              <Field label="Default currency" value="USD" />
              <Field label="Fiscal year" value="Feb – Jan" />
              <Field label="ERP" value="NetSuite (connected)" />
              <Field label="SSO" value="Okta (connected)" />
            </div>
          </Card>
        )}
        {tab === 'users' && (
          <Card>
            <Table>
              <THead cols={['User', 'Title', 'Organization', 'Role']} />
              <tbody>
                {people.map((p) => (
                  <Tr key={p.id}>
                    <Td>
                      <span className="flex items-center gap-2.5 font-medium text-ink">
                        {p.org === 'Vertice' ? <VerticeMark className="size-6" /> : <Avatar name={p.name} tone={p.id === 'alex-morgan' ? 'violet' : 'neutral'} />}
                        {p.name}
                      </span>
                    </Td>
                    <Td className="text-ink-2">{p.title}</Td>
                    <Td className="text-ink-2">{p.org}</Td>
                    <Td>
                      <StatusPill tone={p.id === 'alex-morgan' ? 'violet' : 'neutral'}>{p.id === 'alex-morgan' ? 'Admin' : p.org === 'Vertice' ? 'Vertice team' : 'Approver'}</StatusPill>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}
      </PageBody>
    </>
  )
}
