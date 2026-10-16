# Sprint 5: Insights, Usage, Vendors & Workflow Builder (S2, S4)

> **PROGRESS TRACKING**: Update this document as you complete tasks.
> Mark checkboxes `[x]` when done. Do NOT create separate status docs.
> Last updated: 2026-10-13 by Codex — deferred-scope notice only

> **SUPERSEDED 2026-10-15 (built):** this scope was delivered by [FULL-DEMO-PLAN.md](FULL-DEMO-PLAN.md), Sprints 10–12 (Chapters B, C, E, E2). See those sprint docs for what was built; the tasks below are historical.

> **DEFERRED — outside the current demo.** Do not execute these tasks or use their acceptance criteria to gate Sprints 0–3 or Sprint 7. Revalidate examples, data and dependencies if this sprint is later activated; PLAN.md governs the current release.

## Overview
Build the visibility and optimisation surfaces for **S2: Rationalise the tech stack** and **S4: Fix the bottleneck**, plus the vendor directory (with risk) and the no-code **Workflow builder**.

Reference screens: `25_finance_f1_s00.png`/`13_finance_f2_s00.png` (Usage insights), `15_overview_f3_s00.png`/`11_overview_f3_s02.png`/`28_overview_f3_s03.png` (Insights › Procurement), `21_finance_f4_s00.png`/`39_finance_f4_s01.png`/`12_finance_f4_s02.png`/`44_finance_f4_s03.png`/`17_finance_f4_s04.png` (Analytics tabs), `35_itops_f4_s00.png`/`05_itops_f4_s01.png` (Vendor directory + risk), `03_finance_f2_s07.png` (Expert engage), `24_overview_f3_s08.png`/`38_overview_f3_s07.png`/`26_itops_f4_s05.png` (Workflow builder).

## Tasks

### Usage insights (`/applications`)
- [ ] Header `Insights / Usage`, Log button; SegmentedFilter Default · All · Needs attention; search
- [ ] Table: Application (logo, name, vendor), Source (Okta SSO icon), Utilization (UtilizationBar with % chip + "active / provisioned"), Typically used (Daily or more / Weekly / Monthly / Occasionally), Last update
- [ ] Expandable vendor rows (Atlassian → Jira, Confluence)
- [ ] **Stack Review** card: Unapproved / shadow-IT apps list (Adobe 13%, Google 21%, GitHub 7% "Unapproved")

### Procurement insights (`/insights/procurement`)
- [ ] KPI cards: Tasks (15 active / 3 overdue), Requests (8 active / 2 overdue), In-Flight Spend, Total Spend (last 30 days); "Demo mode" toggle top-right
- [ ] Active Tasks list (All / Unassigned) with "Active 5d" chips; Requests last 90 days bubble (15 Succeeded / 2 Rejected)
- [ ] Task Completion Time histogram (0–5 … 21–25 days) with Request Types/Task Types filters; Request Cycle Time (avg 1.94 days) breakdown by request type
- [ ] Total Spend (New vs Renewed, stacked bars) and Requests (on-time vs late) over the last 6 months

### Analytics (`/analytics/:tab`)
- [ ] Tab strip: Recommendations · Benchmarking · Savings and ROI · Renewals Timeline · Spend Insights · TPRM Analysis · Cost/Cash Forecast · SaaS Stack Matrix … (build 4: **Spend Insights, Cost/Cash Forecast, Savings and ROI, Recommendations**; the rest show a tasteful "Available in full product" card)
- [ ] Spend Insights: KPI row (Annualized spend, Live contracts, Avg contract spend, Spend to be negotiated by Vertice) + 6 donuts (dept, category, negotiation support, contract length, billing frequency, payment terms)
- [ ] Cost/Cash Forecast: Cost over time and Cash flow over time (historical grey vs projected violet)
- [ ] Savings and ROI: total savings by quarter (bars + negotiations line), cumulative savings, by department
- [ ] Recommendations: Total estimated savings, Deduplication, Term commitment, Sunsetting cards + tables
- [ ] "Give feedback" button (decorative)

### Vendors
- [ ] Directory list + vendor detail (`/vendors/:id`): Overview (contact fields), Contracts & requests (linked contracts), **Overall risk assessment** (RiskGauge + AI narrative + Security & Privacy / Legal / Financial collapsibles)
- [ ] **Expert Engage** (`/expert-engage`): service cards grouped Save money (Vendor price benchmarking, Expert negotiation support, Software consolidation) · Source and evaluate vendors (Vendor recommendation, RFI, RFP, RFQ) · Plan and optimize (Budgetary planning, Peer group analysis, Procurement maturity assessment). Click → "Book your slot" calendar modal with expert avatars

### Workflow builder (`/workflows`, `/workflows/:id/edit`)
- [ ] Workflows dashboard: list of templates (SaaS purchase, SaaS renewal, IT hardware purchase, Vendor onboarding, General purchase with Finance review, Legal review, RF[x] vendor engagement) with "Preview template"
- [ ] Editor: React Flow canvas + left palette (Nodes, Tasks: Approval/Form task, Gateways: Exclusive/Inclusive/Join, **Vertice AI**: Legal, Compliance, Custom, Negotiation, Sourcing Response Evaluation, Vendor Suggestion, Questionnaire Generation, **Integrations**: Fetch Document, Create/Sync/Update Jira Ticket, Send HTTP request); drag a node onto the canvas; labelled routing edges; node warning badge ("1 warning: No assignee"); `Save` / `Set as live`
- [ ] **S4 scripted change**: drag "Create Jira Ticket" before IT Approval → warning clears → Set as live → Procurement insights shows the improved Security Review time (store flag `bottleneckFixed`)

### Presenter Notes
- [ ] Usage (SSO-sourced truth, one in three licences unused, shelfware benchmark), Analytics (CFO forecast, cost-aware culture), Risk (continuous native TPRM), Expert Engage (hybrid model: software + experts), Builder (no-code, policy changes in minutes, AI steps as nodes). Proof: ClearScore $5m+, Le Collectionist 30%, A.Team 115 hours reclaimed

## Validation (front-end-only adaptation)
- [ ] Production build; drive S2 (usage → AI consolidation → Expert Engage booking) and S4 (procurement insights → AI → builder edit → set live → insights improved) with `agent-browser`
- [ ] Screenshot each step vs references; store read confirms `bottleneckFixed` and the workflow graph edit persist; reload confirms
- [ ] Paste evidence here

## Acceptance Criteria
- [ ] S2 and S4 run end-to-end with zero dead ends
- [ ] Usage/consolidation numbers match the Sprint 3 AI answers exactly
- [ ] The builder supports drag-to-add and edge connect without visual glitches at 100% zoom

## Notes for Future Developers
- Keep analytics tabs that aren't built clearly *intentional* ("Available in full product"), so the interviewer reads it as scoping, not a bug.
