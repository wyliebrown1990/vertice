# Sprint 4: Intake-to-Procure (S3)

> **PROGRESS TRACKING**: Update this document as you complete tasks.
> Mark checkboxes `[x]` when done. Do NOT create separate status docs.
> Last updated: 2026-10-13 by Codex — deferred-scope notice only

> **SUPERSEDED 2026-10-15 (built):** this scope was delivered by [FULL-DEMO-PLAN.md](FULL-DEMO-PLAN.md), Sprint 10 (Chapter B). See those sprint docs for what was built; the tasks below are historical.

> **DEFERRED — outside the current demo.** Do not execute these tasks or use their acceptance criteria to gate Sprints 0–3 or Sprint 7. Revalidate examples, data and dependencies if this sprint is later activated; PLAN.md governs the current release.

## Overview
Build Vertice's core orchestration product, **Intake-to-Procure**, for **S3: buy new software**. A requester submits through one front door, AI pre-fills and suggests preferred vendors, the request auto-routes through risk, compliance, security, legal and finance approvals, and a PO is created and synced to the ERP.

Reference screens: `40_procurement_f2_s01.png` / `16_procurement_f3_s00.png` (Requests list), `04_procurement_f2_s00.png` / `procurement new-request modal` (What would you like to do today?), `32_procurement_f2_s02.png` (Request Intake), `42_procurement_f2_s07.png` (IT Security Approval with Final Offer), `14_i2p_f1_s04.png` (Requirements Gathering, Salesforce), `20_i2p_f1_s06.png`/`36_i2p_f1_s09.png` (I2P workflow tab, progress chain to Create Purchase Order), `46 Tasks list`; renders `platform__intake-management-software__*`, `home__static-intake-to-procure.png`.

## Tasks

### Requests (`/intelligent-workflows/requests`)
- [ ] Table: Request (icon + name + type subline "SaaS – New Purchase"), Cost (+ "Approved annual budget"/"Negotiated cost"), Last update, Active task (with Vertice ✓ icon for Vertice-led, `(+1)` parallel), Assignees, Date (target signature)
- [ ] Filters: search, toggle "My requests only", SegmentedFilter All · In progress 15 · Completed · Cancelled · Failed · Legacy

### New request
- [ ] Modal "What would you like to do today?": Purchase new software · Renew existing software · Select a vendor (request for proposal) · (Custom – New Purchase for non-software, e.g. laptops)
- [ ] **Dynamic Intake** form: vendor search with **preferred-vendor suggestions** (Vertice AI "Do you need any help…?" list: HubSpot *Preferred Vendor* "Good usability and in use by Marketing", Monday "Compliance already checked", Pipedrive "Similar use case"), product/tier/licences table, target signature date, budget question ("Do you have a budget for this?" → remaining budget gauge, "In budget" pill), notes
- [ ] "Upload order form" → AI pre-fill (animated, "3 fields filled – Review and edit if needed")
- [ ] **Benchmark range** inline for the chosen vendor/tier ("Typical price $X–$Y per user, based on N deals")
- [ ] Conditional fields: Slack/Teams entry-point illustration (static) to tell the "one front door" story

### Request detail + workflow
- [ ] Tabs Overview · Offers · Details · Workflow · Documents · Outcomes
- [ ] **Workflow tab**: read-only React Flow canvas of the executing workflow. Completed nodes green, active violet, pending grey; edges labelled ("Ironclad", "AdobeSign", "None", "Above $50,000", "Assigned to Vertice (Above Threshold)"); zoom controls
- [ ] Progress overview chain on Overview (Upload Contract for Signing → Sign Contract in Ironclad → Create SaaS Contract → Create Purchase Order → End)
- [ ] Comments pane with @mentions

### Tasks & approvals
- [ ] `/tasks` list: Task, Status (Due in 1d / Completed / Overdue), Due date, Assignees, Request (logo); filters All · Active · Completed · Overdue; "My tasks only"
- [ ] Approval task modal (IT Security Approval / Commercial / Legal / Finance): Approve/Deny radios, notes, right summary (Final Offer, baseline vs negotiated, savings %, products, Security Review result) → Submit advances the workflow
- [ ] Vendor **risk assessment** step: RiskGauge + categories (Legal & Compliance, Reputation/ESG, Resilience & Financial Stability, Security & Privacy) + AI narrative + AI Recommendations checklist
- [ ] Final step: **Create Purchase Order** auto-completes → PO appears in Purchase orders (Sprint 6 table; stub until then) with "Synced to NetSuite" chip
- [ ] Celebration end state: "🎉 Request complete" banner with cycle time vs benchmark ("Completed in 6 days, benchmark 14.6 days")

### Presenter Notes
- [ ] Intake (one front door, Slack/Teams/URL, forms ask only what's relevant), routing (policy as code, parallel approvals), risk (native TPRM vs integrations), PO (P2P without handoff); proof: CloudHesive 50% faster cycle, Felix 10 days shorter; discovery: "How many places can someone buy software at your company today?"

## Validation (front-end-only adaptation)
- [ ] Production build; drive S3 end-to-end with `agent-browser`: new request → intake (preferred vendor, pre-fill) → submit → each approval task → PO → completion
- [ ] Screenshot each step vs references
- [ ] Store read confirms request `completed`, tasks closed, PO record created; reload and confirm the Requests and Tasks lists reflect it
- [ ] Paste evidence here

## Acceptance Criteria
- [ ] S3 runs end-to-end with zero dead ends
- [ ] Workflow canvas node states always match the request's task states in the store
- [ ] Every approver persona (Security, Legal, Finance) is shown at least once

## Notes for Future Developers
- Seed a few in-flight requests at different stages so the list looks alive and the presenter can jump mid-flow if time is short.
