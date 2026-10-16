/**
 * Chapter D: Procure-to-Pay. Purchase orders, invoice capture and two-way
 * matching (contract/PO ↔ invoice), approval rules, catalog punchout, orders,
 * offers, the savings ledger and budgets. Three-way (goods-receipt) matching is
 * not shown: Vertice lists it as planned.
 */
import clsx from 'clsx'
import { ArrowRight, CheckCircle2, Mail, Minus, Plus, ShieldCheck, ShoppingCart, Sparkles, TriangleAlert } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AreaChart, Donut } from '../../components/charts/charts'
import { BudgetBar } from '../../components/budget/BudgetBar'
import { PageBody, PageHeader } from '../../components/layout/PageHeader'
import { Button } from '../../components/ui/Button'
import { Card, CardHeader } from '../../components/ui/Card'
import { AgentChip, DemoNote, FullProductCard, Kpi, Logo, Table, Td, THead, Tr } from '../../components/ui/kit'
import { Modal } from '../../components/ui/Overlay'
import { StatusPill } from '../../components/ui/StatusPill'
import { anaDerived } from '../../data/chapters/ana'
import { departmentBudgets, FISCAL_YEAR, type DeptBudget } from '../../data/chapters/budgets'
import { I2P, i2pDerived } from '../../data/chapters/i2p'
import { CATALOG_ITEMS, INVOICE_RULE, SEEDED_ORDERS, ZSCALER_CONTRACTED, type Invoice, type PoStatus } from '../../data/chapters/p2p'
import { BIDDERS, RFP, rfpDerived } from '../../data/chapters/rfp'
import { vendorName } from '../../data/directory'
import { savingsHistory } from '../../data/savingsHistory'
import { S1, s1Derived } from '../../data/scenario'
import { invoiceMatch, invoices, invoiceStatus, otherBenefits, purchaseOrders, type InvoiceStatus } from '../../domain/chapters'
import { reached } from '../../domain/flows'
import { allSavings, savingsSummary } from '../../domain/selectors'
import { formatDate, pct, usd } from '../../lib/format'
import { useDemo, useScenario } from '../../store/demo'
import { useUi } from '../../store/ui'

const PO_TONE: Record<PoStatus, 'neutral' | 'warning' | 'info' | 'violet' | 'success'> = {
  Draft: 'neutral',
  'Pending approval': 'warning',
  Committed: 'violet',
  Invoiced: 'info',
  Paid: 'success',
}

const INV_TONE: Record<InvoiceStatus, 'warning' | 'danger' | 'info' | 'success' | 'violet'> = {
  'Needs review': 'warning',
  Disputed: 'danger',
  Approved: 'info',
  Paid: 'success',
  Scheduled: 'violet',
  Matched: 'success',
}

/* ---------------- Purchase orders ---------------- */

export function PurchaseOrders() {
  const s = useScenario()
  const pos = useMemo(() => purchaseOrders(s), [s])
  const [open, setOpen] = useState<string | null>(null)
  const sum = (st: PoStatus) => pos.filter((p) => p.status === st).reduce((a, p) => a + p.amount, 0)
  const total = pos.reduce((a, p) => a + p.amount, 0)
  const po = pos.find((p) => p.id === open)
  const tvCreated = reached(s, 'i2p', 'completed')
  return (
    <>
      <PageHeader title="Purchase orders" meta={<span>Created automatically from approved requests · synced to NetSuite</span>} />
      <PageBody className="space-y-5">
        <Card className="p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div className="text-[15px] font-semibold text-ink">Open commitments</div>
            <div className="text-[13px] text-ink-3">{usd(total)} across {pos.length} POs</div>
          </div>
          <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-line-soft">
            {(['Paid', 'Invoiced', 'Committed', 'Pending approval', 'Draft'] as PoStatus[]).map((st, i) => (
              <div key={st} style={{ width: `${(sum(st) / total) * 100}%`, backgroundColor: ['#6000F0', '#8B4DF8', '#B795FF', '#F5A524', '#CBD5E1'][i] }} />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-4 text-[12px] text-ink-3">
            {(['Paid', 'Invoiced', 'Committed', 'Pending approval', 'Draft'] as PoStatus[]).map((st) => (
              <span key={st}>
                {st} <b className="text-ink tabular-nums">{usd(sum(st))}</b>
              </span>
            ))}
          </div>
        </Card>
        {tvCreated && (
          <Card className="flex flex-wrap items-center gap-4 border-primary/30 p-4">
            <Logo id="teamviewer" size="sm" />
            <div className="flex-1 text-[13.5px] text-ink-2">
              <b className="text-ink">PO-1042</b> created automatically when the remote support request completed. Negotiated {usd(i2pDerived().negotiated)} vs {usd(i2pDerived().quote)} offered.
            </div>
            <StatusPill tone="success">Synced to NetSuite</StatusPill>
          </Card>
        )}
        <Card>
          <Table>
            <THead cols={['PO', 'Vendor', 'Description', 'Department', { label: 'Amount', right: true }, 'Status', 'Created']} />
            <tbody>
              {pos.map((p) => (
                <Tr key={p.id} onClick={() => setOpen(p.id)}>
                  <Td className="font-medium text-ink">{p.id}</Td>
                  <Td>
                    <span className="flex items-center gap-2 text-ink">
                      <Logo id={p.vendorId} size="xs" /> {vendorName(p.vendorId)}
                    </span>
                  </Td>
                  <Td className="max-w-[300px] truncate text-ink-2">{p.description}</Td>
                  <Td className="text-ink-2">{p.department}</Td>
                  <Td right>{usd(p.amount)}</Td>
                  <Td>
                    <StatusPill tone={PO_TONE[p.status]}>{p.status}</StatusPill>
                  </Td>
                  <Td className="text-ink-3">{formatDate(p.created)}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </PageBody>
      <Modal open={!!po} onOpenChange={(o) => !o && setOpen(null)} title={po ? `${po.id} · ${vendorName(po.vendorId)}` : ''} description={po?.description}>
        {po && (
          <div className="space-y-4 text-[13.5px]">
            <div className="grid grid-cols-2 gap-3">
              {[
                ['Amount', usd(po.amount)],
                ['Status', po.status],
                ['GL account', po.glAccount],
                ['Department', po.department],
                ['Source', po.source],
                ['ERP', po.status === 'Draft' ? 'Not yet synced' : 'Synced to NetSuite'],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-canvas px-3 py-2">
                  <div className="text-[12px] text-ink-3">{k}</div>
                  <div className="font-medium text-ink">{v}</div>
                </div>
              ))}
            </div>
            {invoices(s).some((i) => i.poId === po.id) && (
              <Link to={`/invoices/${invoices(s).find((i) => i.poId === po.id)!.id}`} className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
                View linked invoice <ArrowRight className="size-3.5" />
              </Link>
            )}
          </div>
        )}
      </Modal>
    </>
  )
}

/* ---------------- Invoices ---------------- */

export function Invoices() {
  const s = useScenario()
  const navigate = useNavigate()
  const list = useMemo(() => invoices(s), [s])
  return (
    <>
      <PageHeader title="Invoices" meta={<span>Captured from email and the vendor portal · every line checked against contract terms</span>} />
      <PageBody className="space-y-5">
        <Card className="flex flex-wrap items-center gap-3 p-4">
          <Sparkles className="size-5 text-primary" />
          <p className="flex-1 text-[13.5px] text-ink-2">
            <b className="text-ink">Contract Price Match</b> compares each invoice with the negotiated contract and PO before it can be paid. Approvals follow your Controls &amp; Permissions
            rules.
          </p>
          <AgentChip name="Vertice AI · Instant" />
        </Card>
        <Card>
          <Table>
            <THead cols={['Invoice', 'Vendor', 'PO', { label: 'Amount', right: true }, 'Received', 'Match', 'Status']} />
            <tbody>
              {list.map((inv) => {
                const m = invoiceMatch(s, inv)
                const st = invoiceStatus(s, inv)
                return (
                  <Tr key={inv.id} onClick={() => navigate(`/invoices/${inv.id}`)}>
                    <Td className="font-medium text-ink">{inv.id}</Td>
                    <Td>
                      <span className="flex items-center gap-2 text-ink">
                        <Logo id={inv.vendorId} size="xs" /> {vendorName(inv.vendorId)}
                      </span>
                    </Td>
                    <Td className="text-ink-2">{inv.poId}</Td>
                    <Td right>{usd(m.billed)}</Td>
                    <Td className="text-ink-3">{formatDate(inv.received)}</Td>
                    <Td>
                      {m.matched ? (
                        <StatusPill tone="success" icon={<CheckCircle2 className="size-3" />}>
                          Matched
                        </StatusPill>
                      ) : (
                        <StatusPill tone="danger" icon={<TriangleAlert className="size-3" />}>
                          Exceeds contract by {usd(m.variance)}
                        </StatusPill>
                      )}
                    </Td>
                    <Td>
                      <StatusPill tone={INV_TONE[st]}>{st}</StatusPill>
                    </Td>
                  </Tr>
                )
              })}
            </tbody>
          </Table>
        </Card>
      </PageBody>
    </>
  )
}

function InvoiceDoc({ inv, billed }: { inv: Invoice; billed: number }) {
  return (
    <Card className="bg-[#fbfbfa] p-6 font-mono text-[12px] text-ink-2">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[16px] font-bold text-ink">{vendorName(inv.vendorId)}</div>
          <div>Accounts Receivable</div>
        </div>
        <div className="text-right">
          <div className="text-[15px] font-bold tracking-widest text-ink">INVOICE</div>
          <div>{inv.id}</div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div>
          <div className="text-ink-4">Bill to</div>
          <div>Northwind Systems, Inc.</div>
          <div>Accounts Payable</div>
        </div>
        <div className="text-right">
          <div>Date: {formatDate(inv.received)}</div>
          <div>Terms: {inv.terms}</div>
          <div>PO: {inv.poId}</div>
        </div>
      </div>
      <table className="mt-5 w-full">
        <thead className="border-y border-ink-4/40 text-left text-ink-3">
          <tr>
            <th className="py-1.5 font-normal">Description</th>
            <th className="py-1.5 text-right font-normal">Amount</th>
          </tr>
        </thead>
        <tbody>
          {inv.lines.map((l) => (
            <tr key={l.description}>
              <td className="py-2 pr-4">{l.description}</td>
              <td className="py-2 text-right">{usd(billed)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end border-t border-ink-4/40 pt-2 text-[13px] font-bold text-ink">Total due {usd(billed)}</div>
    </Card>
  )
}

export function InvoiceReview() {
  const { id = '' } = useParams()
  const s = useScenario()
  const advance = useDemo((x) => x.advance)
  const toast = useUi((x) => x.toast)
  const [emailOpen, setEmailOpen] = useState(false)
  const inv = invoices(s).find((i) => i.id === id)
  if (!inv)
    return (
      <div className="p-8">
        <FullProductCard title="Invoice not found" body="This invoice isn’t in the demo yet. The TeamViewer invoice appears once the remote support purchase completes." />
      </div>
    )
  const m = invoiceMatch(s, inv)
  const st = invoiceStatus(s, inv)
  const zs = inv.flow === 'p2p-zscaler'
  const tv = inv.flow === 'p2p-teamviewer'
  const hist = savingsHistory.find((r) => r.vendorId === 'zscaler')!
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Invoices', to: '/invoices' }, { label: inv.id }]}
        icon={<Logo id={inv.vendorId} size="lg" />}
        title={
          <span className="flex items-center gap-2.5">
            Review invoice {inv.id}
            <StatusPill tone={INV_TONE[st]}>{st}</StatusPill>
          </span>
        }
        meta={
          <span>
            {vendorName(inv.vendorId)} · {inv.poId} · due {formatDate(inv.due)}
          </span>
        }
      />
      <PageBody>
        <div className="grid gap-5 xl:grid-cols-[1fr_440px]">
          <InvoiceDoc inv={inv} billed={m.billed} />
          <div className="space-y-5">
            <Card>
              <CardHeader title="Invoice details" subtitle="Captured by Vertice AI from the PDF" action={<AgentChip name="Document Analysis" />} />
              <div className="grid grid-cols-2 gap-3 px-5 pb-5 text-[13px]">
                {[
                  ['PO number', inv.poId],
                  ['Invoice number', inv.id],
                  ['Vendor', vendorName(inv.vendorId)],
                  ['Amount', usd(m.billed)],
                  ['Payment terms', inv.terms],
                  ['GL account', inv.lines[0].gl],
                  ['Tax code', inv.lines[0].taxCode],
                  ['Due date', formatDate(inv.due)],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="flex items-center gap-1 text-[12px] text-ink-3">
                      <Sparkles className="size-3 text-primary" /> {k}
                    </div>
                    <div className="mt-0.5 rounded-md border border-primary/25 bg-primary-wash/40 px-2 py-1 font-medium text-ink">{v}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className={clsx('overflow-hidden', m.matched ? 'border-success/40' : 'border-danger/40')}>
              <div className={clsx('flex items-center justify-between px-5 py-3', m.matched ? 'bg-success-tint/50' : 'bg-danger-tint/50')}>
                <span className={clsx('flex items-center gap-2 text-[14px] font-semibold', m.matched ? 'text-success-ink' : 'text-danger-ink')}>
                  {m.matched ? <CheckCircle2 className="size-4.5" /> : <TriangleAlert className="size-4.5" />}
                  {m.matched ? (tv ? `Auto matched to ${inv.poId}` : 'Matched to contract') : `Exceeds contract by ${usd(m.variance)}`}
                </span>
                <AgentChip name="Contract Price Match" />
              </div>
              <div className="space-y-2 px-5 py-4 text-[13.5px]">
                <div className="flex justify-between">
                  <span className="text-ink-3">Agreed ({zs ? 'renewed contract' : 'PO'})</span>
                  <span className="font-medium tabular-nums">{usd(m.agreed)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-3">Invoiced</span>
                  <span className="font-medium tabular-nums">{usd(m.billed)}</span>
                </div>
                <div className="flex justify-between border-t border-line pt-2">
                  <span className="text-ink-3">Variance</span>
                  <span className={clsx('font-semibold tabular-nums', m.variance ? 'text-danger-ink' : 'text-success-ink')}>{m.variance ? `+${usd(m.variance)}` : usd(0)}</span>
                </div>
                {zs && !m.matched && (
                  <p className="rounded-lg bg-canvas px-3 py-2 text-[12.5px] text-ink-2">
                    Zscaler renewed through Vertice on {formatDate(hist.completedOn)} at {usd(ZSCALER_CONTRACTED)} (was {usd(hist.baselineAnnual)}). This invoice bills the pre-renewal price.
                  </p>
                )}
                <p className="text-[11.5px] text-ink-4">Two-way match: invoice vs contract and PO. Goods-receipt matching is not part of this demo.</p>
              </div>
            </Card>

            {zs && (
              <Card className="p-5">
                {st === 'Needs review' && (
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="secondary" onClick={() => setEmailOpen(true)} className="border-danger/40 text-danger-ink">
                      <Mail className="size-4" /> Return to vendor
                    </Button>
                    <span className="text-[12.5px] text-ink-3">Payment is blocked until the invoice matches.</span>
                  </div>
                )}
                {st === 'Disputed' && (
                  <>
                    <div className="text-[14px] font-semibold text-ink">Waiting for a corrected invoice</div>
                    <p className="mt-1 text-[12.5px] text-ink-3">{usd(m.variance)} overbilling prevented. Tracked in Savings as an invoice error, not as new savings.</p>
                    <DemoNote className="mt-3">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="border-primary/40 text-primary"
                        onClick={() => {
                          advance('p2p-zscaler', 'disputed', 'resolved')
                          toast('Corrected invoice received and matched')
                        }}
                      >
                        Show corrected invoice
                      </Button>
                    </DemoNote>
                  </>
                )}
                {st === 'Matched' && <div className="text-[13.5px] font-medium text-success-ink">Corrected invoice matched {usd(ZSCALER_CONTRACTED)} · scheduled for payment</div>}
              </Card>
            )}

            {tv && (
              <Card className="p-5">
                <div className="flex items-center gap-2 text-[14px] font-semibold text-ink">
                  <ShieldCheck className="size-4 text-primary" /> Controls &amp; Permissions
                </div>
                <p className="mt-1 rounded-lg bg-canvas px-3 py-2 font-mono text-[12px] text-ink-2">
                  If amount ≥ {usd(INVOICE_RULE.threshold)} → require {INVOICE_RULE.approvers.join(' + ')} → notify {INVOICE_RULE.notify}
                </p>
                <ul className="mt-3 space-y-1.5 text-[13px]">
                  {[
                    ['Department owner', 'Sam Okafor'],
                    ['Finance', 'Priya Shah'],
                  ].map(([role, who]) => (
                    <li key={role} className="flex items-center justify-between">
                      <span className="text-ink-2">
                        {role} · {who}
                      </span>
                      {reached(s, 'p2p-teamviewer', 'approved') ? <StatusPill tone="success">Approved</StatusPill> : <StatusPill tone="warning">Pending</StatusPill>}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  {st === 'Needs review' && (
                    <Button
                      variant="success"
                      onClick={() => {
                        advance('p2p-teamviewer', 'needs-review', 'approved')
                        toast('Approved by Sam Okafor and Priya Shah')
                      }}
                    >
                      Approve as Sam &amp; Priya (simulated)
                    </Button>
                  )}
                  {st === 'Approved' && (
                    <DemoNote>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="border-primary/40 text-primary"
                        onClick={() => {
                          advance('p2p-teamviewer', 'approved', 'paid')
                          toast('Paid in the next payment run · synced to NetSuite')
                        }}
                      >
                        Show payment run
                      </Button>
                    </DemoNote>
                  )}
                  {st === 'Paid' && <StatusPill tone="success">Paid · synced to NetSuite</StatusPill>}
                </div>
              </Card>
            )}
          </div>
        </div>
      </PageBody>
      <Modal
        open={emailOpen}
        onOpenChange={setEmailOpen}
        title="Return invoice to Zscaler"
        description="Drafted by the Email agent · review before sending (simulated)"
        footer={
          <Button
            onClick={() => {
              advance('p2p-zscaler', 'needs-review', 'disputed')
              setEmailOpen(false)
              toast('Invoice returned to Zscaler')
            }}
          >
            <Mail className="size-4" /> Send
          </Button>
        }
      >
        <div className="space-y-2 rounded-xl border border-line p-4 text-[13.5px] text-ink-2">
          <div>
            <span className="text-ink-3">To:</span> billing@zscaler.example
          </div>
          <div>
            <span className="text-ink-3">Subject:</span> {inv.id}: amount does not match renewed contract
          </div>
          <p className="pt-2">
            Hello, invoice {inv.id} bills {usd(inv.amount)}, but the renewal signed on {formatDate(hist.completedOn)} sets the annual fee at {usd(ZSCALER_CONTRACTED)} (order form attached). Please
            issue a corrected invoice for {usd(ZSCALER_CONTRACTED)} referencing {inv.poId}. Thank you, Northwind Accounts Payable
          </p>
        </div>
      </Modal>
    </>
  )
}

/* ---------------- Catalog purchases & Orders ---------------- */

export function Catalog() {
  const toast = useUi((s) => s.toast)
  const [cart, setCart] = useState<Record<string, number>>({})
  const suppliers = ['amazonbusiness', 'staples', 'cdw'] as const
  const total = CATALOG_ITEMS.reduce((sum, i) => sum + (cart[i.id] ?? 0) * i.price, 0)
  const setQty = (id: string, d: number) => setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + d) }))
  return (
    <>
      <PageHeader title="Catalog purchases" meta={<span>Guided buying from punchout catalogs at negotiated prices</span>} />
      <PageBody>
        <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            {suppliers.map((sup) => (
              <Card key={sup}>
                <CardHeader title={<span className="flex items-center gap-2"><Logo id={sup} size="xs" /> {vendorName(sup)}</span>} subtitle="Punchout · Northwind negotiated pricing" action={<StatusPill tone="violet">Preferred</StatusPill>} />
                <div className="grid gap-3 px-5 pb-5 sm:grid-cols-2">
                  {CATALOG_ITEMS.filter((i) => i.supplierId === sup).map((i) => (
                    <div key={i.id} className="flex items-center justify-between gap-3 rounded-xl border border-line p-3">
                      <div>
                        <div className="text-[13.5px] font-medium text-ink">{i.name}</div>
                        <div className="text-[12.5px] text-ink-3">{usd(i.price)}</div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button aria-label={`Remove ${i.name}`} onClick={() => setQty(i.id, -1)} className="rounded-md border border-line p-1 hover:bg-canvas">
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-5 text-center text-[13px] tabular-nums">{cart[i.id] ?? 0}</span>
                        <button aria-label={`Add ${i.name}`} onClick={() => setQty(i.id, 1)} className="rounded-md border border-line p-1 hover:bg-canvas">
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
          <Card className="h-fit p-5">
            <div className="flex items-center gap-2 text-[15px] font-semibold text-ink">
              <ShoppingCart className="size-4.5" /> Cart
            </div>
            <div className="mt-3 text-[26px] font-semibold text-ink tabular-nums">{usd(total)}</div>
            <p className="mt-1 text-[12.5px] text-ink-3">
              {total >= INVOICE_RULE.threshold ? `≥ ${usd(INVOICE_RULE.threshold)}: routed to Department owner + Finance` : `Under ${usd(INVOICE_RULE.threshold)}: no approval needed`}
            </p>
            <Button
              className="mt-4 w-full"
              disabled={!total}
              onClick={() => {
                toast(`Order placed (${usd(total)}) · PO created and synced to NetSuite (simulated)`)
                setCart({})
              }}
            >
              Check out
            </Button>
          </Card>
        </div>
      </PageBody>
    </>
  )
}

export function Orders() {
  return (
    <>
      <PageHeader title="Orders" meta={<span>Catalog orders from cart to delivery</span>} />
      <PageBody>
        <Card>
          <Table>
            <THead cols={['Order', 'Supplier', { label: 'Items', right: true }, { label: 'Amount', right: true }, 'Requester', 'Placed', 'Status']} />
            <tbody>
              {SEEDED_ORDERS.map((o) => (
                <Tr key={o.id}>
                  <Td className="font-medium text-ink">{o.id}</Td>
                  <Td>
                    <span className="flex items-center gap-2">
                      <Logo id={o.supplierId} size="xs" /> {vendorName(o.supplierId)}
                    </span>
                  </Td>
                  <Td right>{o.items}</Td>
                  <Td right>{usd(o.amount)}</Td>
                  <Td className="text-ink-2">{o.requester}</Td>
                  <Td className="text-ink-3">{formatDate(o.placed)}</Td>
                  <Td>
                    <StatusPill tone={o.status === 'Delivered' ? 'success' : o.status === 'Shipped' ? 'info' : 'neutral'}>{o.status}</StatusPill>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </PageBody>
    </>
  )
}

/* ---------------- Offers ---------------- */

export function Offers() {
  const s = useScenario()
  const rows: { vendor: string; request: string; baseline: number; offer: number; status: string; to: string }[] = []
  if (s.request && ['approval', 'contracting', 'completed'].includes(s.request.stage))
    rows.push({ vendor: 'salesforce', request: 'Salesforce renewal', baseline: S1.currentAnnualCost, offer: s1Derived().futureAnnualCost, status: s.request.stage === 'approval' ? 'Awaiting approval' : 'Accepted', to: '/intelligent-workflows/requests/req-salesforce-renewal-2027/overview' })
  if (reached(s, 'ana', 'offer'))
    rows.push({ vendor: 'gong', request: 'Gong renewal (Ana)', baseline: anaDerived().currentAnnualCost, offer: anaDerived().futureAnnualCost, status: reached(s, 'ana', 'completed') ? 'Accepted' : 'Awaiting approval', to: '/intelligent-workflows/requests/req-gong-ana-renewal/overview' })
  if (reached(s, 'i2p', 'commercial'))
    rows.push({ vendor: I2P.chosenVendorId, request: 'Remote support software', baseline: i2pDerived().quote, offer: i2pDerived().negotiated, status: reached(s, 'i2p', 'signing') ? 'Accepted' : 'Awaiting approval', to: '/intelligent-workflows/requests/req-remote-support-purchase/overview' })
  if (reached(s, 'rfp', 'responses'))
    for (const b of BIDDERS.filter((x) => x.response === 'received'))
      rows.push({ vendor: b.vendorId, request: `${RFP.title} [RFP]`, baseline: b.listPrice, offer: b.price, status: reached(s, 'rfp', 'awarded') ? (b.vendorId === RFP.winnerId ? 'Accepted' : 'Declined') : 'Under evaluation', to: '/sourcing/rfp' })
  return (
    <>
      <PageHeader title="Offers" meta={<span>Vendor offers across requests, compared with the baseline</span>} />
      <PageBody>
        {rows.length ? (
          <Card>
            <Table>
              <THead cols={['Vendor', 'Request', { label: 'Baseline', right: true }, { label: 'Offer', right: true }, { label: 'Difference', right: true }, 'Status']} />
              <tbody>
                {rows.map((r) => (
                  <Tr key={r.vendor + r.request}>
                    <Td>
                      <Link to={r.to} className="flex items-center gap-2 font-medium text-ink hover:text-primary">
                        <Logo id={r.vendor} size="xs" /> {vendorName(r.vendor)}
                      </Link>
                    </Td>
                    <Td className="text-ink-2">{r.request}</Td>
                    <Td right>{usd(r.baseline)}</Td>
                    <Td right>{usd(r.offer)}</Td>
                    <Td right>
                      <span className="text-success-ink">−{usd(r.baseline - r.offer)} ({pct((r.baseline - r.offer) / r.baseline)})</span>
                    </Td>
                    <Td>
                      <StatusPill tone={r.status === 'Accepted' ? 'success' : r.status === 'Declined' ? 'neutral' : 'warning'}>{r.status}</StatusPill>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </Card>
        ) : (
          <FullProductCard title="No offers yet" body="Offers appear here as negotiations return them: the Salesforce final offer, Ana’s Gong offer, the remote support quote and RFP bids." />
        )}
      </PageBody>
    </>
  )
}

/* ---------------- Savings ledger ---------------- */

export function Savings() {
  const s = useScenario()
  const sum = useMemo(() => savingsSummary(s), [s])
  const records = useMemo(() => [...allSavings(s)].sort((a, b) => b.completedOn.localeCompare(a.completedOn)), [s])
  const other = otherBenefits(s)
  return (
    <>
      <PageHeader title="Savings" meta={<span>Contracted annualized reductions, plus cost avoidance and invoice errors tracked separately</span>} />
      <PageBody className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-3">
          <Kpi label="Total savings" value={usd(sum.reduction)} sub={`${sum.count} renewals · ${pct(sum.weightedPct)} average`} tone="violet" />
          <Kpi label="Cost avoidance" value={usd(other.filter((o) => o.kind === 'Cost avoidance').reduce((a, o) => a + o.amount, 0))} sub="New purchases below quote or list" />
          <Kpi label="Invoice errors prevented" value={usd(other.filter((o) => o.kind === 'Invoice error prevented').reduce((a, o) => a + o.amount, 0))} sub="Contract Price Match" />
        </div>
        <Card>
          <CardHeader title="Renewal savings" subtitle="These count toward Total savings on the dashboard" />
          <Table>
            <THead cols={['Vendor', 'Completed', { label: 'Before', right: true }, { label: 'After', right: true }, { label: 'Annual reduction', right: true }, 'Negotiated by']} />
            <tbody>
              {records.map((r) => (
                <Tr key={r.id}>
                  <Td>
                    <Link to={`/contracts/${r.vendorId}/outcomes`} className="flex items-center gap-2 font-medium text-ink hover:text-primary">
                      <Logo id={r.vendorId} size="xs" /> {vendorName(r.vendorId)}
                    </Link>
                  </Td>
                  <Td className="text-ink-3">{formatDate(r.completedOn)}</Td>
                  <Td right>{usd(r.baselineAnnual)}</Td>
                  <Td right>{usd(r.baselineAnnual - r.annualReduction)}</Td>
                  <Td right>
                    <span className="font-medium text-success-ink">
                      {usd(r.annualReduction)} ({pct(r.annualReduction / r.baselineAnnual)})
                    </span>
                  </Td>
                  <Td>
                    <StatusPill tone={r.source === 'ana' ? 'violet' : 'neutral'}>{r.source === 'ana' ? 'Ana' : 'Vertice experts'}</StatusPill>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Card>
        <Card>
          <CardHeader title="Other benefits" subtitle="Real money, but not an annual reduction on an existing contract, so not added to Total savings" />
          {other.length ? (
            <Table>
              <THead cols={['Type', 'Vendor', 'Note', { label: 'Amount', right: true }]} />
              <tbody>
                {other.map((o) => (
                  <Tr key={o.id}>
                    <Td>
                      <StatusPill tone={o.kind === 'Cost avoidance' ? 'info' : 'warning'}>{o.kind}</StatusPill>
                    </Td>
                    <Td>
                      <span className="flex items-center gap-2">
                        <Logo id={o.vendorId} size="xs" /> {vendorName(o.vendorId)}
                      </span>
                    </Td>
                    <Td className="text-ink-2">{o.note}</Td>
                    <Td right>{usd(o.amount)}</Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="px-5 pb-5 text-[13px] text-ink-3">None yet. Complete the remote support purchase, the RFP, or the Zscaler invoice review.</p>
          )}
        </Card>
      </PageBody>
    </>
  )
}

/* ---------------- Budgets ---------------- */

const withChapters = (b: DeptBudget, tvCommitted: boolean): DeptBudget =>
  b.department === 'Support' && tvCommitted ? { ...b, committed: b.committed + i2pDerived().negotiated, free: b.free - i2pDerived().negotiated } : b

export function Budgets() {
  const s = useScenario()
  const tv = reached(s, 'i2p', 'completed')
  const budgets = useMemo(() => departmentBudgets().map((b) => withChapters(b, tv)), [tv])
  const total = budgets.reduce((a, b) => a + b.budget, 0)
  const used = budgets.reduce((a, b) => a + b.paid + b.invoiced + b.committed, 0)
  const support = budgets.find((b) => b.department === 'Support')!
  const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan']
  const spendTrend = months.map((m, i) => ({ label: m, value: Math.round((used / 12) * (i + 1)) }))
  const rfpDone = reached(s, 'rfp', 'awarded')
  return (
    <>
      <PageHeader crumbs={[{ label: 'Insights' }, { label: 'Budgets' }]} title="Budgets" meta={<span>{FISCAL_YEAR} (Feb 2026 – Jan 2027) · software budgets by department</span>} />
      <PageBody className="space-y-5">
        <div className="grid gap-5 xl:grid-cols-[400px_1fr]">
          <Card className="p-5">
            <div className="text-[15px] font-semibold text-ink">Budget overview</div>
            <p className="text-[12px] text-ink-3">Org budget {usd(total)} · {pct(used / total)} used or committed</p>
            <div className="mt-4">
              <Donut slices={budgets.slice(0, 6).map((b): { label: string; value: number } => ({ label: b.department, value: b.budget })).concat([{ label: 'Other', value: budgets.slice(6).reduce((a, b) => a + b.budget, 0) }])} format={(n) => usd(n)} size={120} />
            </div>
          </Card>
          <Card className="p-5">
            <div className="text-[15px] font-semibold text-ink">Actual spend to date</div>
            <p className="text-[12px] text-ink-3">Cumulative, actual (grey) vs projected (violet) · on track for {pct(used / total)} of budget</p>
            <div className="mt-3">
              <AreaChart points={spendTrend} splitAt={8} format={usd} />
            </div>
          </Card>
        </div>
        <Card className={clsx('p-5', tv && 'border-primary/30')}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-[15px] font-semibold text-ink">Support · {usd(support.budget)}</div>
            {tv && <StatusPill tone="violet">Includes TeamViewer (PO-1042) {usd(i2pDerived().negotiated)}</StatusPill>}
          </div>
          <div className="mt-3">
            <BudgetBar budget={support} />
          </div>
          <p className="mt-2 text-[12.5px] text-ink-3">
            {tv ? `You will end the financial year at ${pct((support.budget - support.free) / support.budget)} of the Support budget.` : 'Complete the remote support purchase to see it land here as committed spend.'}
          </p>
        </Card>
        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {budgets
            .filter((b) => b.department !== 'Support')
            .map((b) => (
              <Card key={b.department} className="p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[14px] font-semibold text-ink">{b.department}</span>
                  <span className="text-[13px] text-ink-3 tabular-nums">{usd(b.budget)}</span>
                </div>
                <div className="mt-0.5 text-[12px] text-ink-3">Owner {b.owner}</div>
                <div className="mt-3">
                  <BudgetBar budget={b} />
                </div>
              </Card>
            ))}
        </div>
        <Card className="p-5">
          <div className="text-[15px] font-semibold text-ink">Approved project budgets</div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[13.5px]">
            <span className="text-ink-2">Legal · Contract review AI</span>
            <span className="text-ink tabular-nums">
              {usd(RFP.budget)} {rfpDone && <span className="text-success-ink">· awarded {usd(rfpDerived().winner.price)}</span>}
            </span>
          </div>
        </Card>
      </PageBody>
    </>
  )
}

