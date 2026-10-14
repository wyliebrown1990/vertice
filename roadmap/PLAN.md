# Vertice Demo Replica: Development Plan

> **PROGRESS TRACKING**: This is the master plan. Update sprint docs as you work.
> Do NOT create separate status documents. Mark checkboxes in sprint files.
> Last updated: 2026-10-13 by Claude (Beans-bot): Sprints 0–3 built; Sprint 7 rehearsal open

## Project Overview

This is a **front-end-only, clickable replica of the Vertice procurement platform** (vertice.one). It runs on realistic dummy data, and Wylie will use it in a Sales Engineer interview demo. It has no backend and no auth. Scenario state lives in memory and persists to `localStorage`; presenter controls restore a clean starting point.

The app has three jobs, in priority order:

1. **Demo vehicle.** It must look and behave enough like the real product (`demo.vertice.one`) that a Vertice interviewer recognises it immediately. One reliable 6-minute click path supports an 8–10-minute value story inside a 20–30-minute conversation; the remaining time is discovery, discussion and questions.
2. **Value-selling vehicle.** Each S1 beat has a short hidden **Presenter Note** (buyer decision, evidence, relevant proof, transition). The demo makes the outcomes for Procurement and Finance clear.
3. **Learning vehicle.** Building each screen forces Wylie to learn the matching module. `docs/VALUE_PLAYBOOK.md` becomes his study guide and interview cheat sheet.

## Research Inputs (source of truth for content and look)

| File | What it holds |
|---|---|
| `research/DESIGN_SYSTEM.md` | Colours, type, radii, app shell, full component inventory, status-pill vocabulary |
| `research/PRODUCT_FEATURES.md` | Positioning, nav taxonomy, 17 modules in detail, AI agents, integrations, pricing model, competitor matrix, value-message bank, UI screen inventory (§9), mock-data cheat sheet (§9.21), conflicting numbers (§10) |
| `research/PROOF_AND_DATA.md` | Customer stories and metrics, benchmark data bank (insights pages), fictional customer seed, glossary, ranked customer pains |
| `research/tours/TOURS.md` + `research/tours/unique/*.png` | **45 real-app screenshots** from Vertice's own Navattic product tours (captured from `demo.vertice.one`), plus Vertice's own tour narration copy. This is the primary visual reference. |
| `research/images_png/` + `research/contact/*.jpg` | 159 marketing product renders (contact sheets for fast review) |
| `research/text/*.md` | All 792 crawled pages as markdown |

**Visual fidelity rule:** use real-app screenshots for layout, hierarchy, typography and interaction patterns. Inspect the image itself: tour filenames and narration sometimes describe different screens. Northwind's coherent data and screen-share legibility take precedence over copying screenshot numbers or every control. Marketing renders are secondary references, not extra scope.

**Review decision:** approved for implementation with the scope and corrections below. This is a plan sign-off, not a claim that the demo has been built or tested. The repository currently contains research and roadmap documents only: no app, package manifest, deployment or project profile. This plan supplies the project context; add a separate profile only if later development needs one. Platform impact is this standalone browser demo only; no Amicai services, shared libraries, native apps, auth or sync pipeline are affected.

## Goals

- [ ] A recognisably Vertice app shell: sidebar IA, working search, floating Vertice AI orb, design tokens (⌘K is optional polish)
- [ ] **S1 only** clickable end-to-end: visibility → evidence → decision → expert execution → approval → measurable outcome → dashboard
- [ ] One coherent fictional customer dataset: every number on every screen reconciles
- [ ] Short Presenter Notes for each S1 beat, with a source for each published proof point
- [ ] Scripted Vertice AI chat that answers the demo prompts convincingly, with a streamed feel and no live LLM dependency
- [ ] `docs/VALUE_PLAYBOOK.md` study guide plus `docs/DEMO_SCRIPT.md` run-of-show
- [ ] Works without internet from a local production build; reset-to-clean and three named recovery checkpoints

## Demo Stories (the spine of the build)

S1 is the committed build. S2–S5 are a breadth map for verbal discussion, not implementation or rehearsal requirements. S6 is future scope.

| # | Story | Persona | Screens (in click order) | Outcome to land |
|---|---|---|---|---|
| **S1** | **Save on a renewal** *(committed)* | Head of Procurement; CFO is the beneficiary | Dashboard → Salesforce pipeline tile → contract notice deadline → Vertice AI recommendation → benchmark evidence → renewal requirements (500→400 seats) → expert-led negotiation → final offer → in-app approval → simulated signed outcome → dashboard | Act before the notice deadline; reduce annual spend by **$274,400 (28%)** in the fictional example, with human ownership and a traceable savings breakdown |
| **S2** | **Rationalise the tech stack** | CFO + IT | Usage insights → AI-assisted overlap review → expert consolidation support (deferred screens) | Identify waste and validate consolidation opportunities with the owners |
| **S3** | **Intake-to-Procure: buy new software** | Requester → Procurement → Security/Legal → Finance | Intake → policy-based reviews → approvals → purchasing handoff (deferred screens) | One front door and clearer ownership to reduce delays |
| **S4** | **Fix the bottleneck** | Head of Procurement | Procurement insights → bottleneck analysis → workflow improvement (deferred screens) | Find where work stalls and change the process |
| **S5** | **Take control of spend** | Finance | Spend/forecast → budgets → purchasing → contract/invoice variance (deferred screens; matching scope to confirm) | Connect agreed terms with spend visibility |
| S6 *(stretch)* | Cloud and AI cost | CFO + FinOps | Cloud Optimizer (AWS tree, Optimization Tests, RIO) · AI Spend (by model/dept, recommendations) | Savings beyond SaaS |

## Sprint Overview

| Sprint | Focus | Unlocks | Status |
|---|---|---|---|
| [Sprint 0](Sprint-0-foundations.md) | Minimal scaffold, S1 tokens/primitives, coherent scenario data, short Value Playbook | S1 foundations | Done |
| [Sprint 1](Sprint-1-app-shell-dashboard.md) | App shell, search, Dashboard + Pipeline, short Presenter Notes | Opening of S1 | Done |
| [Sprint 2](Sprint-2-contracts-renewal.md) | Contracts, benchmark, self-contained renewal/approval flow + outcomes | **S1 without AI** | Done |
| [Sprint 3](Sprint-3-vertice-ai.md) | Small scripted AI panel, S1 evidence and actions | **Complete S1**; optional S2 chat vignette | Done |
| [Sprint 4](Sprint-4-intake-workflows.md) | Requests list, New-request modal, Dynamic Intake, Request detail + Workflow, Tasks, approvals, Slack mock | **S3** | Deferred (post-interview) |
| [Sprint 5](Sprint-5-insights-usage-risk.md) | Usage insights, Procurement insights, Analytics tabs, Vendor directory + risk, Expert Engage, Workflow builder | **S2, S4** | Deferred (post-interview) |
| [Sprint 6](Sprint-6-p2p-budgets-ana.md) | Budgets, Purchase orders, Invoices + match, Catalog purchases, Ana negotiation workspace, Sourcing (RFP) | **S5** + Ana depth | Deferred (post-interview) |
| [Sprint 7](Sprint-7-polish-rehearsal.md) | S1 recovery controls, polish, offline build, demo script, rehearsal | Interview-ready | In progress (rehearsal open) |
| Sprint 8 *(stretch)* | Cloud Optimizer and AI Spend | S6 | Not Planned |

**Committed scope: Sprints 0 → 1 → 2 → 3 → Sprint 7 rehearsal tasks.** Sprints 4–6 remain deferred, and none is a dependency of S1. Their sidebar destinations reuse one polished "Outside this demo" view with a short capability explanation and a return to the renewal. Do not visit those views in the main presentation. Preserve local screen-share delivery from the prior planning decisions; a hosted share link is not required by this plan.

**Timebox (the existing planning assumption is roughly one week):** day 1 foundations; day 2 shell/dashboard; days 3–4 complete renewal; day 5 AI and story copy; days 6–7 polish and rehearsal. These are budget allocations, not estimates established from implemented code. Stop feature additions once S1 works. If behind, cut optional chat breadth, Slack illustration, command-palette polish and extra tabs before cutting the outcome, offline pass or rehearsal.

**Do not build for this release:** workflow editor/React Flow, P2P/budget models, vendor-risk engine, Ana workspace, sourcing, live integrations/LLM, generic story/highlight engine, full component gallery, full competitor report or production infrastructure. Optional enhancements are never acceptance gates.

**Narrative:** “You already know renewals cost money. The problem is having time and evidence to act before your options close.” Show one decision, its evidence and the resulting outcome. Ask one opening discovery question, demonstrate S1, then close with “Which upcoming renewal would be worth reviewing first?” Use The AA as the closest Procurement proof point from the supplied research; keep the platform breadth to a 60–90-second verbal bridge.

## Architecture Decisions

| Decision | Choice | Why / rejected alternatives |
|---|---|---|
| Framework | **Vite + React + TypeScript** | Use the compatible scaffold versions and commit the Bun lockfile; no requirement to force React 18 onto a newer template. Static app, no server-side framework. |
| Package manager / runtime | **bun** | Wylie's standing preference (CORE stack). |
| Styling | **Tailwind CSS v4** with Vertice tokens as CSS variables in `src/styles/tokens.css` | Fast to replicate dense SaaS UI. Tokens copied verbatim from `research/DESIGN_SYSTEM.md`. |
| Primitives | **Radix UI**, only the primitives S1 uses | Accessible interaction behaviour without a full component-catalogue project. |
| Icons | **lucide-react** | The real app's icon style is lucide-like (outline, 1.5px stroke). |
| Charts | Small SVG gauge, pipeline and benchmark visual | Only three S1 visuals; no general chart suite required. Use a library only if it reduces implementation time. |
| Workflow display | Simple progress chain | S1 has four fixed stages. React Flow and an editable canvas belong to deferred Sprints 4–5. |
| Command palette | **cmdk**, optional | Add ⌘K after basic contract search works; it is not a release gate. |
| State | **zustand** + `persist` (localStorage, versioned key) | One renewal, its draft, completed savings entry and chat history persist. Derived totals and presenter visibility are not persisted. |
| Data | Typed seed modules in `src/data/` (one fictional customer). All derived numbers are computed, never hard-coded twice. | Numbers must reconcile across screens. An interviewer *will* notice $1.37M on one card and $1.41M on another. |
| Vertice AI | Authored S1 responses resolved against the current scenario state, with brief cancellable streaming | Chips are reliable; typed variants use simple matching with a safe fallback. No live-model mode or agent framework. |
| Routing | React Router, compatible with the scaffold | Implement dashboard, contracts, benchmark and the one renewal request; all other nav entries share the scope view. |
| Vendor logos | Local SVGs from `simple-icons` where available, otherwise a coloured letter-tile fallback | Offline-safe and consistent sizing. |
| Hosting | **Local production build only** (`bun run build && bun run preview`), shown by screen-share | Grill Q2. See Notes. |
| Repo | `vertice_demo/` becomes **its own git repo** (it currently sits inside the home-directory repo, which is not used) | Matches Wylie's rule of only committing to project repos. `research/raw/html` (145MB) is git-ignored. |

## Information Architecture (matches the real app's sidebar)

```
✓ vertice                                   🔔
[ Search                ⌘+K ]
Dashboard · Tasks (n) · Requests · Contracts · Documents (New)
──────────
Offers · Catalog purchases · Purchase orders · Orders · Invoices · Savings
──────────
Insights ▾ (Analytics · Procurement · Usage)
Vendors ▾ (Directory · Expert Engage)
Workflows ▾ (Dashboard · Builder)
Cloud Optimizer ▾ (stretch)
──────────
Help · Settings · User (Demo user)       [Presenter-only: checkpoints · Notes · Reset]
```
Floating **Vertice AI orb** (bottom-right) on every page, which opens the right-side chat panel.

## Fictional Customer

**Northwind Systems, Inc.** is fictional. Use the 42 strategic vendor rows in `research/PROOF_AND_DATA.md` §3.3 as compact portfolio fixtures, enriching only Salesforce for the full interaction. Dashboard and contract totals describe **the strategic SaaS portfolio shown**, not the research's wider ~$14M estate, AWS or 152 apps. Compute counts, department totals and renewal months from those rows. Background contracts open the same read-only detail template; only Salesforce starts an interactive renewal. The original research remains reference material, not an exact implementation contract.

### Canonical S1 scenario (overrides screenshot examples and research targets)

The following is authored demo data, not Salesforce pricing or a prediction from Vertice's proprietary benchmarks. Declare the scenario once in `app/src/data/`; this table is its planning specification.

| Item | Demo value / meaning |
|---|---|
| Fixed date | `2026-10-13`; every relative label uses this date, not the laptop clock |
| Current contract | Salesforce Sales Cloud + Einstein; $980,000 annual cost; 500 seats; synthetic blended $1,960/seat/year |
| Usage / requirement | 355 active users (71%) in the sample 28-day snapshot; owner-approved target **400 seats**, including 45 seats of headroom. Usage is evidence for review, not an automatic licence cancellation. |
| Deadline / term | Notice deadline **2026-12-02 (50 days)**; current term ends **2027-01-31 (110 days)**; replacement term **2027-02-01–2028-01-31**, 12 months, annual billing |
| Vendor opening quote | Same 500-seat scope: $1,097,600/year, a 12% uplift |
| Benchmark evidence | Synthetic same-product/tier/term cohort with a target band $1,700–$1,850/seat/year; mark it “Illustrative benchmark”. No unsupported “98th percentile” claim. |
| Agreed future annual cost / TCV | 400 × $1,764 = **$705,600**; ACV equals TCV for this 12-month example |
| Annual spend reduction | $980,000 − $705,600 = **$274,400 (28%)**: scope reduction **$196,000** (100 × $1,960) + unit-price reduction **$78,400** (400 × $196) |
| Avoided uplift (separate) | $1,097,600 − $980,000 = **$117,600**; total benefit vs opening quote $392,000 (35.7%). Do not add that total to the $274,400 again. |
| Dashboard outcome | Baseline **$1,210,000** annualized savings from completed sample renewals → **$1,484,400** after this simulated signed renewal. Describe as contracted annualized savings, not cash already realized. Historical savings records are separate from current portfolio spend. |

Show current spend unchanged until the future effective date, and the next-term Salesforce cost separately. Keep current and replacement terms linked; never count both as live. Do not extrapolate one fictional deal into a company-wide guarantee or ROI.

### S1 interaction contract

One request follows `requirements → negotiation → approval → completed`. Creating it twice reopens the same request. Requirements submit records the supported 400-seat scenario; other quantities get a clear “This demo models 400 seats” recovery action rather than a fabricated offer. A presenter button **Show final offer** (optional `Shift+N`) compresses negotiation time. Approval records the decision; a clearly labelled demo transition **Show signed outcome** compresses contracting and completes the request. No emails, Slack actions, signatures or supplier changes are real. Repeating approval/completion is a no-op, so the savings entry is added once.

Reset clears drafts, chat/timers and all mutations, returns to the dashboard and preserves the fixed date. Recovery controls load three named S1 checkpoints: **Start, Final offer, Outcome**. They load complete fixtures, not a generic replay engine. Keyboard shortcuts work only in presenter mode, ignore text fields/contenteditable, and have clickable equivalents.

### Evidence and presentation copy

- Keep three things distinct: **fictional Northwind figures**, **illustrative UI/benchmark data**, and **published Vertice/customer claims** from the supplied crawl.
- Presenter Notes and the playbook cite the local source file and its original URL/date where available. Prefer one relevant proof point over a wall of statistics. The AA's story reports $1M overall benefit, 440 negotiation hours saved and 5× first-year ROI; those are that customer's results.
- The captured pricing page labels **20% average savings** separately from **contractually guaranteed savings**. Describe the guarantee as subject to the customer's agreement; do not promise 20% on every renewal, automatic 90-day payback or a return with no fee assumption.
- This review uses the supplied research snapshot, not a fresh verification of current product claims. Preserve that attribution in the talk track. Lead with visibility + intelligence + expert execution + human approval; Ana's autonomous workspace remains deferred.

## Dependencies

- [ ] Bun available (`~/.bun/bin/bun` present); verify the scaffold/tooling runs with the installed version
- [ ] Node available for tooling (`/opt/homebrew/bin/node` present); verify compatibility with the chosen scaffold
- [ ] `agent-browser` CLI for visual QA (✔ present, `/Browser` skill)
- [ ] Inter font: self-hosted via `@fontsource-variable/inter` (offline-safe, no Google Fonts call)
- [ ] No cloud resources, no billable infrastructure

## Validation Approach (adapted for a front-end-only demo)

The DevPlanning standard (prod deploy, then backend datastore read) **does not apply as written**: this project has no backend, no datastore and no prod URL. The equivalent two halves are:

1. **UI half:** from `app/`, run the production build and preview, then use `/Browser` → `agent-browser` for S1. Capture the dashboard, evidence, final offer and outcome; check intermediate steps during the walkthrough. Reuse screenshots as fallback presentation material.
2. **State half:** inspect `vertice-demo-v1` after requirements, completion and reset, then reload. Test duplicate completion, checkpoint recovery and reset during AI streaming. One small calculation/state test suite plus three successful offline S1 rehearsals is enough; no production QA infrastructure or backend read applies.

Evidence goes into the existing sprint docs. Only reachable demo states need coverage: no-result search, unsupported prompt/quantity, interrupted stream, missing route and reset recovery. Do not manufacture backend failure modes for an app with no backend. “Offline” means no internet while the local HTTP server remains running; opening `dist/index.html` directly is not the delivery method.

## Notes for Future Developers

- **Hosting (grill Q2, 2026-10-13): local only, shown by screen-share.** Run `bun run build && bun run preview` on Wylie's laptop. No deploy target and no Cloudflare/Vercel setup. *Rejected:* a private Cloudflare Access link (unneeded setup for a one-off interview) and a public URL (impersonation risk).
- **Brand:** keep the prior local interview-demo delivery. Show a subtle “Demo concept by Wylie Brown — fictional data; scripted AI; not affiliated with Vertice” note in the app and README. No login or splash screen is needed. Use a demo-specific browser title.
- **Numbers that conflict on Vertice's own site:** use the recommended values in `research/PRODUCT_FEATURES.md` §10 (32,000+ vendors, $75bn spend, 2M+ price points, 20% average savings, 1,000+ customers, 50+ agents / 70+ tasks).
- **Open questions to raise *in* the interview** (shows depth; do not "resolve" them in the demo): Is negotiation scope SaaS-only or all indirect spend? Is three-way match GA or roadmap? Is cloud optimisation AWS-only?
- **Navattic tour screenshots** were pulled from the public `__NEXT_DATA__` of `capture.navattic.com` pages. They are reference material only and must not be shipped inside the app.
- **Audience (prior planning decision): Head of Procurement at Northwind Systems.** The demo user is **Alex Morgan**. Lead with acting on renewals early, evidence for decisions and extending the team's capacity. The result Alex takes to Finance is a clear annualized cost reduction with its assumptions. Every Presenter Note is Procurement-first; no persona switch.
- **Naming:** the in-app assistant is labelled "Vertice AI" in every real screenshot. Vertice's 2026 release blog calls the orchestrating assistant **"Verity"**, which recruits from 50+ agents. Use "Vertice AI" in the UI and mention Verity and the agents in the talk track.
- **No live LLM calls.** All Vertice AI output is authored content in `src/data/ai-scripts/`.
