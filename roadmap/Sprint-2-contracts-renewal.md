# Sprint 2: Contracts & the Renewal Story (S1 flagship)

> **PROGRESS TRACKING**: Update this document as you complete tasks.
> Mark checkboxes `[x]` when done. Do NOT create separate status docs.
> Last updated: 2026-10-13 by Claude (Beans-bot): S1 built and validated

## Overview
Complete S1 without needing Sprints 4–6: spot Salesforce, understand the deadline and commercial opportunity, capture requirements, show expert negotiation, approve an offer, and demonstrate the signed outcome. Sprint 3 adds the AI moment; a direct benchmark link keeps this flow independently usable. Target six minutes of clicking, or eight to ten minutes with talk track. Platform: standalone web demo only.

Use **PLAN.md's Canonical S1 scenario** for every price, date and result. The $49,925/23% and $356,400/$85,000 screenshot examples are not this customer's data.

Verified visual references (all under `research/tours/unique/`):
- `19_finance_f3_s01.png`: contract overview and lifecycle.
- `01_finance_f3_s02.png`: contract AI, wired in Sprint 3.
- `45_finance_f3_s04.png`: Requirements Gathering task.
- `30_finance_f3_s05.png`: request overview and Vertice-Led Negotiation.
- Benchmark layout: `research/images_png/home__static-pricing-data.png` (secondary marketing reference).

## Tasks

### Contracts list (`/contracts`)
- [x] Simple table of the strategic portfolio: vendor/logo, owner department, annual cost, notice deadline, renewal date and status. Search, sorting and useful status filters reuse shared primitives. Zero results has a reset action.
- [x] Clicking any vendor opens a data-backed read-only detail; Salesforce alone has the interactive renewal. Other vendors explain the supported scenario and link to Salesforce rather than opening a broken workflow.
- [x] File upload / AI extraction is **deferred**; do not show an active upload button in this release.

### Contract detail (`/contracts/:id/overview`)
- [x] Familiar breadcrumb/header, Live status, Software tag and `Start renewal` primary action. Reopening an existing renewal says `View renewal`; there is only one S1 request.
- [x] Build Overview and Outcomes. Supporting Details/Documents/Notes can be omitted or simple read-only content where useful; no empty tabs or fake document controls. Do not build a contract editor.
- [x] AI summary explains current spend, 355/500 active seats, proposed 12% uplift and the upcoming notice deadline; show a direct `View benchmark` link and Sprint 3 AI entry point. Omit decorative regenerate behaviour.
- [x] Lifecycle distinguishes **notice deadline Dec 2, 2026 — 50 days** from **term end Jan 31, 2027 — 110 days**. No copied “4 months left” text. Dates derive from the fixed demo date.
- [x] Products/contacts show the blended seat scenario and responsible owner. The proposed 400-seat requirement retains 45 seats above observed activity; usage alone is not consent to remove licences.
- [x] After simulated signing, show current term still Live and the linked future term effective Feb 1, 2027. Outcomes link to the completed request. The current annualized-spend figure does not drop early.
- [x] Diligence Insights and pricing-score rings are **deferred**; no separate vendor-risk work.

### Benchmark Pricing (`/contracts/:id/benchmark`)
- [x] A readable same-product/tier/term comparison: current $1,960/seat/year, illustrative target band $1,700–$1,850, and negotiated scenario $1,764 once available. Label the cohort **Illustrative benchmark** and use consistent annual per-seat units.
- [x] Small SVG band/plot and compact assumptions explain why the comparison is relevant. Dots are synthetic examples, not a claimed statistical sample; omit unsupported percentile, market-share, vendor-flexibility and average-negotiation claims.
- [x] Separate potential scope reduction from price improvement; use the scenario selectors. One next action: `Start renewal` / `View renewal`, carrying Salesforce context forward.

### Renewal request flow
- [x] Create or reopen the single request at `/intelligent-workflows/requests/:id/overview`. Show name, owner, deadline, status, Active task and a simple progress chain: Requirements → Negotiation → Approval → Completed. Requirements starts active, not already checked off.
- [x] **Requirements Gathering** modal: prefilled vendor/product, current 500 seats, proposed 400 seats, renewal type Downgrade (seat scope, not a product-tier change), reason and owner confirmation. One concise review/submit flow; no four-page form, upload simulation or @mention implementation.
- [x] Allow editing the draft, but this release models only the 400-seat offer. Unsupported quantities show a clear explanation and `Use demo scenario (400 seats)`; do not silently ignore edits or invent new prices. Submission requires confirmation that the owner agrees the headroom is sufficient.
- [x] **Negotiation**: Julian Hayes owns the renewal; show a short authored plan (validate requirements, benchmark terms/pricing, negotiate, seek approval). This is expert-led work supported by AI, not an Ana workspace or autonomous enterprise deal.
- [x] A presenter button `Show final offer` (optional Shift+N) reveals the fixed offer, clearly described in the script as time compression. Show annual cost/TCV $705,600, 400 seats, 12-month term and the same savings breakdown used by Outcomes.
- [x] **Approval**: `Approve offer` records approval and gives immediate feedback. It does not itself claim a signed contract. Show `Approved — contracting pending`, then a presenter action `Show signed outcome` explicitly simulates completed contracting and completes the request. No signature service, PO or external messaging is involved.
- [x] Completion creates one linked future contract term and one savings record. Guard transitions by stage; repeated submits/approval/completion are no-ops, not extra records. Reload restores the current stage; Back returns to a coherent view.
- [x] `View workflow`, if shown, expands the fixed progress chain; do not route into a deferred workflow editor. Request/task sidebar entries can show only this request and its tasks, using the same data.

### Outcomes and return to dashboard
- [x] One clear result card: **$274,400 annual spend reduction (28%)**, current $980,000 → future $705,600. Below it: $196,000 scope reduction + $78,400 unit-price reduction. Show 400 retained seats and future effective date.
- [x] Secondary disclosure: avoided uplift $117,600; total benefit versus opening quote $392,000 (35.7%). Explain the different baselines; only $274,400 enters the annualized savings hero. Do not call it cash already realized or a guaranteed result for another customer.
- [x] `Back to dashboard` lands on the updated savings card: $1,210,000 → $1,484,400, with a brief +$274,400 highlight and renewal marked secured. Current spend still describes the current live terms.

### Presenter Notes
- [x] Notes for deadline, evidence, requirements, negotiation, approval and outcome. Each names the buyer's decision and benefit; cite The AA's published procurement-capacity result as supporting proof, separate from the fictional deal.
- [x] Narrative line at completion: “Alex can now take Finance a cost reduction with a clear baseline, agreed scope and an accountable owner.” Refer to the commercial guarantee only with PLAN.md's qualification.

### Optional only after S1 passes
- [ ] Read-only Slack-style approval illustration, labelled simulation, may support “approve where stakeholders work”. It adds no second approval state and no integration. Full Slack interaction, Ana and extraction remain deferred.

## Validation (front-end-only adaptation)
- [x] Production build; `/Browser` → `agent-browser`: dashboard → Salesforce → benchmark → request → requirements (400 + owner confirmation) → negotiation → final offer → approve → show signed outcome → Outcomes → dashboard.
- [x] Capture contract/evidence, final offer and outcome screenshots; compare layout with the verified references. Ensure CTA and savings remain readable at 1280×800.
- [x] Inspect the saved store after requirements and completion. Confirm one completed request, one future contract term and one savings increment; reload at approval and outcome.
- [x] Focused state test: duplicate completion/reopening cannot double-count; reset returns to seed. Browser check: unsupported seat count recovers and typing does not activate presenter hotkeys.
- [x] Return to dashboard, confirm its delta, current spend and live/future counts, then reset. Paste concise evidence here.

### Evidence (2026-10-13)
- Full S1 click-through on the production build: contract → Start renewal → requirements (350 seats showed "Use demo scenario (400 seats)"; owner confirmation is required before Review) → submit → negotiation → Show final offer → Approve → Show signed outcome → Outcomes → Back to dashboard.
- Store after submit: `stage: negotiation`, `requirements.seats: 400, ownerConfirmed: true`. After completion: `stage: completed`, one savings entry (`annualReduction: 274400, baselineAnnual: 980000`), `futureTerms.length: 1`.
- Dashboard after completion: $1,484,400 with a "+$274,400" flash, 23% weighted average, "Signed renewals starting later: 1", Salesforce tile marked secured, live spend still $11,415,000.
- Clicking Start renewal twice and loading the Outcome checkpoint twice still leaves exactly one savings entry.
- Screens: `qa/s1-contract-v1.png`, `qa/s1-benchmark-v1.png`, `qa/s1-final-offer.png`, `qa/s1-outcome.png`, `qa/s1-dashboard-after.png` (local, git-ignored).

## Acceptance Criteria
- [x] The complete S1 decision/action/outcome path works without Sprints 4–6 or a live AI service.
- [x] All dates, unit prices, term values and savings agree across the flow and dashboard.
- [x] No premature signed/realized-savings claim, duplicate completion or dependency on a deferred screen.
- [x] Every S1 beat has a short value note and a defined next step.

## Notes for Future Developers
- Match reference composition, not screenshot sample values, blurred navigation or capture artefacts.
- Keep useful feedback/focus handling; do not simulate network failures or build generic enterprise workflow infrastructure.
