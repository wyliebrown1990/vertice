# Vertice Design System (reverse-engineered)

Sources: `raw/shared.css` + `raw/page.css` (Webflow marketing site), 159 marketing product renders in `images_png/`, and 45 unique real-app screenshots from Vertice's Navattic tours in `tours/unique/` (captured from `demo.vertice.one`).

## Brand colors (from `:root` CSS variables)

| Token | Hex | Use in app |
|---|---|---|
| primary-600 (`--light--primary-1`) | `#6000F0` | Primary buttons, active nav, links, tab underline, chart series 1 |
| primary hover | `#7724F4` | Button hover |
| primary-400 | `#9B5CFB` | Gradients, secondary chart series |
| primary-3 (tint) | `#F0E5FF` | Active nav pill bg, selected rows, AI card bg |
| primary-4 (tint) | `#F2F0FF` | Subtle highlight / hover |
| secondary blue | `#0057FA` | Info badges ("In progress"), "Open" CTA, chart series |
| secondary tint | `#E0ECFF` / `#F0F5FF` | Info badge bg |
| tertiary magenta | `#E52EC7` | Cloud/AI-cost charts, accent series |
| tertiary tint | `#F9E5FF` | |
| success | `#16A239` / tint `#E3FBE0` | "Live", "Completed", savings %, low risk |
| warning | `#E9590C` / tint `#FFF2EB` | "Not yet live", medium risk, under-utilized |
| error | `#DC2828` / tint `#FDE3E6` | "Critical", overdue, unapproved, high risk |
| text-1 | `#000` / app uses ~`#0F1729` | Headings |
| text-3 | `#6E6E6E` / slate `#48566A` | Secondary text |
| text-4 | `#8B8A8A` / `#94A3B8` | Labels, captions |
| neutral border | `#E1E7EF` | Card borders, table dividers |
| neutral bg | `#F1F5F9` / `#F8FAFC` | Input bg, table header |
| page bg (marketing) | `#FDFCFC`, beige `#FAF9F5` / `#F5F3F1` | Marketing only; app canvas is white / very light gray `#F8FAFC` |
| dark bg | `#0F1729` / `#0A0F1C` | Dark cards (cloud optimization) |

**Hero gradient** (Total savings card, AI buttons): `linear-gradient(135deg, #6000F0 0%, #9B5CFB 100%)` with faint diagonal line pattern overlay. Floating AI button = violet→magenta radial orb.

## Typography
- **Inter** (variable, opsz). Body weight ~470, labels 500, headings 500–600. Letter-spacing −0.01 to −0.02em.
- Scale used: 13px (captions/table), 14px (body/table default), 16px (card titles), 18–20px (page titles), 28–32px (KPI numbers).
- Marketing display font "Trimposter" — not used in-app; skip.
- JetBrains Mono for code — not needed.

## Shape & elevation
- Radius: cards 12–16px, buttons 8px, badges full-pill, inputs 8px.
- Borders over shadows: 1px `#E1E7EF`; shadows only on modals/popovers (soft, large blur).
- Generous whitespace; dense data tables with 13–14px text.

## App shell (real app, from tours + `procure-to-pay__Catalogue.png`)
- **Left sidebar (~240px, collapsible to icon rail)**: logo "✓ vertice" + bell; `Search ⌘+K`; then groups:
  1. Dashboard · Tasks (count badge) · Requests · Contracts · Documents (New badge)
  2. Offers · Catalog purchases · Purchase orders · Orders · Invoices · Savings *(P2P module)*
  3. Insights ▾ (Analytics, Procurement, Savings, Usage) · Vendors ▾ (Directory, Self Sourcing) · Workflows ▾ · Cloud Optimizer ▾ · Events
  4. Bottom: Help · Settings ▾ · User ▾
- Active item: violet text + `#F0E5FF` pill.
- **Top of page**: breadcrumb (`Contracts / CRM Vendor`), title + status pill(s), right-aligned secondary + primary buttons, `⋮` menu. Tabs underneath with violet underline.
- **Floating Vertice AI orb** bottom-right → slide-in right panel chat ("Hi Sam, how can I help today?" with chips: Contracts · Negotiations · Pricing · Requests · Support; "Ask Vertice" composer, attach, "AI accuracy" footnote).

## Component inventory (seen in real screens)
- KPI cards (label + info icon, big number, sub-caption, optional chevron)
- Gradient "Total savings" hero card with "Average savings 26%"
- Semi-donut gauge (Annualized spend by department; Budget: Free/Committed/Invoiced/Paid)
- Donut charts (spend by dept/category/negotiation support/contract length/billing/payment terms)
- Pipeline swimlane: months on x-axis, stacked vendor logo tiles per month, `+N` overflow, $ total under column, hover tooltip (vendor, annual cost, deadline); toggle "In progress | Upcoming"
- Data tables: logo + name/subtitle, utilization bar with % chip (green ≥80, orange 40–80, red <40, blue >100), status pills, pagination "1–4 of 4", rows-per-page
- Segmented filter chips with counts: `Default 10 · All 19 · Needs Attention 9`; `All · In progress 15 · Completed · Cancelled · Failed · Legacy`; toggle "My requests only"
- Contract detail: AI summary card (violet border, sparkle, refresh), Contract details grid (Annualized contract value / vendor proposal / savings value with green % pill, TCV/TSV sublines), Lifecycle timeline (Sign date, Start date, Auto-renewal date + "4 months left" pill, Renewal date), Contract length / Billing frequency box, Products, Contacts, Related requests
- Request detail: header with icon, cost, target date, status; tabs Overview/Offers/Details/Workflow/Documents/Outcomes; Active tasks card ("Vertice-Led Negotiation — Our team is actively working on this request"); horizontal Progress overview step chain (green completed → violet active → "View full workflow")
- Task modal (Requirements Gathering / IT Security Approval): left step list w/ check circles (Vendor & Products, Documents, Contract details, Contact & Permissions); Renewal type segmented (Upgrade/Flat/Downgrade); product/tier/licenses table; right Comments pane w/ @mentions; Next/Submit
- "What would you like to do today?" new-request modal: Purchase new software · Renew existing software · Select a vendor (RFP)
- Workflow builder canvas (React-Flow style): left palette (Nodes: End; Tasks: Approval, Form task; Gateways: Exclusive/Inclusive/Join; Vertice AI: Legal, Compliance, Custom, Negotiation, Sourcing Response Evaluation, Sourcing Vendor Suggestion, Questionnaire Generation; Integrations: Fetch Document, Create/Sync/Update Jira Ticket, Send HTTP request…); nodes with assignee + "7 days to complete"; edges labeled "Route", "Above $50,000"; warning badge; zoom controls "97%"
- Risk gauge (Low/Medium/High), risk categories (Legal & Compliance, Reputation/ESG, Resilience & Financial Stability, Security & Privacy) with colored labels, AI risk narrative
- Benchmark scatter (price/user vs. contract size, your-price dot, band), Pricing rating rings (Clarity, Simplicity, Transparency, Parity scores)
- Expert Engage service catalog cards (Save money / Source & evaluate vendors / Plan & optimize)
- Ana negotiation: plan checklist, Monte-Carlo forecast band, autonomous email drafting, progress (Best offer / Target / Round / Est days left / Savings opportunity)
- P2P: PO table (Code/Vendor/Amount/Status: Draft, Pending approval, To pay, Paid), invoice capture split-view with PDF, 3-way match variance ("+$15,000 Total difference"), punchout carts (CART-0184, Not submitted/Ordered/Expired), budget overview by Org/Dept with Paid/Invoiced/Committed/Free bars
- Cloud: AWS cost tree (Compute/Storage/Networking spend + potential savings), Optimization Tests (95 run / 53 found / $450,765), RIO optimizer chart, EDP commitment tracker
- AI spend: spend breakdown by model/provider/department donut, savings recommendations list

## Status pill vocabulary
`Live` (green) · `Not yet live` (orange) · `In progress` (blue) · `Completed` (green) · `Draft` (gray) · `Pending approval` (orange) · `Due in 1d` (blue) · `Active 5d` (blue text) · `Overdue` (red) · `Unapproved` (red outline) · `Preferred` / `Preferred Vendor` (green outline) · `Current vendor` (violet outline) · `Waived` (gray) · `Software` (neutral outline)
