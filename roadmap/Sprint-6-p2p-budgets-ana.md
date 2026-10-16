# Sprint 6: Procure-to-Pay, Budgets, Ana & Sourcing (S5)

> **PROGRESS TRACKING**: Update this document as you complete tasks.
> Mark checkboxes `[x]` when done. Do NOT create separate status docs.
> Last updated: 2026-10-13 by Codex — deferred-scope notice only

> **SUPERSEDED 2026-10-15 (built):** this scope was delivered by [FULL-DEMO-PLAN.md](FULL-DEMO-PLAN.md), Sprints 9, 12 and 13 (Chapters A2, C, D). See those sprint docs for what was built; the tasks below are historical.

> **DEFERRED — outside the current demo.** Do not execute these tasks or use their acceptance criteria to gate Sprints 0–3 or Sprint 7. Revalidate examples, data and dependencies if this sprint is later activated; PLAN.md governs the current release.

## Overview
Build Vertice's newest surfaces: **Procure-to-Pay** (budgets, POs, invoices with matching, catalog/punchout), plus depth for **Ana** (the autonomous negotiation agent) and **Sourcing (RFP)**. Together these complete **S5: Take control of spend** and give the presenter "what's new" moments.

There are no tour captures for these. Reference the marketing renders: `procure-to-pay__*` (Purchase Orders, Invoicing, Matching, Budgets & Analysis, Controls & Permissions, Contract Terms, Market Pricing, Catalogue), `platform__budget-management__*`, `platform__punchout-catalog__*`, `platform__ana__*`, `ana__graphic-proof-points.png`, `platform__sourcing__*`, `saas-purchasing-platform__Negotiation*`.

## Tasks

### Budgets (`/budgets`)
- [ ] Budget Overview: org budget FY26 and department budgets (IT, Engineering, Sales…). Bars split Paid / Invoiced / Committed / Free; owner, code; SemiDonutGauge total with legend
- [ ] "Actual Spend to Date" line (actual vs projected; "Projection on track for 123% at current rate" warning)
- [ ] Intake tie-in: the S3 intake budget question reads from here

### Purchase orders (`/purchase-orders`)
- [ ] Table Code / Vendor / Amount / Status (Draft, Pending approval, To pay, Paid); `Bulk Upload`, `Create`
- [ ] PO detail: lines, linked contract/request, approval history, "Synced to NetSuite" chip; "Savings: project-based" gauge (negotiated vs offered price)

### Invoices (`/invoices`)
- [ ] Invoice list + **invoice capture** split view (PDF preview left, AI-extracted fields right, highlighted in violet: number, vendor, dates, payment terms, currency, line items)
- [ ] **Matching**: PO vs invoice vs contract terms, variance flag ("Invoiced $190,000 vs agreed $175,000: +$15,000 total difference") → "Hold payment / Request credit" actions
- [ ] Controls & Permissions mini-canvas: "When an invoice is created → if amount ≥ 5,000 → require Department Owner + Finance → notify Vendor Owner"

### Catalog purchases (`/catalog`)
- [ ] Supplier cards (Amazon Business, Staples Advantage, CDW) with "Buy from a vendor's online store. Your carts and orders live here."
- [ ] Carts table (CART-0184 …: items, vendor, status Not submitted / Ordered / Expired, approval, created, amount); filter chips All · Pending approval · Ordered · Expired
- [ ] Punchout simulation: an "Amazon Business" modal with 5 items → Submit items for approval → cart appears with Pending approval → Approve in the cart detail (Cart contents, SKU, Qty, Unit, Total, Approval panel)

### Ana: autonomous negotiation agent
- [ ] Ana workspace reachable from a renewal (Salesforce Deal Overview: ACV $2,465,460, renewal date, term; Current Offer Summary; Benchmark Opportunity 15–23%; Win Probability)
- [ ] Negotiation Plan checklist (Benchmark pricing 2M+ price points ✓, Negotiation strategy ✓, Drafting email to vendor ✓, Scenario forecasting, Negotiation rounds)
- [ ] Monte Carlo simulation chart (predicted, inner/outer range bands across rounds)
- [ ] Email drafting pane (Gmail-style compose: "Novina / Salesforce – Renewal Kickoff") with a "Generating" stream; human approves before send
- [ ] Proof-points strip (Ana: $500M negotiated, 4,000+ negotiations, 18% avg savings, 15 days saved)

### Sourcing (RFP)
- [ ] "RFP – Competitive Sourcing" view: shortlisted vendors (Workday Selected, SAP SuccessFactors Reviewed) with Solution Fit / Price Score bars; contract value + savings vs list
- [ ] "Evaluate RFP Responses" comparison matrix (questions × vendors) with AI-summarised answers
- [ ] Vendor Recommendation cards (Fit: High/Medium, pricing, implementation complexity, commercial flexibility)

### Presenter Notes
- [ ] P2P ("the price agreed at signature is the price that gets paid", "know before you pay"), budgets ("flag at-risk budgets at intake, not quarter-end"), catalog (guided buying for tail spend), Ana (negotiate the long tail without headcount; human in the loop), Sourcing (brief → shortlist → scored award). Proof: Piano 600% ROI. Discovery: "How do you catch an invoice that doesn't match the contract today?"

## Validation (front-end-only adaptation)
- [ ] Production build; drive S5 (analytics → budgets → PO → invoice mismatch → hold) and the punchout + Ana flows with `agent-browser`
- [ ] Screenshots vs the marketing renders; store read confirms the cart approval, the invoice hold and the Ana email "sent"; reload confirms
- [ ] Paste evidence here

## Acceptance Criteria
- [ ] S5 runs end-to-end; budget numbers reconcile with POs and invoices
- [ ] Ana and Sourcing are demo-able as 60-second "and there's more" moments

## Notes for Future Developers
- PRODUCT_FEATURES.md flags three-way matching as "planned" on Vertice's site. In the demo, call it "matching against contract terms" and be ready to ask about the roadmap.
